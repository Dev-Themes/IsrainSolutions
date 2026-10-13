import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const prohibitedKeywords = [
  "scam", "hack", "illegal", "nudity", "porn", "explicit",
  "buy followers", "crypto pump", "get rich quick"
];

export const ArticleGenerationSchema = z.object({
  title: z.string().min(10).max(120),
  slug: z.string().min(5).max(100),
  summary: z.string().min(50).max(300),
  content: z.string().min(500),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  sources: z.array(z.string().url())
});

export type GeneratedArticle = z.infer<typeof ArticleGenerationSchema>;

export function enforceSponsoredLinks(html: string): string {
  if (typeof window === "undefined") {
    try {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const links = document.querySelectorAll("a");
      links.forEach((a) => {
        const href = a.getAttribute("href");
        if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
          a.setAttribute("rel", "sponsored nofollow noopener noreferrer");
          a.setAttribute("target", "_blank");
        }
      });
      return document.body.innerHTML;
    } catch {
      return html;
    }
  }
  return html;
}

export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    const window = new JSDOM("").window;
    const purify = DOMPurify(window as any);
    const cleaned = purify.sanitize(html, {
      ALLOWED_TAGS: ["h1", "h2", "h3", "h4", "p", "ul", "ol", "li", "a", "strong", "em", "br", "blockquote", "code", "pre", "img"],
      ALLOWED_ATTR: ["href", "title", "target", "rel", "src", "alt", "class"]
    });
    return enforceSponsoredLinks(cleaned);
  }
  return DOMPurify.sanitize(html);
}

export function validateArticleContent(rawArticle: any) {
  const article = { ...rawArticle };

  // Clean and auto-truncate SEO tags if slightly over limit to prevent failures
  if (article.metaTitle && typeof article.metaTitle === "string" && article.metaTitle.length > 60) {
    article.metaTitle = article.metaTitle.slice(0, 57).trim() + "...";
  }
  if (article.metaDescription && typeof article.metaDescription === "string" && article.metaDescription.length > 160) {
    article.metaDescription = article.metaDescription.slice(0, 157).trim() + "...";
  }

  // 1. Zod schema check
  const parsed = ArticleGenerationSchema.safeParse(article);
  if (!parsed.success) {
    throw new Error(`Validation failed: ${parsed.error.message}`);
  }

  const textToCheck = `${article.title} ${article.summary} ${article.content}`.toLowerCase();

  // 2. Prohibited content check
  for (const word of prohibitedKeywords) {
    if (textToCheck.includes(word)) {
      throw new Error(`Article contains prohibited content: ${word}`);
    }
  }

  // 3. Layout validation (basic checks for structure)
  if (!article.content.includes("<h2>")) {
    throw new Error("Article layout invalid: Missing H2 headings");
  }

  // 4. Sanitize HTML content
  const sanitizedContent = sanitizeHtml(article.content);

  return {
    ...article,
    content: sanitizedContent
  };
}
