"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-sky-500/20 bg-gradient-to-b from-[#00081d] via-[#020b24] to-[#010615]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-sky-500/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-blue-600/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Eyebrow & CTAs (Slides in from Left) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal direction="left" delay={100} duration={800}>
              {/* Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1FA9E0]/10 border border-[#1FA9E0]/30 text-[11px] sm:text-xs font-semibold text-sky-300 shadow-[0_0_20px_rgba(31,169,224,0.18)] max-w-full flex-wrap">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="tracking-wide">Available for New Authority Campaigns</span>
                <span className="text-white/40 hidden sm:inline">|</span>
                <span className="text-[10px] text-sky-200/80 uppercase font-mono">10+ Yrs Exp</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={200} duration={800}>
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.14] break-words">
                We build search authority{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] via-[#38bdf8] to-[#bae6fd]">
                  that scales.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={300} duration={800}>
              {/* Sub-headline & ElementsKit Separator */}
              <div className="space-y-3">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-[0.14em] text-[#1FA9E0]">
                  Your Vision, Our Expertise Search Engine Authority Agency
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]" />
                  <span className="w-2 h-2 rounded-full bg-[#1FA9E0] shadow-[0_0_8px_#1FA9E0]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60" />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={400} duration={800}>
              {/* Body Description */}
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-normal">
                Manual outreach guest posts, curated niche edits, and off-page SEO built by hand. Every link is permanently placed inside editorial body copy on genuine, indexed websites with verified Google traffic.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={500} duration={800}>
              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-200 shadow-[0_0_25px_rgba(31,169,224,0.35)] active:scale-95 group text-center"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg border border-sky-400/35 bg-[#06163b]/70 hover:bg-[#0a2355] hover:border-sky-300 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm text-center"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_8px_#25D366]" />
                  <span>Talk on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={600} duration={800}>
              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-sky-200/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA9E0]" />
                  100% Live URL Verification
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA9E0]" />
                  Ahrefs &amp; Moz Verified Metrics
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  12-24h Money-Back Guarantee
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Handcrafted Editorial Placement Deliverable Card (Slides in from Right) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" delay={250} duration={800}>
              <div className="relative rounded-2xl bg-[#03000B] border border-sky-500/30 p-6 sm:p-7 shadow-[0_20px_50px_rgba(2,8,23,0.95),0_0_30px_rgba(31,169,224,0.18)]">
                
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-4 border-b border-sky-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1FA9E0]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-300 font-bold">
                      VERIFIED PLACEMENT REPORT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    STATUS: LIVE &amp; INDEXED
                  </span>
                </div>

                {/* Real Publication Details */}
                <div className="pt-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Host Publication</span>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>TechTimes.com</span>
                        <span className="text-[10px] font-normal text-slate-400">/ Tech &amp; Software</span>
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-[#06173d] text-sky-300 border border-sky-500/30 font-bold">DA 84</span>
                      <span className="px-2 py-0.5 rounded bg-[#06173d] text-sky-300 border border-sky-500/30 font-bold">DR 82</span>
                    </div>
                  </div>

                  {/* Article Headline */}
                  <div className="p-3.5 rounded-xl bg-[#06173d]/70 border border-sky-500/25 space-y-2">
                    <div className="text-[10px] uppercase font-mono text-sky-400 font-semibold">Article Title</div>
                    <p className="text-xs font-semibold text-white leading-snug">
                      &quot;How High-Growth Digital Brands Scale Organic Search Authority in 2026&quot;
                    </p>
                    {/* In-Context Backlink Snippet */}
                    <div className="pt-2 border-t border-sky-500/20 text-xs text-slate-300 leading-relaxed font-normal">
                      &quot;...to establish topical authority in competitive search queries, organizations collaborate with proven link building partners like{" "}
                      <span className="text-[#1FA9E0] font-bold underline underline-offset-2 decoration-[#1FA9E0]/60">
                        yourbrand.com
                      </span>{" "}
                      to secure permanent editorial placements on reputable web publications.&quot;
                    </div>
                  </div>

                  {/* 3 Placement Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                    <div className="p-2 rounded-lg bg-[#010a1f] border border-sky-500/20">
                      <span className="text-[10px] text-slate-400 uppercase block">Link Type</span>
                      <span className="text-xs font-bold text-white">Dofollow</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#010a1f] border border-sky-500/20">
                      <span className="text-[10px] text-slate-400 uppercase block">Context</span>
                      <span className="text-xs font-bold text-white">In-Content</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#010a1f] border border-sky-500/20">
                      <span className="text-[10px] text-slate-400 uppercase block">Indexation</span>
                      <span className="text-xs font-bold text-emerald-400">Permanent</span>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2">
                    <Link
                      href="/guest-post-sites"
                      className="flex items-center justify-between p-3 rounded-lg bg-[#06173d]/80 hover:bg-[#0a2355] border border-sky-500/30 hover:border-sky-300 text-xs font-bold text-sky-300 hover:text-white transition-all group"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#1FA9E0]" />
                        Browse All 2,000+ Vetted Publishers
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
