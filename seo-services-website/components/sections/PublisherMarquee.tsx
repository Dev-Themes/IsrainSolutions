"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
  const row1Duplicated = [...publishersRow1, ...publishersRow1];
  const row2Duplicated = [...publishersRow2, ...publishersRow2];

  return (
    <section className="bg-[#00081d] py-16 sm:py-24 border-b border-sky-500/20 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            align="center"
            eyebrow="Technologies &amp; Publications"
            title={
              <>
                Platforms &amp; Media We{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Love To Work With
                </span>
              </>
            }
            subtitle="Direct manual outreach across 2,000+ active niche websites, national media outlets, and high-trust search platforms. Inspect sample publishers below."
          />

          <div className="flex items-center justify-center -mt-6 mb-4">
            <Link
              href="/guest-post-sites"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-sky-400/40 bg-[#06173d]/70 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0a2355] hover:border-sky-300 transition-all shadow-sm group"
            >
              <span>Explore All 2,000+ Vetted Sites</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1FA9E0] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Row 1: Leftward continuous marquee */}
      <div className="relative w-full overflow-hidden mb-5">
        {/* Left & Right Gradient Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#00081d] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#00081d] to-transparent z-10" />

        <div className="flex gap-4 w-max animate-publisher-marquee hover:[animation-play-state:paused]">
          {row1Duplicated.map((pub, idx) => {
            const floatClass = idx % 2 === 0 ? "floating-tile-1" : "floating-tile-2";
            return (
              <div
                key={`row1-${idx}`}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-200 hover:shadow-[0_0_25px_rgba(31,169,224,0.3)] flex-shrink-0 w-[240px] sm:w-[270px] group cursor-pointer ${floatClass}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors flex-shrink-0 shadow-[0_0_10px_rgba(31,169,224,0.15)]">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate block">
                    {pub.name}
                  </span>
                  <span className="text-[10px] text-sky-200/70 font-mono truncate block">
                    {pub.domain}
                  </span>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-400/30">
                    DA {pub.da}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {pub.traffic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Rightward / offset continuous marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Gradient Fade Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#00081d] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#00081d] to-transparent z-10" />

        <div className="flex gap-4 w-max animate-publisher-marquee-reverse hover:[animation-play-state:paused]">
          {row2Duplicated.map((pub, idx) => {
            const floatClass = idx % 2 === 0 ? "floating-tile-2" : "floating-tile-1";
            return (
              <div
                key={`row2-${idx}`}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 transition-all duration-200 hover:shadow-[0_0_25px_rgba(31,169,224,0.3)] flex-shrink-0 w-[240px] sm:w-[270px] group cursor-pointer ${floatClass}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors flex-shrink-0 shadow-[0_0_10px_rgba(31,169,224,0.15)]">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate block">
                    {pub.name}
                  </span>
                  <span className="text-[10px] text-sky-200/70 font-mono truncate block">
                    {pub.domain}
                  </span>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-400/30">
                    DA {pub.da}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {pub.traffic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
