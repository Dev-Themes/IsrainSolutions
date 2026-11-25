import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { LinkReportCard } from "@/components/ui/LinkReportCard";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#041238] via-[#020b24] to-[#020817] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-sky-500/20">
      {/* Background frozen cyan glow texture */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-sky-600/10 to-transparent pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-400/50 bg-[#061b45]/90 text-xs font-semibold uppercase tracking-widest text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
              <span>Link building agency since 2016</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
              Link building services on real websites in your niche.
            </h1>

            {/* Sub-heading in accent with decorative underline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-400">
                MANUAL OUTREACH · REAL PUBLISHERS · CONTEXTUAL DOFOLLOW
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="w-12 h-0.5 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* Body paragraph */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Manual outreach to a vetted catalog of 2,000+ active websites. Contextual backlinks and editorial brand mentions that help your pages rank higher in Google and get cited in ChatGPT and AI Overviews. Every order ends with a full report of live URLs and verified authority metrics.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/services"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] hover:from-[#34bbf0] hover:to-[#7dd3fc] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center shadow-[0_0_30px_rgba(56,189,248,0.35)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>See services and prices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-sky-400/60 hover:border-sky-300 text-sky-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center flex items-center justify-center gap-2 bg-[#06183d]/60 hover:bg-[#0c2859] shadow-[0_0_15px_rgba(56,189,248,0.12)]"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>

            {/* Micro-guarantee */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Full refund within 12 to 24 hours before the delivery date.</span>
            </div>
          </div>

          {/* Right Column: Visual Component */}
          <div className="lg:col-span-5 flex justify-center">
            <LinkReportCard />
          </div>
        </div>
      </div>
    </section>
  );
};
