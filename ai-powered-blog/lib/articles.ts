import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { articleFrontmatterSchema, type Article } from "./schemas";
import { prisma } from "@/lib/prisma";
import { resolveWorkplaceImage } from "./articles/images";

const contentDir = path.join(process.cwd(), "content/articles");

// Calculate read time based on word count (220 words per minute)
function calculateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}

// Read and parse an MDX article file directly from disk without hitting the database
function getArticleFromMdx(slug: string): Article | null {
  try {
    const filePath = path.join(contentDir, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const parsedData = articleFrontmatterSchema.parse({ ...data, slug });

      return {
        ...parsedData,
        content,
        readTime: calculateReadTime(content),
        isDbArticle: false,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error reading MDX article ${slug}:`, error);
    return null;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    // 1. Check Prisma database first (CMS & AI articles)
    const dbArticle = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { name: true } },
        tags: { select: { name: true } },
      },
    });

    if (dbArticle && dbArticle.status === "PUBLISHED") {
      const parsedData = articleFrontmatterSchema.parse({
        title: dbArticle.title,
        slug: dbArticle.slug,
        dek: dbArticle.summary || dbArticle.title,
        description: dbArticle.metaDescription || dbArticle.summary || dbArticle.title,
        category: dbArticle.category?.name || "Career Development",
        tags: dbArticle.tags.map((t) => t.name),
        author: dbArticle.guestAuthorName || dbArticle.author?.name || "CareerVixa Team",
        guestAuthorName: dbArticle.guestAuthorName,
        guestAuthorBio: dbArticle.guestAuthorBio,
        guestAuthorUrl: dbArticle.guestAuthorUrl,
        publishedAt: dbArticle.publishedAt || dbArticle.createdAt,
        updatedAt: dbArticle.updatedAt,
        heroImage: {
          src: dbArticle.coverImage || resolveWorkplaceImage(dbArticle.title, dbArticle.category?.name).src,
          alt: dbArticle.title,
          credit: "CareerVixa",
        },
        faq: [],
        takeaways: [
          "Practical career guidance based on real-world industry standards.",
          "Proven strategies to elevate your professional trajectory.",
          "Actionable steps you can implement today.",
          "Comprehensive insights backed by live research.",
        ],
        featured: dbArticle.isFeatured ?? false,
      });

      return {
        ...parsedData,
        content: dbArticle.content,
        readTime: calculateReadTime(dbArticle.content),
        isDbArticle: true,
        promotionalUrl: dbArticle.promotionalUrl,
        originalSourceUrl: dbArticle.originalSourceUrl,
        viewsCount: dbArticle.viewsCount,
        clicksCount: dbArticle.clicksCount,
        guestAuthorName: dbArticle.guestAuthorName,
        guestAuthorBio: dbArticle.guestAuthorBio,
        guestAuthorUrl: dbArticle.guestAuthorUrl,
      };
    }

    // 2. Fallback to local MDX file
    return getArticleFromMdx(slug);
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];
  const seenSlugs = new Set<string>();

  try {
    // 1. Fetch all published articles from Prisma database (single batch query)
    const dbArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { name: true } },
        tags: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
    });

    for (const dbArticle of dbArticles) {
      seenSlugs.add(dbArticle.slug);
      const parsedData = articleFrontmatterSchema.parse({
        title: dbArticle.title,
        slug: dbArticle.slug,
        dek: dbArticle.summary || dbArticle.title,
        description: dbArticle.metaDescription || dbArticle.summary || dbArticle.title,
        category: dbArticle.category?.name || "Career Development",
        tags: dbArticle.tags.map((t) => t.name),
        author: dbArticle.guestAuthorName || dbArticle.author?.name || "CareerVixa Team",
        guestAuthorName: dbArticle.guestAuthorName,
        guestAuthorBio: dbArticle.guestAuthorBio,
        guestAuthorUrl: dbArticle.guestAuthorUrl,
        publishedAt: dbArticle.publishedAt || dbArticle.createdAt,
        updatedAt: dbArticle.updatedAt,
        heroImage: {
          src: dbArticle.coverImage || resolveWorkplaceImage(dbArticle.title, dbArticle.category?.name).src,
          alt: dbArticle.title,
          credit: "CareerVixa",
        },
        faq: [],
        takeaways: [
          "Practical career guidance based on real-world industry standards.",
          "Proven strategies to elevate your professional trajectory.",
          "Actionable steps you can implement today.",
          "Comprehensive insights backed by live research.",
        ],
        featured: dbArticle.isFeatured ?? false,
      });

      articles.push({
        ...parsedData,
        content: dbArticle.content,
        readTime: calculateReadTime(dbArticle.content),
        isDbArticle: true,
        promotionalUrl: dbArticle.promotionalUrl,
        originalSourceUrl: dbArticle.originalSourceUrl,
        viewsCount: dbArticle.viewsCount,
        clicksCount: dbArticle.clicksCount,
        guestAuthorName: dbArticle.guestAuthorName,
        guestAuthorBio: dbArticle.guestAuthorBio,
        guestAuthorUrl: dbArticle.guestAuthorUrl,
      });
    }
  } catch (error) {
    console.error("Error fetching db articles:", error);
  }

  // 2. Read local starter MDX files directly from disk without hitting database
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      if (seenSlugs.has(slug)) continue;

      const article = getArticleFromMdx(slug);
      if (article) {
        articles.push(article);
      }
    }
  }

  // Sort by publishedAt descending
  return articles.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((a) => a.featured) || articles[0] || null;
}
