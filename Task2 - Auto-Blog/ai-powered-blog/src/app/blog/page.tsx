import { getPublishedArticles } from "@/actions/public";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Pagination } from "@/components/shared/Pagination";
import { ContributorCTA } from "@/components/shared/ContributorCTA";

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page || "1", 10);
  const limit = 9;

  const articles = await getPublishedArticles({ page, limit: limit + 1 });
  
  const hasNextPage = articles.length > limit;
  const displayArticles = articles.slice(0, limit);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--ink)]">Latest Articles</h1>
          <p className="font-serif text-xl text-[var(--mute)] max-w-2xl">Discover the latest strategies and insights on career growth, job searching, and professional development.</p>
        </div>
      </div>

      {displayArticles.length === 0 ? (
        <div className="text-center py-20 border border-[var(--line)] bg-[var(--card)]">
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">No articles found</h3>
          <p className="font-serif text-[var(--mute)]">Check back soon for new content!</p>
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
            baseUrl="/blog"
          />
        </>
      )}

      <ContributorCTA />
    </div>
  );
}
