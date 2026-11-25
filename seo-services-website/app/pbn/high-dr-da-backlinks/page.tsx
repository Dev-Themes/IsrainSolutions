import React from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "High DR and DA PBN Backlinks",
  description: "High authority PBN backlinks from aged domains with clean histories and zero footprints.",
  path: "/pbn/high-dr-da-backlinks",
});

export default function HighDrDaPbnPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>High Authority Assets</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            High DR and DA PBN backlinks.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Contextual backlinks placed inside aged private domains vetted for high domain metrics, diverse class-C IP addresses, and clean historical Wayback profiles.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-[#06163b]/85 border-2 border-sky-400/40 max-w-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs text-sky-300/80 uppercase block">Package Rate</span>
              <strong className="text-3xl font-extrabold text-[#1FA9E0] font-mono">From $10</strong>
            </div>
            <Link
              href="/order?service=high-dr-da-pbn"
              className="px-6 py-3 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider"
            >
              Order Now
            </Link>
          </div>

          <ul className="space-y-3 text-xs text-[#EBF1FF]">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>DA 25+ and DR 30+ minimum domain standard</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>Hosted across unique class-C IP subnets</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>500+ words contextual in-content placement</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#1FA9E0]" />
              <span>Permanent placement guarantee</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
