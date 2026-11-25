import React from "react";
import { linkInsertionSites } from "@/content/sites";
import { SiteTable } from "@/components/ui/SiteTable";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Link Insertion Sites with DA, DR and Traffic",
  description:
    "Pick the aged article your link goes into. Browse available niche edit opportunities on verified blogs with established search rankings.",
  path: "/link-insertion-sites",
});

export default function LinkInsertionSitesPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Niche Edit Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Pick the article your link goes into.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Insert your target URL and anchor text directly into pre-ranked, indexed articles with accumulated search engine trust. Zero wait time for post indexing.
          </p>
        </div>

        <SiteTable sites={linkInsertionSites} type="link-insertion" />
      </div>
    </div>
  );
}
