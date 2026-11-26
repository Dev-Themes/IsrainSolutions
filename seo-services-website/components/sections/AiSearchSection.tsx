"use client";

import React from "react";
import { Sparkles, Bot, SearchCode, Cpu } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const AiSearchSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#00081d] via-[#041235] to-[#00081d] py-20 lg:py-28 border-b border-sky-500/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-sky-500/5 blur-[150px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context & Realities (Slides in from Left) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" delay={100} duration={800}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FA9E0]/10 border border-[#1FA9E0]/30 text-[#1FA9E0] text-[11px] font-bold uppercase tracking-[0.14em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0] animate-pulse" />
                <span>AI Search: AEO &amp; GEO Optimization</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.18]">
                Do backlinks help you show up in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  ChatGPT &amp; Google AI Overviews?
                </span>
              </h2>

              {/* ElementsKit Separator */}
              <div className="flex items-center gap-1.5 my-4">
                <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]" />
                <span className="w-2 h-2 rounded-full bg-[#1FA9E0] shadow-[0_0_8px_#1FA9E0]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]/60" />
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  Generative AI search engines (ChatGPT Search, Perplexity, Gemini, and Google AI Overviews) synthesize answers by indexing and retrieving information from authoritative pages across the live web.
                </p>
                <p>
                  When reputable, high-traffic publications repeatedly cover, cite, and link to your brand, large language models establish the entity proof required to incorporate your domain as a verified reference in AI answer cards.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3 Definition Cards (Slides in from Right) */}
          <div className="lg:col-span-6 space-y-4">
            <ScrollReveal direction="right" delay={150} duration={800}>
              <div className="p-6 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 hover:shadow-[0_10px_35px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)] transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <SearchCode className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-sky-300 transition-colors">
                    AEO: Answer Engine Optimization
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Structuring pages to win featured snippets, People Also Ask boxes, and AI summaries with direct, factual answers and clear semantic headers.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={300} duration={800}>
              <div className="p-6 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 hover:shadow-[0_10px_35px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)] transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-sky-300 transition-colors">
                    GEO: Generative Engine Optimization
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Earning editorial brand citations inside Perplexity, ChatGPT, and Gemini. Contextual links on high-trust industry sites provide the entity verification AI citations require.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={450} duration={800}>
              <div className="p-6 rounded-2xl bg-[#03000B] border border-sky-500/25 hover:border-sky-400 hover:shadow-[0_10px_35px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.18)] transition-all flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#06173d] border border-sky-500/30 flex items-center justify-center text-[#1FA9E0] group-hover:bg-[#1FA9E0] group-hover:text-slate-950 transition-colors flex-shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider group-hover:text-sky-300 transition-colors">
                    Entity Proof &amp; Knowledge Graph Citations
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Wikipedia citations and digital PR syndication establish your domain in Google&apos;s Knowledge Graph, preventing brand confusion across search engines.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
