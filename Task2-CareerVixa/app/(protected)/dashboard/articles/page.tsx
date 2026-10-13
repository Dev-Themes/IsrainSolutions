import { getClientArticles } from "@/lib/actions/client-articles";
import { getCareerCategories } from "@/lib/categories";
import ArticleTable from "@/components/client/ArticleTable";
import Link from "next/link";
import { PlusCircle, Search, Filter } from "lucide-react";

export const metadata = {
  title: "My Articles | CareerVixa",
  description: "Manage your submitted career articles, private drafts, and review statuses.",
};

interface ArticlesPageProps {
  searchParams: Promise<{
    query?: string;
    status?: string;
    categoryId?: string;
    page?: string;
  }>;
}

export default async function ClientArticlesPage({ searchParams }: ArticlesPageProps) {
  const { query, status = "ALL", categoryId = "ALL", page = "1" } = await searchParams;

  const currentPage = parseInt(page, 10) || 1;

  const [{ articles, totalCount, totalPages }, categories] = await Promise.all([
    getClientArticles({
      query,
      status,
      categoryId,
      page: currentPage,
      pageSize: 10,
    }),
    getCareerCategories(),
  ]);

  const statusTabs = [
    { label: "All Articles", value: "ALL" },
    { label: "Drafts", value: "DRAFT" },
    { label: "Pending Review", value: "PENDING_REVIEW" },
    { label: "Changes Requested", value: "CHANGES_REQUESTED" },
    { label: "Published", value: "PUBLISHED" },
    { label: "Declined", value: "REJECTED" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">My Articles</h1>
          <p className="text-sm text-black dark:text-slate-300 mt-1 font-medium">
            Track your guest article submissions, review feedback, and private drafts.
          </p>
        </div>

        <Link
          href="/dashboard/articles/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Write Article</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto border-b border-border gap-2 pb-1 scrollbar-none">
        {statusTabs.map((tab) => {
          const isActive = status === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/dashboard/articles?status=${tab.value}${query ? `&query=${query}` : ""}${
                categoryId !== "ALL" ? `&categoryId=${categoryId}` : ""
              }`}
              className={`whitespace-nowrap px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#087B61] text-white dark:bg-[#65DEAE] dark:text-[#08261E] shadow-sm"
                  : "text-black dark:text-[#B5D8CC] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form method="GET" action="/dashboard/articles" className="flex-1 flex gap-2">
          <input type="hidden" name="status" value={status} />
          {categoryId !== "ALL" && <input type="hidden" name="categoryId" value={categoryId} />}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <input
              type="text"
              name="query"
              defaultValue={query || ""}
              placeholder="Search by article title or summary..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        <form method="GET" action="/dashboard/articles" className="flex gap-2">
          <input type="hidden" name="status" value={status} />
          {query && <input type="hidden" name="query" value={query} />}
          <select
            name="categoryId"
            defaultValue={categoryId}
            className="px-3 py-2 text-xs rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-950 dark:text-[#F0FCF7] focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Filter className="h-3 w-3" />
            <span>Filter</span>
          </button>
        </form>
      </div>

      {/* Articles Table */}
      <ArticleTable articles={articles} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            Showing page {currentPage} of {totalPages} ({totalCount} total submissions)
          </span>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={`/dashboard/articles?page=${currentPage - 1}&status=${status}${
                  query ? `&query=${query}` : ""
                }${categoryId !== "ALL" ? `&categoryId=${categoryId}` : ""}`}
                className="px-3 py-1.5 rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-colors cursor-pointer"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/dashboard/articles?page=${currentPage + 1}&status=${status}${
                  query ? `&query=${query}` : ""
                }${categoryId !== "ALL" ? `&categoryId=${categoryId}` : ""}`}
                className="px-3 py-1.5 rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-colors cursor-pointer"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
