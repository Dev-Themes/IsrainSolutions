import { getDashboardMetrics, getClientArticles } from "@/lib/actions/client-articles";
import { getContributorProfile } from "@/lib/actions/client-profile";
import DashboardMetrics from "@/components/client/DashboardMetrics";
import Link from "next/link";
import { PlusCircle, Sparkles, UserCheck, ArrowRight, ShieldAlert, FileText, Eye } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const metadata = {
  title: "Contributor Dashboard | CareerVixa",
  description: "Manage your guest career articles, private drafts, and submission statuses.",
};

export default async function DashboardPage() {
  const [metrics, { articles: recentArticles }, { profile, user }] = await Promise.all([
    getDashboardMetrics(),
    getClientArticles({ page: 1, pageSize: 5 }),
    getContributorProfile(),
  ]);

  const isProfileIncomplete = !profile || !profile.fullName || !profile.country;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 shadow-xs flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl text-slate-950 dark:text-white">
            Welcome back, {profile?.fullName || user.name || "Contributor"}!
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-200 mt-1 font-medium">
            CareerVixa Guest Publishing Portal — Draft, refine, and submit career-focused articles for review.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#087B61] text-white hover:bg-[#086A54] dark:bg-[#65DEAE] dark:text-[#08261E] dark:hover:bg-[#95F0CB] transition-colors shadow-xs cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Write Article</span>
          </Link>
          <Link
            href="/dashboard/ai/generate"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 dark:border-[#355A50] bg-slate-100 hover:bg-slate-200/80 text-slate-900 dark:bg-[#21473F] dark:text-[#F0FCF7] dark:hover:bg-[#355A50] transition-colors cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-[#087B61] dark:text-[#65DEAE]" />
            <span>AI Draft</span>
          </Link>
        </div>
      </div>

      {/* Profile Incomplete Warning Banner if needed */}
      {isProfileIncomplete && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-5 text-amber-950 dark:text-amber-200 shadow-xs">
          <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="flex-1 text-sm">
            <p className="font-bold text-slate-950 dark:text-amber-100">Contributor Profile Required for Article Submissions</p>
            <p className="mt-0.5 text-xs text-slate-700 dark:text-amber-300">
              Before submitting any article for editorial review, you must complete your author details (Full Name & Country).
            </p>
          </div>
          <Link
            href="/dashboard/settings"
            className="shrink-0 text-xs font-bold text-amber-900 dark:text-amber-200 underline underline-offset-2 hover:text-amber-700 cursor-pointer"
          >
            Complete Profile &rarr;
          </Link>
        </div>
      )}

      {/* Real-time Metric Cards */}
      <DashboardMetrics metrics={metrics} />

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 space-y-3 shadow-xs hover:border-[#087B61] dark:hover:border-[#65DEAE] transition-all">
          <div className="h-11 w-11 rounded-xl bg-slate-900 text-white dark:bg-[#21473F] dark:text-[#65DEAE] flex items-center justify-center shadow-xs">
            <PlusCircle className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-slate-950 dark:text-[#F0FCF7]">Write Manually</h3>
          <p className="text-xs text-slate-600 dark:text-[#B5D8CC] leading-relaxed">
            Craft your article using our rich-text editor with support for headings, bullet points, and promotional links.
          </p>
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center text-xs font-bold text-[#087B61] dark:text-[#65DEAE] hover:underline cursor-pointer pt-1"
          >
            Start Writing &rarr;
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 space-y-3 shadow-xs hover:border-[#087B61] dark:hover:border-[#65DEAE] transition-all">
          <div className="h-11 w-11 rounded-xl bg-slate-900 text-white dark:bg-[#21473F] dark:text-[#65DEAE] flex items-center justify-center shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-slate-950 dark:text-[#F0FCF7]">AI-Assisted Drafting</h3>
          <p className="text-xs text-slate-600 dark:text-[#B5D8CC] leading-relaxed">
            Provide a career topic and keywords. Our research agent will create a cited, structured draft for your review.
          </p>
          <Link
            href="/dashboard/ai/generate"
            className="inline-flex items-center text-xs font-bold text-[#087B61] dark:text-[#65DEAE] hover:underline cursor-pointer pt-1"
          >
            Generate Draft &rarr;
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 space-y-3 shadow-xs hover:border-[#087B61] dark:hover:border-[#65DEAE] transition-all">
          <div className="h-11 w-11 rounded-xl bg-slate-900 text-white dark:bg-[#21473F] dark:text-[#65DEAE] flex items-center justify-center shadow-xs">
            <UserCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-base text-slate-950 dark:text-[#F0FCF7]">Author Attribution</h3>
          <p className="text-xs text-slate-600 dark:text-[#B5D8CC] leading-relaxed">
            Manage your organization, website, phone, and author biography to maintain consistent attribution on submissions.
          </p>
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center text-xs font-bold text-[#087B61] dark:text-[#65DEAE] hover:underline cursor-pointer pt-1"
          >
            Manage Profile &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#355A50] p-4 sm:px-6 bg-slate-50/80 dark:bg-[#102925]/60">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#087B61] dark:text-[#65DEAE]" />
            <h2 className="text-sm font-bold text-slate-950 dark:text-[#F0FCF7]">Recent Submissions &amp; Drafts</h2>
          </div>
          <Link
            href="/dashboard/articles"
            className="text-xs font-semibold text-slate-700 dark:text-[#B5D8CC] hover:text-[#087B61] dark:hover:text-[#65DEAE] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-[#355A50]">
          {recentArticles.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-600 dark:text-[#B5D8CC]">
              <p>You haven&apos;t created any articles yet.</p>
              <Link
                href="/dashboard/articles/new"
                className="mt-3 inline-block text-xs font-bold text-[#087B61] dark:text-[#65DEAE] hover:underline cursor-pointer"
              >
                Create your first draft now &rarr;
              </Link>
            </div>
          ) : (
            recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 gap-2 hover:bg-slate-50/80 dark:hover:bg-[#21473F]/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-slate-950 dark:text-[#F0FCF7] line-clamp-1">{article.title}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                        article.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800"
                          : article.status === "PENDING_REVIEW"
                          ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800"
                          : article.status === "CHANGES_REQUESTED"
                          ? "bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-200 dark:border-orange-800"
                          : article.status === "REJECTED"
                          ? "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800"
                          : "bg-slate-100 text-slate-900 border-slate-200 dark:bg-[#21473F] dark:text-[#F0FCF7] dark:border-[#355A50]"
                      }`}
                    >
                      {article.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-slate-700 dark:text-[#B5D8CC] uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#21473F] border border-slate-200 dark:border-[#355A50] font-semibold">
                      {article.contentOrigin}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#B5D8CC]">
                    Updated {formatDistanceToNow(new Date(article.updatedAt), { addSuffix: true })}
                    {article.category && ` · Category: ${article.category.name}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/articles/${article.id}/preview`}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] text-slate-900 dark:text-[#F0FCF7] hover:bg-[#087B61] hover:text-white dark:hover:bg-[#65DEAE] dark:hover:text-[#08261E] font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </Link>
                  {article.status === "DRAFT" || article.status === "CHANGES_REQUESTED" ? (
                    <Link
                      href={`/dashboard/articles/${article.id}/edit`}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-[#087B61] text-white hover:bg-[#086A54] dark:bg-[#65DEAE] dark:text-[#08261E] dark:hover:bg-[#95F0CB] transition-colors font-bold shadow-2xs cursor-pointer"
                    >
                      Edit
                    </Link>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
