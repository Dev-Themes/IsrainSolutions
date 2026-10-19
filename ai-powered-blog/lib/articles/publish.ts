import { prisma } from "@/lib/prisma";
import { GeneratedArticle, validateArticleContent } from "../validation/content";
import { hasPublishedToday } from "../automation/lock";
import { resolveWorkplaceImage } from "./images";

/**
 * Publishes an AI-generated article into the database after rigorous validation.
 * Uses atomic transaction for article creation and audit logging.
 *
 * @param rawArticle The unvalidated article data from the generation engine
 * @param adminId The ID of the verified Admin or Platform Editorial user
 * @param ignoreLock Bypass flag reserved strictly for manual Admin generation
 */
export async function publishAIArticle(rawArticle: any, adminId: string, ignoreLock = false) {
  // 1. Check duplicate locks (bypassed only for explicit manual Admin generation)
  if (!ignoreLock) {
    const alreadyPublished = await hasPublishedToday();
    if (alreadyPublished) {
      throw new Error("An AI article has already been published today. Duplicate prevention triggered.");
    }
  }

  // 2. Validate, sanitize content, and verify layout
  const validatedArticle = validateArticleContent(rawArticle);

  // 3. Resolve curated, topic-matched workplace stock image with alt metadata
  const resolvedImage = resolveWorkplaceImage(validatedArticle.title);

  // 4. Resolve default or topic matching category
  let matchedCategory = await prisma.category.findFirst({
    where: { name: { contains: "Career", mode: "insensitive" } },
  });
  if (!matchedCategory) {
    matchedCategory = await prisma.category.findFirst();
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
