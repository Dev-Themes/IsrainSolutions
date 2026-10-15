"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/editor/TiptapEditor";
import SubmissionDialog from "@/components/client/SubmissionDialog";
import { saveClientDraft } from "@/lib/actions/client-articles";
import { ClientDraftInput } from "@/lib/validation/client-article";
import {
  Save,
  Eye,
  Send,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface ArticleFormProps {
  initialArticle?: {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    content: string;
    coverImage: string | null;
    originalSourceUrl: string | null;
    promotionalUrl: string | null;
    categoryId: string | null;
    status: string;
    reviewNotes: string | null;
    tags?: { name: string }[];
  } | null;
  categories: Category[];
}

export default function ArticleForm({ initialArticle, categories }: ArticleFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ClientDraftInput>({
    id: initialArticle?.id,
    title: initialArticle?.title || "",
    slug: initialArticle?.slug || "",
    summary: initialArticle?.summary || "",
    content: initialArticle?.content || "",
    categoryId: initialArticle?.categoryId || (categories[0]?.id || ""),
    tags: initialArticle?.tags?.map((t) => t.name) || [],
    coverImage: initialArticle?.coverImage || "",
    originalSourceUrl: initialArticle?.originalSourceUrl || "",
    promotionalUrl: initialArticle?.promotionalUrl || "",
  });

  const [tagsInput, setTagsInput] = useState(
    initialArticle?.tags?.map((t) => t.name).join(", ") || ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isInitialMount = useRef(true);
  const lastSavedPayload = useRef<string>(JSON.stringify(formData));

  const status = initialArticle?.status || "DRAFT";
  const isLocked = status === "PENDING_REVIEW" || status === "PUBLISHED" || status === "APPROVED";
  const isChangesRequested = status === "CHANGES_REQUESTED";

  // Debounced auto-save mechanism for existing draft articles
  useEffect(() => {
    if (!initialArticle?.id || isLocked) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentPayload = JSON.stringify(formData);
    if (currentPayload === lastSavedPayload.current) {
      return;
    }

    if (!formData.title?.trim() || !formData.content?.trim()) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setAutoSaveStatus("saving");
        const res = await saveClientDraft(formData);
        if (res.success) {
          lastSavedPayload.current = currentPayload;
          setAutoSaveStatus("saved");
        } else {
          setAutoSaveStatus("error");
        }
      } catch {
        setAutoSaveStatus("error");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [formData, initialArticle?.id, isLocked]);

  const handleTitleChange = (newTitle: string) => {
    const updated = { ...formData, title: newTitle };
    if (!initialArticle?.id && (!formData.slug || formData.slug === slugify(formData.title))) {
      updated.slug = slugify(newTitle);
    }
    setFormData(updated);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTagsChange = (val: string) => {
    setTagsInput(val);
    const parsed = val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setFormData({ ...formData, tags: parsed });
  };

  const handleSaveDraft = async () => {
    if (!formData.title.trim()) {
      setErrorMessage("Please enter an article title.");
      return;
    }

    if (!formData.content || !formData.content.trim()) {
      setErrorMessage("Article content cannot be empty.");
      return;
    }

    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const result = await saveClientDraft(formData);

      if (!result.success || !result.articleId) {
        setErrorMessage(result.error || "Failed to save draft. Please check your inputs.");
        return;
      }

      setSuccessMessage("Draft saved successfully.");
      lastSavedPayload.current = JSON.stringify(formData);
      setAutoSaveStatus("saved");

      // If new article, update the URL without full reload
      if (!initialArticle?.id && result.articleId) {
        router.push(`/dashboard/articles/${result.articleId}/edit`);
      }
    } catch (err: any) {
      const rawMsg = err?.message || "";
      const displayMsg = rawMsg.includes("441")
        ? "Unable to save draft at this time. Please make sure all required fields are filled out."
        : rawMsg || "Failed to save draft.";
      setErrorMessage(displayMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmissionComplete = (result: any) => {
    setIsSubmissionOpen(false);
    setSuccessMessage("Your article has been submitted for Admin review! It is now locked from editing.");
    router.push("/dashboard/articles");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#334155]">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/articles"
            className="p-2 rounded-xl border border-slate-200 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-800 dark:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-950 dark:text-[#F8FAFC]">
                {initialArticle?.id ? "Edit Article" : "Create New Article"}
              </h1>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  status === "PUBLISHED"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
                    : status === "PENDING_REVIEW"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-700"
                    : status === "CHANGES_REQUESTED"
                    ? "bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border-orange-300 dark:border-orange-700"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                }`}
              >
                {status.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#CBD5E1]">
              {isLocked
                ? "This article is locked and cannot be modified."
                : "Save private drafts anytime or submit for editorial review."}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {autoSaveStatus === "saving" && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#94A3B8] mr-2">
              <Loader2 className="h-3 w-3 animate-spin text-[#059669] dark:text-[#34D399]" />
              Auto-saving...
            </span>
          )}
          {autoSaveStatus === "saved" && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#94A3B8] mr-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#059669] dark:text-[#34D399]" />
              Auto-saved
            </span>
          )}

          {initialArticle?.id && (
            <Link
              href={`/dashboard/articles/${initialArticle.id}/preview`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] text-slate-800 dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#334155] transition-all shadow-xs cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview</span>
            </Link>
          )}

          {!isLocked && (
            <>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] text-slate-800 dark:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#334155] transition-all disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                <span>Save Draft</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!initialArticle?.id) {
                    setErrorMessage("Please save your draft first before submitting for review.");
                    return;
                  }
                  setIsSubmissionOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-[#059669] hover:bg-[#047857] text-white dark:bg-[#34D399] dark:text-[#064E3B] dark:hover:bg-[#6EE7B7] transition-all shadow-xs cursor-pointer font-bold"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isChangesRequested ? "Resubmit for Review" : "Submit for Review"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lock Warning Banner */}
      {isLocked && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <Lock className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Article Locked from Direct Editing</p>
            <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-300">
              {status === "PENDING_REVIEW"
                ? "This article is currently under editorial review by CareerVixa administrators. You cannot make changes while under review."
                : "This article is approved or published and cannot be modified directly."}
            </p>
          </div>
        </div>
      )}

      {/* Editorial Feedback Banner (Changes Requested) */}
      {isChangesRequested && initialArticle?.reviewNotes && (
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50/70 p-4 text-orange-950 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-bold">Editor Revision Request</p>
            <p className="text-xs text-orange-900 dark:text-orange-300 whitespace-pre-wrap">
              {initialArticle.reviewNotes}
            </p>
            <p className="text-[11px] text-orange-800 dark:text-orange-400 italic pt-1">
              Please address the editor notes above, update the content, and click &quot;Resubmit for Review&quot;.
            </p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Article Content Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor (2 columns) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 space-y-4 shadow-xs">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                disabled={isLocked}
                placeholder="e.g. Master the Tech Interview: 7 Key Strategies for 2027"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-base font-semibold rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  Career Category <span className="text-red-500">*</span>
                </label>
                <select
                  disabled={isLocked}
                  value={formData.categoryId || ""}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
                >
                  <option value="">Select Category...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  Slug <span className="text-xs font-normal text-slate-500 dark:text-[#94A3B8]">(URL identifier)</span>
                </label>
                <input
                  type="text"
                  disabled={isLocked}
                  placeholder="master-the-tech-interview"
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-slate-300 dark:border-[#334155] bg-slate-50 dark:bg-[#0B1220] text-slate-800 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Article Excerpt / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                disabled={isLocked}
                maxLength={300}
                placeholder="Brief, engaging summary of the article for blog listings and previews..."
                value={formData.summary || ""}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none disabled:opacity-60"
              />
              <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] text-right mt-1">
                {(formData.summary || "").length}/300
              </p>
            </div>
          </div>

          {/* Tiptap Rich Text Editor */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 space-y-2 shadow-xs">
            <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
              Article Content <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              Format your article with headings, paragraphs, bullet points, quotes, and links.
            </p>
            {isLocked ? (
              <div
                className="prose dark:prose-invert max-w-none p-4 rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0B1220] text-sm overflow-y-auto max-h-[500px] text-slate-900 dark:text-[#F8FAFC]"
                dangerouslySetInnerHTML={{ __html: formData.content || "" }}
              />
            ) : (
              <TiptapEditor
                value={formData.content || ""}
                onChange={(content) => setFormData({ ...formData, content: content || "" })}
              />
            )}
          </div>
        </div>

        {/* Sidebar Settings (1 column) */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-slate-950 dark:text-[#F8FAFC]">Classification &amp; Attribution</h3>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Career Category <span className="text-red-500">*</span>
              </label>
              <select
                disabled={isLocked}
                value={formData.categoryId || ""}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              >
                <option value="">Select Category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Tags <span className="text-xs font-normal text-slate-500 dark:text-[#94A3B8]">(Comma-separated)</span>
              </label>
              <input
                type="text"
                disabled={isLocked}
                placeholder="tech, interview, careers"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Cover Image URL <span className="text-xs font-normal text-slate-500 dark:text-[#94A3B8]">(Optional)</span>
              </label>
              <input
                type="url"
                disabled={isLocked}
                placeholder="https://example.com/cover.jpg"
                value={formData.coverImage || ""}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#151F32] p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-slate-950 dark:text-[#F8FAFC]">Promotional Provenance</h3>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Promotional Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                disabled={isLocked}
                placeholder="https://yourbusiness.com"
                value={formData.promotionalUrl || ""}
                onChange={(e) => setFormData({ ...formData, promotionalUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              />
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#94A3B8]">
                Required for contributor attribution and sponsored link verification.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                Original Source URL <span className="text-xs font-normal text-slate-500 dark:text-[#94A3B8]">(Optional)</span>
              </label>
              <input
                type="url"
                disabled={isLocked}
                placeholder="https://medium.com/@author/my-post"
                value={formData.originalSourceUrl || ""}
                onChange={(e) => setFormData({ ...formData, originalSourceUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#334155] bg-white dark:bg-[#0B1220] text-slate-950 dark:text-[#F8FAFC] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submission Dialog */}
      {initialArticle?.id && (
        <SubmissionDialog
          isOpen={isSubmissionOpen}
          onClose={() => setIsSubmissionOpen(false)}
          articleId={initialArticle.id}
          articleTitle={formData.title}
          categories={categories}
          initialCategoryId={formData.categoryId}
          initialPromotionalUrl={formData.promotionalUrl}
          initialOriginalSourceUrl={formData.originalSourceUrl}
          onSubmitSuccess={handleSubmissionComplete}
        />
      )}
    </div>
  );
}
