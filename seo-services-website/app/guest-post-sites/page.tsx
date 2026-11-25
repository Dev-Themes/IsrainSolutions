import React from "react";
import { guestPostSites } from "@/content/sites";
import { SiteTable } from "@/components/ui/SiteTable";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Guest Post Sites List with DA, DR and Traffic",
  description:
    "Pick the exact site your guest post goes on. Search and filter through our verified catalog of 2,000+ guest post publishers by niche, domain authority, and organic traffic.",
  path: "/guest-post-sites",
});

export default function GuestPostSitesPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Publisher Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Pick the site your guest post goes on.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Search, sort, and select from our vetted list of publisher websites. All placements feature manual outreach, original content drafting, contextual dofollow attribution, and permanent indexing.
          </p>
        </div>

        <SiteTable sites={guestPostSites} type="guest-post" />
      </div>
    </div>
  );
}
