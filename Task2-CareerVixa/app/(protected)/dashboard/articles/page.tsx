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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-950 dark:text-[#F8FAFC]">My Articles</h1>
          <p className="text-sm text-slate-600 dark:text-[#CBD5E1] mt-1 font-medium">
            Track your guest article submissions, review feedback, and private drafts.
          </p>
        </div>

        <Link
          href="/dashboard/articles/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#059669] text-white font-semibold hover:bg-[#047857] dark:bg-[#34D399] dark:text-[#064E3B] dark:hover:bg-[#6EE7B7] transition-colors shadow-xs text-sm"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Write Article</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-[#334155] gap-2 pb-1 scrollbar-none">
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
                  ? "bg-slate-900 text-white dark:bg-[#34D399] dark:text-[#064E3B] shadow-xs"
                  : "text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-[#1E293B] dark:hover:text-[#F8FAFC]"
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
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-[#334155] bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:hover:bg-[#334155] transition-colors cursor-pointer"
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
            className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-[#334155] bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:hover:bg-[#334155] transition-colors flex items-center gap-1.5 cursor-pointer"
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
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-[#334155] pt-4 text-xs">
          <span className="text-slate-600 dark:text-[#CBD5E1] font-medium">
            Showing page {currentPage} of {totalPages} ({totalCount} total submissions)
          </span>
          <div className="flex gap-2">
            {currentPage > 1 && (
              <Link
                href={`/dashboard/articles?page=${currentPage - 1}&status=${status}${
                  query ? `&query=${query}` : ""
                }${categoryId !== "ALL" ? `&categoryId=${categoryId}` : ""}`}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1E293B] text-slate-800 dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#334155] transition-colors cursor-pointer"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/dashboard/articles?page=${currentPage + 1}&status=${status}${
                  query ? `&query=${query}` : ""
                }${categoryId !== "ALL" ? `&categoryId=${categoryId}` : ""}`}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#1E293B] text-slate-800 dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#334155] transition-colors cursor-pointer"
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
