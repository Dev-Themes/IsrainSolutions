import { getRelatedArticles } from "@/actions/public";
import { ArticleCard } from "@/components/shared/ArticleCard";

export async function RelatedArticles({
  articleId,
  tags,
}: {
  articleId: string;
  tags: string[];
}) {
  const related = await getRelatedArticles(articleId, 3);
  
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-[var(--line)]">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-3xl font-bold tracking-tight text-[var(--ink)]">Related Articles</h3>
        <div className="h-px bg-[var(--line)] flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.filter(r => r.id !== articleId).slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article as any} />
        ))}
      </div>
    </section>
  );
}
