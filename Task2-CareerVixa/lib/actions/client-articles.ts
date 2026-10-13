"use server";

import { prisma } from "@/lib/prisma";
import { requireClientUser, verifyArticleOwnership, isArticleEditableByClient } from "@/lib/client/auth";
import { ClientDraftSchema, ClientSubmissionSchema, ClientDraftInput, ClientSubmissionInput } from "@/lib/validation/client-article";
import { sanitizeHtml } from "@/lib/validation/content";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendArticleSubmissionConfirmationEmail, sendAdminSubmissionNotificationEmail } from "@/lib/mail";

export async function getDashboardMetrics() {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const [drafts, pendingReview, changesRequested, rejected, published, total, traffic] = await Promise.all([
    prisma.article.count({ where: { authorId: userId, status: ArticleStatus.DRAFT } }),
    prisma.article.count({ where: { authorId: userId, status: ArticleStatus.PENDING_REVIEW } }),
    prisma.article.count({ where: { authorId: userId, status: ArticleStatus.CHANGES_REQUESTED } }),
    prisma.article.count({ where: { authorId: userId, status: ArticleStatus.REJECTED } }),
    prisma.article.count({ where: { authorId: userId, status: ArticleStatus.PUBLISHED } }),
    prisma.article.count({ where: { authorId: userId } }),
    prisma.article.aggregate({
      where: { authorId: userId, status: ArticleStatus.PUBLISHED },
      _sum: { viewsCount: true, clicksCount: true },
    }),
  ]);

  const totalViews = traffic._sum.viewsCount || 0;
  const totalClicks = traffic._sum.clicksCount || 0;
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0.0";

  return {
    totalDrafts: drafts,
    pendingReview,
    changesRequested,
    rejected,
    published,
    totalSubmissions: total,
    totalViews,
    totalClicks,
    ctr,
  };
}

export async function getClientArticles(options?: {
  query?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const page = options?.page || 1;
  const pageSize = options?.pageSize || 10;
  const skip = (page - 1) * pageSize;

  const whereClause: any = {
    authorId: userId,
  };

  if (options?.status && options.status !== "ALL") {
    whereClause.status = options.status as ArticleStatus;
  }

  if (options?.categoryId && options.categoryId !== "ALL") {
    whereClause.categoryId = options.categoryId;
  }

  if (options?.query && options.query.trim().length > 0) {
    whereClause.OR = [
      { title: { contains: options.query, mode: "insensitive" } },
      { summary: { contains: options.query, mode: "insensitive" } },
    ];
  }

  const [articles, totalCount] = await Promise.all([
    prisma.article.findMany({
      where: whereClause,
      include: {
        category: true,
        tags: true,
      },
      orderBy: { updatedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.article.count({ where: whereClause }),
  ]);

  return {
    articles,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getClientArticleById(articleId: string) {
  const session = await requireClientUser({ redirectOnFail: false });
  return verifyArticleOwnership(articleId, session.user.id);
}

export async function saveClientDraft(input: ClientDraftInput) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const validated = ClientDraftSchema.parse(input);
  const cleanContent = sanitizeHtml(validated.content);

  // Generate or ensure unique slug
  let uniqueSlug = validated.slug;
  if (!validated.id) {
    const existing = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
    if (existing) {
      uniqueSlug = `${uniqueSlug}-${Date.now().toString(36)}`;
    }
  }

  let article;

  if (validated.id) {
    // Updating existing article
    const existing = await verifyArticleOwnership(validated.id, userId);

    if (!isArticleEditableByClient(existing.status)) {
      throw new Error(`Cannot edit article while status is "${existing.status}". Only Drafts and articles requiring revisions can be edited.`);
    }

    // Connect or disconnect tags if provided
    const tagConnect = validated.tags?.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName, slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    })) || [];

    article = await prisma.article.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        slug: uniqueSlug,
        summary: validated.summary,
        content: cleanContent,
        coverImage: validated.coverImage || null,
        originalSourceUrl: validated.originalSourceUrl || null,
        promotionalUrl: validated.promotionalUrl || null,
        categoryId: validated.categoryId || null,
        tags: {
          set: [],
          connectOrCreate: tagConnect,
        },
      },
    });
  } else {
    // Creating new article draft
    const tagConnect = validated.tags?.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName, slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-") },
    })) || [];

    article = await prisma.article.create({
      data: {
        title: validated.title,
        slug: uniqueSlug,
        summary: validated.summary,
        content: cleanContent,
        coverImage: validated.coverImage || null,
        originalSourceUrl: validated.originalSourceUrl || null,
        promotionalUrl: validated.promotionalUrl || null,
        categoryId: validated.categoryId || null,
        status: ArticleStatus.DRAFT,
        contentOrigin: "MANUAL",
        authorId: userId,
        tags: {
          connectOrCreate: tagConnect,
        },
      },
    });
  }

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");

  return {
    success: true,
    articleId: article.id,
    slug: article.slug,
    status: article.status,
  };
}

export async function submitArticleForReview(input: ClientSubmissionInput & { categoryId?: string }) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const validated = ClientSubmissionSchema.parse(input);
  const article = await verifyArticleOwnership(validated.articleId, userId);

  if (!isArticleEditableByClient(article.status)) {
    throw new Error(`Cannot submit article. Current status "${article.status}" is not eligible for submission.`);
  }

  const resolvedCategoryId = input.categoryId || article.categoryId;

  // Validate mandatory submission contents
  if (!resolvedCategoryId) {
    throw new Error("A career category must be selected before submitting for review.");
  }

  if (!article.summary || article.summary.trim().length < 20) {
    throw new Error("An article excerpt/summary is required before submitting for review.");
  }

  if (!article.content || article.content.trim().length < 100) {
    throw new Error("Article content is too short for submission.");
  }

  // Check contributor profile completeness
  const profile = await prisma.contributorProfile.findUnique({
    where: { userId },
  });

  if (!profile || !profile.fullName || !profile.country) {
    throw new Error("Please complete your Contributor Profile (Full Name and Country required) before submitting.");
  }

  // Transition to PENDING_REVIEW
  const updated = await prisma.article.update({
    where: { id: article.id },
    data: {
      status: ArticleStatus.PENDING_REVIEW,
      categoryId: resolvedCategoryId,
      promotionalUrl: validated.promotionalUrl,
      originalSourceUrl: validated.originalSourceUrl || null,
      rightsDeclared: true,
      termsAcceptedAt: new Date(),
      submittedAt: new Date(),
    },
    include: {
      category: {
        select: { name: true },
      },
    },
  });

  // Send confirmation email to author
  const authorName = profile?.fullName || session.user.name || "Contributor";
  const authorEmail = session.user.email;

  if (authorEmail) {
    sendArticleSubmissionConfirmationEmail({
      email: authorEmail,
      name: authorName,
      articleId: updated.id,
      articleTitle: updated.title,
      categoryName: updated.category?.name,
    }).catch((err) => console.error("Error sending article submission confirmation email:", err));
  }

  // Send notification email to Admin(s)
  prisma.user
    .findMany({
      where: { role: "ADMIN" },
      select: { email: true },
    })
    .then((admins) => {
      for (const admin of admins) {
        if (admin.email) {
          sendAdminSubmissionNotificationEmail({
            adminEmail: admin.email,
            authorName,
            authorEmail: authorEmail || "contributor@careervixa.com",
            articleId: updated.id,
            articleTitle: updated.title,
            categoryName: updated.category?.name,
            promotionalUrl: updated.promotionalUrl || undefined,
          }).catch((err) => console.error("Error sending admin notification email:", err));
        }
      }
    })
    .catch((err) => console.error("Error finding admins for notification:", err));

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/articles/${article.id}/edit`);

  return {
    success: true,
    articleId: updated.id,
    status: updated.status,
    submittedAt: updated.submittedAt,
  };
}

export async function deleteClientDraft(articleId: string) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const article = await verifyArticleOwnership(articleId, userId);

  if (article.status !== ArticleStatus.DRAFT && article.status !== ArticleStatus.REJECTED) {
    throw new Error(`Cannot delete article with status "${article.status}". Only Drafts and Rejected submissions can be removed.`);
  }

  await prisma.article.delete({
    where: { id: articleId },
  });

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");

  return {
    success: true,
    deletedId: articleId,
  };
}

export async function withdrawSubmission(articleId: string) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  const article = await verifyArticleOwnership(articleId, userId);

  if (article.status !== ArticleStatus.PENDING_REVIEW) {
    throw new Error("Only submissions currently under review can be withdrawn.");
  }

  const updated = await prisma.article.update({
    where: { id: articleId },
    data: {
      status: ArticleStatus.DRAFT,
    },
  });

  revalidatePath("/dashboard/articles");
  revalidatePath("/dashboard");

  return {
    success: true,
    articleId: updated.id,
    status: updated.status,
  };
}
