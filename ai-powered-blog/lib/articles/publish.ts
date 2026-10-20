import { prisma } from "@/lib/prisma";
import { GeneratedArticle, validateArticleContent } from "../validation/content";
import { hasPublishedToday } from "../automation/lock";
import { resolveWorkplaceImage, resolveUniqueWorkplaceImage, WorkplaceImage } from "./images";
import { checkSemanticSimilarity } from "../ai/topic-uniqueness";

/**
 * Publishes an AI-generated article into the database after rigorous validation,
 * pre-publish topic uniqueness verification, and cover image uniqueness enforcement.
 * Uses atomic transaction for article creation and audit logging.
 *
 * @param rawArticle The unvalidated article data from the generation engine
 * @param adminId The ID of the verified Admin or Platform Editorial user
 * @param ignoreLock Bypass flag reserved strictly for manual Admin generation
 * @param options Explicit configuration for autonomous vs manual publishing
 */
export async function publishAIArticle(
  rawArticle: any,
  adminId: string,
  ignoreLock = false,
  options?: { isAutonomous?: boolean }
) {
  const isAutonomous = options?.isAutonomous ?? !ignoreLock;

  // 1. Check duplicate locks (bypassed only for explicit manual Admin generation)
  if (!ignoreLock) {
    const alreadyPublished = await hasPublishedToday();
    if (alreadyPublished) {
      throw new Error("An AI article has already been published today. Duplicate prevention triggered.");
    }
  }

  // 2. Validate, sanitize content, and verify layout
  const validatedArticle = validateArticleContent(rawArticle);

  // 3. Resolve default or topic matching category
  let matchedCategory = await prisma.category.findFirst({
    where: { name: { contains: "Career", mode: "insensitive" } },
  });
  if (!matchedCategory) {
    matchedCategory = await prisma.category.findFirst();
  }

  // 4. Autonomous Safeguards: Topic & Cover Image Uniqueness
  let resolvedImage: WorkplaceImage;

  if (isAutonomous) {
    // 4A. Mandatory Pre-Publish Topic Uniqueness Safeguard (Section 5.5)
    const existingPublishedArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      select: { id: true, title: true, summary: true, slug: true },
      orderBy: { publishedAt: "desc" },
    });

    const topicCheck = await checkSemanticSimilarity(validatedArticle.title, existingPublishedArticles);
    if (topicCheck.isDuplicate) {
      throw new Error(
        `Pre-publish topic uniqueness safeguard rejected article: "${validatedArticle.title}" substantially duplicates existing published article "${topicCheck.overlappingTitle}". Reason: ${topicCheck.reason}`
      );
    }

    // 4B. Mandatory Image Uniqueness Safeguard (Section 6)
    const publishedImages = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        coverImage: { not: null },
      },
      select: { coverImage: true },
    });

    const usedImageUrls = publishedImages.map((a) => a.coverImage).filter(Boolean);
    resolvedImage = resolveUniqueWorkplaceImage({
      title: validatedArticle.title,
      category: matchedCategory?.name,
      usedImageUrls,
    });
  } else {
    // Manual Admin Generation: Preserves existing behavior without blocking manual CMS workflows
    resolvedImage = resolveWorkplaceImage(validatedArticle.title, matchedCategory?.name);
  }

  // 5. Ensure unique slug
  let slug = validatedArticle.slug;
  const existingArticle = await prisma.article.findUnique({
    where: { slug },
  });
  if (existingArticle) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  // 6. Create the article and log execution atomically in a transaction
  const article = await prisma.$transaction(async (tx) => {
    const created = await tx.article.create({
      data: {
        title: validatedArticle.title,
        slug,
        summary: validatedArticle.summary,
        content: validatedArticle.content,
        coverImage: resolvedImage.src,
        categoryId: matchedCategory?.id || null,
        metaTitle: validatedArticle.metaTitle,
        metaDescription: validatedArticle.metaDescription,
        status: "PUBLISHED",
        publishedAt: new Date(),
        isAIGenerated: true,
        aiSourceReferences: JSON.stringify(validatedArticle.sources),
        authorId: adminId,
      },
    });

    await tx.aIExecutionLog.create({
      data: {
        status: "SUCCESS",
        articleId: created.id,
        validationData: JSON.stringify({
          passed: true,
          sourcesCount: validatedArticle.sources.length,
          slug,
          coverImage: resolvedImage.src,
        }),
      },
    });

    return created;
  });

  return article;
}

/**
 * Ensures Client submissions are never automatically published.
 * Throws a Security Violation if an article is authored by a CLIENT user.
 */
export async function verifyPlatformOwnership(articleId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { author: true },
  });

  if (!article) throw new Error("Article not found");

  if (article.author.role === "CLIENT") {
    throw new Error("SECURITY VIOLATION: Client articles cannot be automatically published.");
  }

  return true;
}
