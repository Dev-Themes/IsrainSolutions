import React from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "Sidebar and Blogroll PBN Backlinks",
  description: "Sitewide sidebar and blogroll backlinks on aged authority domains.",
  path: "/pbn/sidebar-blogroll-backlinks",
});

export default function SidebarBlogrollPbnPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Sitewide Placements</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Sidebar and blogroll PBN backlinks.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Permanent sitewide sidebar and blogroll placements transmitting high link volume from indexed authority domains.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#06163b]/85 border-2 border-sky-400/40 max-w-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-sky-300/80 uppercase block">Package Rate</span>
              <strong className="text-3xl font-extrabold text-[#1FA9E0] font-mono">From $15</strong>
            </div>
            <Link
              href="/order?service=sidebar-blogroll"
              className="px-6 py-3 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider"
            >
              Order Now
            </Link>
          </div>

          <ul className="space-y-3 text-xs text-[#EBF1FF]">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>Sitewide sidebar or footer blogroll location</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>Dofollow link attribute on all indexed URLs</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>Clean domain backlink history</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
