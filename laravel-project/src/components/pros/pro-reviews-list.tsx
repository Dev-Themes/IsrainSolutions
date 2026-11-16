"use client";

import * as React from "react";
import { Star, ShieldCheck } from "lucide-react";
import { getStoredReviews, StoredReview } from "@/lib/contract-store";

interface InitialReview {
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
}

interface ProReviewsListProps {
  slug: string;
  initialReviews: InitialReview[];
}

export function ProReviewsList({ slug, initialReviews }: ProReviewsListProps) {
  const [dynamicReviews, setDynamicReviews] = React.useState<StoredReview[]>([]);

  React.useEffect(() => {
    const loadReviews = () => {
      const all = getStoredReviews();
      const matching = all.filter((r) => r.proSlug === slug);
      setDynamicReviews(matching);
    };

    loadReviews();

    if (typeof window !== "undefined") {
      window.addEventListener("tradeconnect_reviews_updated", loadReviews);
      return () => {
        window.removeEventListener("tradeconnect_reviews_updated", loadReviews);
      };
    }
  }, [slug]);

  const allReviewsCount = initialReviews.length + dynamicReviews.length;
  const totalStars = [
    ...initialReviews.map((r) => r.rating),
    ...dynamicReviews.map((r) => r.rating),
  ];
  const avgRating = totalStars.length > 0
    ? Number((totalStars.reduce((a, b) => a + b, 0) / totalStars.length).toFixed(1))
    : 5.0;

  return (
    <div className="space-y-4">
      {/* Dynamic Summary Card */}
      <div className="p-4 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl font-extrabold text-[var(--text)] font-serif">
            {avgRating}
          </div>
          <div>
            <div className="flex items-center text-[var(--accent)]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(avgRating) ? "fill-[var(--accent)]" : "text-zinc-300 dark:text-zinc-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Based on {allReviewsCount} verified customer {allReviewsCount === 1 ? "review" : "reviews"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 px-3 py-1.5 rounded-[var(--radius-sm)] font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>100% Verified Paid Work Orders &bull; Zero Fake Reviews</span>
        </div>
      </div>

      {/* Dynamic Stored Reviews from Paid & Approved Contracts */}
      {dynamicReviews.map((rev) => (
        <div
          key={rev.id}
          className="bg-[var(--surface)] rounded-[var(--radius)] p-5 border-2 border-emerald-500/40 shadow-soft animate-in fade-in duration-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs sm:text-sm text-[var(--text)]">
                {rev.author}
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-bold flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                Verified Signed Contract ({rev.jobReference})
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-light)]">{rev.date}</span>
          </div>

          <div className="flex items-center text-[var(--accent)] mb-2">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)]" />
            ))}
            <span className="text-xs font-semibold text-zinc-600 ml-2">
              {rev.service} &bull; {rev.city}
            </span>
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] mb-1">
            {rev.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            &ldquo;{rev.comment}&rdquo;
          </p>
        </div>
      ))}

      {/* Baseline Directory Reviews */}
      {initialReviews.map((rev, idx) => (
        <div
          key={idx}
          className="bg-[var(--surface)] rounded-[var(--radius)] p-5 border border-[var(--line)] shadow-soft"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs sm:text-sm text-[var(--text)]">
                {rev.author}
              </span>
              <span className="text-[10px] bg-[var(--brand-light)] text-[var(--pine-accent)] px-2 py-0.5 rounded font-bold">
                Verified Homeowner
              </span>
            </div>
            <span className="text-[11px] text-[var(--text-light)]">{rev.date}</span>
          </div>

          <div className="flex items-center text-[var(--accent)] mb-2">
            {[...Array(rev.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent)]" />
            ))}
          </div>

          <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] mb-1">
            {rev.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            &ldquo;{rev.comment}&rdquo;
          </p>
        </div>
      ))}
    </div>
  );
}
