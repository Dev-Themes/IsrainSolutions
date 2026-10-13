import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Sparkles, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { deleteArticle } from "@/app/actions/articles";
import { ArticleStatus } from "@prisma/client";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  await requireAdmin();
  const { status, search } = await searchParams;

  const where: any = {};
  if (status && Object.values(ArticleStatus).includes(status as any)) {
    where.status = status;
  }
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const [articles, pendingCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true, email: true } },
        category: { select: { name: true } },
      },
    }),
    prisma.article.count({ where: { status: ArticleStatus.PENDING_REVIEW } }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground mt-1">
            Manage your career blog posts, review guest submissions, and edit publications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/ai/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-sm font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            AI Generator
          </Link>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            New Article
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          { label: "All", value: undefined },
          { label: "Pending Review", value: "PENDING_REVIEW", count: pendingCount, highlight: true },
          { label: "Published", value: "PUBLISHED" },
          { label: "Drafts", value: "DRAFT" },
          { label: "Changes Requested", value: "CHANGES_REQUESTED" },
          { label: "Rejected", value: "REJECTED" },
          { label: "Archived", value: "ARCHIVED" },
        ].map((tab) => {
          const isActive = status === tab.value || (!status && !tab.value);
          const href = tab.value ? `/admin/articles?status=${tab.value}` : "/admin/articles";
          return (
            <Link
              key={tab.label}
              href={href}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === "number" && tab.count > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Articles Table */}
      <div className="bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Title</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Category</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Status</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Author</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground">Date</th>
                <th className="px-6 py-3 font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No articles found. Create your first article or generate one with the AI Agent!
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground max-w-md">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="hover:underline font-semibold text-foreground line-clamp-1"
                        >
                          {article.title}
                        </Link>
                        {article.isAIGenerated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 shrink-0">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">/{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {article.category?.name || "General"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          article.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : article.status === "PENDING_REVIEW"
                            ? "bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                            : article.status === "CHANGES_REQUESTED"
                            ? "bg-orange-100 text-orange-900 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-300 dark:border-orange-800"
                            : article.status === "REJECTED"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                            : article.status === "DRAFT"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {article.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {article.author?.name || article.author?.email || "Admin"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {format(new Date(article.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {article.status === "PENDING_REVIEW" && (
                          <Link
                            href={`/admin/articles/${article.id}/edit`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-xs cursor-pointer"
                          >
                            Review Submission
                          </Link>
                        )}
                        {article.status === "PUBLISHED" && (
                          <Link
                            href={`/articles/${article.slug}`}
                            target="_blank"
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
                            title="View Public Article"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await deleteArticle(article.id);
                          }}
                          className="inline"
                        >
                          <button
                            type="submit"
                            className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
