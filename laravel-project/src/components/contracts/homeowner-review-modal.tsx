"use client";

import * as React from "react";
import { X, Star, CheckCircle2, ShieldCheck } from "lucide-react";
import { JobContract, markInvoicePaid, submitContractReview } from "@/lib/contract-store";

interface HomeownerReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: JobContract;
  mode?: "PAY_AND_REVIEW" | "REVIEW_ONLY";
  onCompleted?: (updatedContract: JobContract) => void;
}

export function HomeownerReviewModal({
  isOpen,
  onClose,
  contract,
  mode = "PAY_AND_REVIEW",
  onCompleted,
}: HomeownerReviewModalProps) {
  const [rating, setRating] = React.useState<number>(5);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [title, setTitle] = React.useState<string>("Excellent workmanship & punctual");
  const [comment, setComment] = React.useState<string>(
    "Prompt arrival, diagnosed and resolved the issue efficiently. Everything was left neat and clean. Highly recommended."
  );
  const [step, setStep] = React.useState<"PAY" | "REVIEW">(
    mode === "REVIEW_ONLY" || contract.status === "PAID" ? "REVIEW" : "PAY"
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [authorName] = React.useState<string>(contract.homeownerName || "Sarah Jenkins");

  if (!isOpen) return null;

  const handlePayInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const paid = markInvoicePaid(contract.id, "TradeConnect Protected Escrow (Card)");
    setIsSubmitting(false);

    if (paid) {
      // Transition to review step
      setStep("REVIEW");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const completed = submitContractReview(contract.id, {
      rating,
      title: title.trim() || "Verified Service",
      comment: comment.trim(),
      author: authorName,
      city: contract.city,
    });

    setIsSubmitting(false);

    if (completed) {
      if (onCompleted) onCompleted(completed);
      onClose();
    }
  };

  const invoiceTotal = contract.totalAmount || contract.priceNumeric;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-xl max-h-[90vh] flex flex-col bg-white text-zinc-900 rounded-[var(--radius-lg)] shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-zinc-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs text-[var(--accent)] uppercase tracking-wider">
                {step === "PAY" ? "Settle Invoice & Release Escrow" : "Verified Trade Review"}
              </span>
              <span className="text-zinc-500">&bull;</span>
              <span className="font-mono text-xs text-zinc-300 font-semibold">{contract.referenceCode}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5 truncate max-w-md">
              {contract.proName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-[var(--radius-sm)] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-zinc-800">
          {step === "PAY" ? (
            <form onSubmit={handlePayInvoice} className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                    Total Amount Due
                  </span>
                  <div className="text-2xl font-black font-mono text-zinc-900">
                    {contract.currency}{invoiceTotal.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-800 font-medium">
                    Invoice #{contract.invoiceNumber || "INV-FINAL"}
                  </span>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[11px] text-zinc-600">
                    Labour: <strong className="font-mono text-zinc-900">{contract.currency}{contract.labourAmount ?? Math.round(invoiceTotal * 0.7)}</strong>
                  </div>
                  <div className="text-[11px] text-zinc-600">
                    Materials: <strong className="font-mono text-zinc-900">{contract.currency}{contract.materialsAmount ?? Math.round(invoiceTotal * 0.3)}</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Escrow Protection &amp; Satisfaction Guarantee</span>
                </div>
                <p className="text-zinc-600 leading-relaxed text-[11px]">
                  Releasing payment confirms that the work has been satisfactorily completed according to the agreed contract scope. The contractor ({contract.proName}) will receive these earnings immediately into their monthly earned balance.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
                >
                  Pay Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm &amp; Release Payment ({contract.currency}{invoiceTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Payment settled! Leave a verified testimonial to appear on {contract.proName}&apos;s public profile.
                </span>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                      aria-label={`${star} star rating`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || rating) >= star
                            ? "fill-amber-400 text-amber-500"
                            : "fill-zinc-200 text-zinc-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-zinc-700 ml-2">
                    {rating} out of 5 stars
                  </span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Headline / Review Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Prompt arrival and excellent repair"
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)]"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Detailed Testimonial &amp; Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of the contractor's punctuality, quality of work, and communication..."
                  className="w-full px-3 py-2 rounded-[var(--radius-sm)] border border-zinc-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[var(--accent)] leading-relaxed"
                />
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 text-[11px] leading-relaxed">
                Your review will be tagged as <strong>Verified Contract</strong> on {contract.proName}&apos;s profile, and will boost their verified ranking across TradeConnect.
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-[var(--radius-sm)] border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold cursor-pointer"
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Verified Testimonial</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
