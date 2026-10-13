"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { deleteClientDraft, withdrawSubmission } from "@/lib/actions/client-articles";
import {
  Eye,
  Edit,
  Trash2,
  RotateCcw,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  status: string;
  contentOrigin: string;
  updatedAt: Date | string;
  submittedAt?: Date | string | null;
  reviewNotes?: string | null;
  category?: {
    name: string;
  } | null;
}

interface ArticleTableProps {
  articles: Article[];
}

export default function ArticleTable({ articles }: ArticleTableProps) {
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async (articleId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete the draft "${title}"? This cannot be undone.`)) {
      return;
    }

    setActionLoadingId(articleId);
    setErrorMessage(null);
    try {
      await deleteClientDraft(articleId);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to delete article.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleWithdraw = async (articleId: string) => {
    if (!window.confirm("Are you sure you want to withdraw this article from editorial review? It will return to Draft status.")) {
      return;
    }

    setActionLoadingId(articleId);
    setErrorMessage(null);
    try {
      await withdrawSubmission(articleId);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to withdraw submission.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700";
      case "APPROVED":
        return "bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border-teal-300 dark:border-teal-700";
      case "PENDING_REVIEW":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-700";
      case "CHANGES_REQUESTED":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border-orange-300 dark:border-orange-700";
      case "REJECTED":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-700";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700";
    }
  };

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] p-12 text-center space-y-4">
        <p className="text-sm text-black dark:text-[#B5D8CC]">No articles match your selected filters.</p>
        <Link
          href="/dashboard/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          Create New Article
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#C6E2D6] dark:border-[#355A50] bg-[#F2FBF8] dark:bg-[#102925] text-xs font-bold text-black dark:text-slate-200">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Article</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C6E2D6] dark:divide-[#355A50]">
              {articles.map((article) => {
                const isEditable =
                  article.status === "DRAFT" || article.status === "CHANGES_REQUESTED";
                const isDeletable =
                  article.status === "DRAFT" || article.status === "REJECTED";
                const isWithdrawable = article.status === "PENDING_REVIEW";
                const isBusy = actionLoadingId === article.id;

                return (
                  <tr key={article.id} className="hover:bg-[#E2F5ED]/40 dark:hover:bg-[#21473F]/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="space-y-1">
                        <Link
                          href={`/dashboard/articles/${article.id}/preview`}
                          className="font-semibold text-black dark:text-[#F0FCF7] hover:text-[#087B61] dark:hover:text-[#65DEAE] transition-colors line-clamp-1"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-black dark:text-slate-300">
                          <span className="font-mono text-[11px] truncate max-w-[200px]">
                            /{article.slug}
                          </span>
                          <span>·</span>
                          <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-[#E2F5ED] dark:bg-[#21473F] text-black dark:text-slate-200">
                            {article.contentOrigin}
                          </span>
                        </div>
                        {article.status === "CHANGES_REQUESTED" && article.reviewNotes && (
                          <p className="text-xs text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30 p-2 rounded border border-orange-200 dark:border-orange-900 mt-1">
                            <strong>Feedback:</strong> {article.reviewNotes}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs">
                      {article.category ? (
                        <span className="rounded-md bg-[#E2F5ED] dark:bg-[#21473F] px-2 py-1 font-semibold text-black dark:text-slate-200">
                          {article.category.name}
                        </span>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-400 italic">Uncategorized</span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                          article.status
                        )}`}
                      >
                        {article.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-black dark:text-slate-300 whitespace-nowrap">
                      {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {/* Preview button */}
                        <Link
                          href={`/dashboard/articles/${article.id}/preview`}
                          title="Preview Article"
                          className="p-1.5 rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        {/* Edit button */}
                        {isEditable && (
                          <Link
                            href={`/dashboard/articles/${article.id}/edit`}
                            title="Edit Draft"
                            className="p-1.5 rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] transition-all shadow-xs cursor-pointer"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                        )}

                        {/* Withdraw button */}
                        {isWithdrawable && (
                          <button
                            type="button"
                            title="Withdraw from Review"
                            onClick={() => handleWithdraw(article.id)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                          >
                            {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                          </button>
                        )}

                        {/* Delete button */}
                        {isDeletable && (
                          <button
                            type="button"
                            title="Delete Draft"
                            onClick={() => handleDelete(article.id, article.title)}
                            disabled={isBusy}
                            className="p-1.5 rounded-lg border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-500 dark:hover:text-slate-950 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                          >
                            {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
