"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

interface Publisher {
  name: string;
  domain: string;
  category: string;
  da: number;
  dr: number;
  traffic: string;
}

const publishersRow1: Publisher[] = [
  { name: "Business Insider Africa", domain: "africa.businessinsider.com", category: "Business", da: 89, dr: 88, traffic: "250k+" },
  { name: "The Independent", domain: "independent.co.uk", category: "News & Media", da: 94, dr: 92, traffic: "1.2M+" },
  { name: "Markets Insider", domain: "markets.businessinsider.com", category: "Finance", da: 91, dr: 90, traffic: "800k+" },
  { name: "MSN", domain: "msn.com", category: "General Portal", da: 92, dr: 93, traffic: "3.5M+" },
  { name: "UrbanMatter", domain: "urbanmatter.com", category: "Lifestyle", da: 64, dr: 72, traffic: "95k+" },
  { name: "The Source", domain: "thesource.com", category: "Culture", da: 76, dr: 78, traffic: "140k+" },
  { name: "The Signal", domain: "signalscv.com", category: "News", da: 68, dr: 70, traffic: "65k+" },
  { name: "Trending US", domain: "trendingus.com", category: "Trends", da: 58, dr: 64, traffic: "45k+" },
];

const publishersRow2: Publisher[] = [
  { name: "Daily Trust", domain: "dailytrust.com", category: "News", da: 74, dr: 75, traffic: "310k+" },
  { name: "1883 Magazine", domain: "1883magazine.com", category: "Arts & Culture", da: 62, dr: 68, traffic: "55k+" },
  { name: "News Ghana", domain: "newsghana.com.gh", category: "World Affairs", da: 66, dr: 71, traffic: "120k+" },
  { name: "TechTimes", domain: "techtimes.com", category: "Technology & AI", da: 84, dr: 82, traffic: "420k+" },
  { name: "VentureBeat", domain: "venturebeat.com", category: "Tech & AI", da: 92, dr: 91, traffic: "1.1M+" },
  { name: "Bplans", domain: "bplans.com", category: "Business", da: 75, dr: 76, traffic: "190k+" },
  { name: "TechBullion", domain: "techbullion.com", category: "FinTech & Web3", da: 65, dr: 73, traffic: "85k+" },
  { name: "Digital Journal", domain: "digitaljournal.com", category: "PR & Tech", da: 86, dr: 84, traffic: "650k+" },
];

export const PublisherMarquee: React.FC = () => {
  // Seamless loop duplicates
  const row1Duplicated = [...publishersRow1, ...publishersRow1];
  const row2Duplicated = [...publishersRow2, ...publishersRow2];

  return (
    <section className="bg-[#020817] py-16 sm:py-20 border-b border-sky-500/15 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span>Where we publish</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sites we place guest posts on.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              A sample of the 2,000+ vetted websites in our catalog across technology, business, lifestyle, finance, and general media.
            </p>
          </div>

          <Link
            href="/guest-post-sites"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500/15 border border-sky-400/40 text-xs font-bold text-sky-300 hover:text-white hover:bg-sky-400/25 transition-all shadow-[0_0_15px_rgba(56,189,248,0.12)] whitespace-nowrap"
          >
            <span>Browse 2,000+ sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Continuous Marquee Stream 1 (Uni-directional smooth motion) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-continuous flex gap-3.5 py-2">
          {row1Duplicated.map((pub, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all min-w-[270px] sm:min-w-[290px] flex-shrink-0 cursor-default group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/40 flex items-center justify-center font-bold text-xs text-sky-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                  {pub.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate group-hover:text-sky-300 transition-colors">
                    {pub.name}
                  </span>
                  <span className="text-[10px] text-sky-300/80 font-mono block truncate">
                    {pub.domain}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/35 text-[10px] font-mono font-bold text-sky-300">
                  DA {pub.da}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                  DR {pub.dr}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuous Marquee Stream 2 (Slightly offset speed, uni-directional smooth motion) */}
      <div className="relative w-full overflow-hidden mt-3.5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee-slow flex gap-3.5 py-2">
          {row2Duplicated.map((pub, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#06163b]/90 border border-sky-400/30 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all min-w-[270px] sm:min-w-[290px] flex-shrink-0 cursor-default group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/40 flex items-center justify-center font-bold text-xs text-sky-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4 text-sky-400" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-xs text-white block truncate group-hover:text-sky-300 transition-colors">
                    {pub.name}
                  </span>
                  <span className="text-[10px] text-sky-300/80 font-mono block truncate">
                    {pub.domain}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/35 text-[10px] font-mono font-bold text-sky-300">
                  DA {pub.da}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5 font-mono">
                  {pub.traffic}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
