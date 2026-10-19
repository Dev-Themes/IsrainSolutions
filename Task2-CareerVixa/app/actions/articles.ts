"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ArticleStatus } from "@prisma/client";
import { sendArticleDecisionEmail } from "@/lib/mail";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and dashes"),
  summary: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional().nullable(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
  categoryId: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  reviewNotes: z.string().optional().nullable(),
  guestAuthorName: z.string().optional().nullable(),
  guestAuthorBio: z.string().optional().nullable(),
  guestAuthorUrl: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
});

export async function createArticle(data: z.infer<typeof articleSchema>) {
  const session = await requireAdmin();
  
  const validated = articleSchema.parse(data);

  if (validated.isFeatured) {
    await prisma.article.updateMany({
      where: { isFeatured: true },
      data: { isFeatured: false },
    });
  }

  const article = await prisma.article.create({
    data: {
      title: validated.title,
      slug: validated.slug,
      summary: validated.summary,
      content: validated.content,
      coverImage: validated.coverImage,
      status: validated.status,
      authorId: session.user?.id as string,
      categoryId: validated.categoryId,
      metaTitle: validated.metaTitle,
      metaDescription: validated.metaDescription,
      guestAuthorName: validated.guestAuthorName,
      guestAuthorBio: validated.guestAuthorBio,
      guestAuthorUrl: validated.guestAuthorUrl,
      isFeatured: validated.isFeatured || false,
      ...(validated.status === "PUBLISHED" ? { publishedAt: new Date() } : {}),
      ...(validated.tags && validated.tags.length > 0
        ? {
            tags: {
              connect: validated.tags.map((id) => ({ id })),
            },
          }
        : {}),
    },
  });

  revalidatePath("/admin/articles");
  if (article.status === "PUBLISHED") {
    revalidatePath("/");
    revalidatePath("/articles");
  }

  return article;
}

export async function updateArticle(id: string, data: Partial<z.infer<typeof articleSchema>>) {
  const session = await requireAdmin();
  
  const current = await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          contributorProfile: { select: { fullName: true } },
        },
      },
    },
  });
  if (!current) throw new Error("Article not found");

  const updateData: any = { ...data };
  
  if (data.status === "PUBLISHED" && current.status !== "PUBLISHED") {
    updateData.publishedAt = new Date();
  } else if (data.status === "UNPUBLISHED" || data.status === "DRAFT") {
    updateData.publishedAt = null;
  }

  if (data.isFeatured === true) {
    await prisma.article.updateMany({
      where: { isFeatured: true, id: { not: id } },
      data: { isFeatured: false },
    });
  }

  if (data.tags) {
    updateData.tags = {
      set: [],
      connect: data.tags.map((tagId) => ({ id: tagId })),
    };
  }

  const article = await prisma.article.update({
    where: { id },
    data: updateData,
  });

  // Send decision email to author if status transitioned to an editorial decision state
  const statusChanged = Boolean(data.status && data.status !== current.status);
  const editorialStatuses: ArticleStatus[] = [
    ArticleStatus.PUBLISHED,
    ArticleStatus.APPROVED,
    ArticleStatus.CHANGES_REQUESTED,
    ArticleStatus.REJECTED,
  ];
  const isEditorialDecision = editorialStatuses.includes(article.status);

  if (statusChanged && isEditorialDecision && current.author?.email) {
    const authorName =
      current.author.contributorProfile?.fullName ||
      current.author.name ||
      "Contributor";

    sendArticleDecisionEmail({
      to: current.author.email,
      name: authorName,
      articleId: article.id,
      articleTitle: article.title,
      articleSlug: article.slug,
      status: article.status,
      reviewNotes: article.reviewNotes || data.reviewNotes || null,
    }).catch((err) =>
      console.error("Error sending article editorial decision email:", err)
    );
  }

  // Record audit history log for any editorial decision or review notes
  if ((statusChanged && isEditorialDecision) || data.reviewNotes) {
    await prisma.editorialReview
      .create({
        data: {
          articleId: article.id,
          adminId: session.user?.id as string,
          status: article.status,
          reviewNotes: article.reviewNotes || data.reviewNotes || null,
        },
      })
      .catch((err) => console.error("Error recording editorial review audit:", err));
  }

  revalidatePath("/admin/articles");
  revalidatePath("/admin/articles/" + id);
  if (article.status === "PUBLISHED" || current.status === "PUBLISHED" || article.isFeatured || current.isFeatured) {
    revalidatePath("/");
    revalidatePath("/articles");
  }

  return article;
}

export async function setFeaturedArticle(id: string) {
  await requireAdmin();

  // Atomically unset any previous featured article and set this article as featured
  await prisma.$transaction([
    prisma.article.updateMany({
      where: { isFeatured: true },
      data: { isFeatured: false },
    }),
    prisma.article.update({
      where: { id },
      data: { isFeatured: true },
    }),
  ]);

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  return { success: true };
}

export async function removeFeaturedArticle(id: string) {
  await requireAdmin();

  await prisma.article.update({
    where: { id },
    data: { isFeatured: false },
  });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
  return { success: true };
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  
  await prisma.article.delete({
    where: { id },
  });

  revalidatePath("/admin/articles");
  revalidatePath("/");
  revalidatePath("/articles");
  
  return { success: true };
}


