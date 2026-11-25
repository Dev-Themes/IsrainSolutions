import React from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { ArrowRight, ShieldAlert, Check } from "lucide-react";

export const metadata = buildMetadata({
  title: "PBN Backlinks from Aged, Private Domains",
  description:
    "High-authority backlinks from aged, private domains with clean histories, unique IPs, and zero footprints.",
  path: "/pbn",
});

export default function PbnHubPage() {
  const pbnTiers = [
    {
      title: "High DR and DA PBN Backlinks",
      slug: "high-dr-da-backlinks",
      tagline: "Aged domain backlinks with high Moz DA and Ahrefs DR for maximum equity transfer.",
      price: "$10",
      features: ["Aged domains (5+ years)", "Unique C-class IPs", "Contextual in-content placement", "Zero footprint nameservers"],
    },
    {
      title: "iGaming and Casino PBN Backlinks",
      slug: "casino-igaming-backlinks",
      tagline: "Dedicated aged domains supporting betting, casino, and gambling target landing pages.",
      price: "$20",
      features: ["Gambling and casino permitted", "Clean anchor histories", "Permanent posts", "Rapid indexation"],
    },
    {
      title: "Sidebar and Blogroll PBN Backlinks",
      slug: "sidebar-blogroll-backlinks",
      tagline: "Sitewide sidebar or blogroll links across aged domains for maximum link volume.",
      price: "$15",
      features: ["Sitewide domain presence", "Clean Wayback histories", "High domain trust scores", "Full reporting"],
    },
  ];

  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Private Network Assets</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            PBN backlinks from aged, private domains.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Aged domains with accumulated PageRank and clean historical profiles. Transparently framed for strategic, multi-tiered link equity transfer.
          </p>
        </div>

        {/* Risk Policy Box */}
        <div className="p-6 rounded-xl bg-[#06163b]/85 border border-amber-500/40 text-xs text-[#EBF1FF] space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Strategic Risk & Transparency Notice</span>
          </div>
          <p className="text-slate-300">
            We believe in complete honesty: while private networks provide substantial ranking power, they carry higher algorithmic risk than pure white-hat outreach. We advise deploying PBN links primarily for Tier 2 amplification or competitive affiliate niches.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pbnTiers.map((tier) => (
            <div
              key={tier.slug}
              className="p-8 rounded-2xl bg-[#06163b]/85 border border-white/10 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className="text-2xl font-mono font-bold text-[#1FA9E0]">
                  From {tier.price}
                </span>
                <h2 className="text-xl font-bold text-white">{tier.title}</h2>
                <p className="text-xs text-slate-300">{tier.tagline}</p>
                <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-[#EBF1FF]">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1FA9E0]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/pbn/${tier.slug}`}
                  className="text-xs font-bold text-white hover:text-[#1FA9E0] flex items-center gap-1"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href={`/order?service=${tier.slug}`}
                  className="px-4 py-2 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34bbf0] transition-all"
                >
                  Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
