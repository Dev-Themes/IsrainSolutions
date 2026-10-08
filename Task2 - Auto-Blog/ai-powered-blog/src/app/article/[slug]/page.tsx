import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/actions/public";
import sanitizeHtml from "sanitize-html";
import Link from "next/link";
import { RelatedArticles } from "@/components/shared/RelatedArticles";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Sanitize HTML securely on the server
  const cleanHtml = sanitizeHtml(article.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "h4", "h5", "h6"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
    },
  });

  return (
    <article className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-12 md:py-16">
      <header className="mb-12 border-b border-[var(--line)] pb-12 max-w-4xl mx-auto text-center">
        {article.category && (
          <Link 
            href={`/category/${article.category.slug}`}
            className="inline-block px-3 py-1 bg-[var(--line)] text-[var(--ink)] text-sm font-bold hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors mb-6 uppercase tracking-wider"
          >
            {article.category.name}
          </Link>
        )}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-[var(--ink)]">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-[var(--mute)] font-medium">
          <span className="text-[var(--ink)]">By {article.authorName}</span>
          <span>•</span>
          <time dateTime={article.publishedAt?.toISOString()}>
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown date'}
          </time>
        </div>
      </header>

      <div className="max-w-3xl mx-auto font-serif text-lg md:text-xl text-[var(--ink)] leading-relaxed">
        <style>{`
          .article-body h2 { font-family: var(--font-sans); font-size: 2rem; font-weight: bold; margin-top: 2.5rem; margin-bottom: 1rem; color: var(--ink); }
          .article-body h3 { font-family: var(--font-sans); font-size: 1.5rem; font-weight: bold; margin-top: 2rem; margin-bottom: 1rem; color: var(--ink); }
          .article-body p { margin-bottom: 1.5rem; color: var(--ink); }
          .article-body a { color: var(--accent); text-decoration: underline; }
          .article-body ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; }
          .article-body ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1.5rem; }
          .article-body li { margin-bottom: 0.5rem; }
          .article-body blockquote { border-left: 4px solid var(--mark); padding-left: 1rem; margin-left: 0; font-style: italic; color: var(--mute); }
          .article-body img { max-width: 100%; height: auto; border: 1px solid var(--line); margin: 2rem 0; }
        `}</style>
        <div 
          className="article-body mb-16"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        <div className="flex flex-wrap gap-3 mb-16 pt-8 border-t border-[var(--line)]">
          <span className="text-sm font-bold text-[var(--mute)] self-center mr-2 uppercase tracking-wider">Tags:</span>
          {article.tags.map((t) => (
            <Link 
              key={t.tag.slug} 
              href={`/tag/${t.tag.slug}`}
              className="px-3 py-1 border border-[var(--line)] text-[var(--mute)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              #{t.tag.name}
            </Link>
          ))}
        </div>

        <RelatedArticles 
          articleId={article.id} 
          tags={article.tags.map(t => t.tag.id)} 
        />
      </div>
    </article>
  );
}
