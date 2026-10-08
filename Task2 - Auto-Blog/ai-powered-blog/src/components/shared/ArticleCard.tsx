import Link from "next/link";

type ArticleWithRelations = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  publishedAt: Date | null;
  category: { name: string; slug: string } | null;
  tags: { tag: { name: string; slug: string } }[];
};

export function ArticleCard({ article }: { article: ArticleWithRelations }) {
  // Use a placeholder image based on article id to keep the grid lively
  // A simple hash function to pick one of the 19 images
  const hash = article.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const images = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    "https://images.unsplash.com/photo-1487528278747-ba99ed528ebc",
  ];
  const imgUrl = `${images[hash % images.length]}?auto=format&fit=crop&q=80&w=800`;

  const dateStr = article.publishedAt 
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    : 'Unknown date';

  return (
    <article className="group flex flex-col h-full bg-[var(--card)] border border-[var(--line)] hover:border-[var(--accent)] transition-colors overflow-hidden">
      <div className="overflow-hidden bg-[var(--line)] aspect-[3/2] shrink-0 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={imgUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--mute)] font-medium mb-3">
          {article.category && (
            <Link href={`/category/${article.category.slug}`} className="text-[var(--accent)] uppercase tracking-wider text-xs hover:underline">
              {article.category.name}
            </Link>
          )}
          <span>•</span>
          <span>{dateStr}</span>
        </div>
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-xl font-bold leading-snug mb-3 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="font-serif text-[var(--mute)] line-clamp-3 mb-6 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--line)]">
          <span className="text-sm font-medium text-[var(--ink)]">By {article.authorName}</span>
          <div className="flex gap-2 flex-wrap">
            {(article.tags || []).slice(0, 2).map((t) => (
              <Link key={t.tag.slug} href={`/tag/${t.tag.slug}`} className="text-xs text-[var(--mute)] hover:text-[var(--accent)]">
                #{t.tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
