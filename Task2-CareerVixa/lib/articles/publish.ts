import { prisma } from "@/lib/prisma";
import { GeneratedArticle, validateArticleContent } from "../validation/content";
import { hasPublishedToday } from "../automation/lock";
import { resolveWorkplaceImage } from "./images";

/**
 * Publishes an AI-generated article into the database after rigorous validation.
 * @param rawArticle The unvalidated article data from the Python agent
 * @param AdminId The ID of the System Admin or AI virtual user creating the post
 */
export async function publishAIArticle(rawArticle: any, adminId: string, ignoreLock = false) {
  // 1. Check duplicate locks (bypassed for manual admin generation per FR-16)
  if (!ignoreLock) {
    const alreadyPublished = await hasPublishedToday();
    if (alreadyPublished) {
      throw new Error("An AI article has already been published today. Duplicate prevention triggered.");
    }
  }

  // 2. Validate and sanitize content
  const validatedArticle = validateArticleContent(rawArticle);

  // 3. Resolve curated, strictly compliant professional workplace stock image
  const resolvedImage = resolveWorkplaceImage(validatedArticle.title);

  // 4. Resolve default or topic matching category
  let matchedCategory = await prisma.category.findFirst({
    where: { name: { contains: "Career", mode: "insensitive" } },
  });
  if (!matchedCategory) {
    matchedCategory = await prisma.category.findFirst();
  }

  // 5. Create the article in the database directly as PUBLISHED with rich media
  const article = await prisma.article.create({
    data: {
      title: validatedArticle.title,
      slug: validatedArticle.slug,
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
    }
  });

  // 4. Log the success
  await prisma.aIExecutionLog.create({
    data: {
      status: "SUCCESS",
      articleId: article.id,
      validationData: JSON.stringify({ passed: true })
    }
  });

  return article;
}

/**
 * Ensures Client submissions are never automatically published.
 * This helper throws an error if an article is owned by a Client.
 */
export async function verifyPlatformOwnership(articleId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { author: true }
  });

  if (!article) throw new Error("Article not found");
  
  if (article.author.role === "CLIENT") {
    throw new Error("SECURITY VIOLATION: Client articles cannot be automatically published.");
  }

  return true;
}
