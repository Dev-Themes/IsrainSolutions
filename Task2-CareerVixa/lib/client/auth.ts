import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArticleStatus } from "@prisma/client";

/**
 * Ensures the caller is authenticated as a CLIENT (or ADMIN).
 * In Server Components, redirects to login if not authenticated.
 * In Server Actions, throws an Unauthorized error if not authenticated.
 */
export async function requireClientUser(options: { redirectOnFail?: boolean } = { redirectOnFail: true }) {
  const session = await auth();

  if (!session || !session.user?.id) {
    if (options.redirectOnFail) {
      redirect("/login?callbackUrl=/dashboard");
    }
    throw new Error("Unauthorized: Contributor login required");
  }

  // Allow CLIENT and ADMIN to access client dashboard features
  if (session.user.role !== "CLIENT" && session.user.role !== "ADMIN") {
    if (options.redirectOnFail) {
      redirect("/login");
    }
    throw new Error("Forbidden: Access restricted to contributors");
  }

  return session;
}

/**
 * Validates that an article belongs to the authenticated user.
 * Throws an error if the article doesn't exist or is owned by another user.
 */
export async function verifyArticleOwnership(articleId: string, userId: string) {
  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
      authorId: userId,
    },
    include: {
      category: true,
      tags: true,
    },
  });

  if (!article) {
    throw new Error("Article not found or you do not have permission to access it");
  }

  return article;
}

/**
 * Determines whether a client contributor is permitted to edit or delete the article
 * based on its current editorial status.
 */
export function isArticleEditableByClient(status: ArticleStatus): boolean {
  return status === ArticleStatus.DRAFT || status === ArticleStatus.CHANGES_REQUESTED;
}
