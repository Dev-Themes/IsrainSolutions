import { notFound } from "next/navigation";
import { getPublishedArticles, getCategories } from "@/actions/public";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Pagination } from "@/components/shared/Pagination";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const limit = 9;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = await getPublishedArticles({ page, limit: limit + 1, categoryId: category.id });
  
  const hasNextPage = articles.length > limit;
  const displayArticles = articles.slice(0, limit);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex flex-col gap-4 mb-12 border-b border-[var(--line)] pb-8">
        <span className="text-[var(--accent)] uppercase tracking-wider text-sm font-bold">Category</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">{category.name}</h1>
        {category.description && (
          <p className="font-serif text-xl text-[var(--mute)] max-w-2xl">{category.description}</p>
        )}
      </div>

      {displayArticles.length === 0 ? (
        <div className="text-center py-20 border border-[var(--line)] bg-[var(--card)]">
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">No articles found</h3>
          <p className="font-serif text-[var(--mute)]">Check back soon for new content in this category!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayArticles.map((article) => (
              <ArticleCard key={article.id} article={article as any} />
            ))}
          </div>
          
          <Pagination
            currentPage={page}
            totalPages={hasNextPage ? page + 1 : page}
            baseUrl={`/category/${slug}`}
          />
        </>
      )}
    </div>
  );
}
