"use client";

import * as React from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  service: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

interface ReviewsCarouselProps {
  reviews: ReviewItem[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Top Header with navigation controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
          <span className="font-bold text-[var(--text)]">Verified Customer Feedback</span>
          <span>&middot;</span>
          <span>Only verified booking reviews</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="p-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="p-2 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={containerRef}
        tabIndex={0}
        aria-label="Customer Reviews Slider"
        className="scroll-carousel flex gap-4 overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="carousel-item w-[280px] sm:w-[340px] shrink-0 p-6 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] shadow-soft flex flex-col justify-between"
          >
            <div>
              {/* Rating stars & verified badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-[var(--accent)]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent)]" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center text-[10px] font-bold text-[var(--pine-accent)] bg-[var(--brand-light)] px-2 py-0.5 rounded-[4px]">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified Job
                  </span>
                )}
              </div>

              <h4 className="font-bold text-sm text-[var(--text)] mb-2 leading-snug">
                {rev.title}
              </h4>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-[var(--text)] block">{rev.author}</span>
                <span className="text-[11px] text-[var(--text-light)]">
                  {rev.city} &middot; {rev.service}
                </span>
              </div>
              <span className="text-[11px] text-[var(--text-light)]">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/quote"
          className="text-xs font-semibold text-[var(--accent)] hover:underline"
        >
          Had work completed recently? Leave a verified review &rarr;
        </Link>
      </div>
    </div>
  );
}
