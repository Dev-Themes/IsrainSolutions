import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

/**
 * Zod Schema for Autonomous and AI-Generated Articles.
 */
export const ArticleGenerationSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(120, "Title must be under 120 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters").max(100, "Slug must be under 100 characters"),
  summary: z.string().min(50, "Summary must be at least 50 characters").max(350, "Summary must be under 350 characters"),
  content: z.string().min(500, "Content body must be at least 500 characters"),
  metaTitle: z.string().max(65, "Meta title must be under 65 characters"),
  metaDescription: z.string().max(165, "Meta description must be under 165 characters"),
  sources: z.array(z.string().url("Each source must be a valid URL")),
});

export type GeneratedArticle = z.infer<typeof ArticleGenerationSchema>;

/**
 * Truncates text cleanly at a word boundary rather than cutting words in half.
 */
export function truncateAtWordBoundary(text: string, maxLen: number): string {
  if (!text || text.length <= maxLen) return text;
  const sub = text.slice(0, maxLen - 3);
  const lastSpace = sub.lastIndexOf(" ");
  if (lastSpace > maxLen * 0.6) {
    return sub.slice(0, lastSpace).trim() + "...";
  }
  return sub.trim() + "...";
}

/**
 * Context-aware content safety classifier.
 * Distinguishes legitimate educational/protective career topics (e.g. "How to Avoid Job Scams")
 * from genuinely harmful, fraudulent, or explicit content.
 */
export function evaluateContentSafety(title: string, summary: string, content: string): { isSafe: boolean; reason?: string } {
  const fullText = `${title}\n${summary}\n${content}`.toLowerCase();

  // 1. Unconditionally prohibited malicious categories
  const strictlyForbidden = [
    { pattern: /\b(porn|pornography|xxx|nudity|explicit sexual|erotic)\b/i, reason: "Explicit or adult content" },
    { pattern: /\b(crypto pump|pump and dump|get rich quick scheme|buy fake followers|buy bot traffic)\b/i, reason: "Deceptive financial or engagement scheme" },
    { pattern: /\b(ddos script|ransomware payload|steal passwords|phishing kit download|malware exploit)\b/i, reason: "Malicious cyberattack or malware instruction" },
    { pattern: /\b(kill yourself|hate speech|terrorist recruitment)\b/i, reason: "Harassment or violent extremism" },
  ];

  for (const item of strictlyForbidden) {
    if (item.pattern.test(fullText)) {
      return { isSafe: false, reason: `Violation detected: ${item.reason}` };
    }
  }

  // 2. Ambiguous terms that are legitimate in educational/safety contexts
  // e.g. "scam", "fraud", "illegal", "hack"
  const ambiguousPatterns = [
    { term: "scam", malicious: /\b(how to scam|run a scam|pull off a scam|create fake checks|scam people)\b/i },
    { term: "fraud", malicious: /\b(commit fraud|forge documents|fake credentials|diploma mill)\b/i },
    { term: "illegal", malicious: /\b(how to bypass laws|hire illegally|bribe officials|launder money)\b/i },
    { term: "hack", malicious: /\b(hack passwords|crack software|infiltrate servers|bypass 2fa)\b/i },
  ];

  for (const item of ambiguousPatterns) {
    if (item.malicious.test(fullText)) {
      return { isSafe: false, reason: `Content promotes harmful activity regarding: ${item.term}` };
    }
  }

  // 3. Dangerous protocol inspection
  if (/href\s*=\s*["']\s*(javascript:|data:|vbscript:)/i.test(content)) {
    return { isSafe: false, reason: "Insecure URI scheme detected in article links" };
  }

  return { isSafe: true };
}

/**
 * Intelligent Link Classification & Security Governance:
 * - Editorial / research citations: `rel="noopener noreferrer" target="_blank"` (NOT marked sponsored!).
 * - Commercial / promotional / affiliate links: `rel="sponsored nofollow noopener noreferrer" target="_blank"`.
 * - Internal links (/articles/..., /category/..., relative links): Clean without nofollow/sponsored.
 * - Strips dangerous URL schemes (javascript:, data:).
 */
export function processArticleLinks(html: string): string {
  if (typeof window === "undefined") {
    try {
      const dom = new JSDOM(html);
      const document = dom.window.document;
      const links = document.querySelectorAll("a");

      links.forEach((a) => {
        const href = a.getAttribute("href")?.trim() || "";

        // Strip dangerous schemes
        if (/^(javascript:|data:|vbscript:)/i.test(href)) {
          a.setAttribute("href", "#");
          return;
        }

        const isInternal = href.startsWith("/") || href.startsWith("#") || href.includes("careervixa.com") || href.includes("localhost");

        if (isInternal) {
          // Internal links should not have nofollow or sponsored attributes
          a.removeAttribute("rel");
          a.removeAttribute("target");
        } else if (href.startsWith("http://") || href.startsWith("https://")) {
          // Check if marked as sponsored or if it's an external commercial target
          const existingRel = a.getAttribute("rel") || "";
          const isSponsored = existingRel.includes("sponsored") || a.getAttribute("data-sponsored") === "true";

          if (isSponsored) {
            a.setAttribute("rel", "sponsored nofollow noopener noreferrer");
          } else {
            // Authentic editorial research citation: Clean external security attributes
            a.setAttribute("rel", "noopener noreferrer");
          }
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

/**
 * Backward-compatible alias for existing callers.
 */
export function enforceSponsoredLinks(html: string): string {
  return processArticleLinks(html);
}

/**
 * Sanitizes HTML content using DOMPurify, demotes duplicate <h1> headings
 * (since the article template renders the main title in <h1>), and validates links.
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") {
    const window = new JSDOM("").window;
    const purify = DOMPurify(window as any);
    const cleaned = purify.sanitize(html, {
      ALLOWED_TAGS: [
        "h2", "h3", "h4", "p", "ul", "ol", "li", "a",
        "strong", "em", "br", "blockquote", "code", "pre",
        "table", "thead", "tbody", "tr", "th", "td", "img", "div", "span"
      ],
      ALLOWED_ATTR: ["href", "title", "target", "rel", "src", "alt", "class", "id", "scope"],
    });

    // Replace any remaining <h1> with <h2> to prevent duplicate H1 tags on public article pages
    const demotedH1 = cleaned.replace(/<h1([^>]*)>(.*?)<\/h1>/gi, "<h2$1>$2</h2>");

    return processArticleLinks(demotedH1);
  }
  return DOMPurify.sanitize(html);
}

/**
 * Validates, normalizes, and sanitizes generated article data.
 * Throws a descriptive Error if any validation or safety gate fails.
 */
export function validateArticleContent(rawArticle: any) {
  const article = { ...rawArticle };

  // 1. Cleanly truncate SEO tags at word boundaries if slightly over length
  if (article.metaTitle && typeof article.metaTitle === "string" && article.metaTitle.length > 60) {
    article.metaTitle = truncateAtWordBoundary(article.metaTitle, 60);
  }
  if (article.metaDescription && typeof article.metaDescription === "string" && article.metaDescription.length > 160) {
    article.metaDescription = truncateAtWordBoundary(article.metaDescription, 160);
  }
  if (article.summary && typeof article.summary === "string" && article.summary.length > 300) {
    article.summary = truncateAtWordBoundary(article.summary, 300);
  }

  // 2. Zod Schema Check
  const parsed = ArticleGenerationSchema.safeParse(article);
  if (!parsed.success) {
    const issueMessages = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    throw new Error(`Article validation schema failed: ${issueMessages}`);
  }

  // 3. Context-Aware Content Safety Check
  const safetyResult = evaluateContentSafety(article.title, article.summary, article.content);
  if (!safetyResult.isSafe) {
    throw new Error(`Content safety check rejected article: ${safetyResult.reason}`);
  }

  // 4. Structure & Layout Validation
  if (!article.content.includes("<h2>") && !article.content.includes("<h2 ")) {
    throw new Error("Article layout invalid: Missing H2 section headings");
  }

  // 5. Sanitize HTML content & classify links
  const sanitizedContent = sanitizeHtml(article.content);

  return {
    ...article,
    content: sanitizedContent,
  };
}
