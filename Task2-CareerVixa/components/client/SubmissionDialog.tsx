"use client";

import { useState, useEffect } from "react";
import { submitArticleForReview } from "@/lib/actions/client-articles";
import { ShieldCheck, AlertCircle, Loader2, X, ExternalLink } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface SubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string;
  articleTitle: string;
  initialCategoryId?: string | null;
  categories?: Category[];
  initialPromotionalUrl?: string | null;
  initialOriginalSourceUrl?: string | null;
  onSubmitSuccess: (data: any) => void;
}

export default function SubmissionDialog({
  isOpen,
  onClose,
  articleId,
  articleTitle,
  initialCategoryId,
  categories = [],
  initialPromotionalUrl,
  initialOriginalSourceUrl,
  onSubmitSuccess,
}: SubmissionDialogProps) {
  const [categoryId, setCategoryId] = useState(initialCategoryId || "");
  const [promotionalUrl, setPromotionalUrl] = useState(initialPromotionalUrl || "");
  const [originalSourceUrl, setOriginalSourceUrl] = useState(initialOriginalSourceUrl || "");
  const [rightsDeclared, setRightsDeclared] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (categories.length > 0 && !categoryId) {
      setErrorMessage("Please select a Career Category for your article.");
      return;
    }

    if (!promotionalUrl.trim()) {
      setErrorMessage("A valid promotional website or organization URL is required.");
      return;
    }

    if (!rightsDeclared) {
      setErrorMessage("You must declare ownership and publication rights before submitting.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("You must accept CareerVixa's publishing terms before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitArticleForReview({
        articleId,
        categoryId: categoryId || undefined,
        promotionalUrl: promotionalUrl.trim(),
        originalSourceUrl: originalSourceUrl.trim() || undefined,
        rightsDeclared: true,
        termsAccepted: true,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Failed to submit article for review.");
        setIsSubmitting(false);
        return;
      }

      onSubmitSuccess(result);
    } catch (err: any) {
      const rawMsg = err?.message || "";
      const displayMsg = rawMsg.includes("441")
        ? "Submission failed. Please check your contributor profile in settings and try again."
        : rawMsg || "Failed to submit article for review.";
      setErrorMessage(displayMsg);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-dialog-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 shadow-2xl max-sm:max-h-[92vh] max-sm:overflow-y-auto">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close submission dialog"
          className="absolute right-3.5 top-3.5 inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#102925] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-[#355A50] pb-4 pr-10">
          <div className="rounded-xl bg-emerald-50 dark:bg-[#21473F] p-2.5 text-emerald-800 dark:text-[#65DEAE] shrink-0 border border-emerald-200 dark:border-transparent">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 id="submission-dialog-title" className="text-lg font-bold text-slate-950 dark:text-white">
              Submit for Editorial Review
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#B5D8CC] line-clamp-1">
              Article: &quot;{articleTitle}&quot;
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800" role="alert">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {categories.length > 0 && (
            <div>
              <label htmlFor="submission-category" className="block text-xs font-bold text-slate-900 dark:text-[#F0FCF7] mb-1.5">
                Career Category <span className="text-rose-600 dark:text-rose-400">*</span>
              </label>
              <select
                id="submission-category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="">Select Career Category...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-[#B5D8CC]">
                Assign your article to the appropriate CareerVixa editorial category.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="submission-promotional-url" className="block text-xs font-bold text-slate-900 dark:text-[#F0FCF7] mb-1.5">
              Promotional / Organization URL <span className="text-rose-600 dark:text-rose-400">*</span>
            </label>
            <input
              id="submission-promotional-url"
              type="url"
              required
              placeholder="https://yourbusiness.com or https://portfolio.com"
              value={promotionalUrl}
              onChange={(e) => setPromotionalUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <p className="mt-1 text-[11px] text-slate-500 dark:text-[#B5D8CC]">
              Required promotional website link for attribution and sponsored link verification.
            </p>
          </div>

          <div>
            <label htmlFor="submission-source-url" className="block text-xs font-bold text-slate-900 dark:text-[#F0FCF7] mb-1.5">
              Original Source URL <span className="text-xs text-slate-500 dark:text-[#B5D8CC] font-normal">(Optional)</span>
            </label>
            <input
              id="submission-source-url"
              type="url"
              placeholder="https://originalsource.com/post-name (if previously published)"
              value={originalSourceUrl}
              onChange={(e) => setOriginalSourceUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <p className="mt-1 text-[11px] text-slate-500 dark:text-[#B5D8CC]">
              Provide only if this article was previously published on another platform.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-[#355A50] bg-slate-50 dark:bg-[#102925]/60 p-4 space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={rightsDeclared}
                onChange={(e) => setRightsDeclared(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-800 dark:text-slate-200">
                <strong className="text-slate-950 dark:text-white">Publication Rights Declaration:</strong> I certify that this article is my original work (or I possess full authorization and rights to publish it) and does not infringe upon any third-party intellectual property.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-800 dark:text-slate-200">
                <strong className="text-slate-950 dark:text-white">Publishing Terms &amp; Review Consent:</strong> I agree to CareerVixa&apos;s guest publishing guidelines and acknowledge that articles undergo mandatory manual review and <strong className="text-slate-950 dark:text-white">never publish automatically</strong>.
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-[#355A50]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-[#355A50] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#102925] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !rightsDeclared || !termsAccepted || !promotionalUrl.trim()}
              className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Submitting for Review...</span>
                </>
              ) : (
                <span>Confirm &amp; Submit for Review</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
