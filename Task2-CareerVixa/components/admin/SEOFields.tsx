"use client";

import { useState } from "react";
import { Monitor, Smartphone, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";

export function SEOFields({ register, errors, watch }: { register: any; errors: any; watch?: any }) {
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  const metaTitle = watch ? watch("metaTitle") || watch("title") || "" : "";
  const metaDescription = watch ? watch("metaDescription") || watch("summary") || "" : "";
  const slug = watch ? watch("slug") || "article-slug" : "article-slug";

  const titleLength = metaTitle.length;
  const descLength = metaDescription.length;

  const getTitleStatus = () => {
    if (titleLength === 0) return { label: "Missing title", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200" };
    if (titleLength < 30) return { label: "Too short (recommended 35-65 chars)", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200" };
    if (titleLength <= 65) return { label: "Optimal length (35-65 chars)", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200" };
    return { label: "Too long (Google truncates at 65)", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200" };
  };

  const getDescStatus = () => {
    if (descLength === 0) return { label: "Missing description", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200" };
    if (descLength < 100) return { label: "Too short (recommended 120-160 chars)", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200" };
    if (descLength <= 160) return { label: "Optimal length (120-160 chars)", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200" };
    return { label: "Too long (Google truncates at 160)", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200" };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescStatus();

  return (
    <div className="space-y-6 pt-6 border-t border-border-default">
      <div>
        <h3 className="text-base font-bold text-text-heading">Search Engine Optimization (SEO)</h3>
        <p className="text-xs text-text-muted mt-0.5">
          Optimize search snippet appearance on Google, LinkedIn, and social media.
        </p>
      </div>

      {/* Live Google Search Preview */}
      <div className="p-4 rounded-xl border border-border-default bg-surface space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-border-default">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Live Google Snippet Preview
          </span>
          <div className="flex items-center gap-1 bg-surface-subtle p-0.5 rounded-lg border border-border-default">
            <button
              type="button"
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                previewDevice === "desktop"
                  ? "bg-surface font-bold text-text-heading shadow-xs"
                  : "text-text-muted hover:text-text-heading"
              }`}
              aria-label="Desktop search snippet preview"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                previewDevice === "mobile"
                  ? "bg-surface font-bold text-text-heading shadow-xs"
                  : "text-text-muted hover:text-text-heading"
              }`}
              aria-label="Mobile search snippet preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Google Card Preview */}
        <div className={`p-3 rounded-lg bg-surface border border-border-default space-y-1 font-sans ${previewDevice === "mobile" ? "max-w-sm" : "w-full"}`}>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-4 h-4 rounded-full bg-brand-primary text-white flex items-center justify-center text-[9px] font-bold">
              CV
            </span>
            <span className="truncate">careervixa.com &rsaquo; articles &rsaquo; {slug}</span>
          </div>
          <h4 className="text-[#1a0dab] dark:text-[#8ab4f8] hover:underline font-medium text-base line-clamp-1 leading-snug cursor-pointer">
            {metaTitle || "Article Title | CareerVixa Executive Guides"}
          </h4>
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {metaDescription || "Comprehensive career advice, market compensation benchmarks, and actionable roadmaps from verified industry contributors."}
          </p>
        </div>
      </div>

      {/* Meta Title Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="metaTitle" className="font-semibold text-text-heading">
            Meta Title
          </label>
          <div className="flex items-center gap-2">
            <span className="text-text-muted tabular-nums">{titleLength} / 65</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${titleStatus.color}`}>
              {titleStatus.label}
            </span>
          </div>
        </div>
        <input
          id="metaTitle"
          {...register("metaTitle")}
          className="w-full flex h-11 rounded-lg border border-border-default bg-surface px-3.5 py-2 text-sm text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          placeholder="e.g. Master Salary Negotiation: Battle-Tested Scripts & Frameworks"
        />
        {errors.metaTitle && <p className="text-rose-600 text-xs mt-1">{errors.metaTitle.message}</p>}
      </div>

      {/* Meta Description Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="metaDescription" className="font-semibold text-text-heading">
            Meta Description
          </label>
          <div className="flex items-center gap-2">
            <span className="text-text-muted tabular-nums">{descLength} / 160</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${descStatus.color}`}>
              {descStatus.label}
            </span>
          </div>
        </div>
        <textarea
          id="metaDescription"
          {...register("metaDescription")}
          rows={3}
          className="w-full flex rounded-lg border border-border-default bg-surface px-3.5 py-2 text-sm text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary resize-none"
          placeholder="e.g. Stop leaving money on the table. Discover the exact 3-step conversation scripts and compensation data top performers use to negotiate 20%+ higher salaries."
        />
        {errors.metaDescription && <p className="text-rose-600 text-xs mt-1">{errors.metaDescription.message}</p>}
      </div>
    </div>
  );
}
