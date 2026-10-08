import { getPublishedArticles } from "@/actions/public";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const query = sp.q || "";
  const page = parseInt(sp.page || "1", 10);
  const limit = 9;

  const articles = await getPublishedArticles({
    page,
    limit: limit + 1,
    searchQuery: query,
  });

  const hasNextPage = articles.length > limit;
  const displayArticles = articles.slice(0, limit);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-12 md:py-16">
      <div className="flex flex-col gap-6 mb-12 border-b border-[var(--line)] pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)]">Search Results</h1>
        <div className="max-w-md block sm:hidden">
          <SearchInput />
        </div>
        <p className="font-serif text-xl text-[var(--mute)] max-w-2xl">
          {query ? `Showing results for "${query}"` : "Enter a search term to find career advice, guides, and insights."}
        </p>
      </div>

      {!query ? (
        <div className="text-center py-20 border border-[var(--line)] bg-[var(--card)]">
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">Ready to search</h3>
          <p className="font-serif text-[var(--mute)]">Use the search bar above to find articles.</p>
        </div>
      ) : displayArticles.length === 0 ? (
        <div className="text-center py-20 border border-[var(--line)] bg-[var(--card)]">
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">No results found</h3>
          <p className="font-serif text-[var(--mute)]">We couldn't find any articles matching your search.</p>
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
            baseUrl={`/search?q=${encodeURIComponent(query)}`}
          />
        </>
      )}
    </div>
  );
}
