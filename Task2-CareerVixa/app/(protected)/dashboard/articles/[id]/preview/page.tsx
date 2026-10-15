import { getClientArticleById } from "@/lib/actions/client-articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit3, Globe, ShieldAlert, Sparkles } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Private Article Preview | CareerVixa",
  description: "Preview your article before submitting for review.",
};

interface PreviewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewArticlePage({ params }: PreviewArticlePageProps) {
  const { id } = await params;

  let article;
  try {
    article = await getClientArticleById(id);
  } catch (error) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const isEditable = article.status === "DRAFT" || article.status === "CHANGES_REQUESTED";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href={isEditable ? `/dashboard/articles/${article.id}/edit` : "/dashboard/articles"}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-slate-100 dark:hover:bg-[#334155] text-slate-800 dark:text-[#F8FAFC] transition-all shadow-xs cursor-pointer"
            title="Back to Articles"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669] dark:text-[#34D399]">
                Private Preview
              </span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  article.status === "PUBLISHED"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                    : article.status === "PENDING_REVIEW"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-700"
                    : article.status === "CHANGES_REQUESTED"
                    ? "bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border-orange-300 dark:border-orange-700"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                }`}
              >
                {article.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#CBD5E1] mt-0.5">
              This preview is private to your account and is NOT accessible on the public blog.
            </p>
          </div>
        </div>

        {isEditable && (
          <Link
            href={`/dashboard/articles/${article.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-[#059669] hover:bg-[#047857] text-white dark:bg-[#34D399] dark:text-[#064E3B] dark:hover:bg-[#6EE7B7] transition-all shadow-xs font-bold"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Article</span>
          </Link>
        )}
      </div>

      {/* Simulated Live Blog Reader View */}
      <article className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 sm:p-10 shadow-xs space-y-6">
        {/* Category & Origin */}
        <div className="flex flex-wrap items-center gap-2">
          {article.category && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 dark:bg-[#1E293B] dark:text-[#34D399] border border-emerald-200 dark:border-[#334155]">
              {article.category.name}
            </span>
          )}
          <span className="text-xs text-slate-700 dark:text-[#CBD5E1] uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E293B] font-semibold border border-slate-200 dark:border-[#334155]">
            Origin: {article.contentOrigin}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-[#F8FAFC] leading-tight">
          {article.title}
        </h1>

        {/* Summary Excerpt */}
        {article.summary && (
          <p className="text-lg text-slate-800 dark:text-[#CBD5E1] leading-relaxed border-l-4 border-[#059669] dark:border-[#34D399] pl-4 italic">
            {article.summary}
          </p>
        )}

        {/* Cover Image if available */}
        {article.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-100 dark:bg-[#0B1220]">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Promotional / Provenance Attribution Notice */}
        {article.promotionalUrl && (
          <div className="rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#1E293B]/60 p-4 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-950 dark:text-[#F8FAFC]">
              <Globe className="h-3.5 w-3.5 text-[#059669] dark:text-[#34D399]" />
              <span>Contributor Attribution &amp; Promotional Target</span>
            </div>
            <p className="text-slate-700 dark:text-[#CBD5E1]">
              Outbound promotional link:{" "}
              <a
                href={article.promotionalUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="text-[#047857] dark:text-[#34D399] underline font-medium"
              >
                {article.promotionalUrl}
              </a>{" "}
              (tagged with <code className="text-[11px] font-mono">rel=&quot;sponsored nofollow&quot;</code>)
            </p>
          </div>
        )}

        {/* Body Content */}
        <div
          className="prose dark:prose-invert max-w-none pt-4 border-t border-slate-200 dark:border-[#334155] text-slate-950 dark:text-[#F8FAFC]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 dark:border-[#334155] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-800 dark:text-[#CBD5E1]">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-[#334155] bg-slate-100 dark:bg-[#1E293B] text-slate-800 dark:text-[#CBD5E1] font-medium"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
