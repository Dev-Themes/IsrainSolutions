"use server";

import { prisma } from "@/lib/prisma";
import { requireClientUser, verifyArticleOwnership, isArticleEditableByClient } from "@/lib/client/auth";
import { ClientDraftInput, ClientSubmissionInput } from "@/lib/validation/client-article";
import { sanitizeHtml } from "@/lib/validation/content";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendArticleSubmissionConfirmationEmail, sendAdminSubmissionNotificationEmail } from "@/lib/mail";

/**
 * Normalizes user-entered URLs by trimming and auto-prepending https:// if needed.
 */
function normalizeUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return null;
}

function isDynamicServerError(err: any): boolean {
  return (
    err?.digest === "DYNAMIC_SERVER_USAGE" ||
    (typeof err?.message === "string" && err.message.includes("Dynamic server usage"))
  );
}

export async function getDashboardMetrics() {
  try {
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
  } catch (err: any) {
    if (isDynamicServerError(err)) throw err;
    console.error("Error loading dashboard metrics:", err);
    return {
      totalDrafts: 0,
      pendingReview: 0,
      changesRequested: 0,
      rejected: 0,
      published: 0,
      totalSubmissions: 0,
      totalViews: 0,
      totalClicks: 0,
      ctr: "0.0",
    };
  }
}

export async function getClientArticles(options?: {
  query?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
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
  } catch (err: any) {
    if (isDynamicServerError(err)) throw err;
    console.error("Error fetching client articles:", err);
    return {
      articles: [],
      totalCount: 0,
      totalPages: 1,
      currentPage: 1,
    };
  }
}

export async function getClientArticleById(articleId: string) {
  const session = await requireClientUser({ redirectOnFail: false });
  return verifyArticleOwnership(articleId, session.user.id);
}

export type SaveClientDraftResult = {
  success: boolean;
  articleId?: string;
  slug?: string;
  status?: ArticleStatus;
  error?: string;
};

export async function saveClientDraft(input: ClientDraftInput): Promise<SaveClientDraftResult> {
  try {
    let session;
    try {
      session = await requireClientUser({ redirectOnFail: false });
    } catch {
      return {
        success: false,
        error: "Please sign in to save your draft.",
      };
    }

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please sign in to save your draft.",
      };
    }
    const userId = session.user.id;

    const title = input.title?.trim();
    if (!title) {
      return { success: false, error: "Please enter an article title." };
    }
    if (title.length > 150) {
      return { success: false, error: "Article title cannot exceed 150 characters." };
    }

    const rawContent = input.content || "";
    const cleanContent = sanitizeHtml(rawContent);

    // Slug generation and normalization
    let slug = (input.slug || "").trim();
    if (!slug) {
      slug = title;
    }
    slug = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) {
      slug = `article-${Date.now().toString(36)}`;
    }

    // Summary normalization
    let summary = input.summary?.trim() || null;
    if (summary && summary.length > 300) {
      summary = summary.slice(0, 297).trim() + "...";
    }

    // Category resolution
    let categoryId = input.categoryId || null;
    if (!categoryId) {
      const defaultCategory = await prisma.category.findFirst({
        where: { name: { contains: "Career", mode: "insensitive" } },
      });
      categoryId = defaultCategory?.id || null;
    }

    // URLs normalization
    const coverImage = normalizeUrl(input.coverImage);
    const promotionalUrl = normalizeUrl(input.promotionalUrl);
    const originalSourceUrl = normalizeUrl(input.originalSourceUrl);

    // Tags connection
    const tagConnect =
      input.tags?.map((tagName) => ({
        where: { name: tagName.trim() },
        create: {
          name: tagName.trim(),
          slug: tagName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        },
      })) || [];

    let article;

    if (input.id) {
      // Updating existing article
      const existing = await verifyArticleOwnership(input.id, userId);

      if (!isArticleEditableByClient(existing.status)) {
        return {
          success: false,
          error: `Cannot edit article while status is "${existing.status}". Only Drafts and articles requiring revisions can be edited.`,
        };
      }

      // Check unique slug if slug was changed
      let uniqueSlug = slug;
      if (uniqueSlug !== existing.slug) {
        const existingWithSlug = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
        if (existingWithSlug && existingWithSlug.id !== input.id) {
          uniqueSlug = `${uniqueSlug}-${Date.now().toString(36)}`;
        }
      }

      article = await prisma.article.update({
        where: { id: input.id },
        data: {
          title,
          slug: uniqueSlug,
          summary,
          content: cleanContent,
          coverImage,
          originalSourceUrl,
          promotionalUrl,
          categoryId,
          tags: {
            set: [],
            connectOrCreate: tagConnect,
          },
        },
      });
    } else {
      // Creating new article draft
      let uniqueSlug = slug;
      const existingWithSlug = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
      if (existingWithSlug) {
        uniqueSlug = `${uniqueSlug}-${Date.now().toString(36)}`;
      }

      article = await prisma.article.create({
        data: {
          title,
          slug: uniqueSlug,
          summary,
          content: cleanContent,
          coverImage,
          originalSourceUrl,
          promotionalUrl,
          categoryId,
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
  } catch (error: any) {
    console.error("Error saving client draft:", error);
    return {
      success: false,
      error: error?.message || "Failed to save draft. Please check your inputs.",
    };
  }
}

export type SubmitArticleResult = {
  success: boolean;
  articleId?: string;
  status?: ArticleStatus;
  submittedAt?: Date | null;
  error?: string;
};

export async function submitArticleForReview(
  input: ClientSubmissionInput & { categoryId?: string }
): Promise<SubmitArticleResult> {
  try {
    let session;
    try {
      session = await requireClientUser({ redirectOnFail: false });
    } catch {
      return { success: false, error: "Please log in to submit your article." };
    }

    if (!session?.user?.id) {
      return { success: false, error: "Please log in to submit your article." };
    }
    const userId = session.user.id;

    if (!input.articleId) {
      return { success: false, error: "Article ID is required." };
    }

    const article = await verifyArticleOwnership(input.articleId, userId);

    if (!isArticleEditableByClient(article.status)) {
      return {
        success: false,
        error: `Cannot submit article. Current status "${article.status}" is not eligible for submission.`,
      };
    }

    const normalizedPromo = normalizeUrl(input.promotionalUrl);
    if (!normalizedPromo) {
      return {
        success: false,
        error: "A valid promotional website or organization URL is required (e.g. https://yourbusiness.com).",
      };
    }

    const normalizedSource = normalizeUrl(input.originalSourceUrl);
    const resolvedCategoryId = input.categoryId || article.categoryId;

    // Validate mandatory submission contents
    if (!resolvedCategoryId) {
      return {
        success: false,
        error: "A career category must be selected before submitting for review.",
      };
    }

    if (!article.summary || article.summary.trim().length < 20) {
      return {
        success: false,
        error: "An article excerpt/summary (minimum 20 characters) is required before submitting for review.",
      };
    }

    const contentText = article.content.replace(/<[^>]*>/g, "").trim();
    if (!contentText || contentText.length < 100) {
      return {
        success: false,
        error: "Article content is too short for publication review (minimum 100 words/characters).",
      };
    }

    // Check contributor profile completeness
    const profile = await prisma.contributorProfile.findUnique({
      where: { userId },
    });

    if (!profile || !profile.fullName || !profile.country) {
      return {
        success: false,
        error:
          "Please complete your Contributor Profile (Full Name and Country required) in Settings before submitting for review.",
      };
    }

    // Transition to PENDING_REVIEW
    const updated = await prisma.article.update({
      where: { id: article.id },
      data: {
        status: ArticleStatus.PENDING_REVIEW,
        categoryId: resolvedCategoryId,
        promotionalUrl: normalizedPromo,
        originalSourceUrl: normalizedSource || null,
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
  } catch (error: any) {
    console.error("Error submitting article for review:", error);
    return {
      success: false,
      error: error?.message || "Failed to submit article for review. Please try again.",
    };
  }
}

export async function deleteClientDraft(articleId: string) {
  try {
    const session = await requireClientUser({ redirectOnFail: false });
    const userId = session.user.id;

    const article = await verifyArticleOwnership(articleId, userId);

    if (article.status !== ArticleStatus.DRAFT && article.status !== ArticleStatus.REJECTED) {
      return {
        success: false,
        error: `Cannot delete article with status "${article.status}". Only Drafts and Rejected submissions can be removed.`,
      };
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
  } catch (error: any) {
    console.error("Error deleting draft:", error);
    return {
      success: false,
      error: error?.message || "Failed to delete article draft.",
    };
  }
}

export async function withdrawSubmission(articleId: string) {
  try {
    const session = await requireClientUser({ redirectOnFail: false });
    const userId = session.user.id;

    const article = await verifyArticleOwnership(articleId, userId);

    if (article.status !== ArticleStatus.PENDING_REVIEW) {
      return {
        success: false,
        error: "Only submissions currently under review can be withdrawn.",
      };
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
  } catch (error: any) {
    console.error("Error withdrawing submission:", error);
    return {
      success: false,
      error: error?.message || "Failed to withdraw article submission.",
    };
  }
}
