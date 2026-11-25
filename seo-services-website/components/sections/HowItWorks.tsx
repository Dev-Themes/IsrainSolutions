"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepData {
  step: string;
  title: string;
  shortDesc: string;
  badge: string;
  icon: React.ElementType;
}

const steps: StepData[] = [
  {
    step: "01",
    title: "Send URL and target keywords",
    shortDesc: "Submit your target landing page and 1 to 5 target keywords. We evaluate your current anchor profile and topical relevance.",
    badge: "Brief & Anchor Audit",
    icon: Search,
  },
  {
    step: "02",
    title: "Manual publisher outreach",
    shortDesc: "We search our vetted catalog of 2,000+ active websites for authentic, traffic-generating publications strictly in your niche.",
    badge: "100% Genuine Sites",
    icon: Layers,
  },
  {
    step: "03",
    title: "Editorial writing and placement",
    shortDesc: "Experienced writers craft original, helpful editorial content. We secure the placement with a natural, in-context dofollow link.",
    badge: "Contextual Dofollow",
    icon: FileText,
  },
  {
    step: "04",
    title: "Quality check and live report",
    shortDesc: "We verify indexation, anchor text, and dofollow attribution. You receive an organized spreadsheet report with live URLs and metrics.",
    badge: "Verified Delivery",
    icon: FileSpreadsheet,
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="bg-[#020817] py-20 lg:py-28 border-b border-sky-500/15 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span>Interactive Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            How our link building process works.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Click through each phase below to inspect the deliverables, quality checks, and live reports we prepare for your order.
          </p>
        </div>

        {/* Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Step Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-[#082255] via-[#061a45] to-[#041235] border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.22)] translate-x-1"
                      : "bg-[#06163b]/75 border-sky-500/20 hover:border-sky-400/50 hover:bg-[#071d4a]/80"
                  )}
                >
                  {/* Left step badge */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-colors",
                      isActive
                        ? "bg-sky-400 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                        : "bg-sky-500/10 text-sky-300 border border-sky-400/25 group-hover:border-sky-300"
                    )}
                  >
                    {item.step}
                  </div>

                  {/* Step copy */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300/80">
                        {item.badge}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                      )}
                    </div>
                    <h3
                      className={cn(
                        "text-sm sm:text-base font-bold transition-colors",
                        isActive ? "text-white" : "text-slate-200 group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Live Interactive Deliverable Inspector */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#06183d]/95 border-2 border-sky-400/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(56,189,248,0.12)] backdrop-blur-md relative overflow-hidden min-h-[460px] flex flex-col justify-between">
              {/* Header of Inspector */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-sky-500/20 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-sky-400 block">
                        Deliverable Inspector · Step {steps[activeStep].step} of 04
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {steps[activeStep].title}
                      </h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-sky-950/80 border border-sky-400/40 text-[10px] font-mono text-sky-200">
                    Live Preview
                  </span>
                </div>

                {/* Step 1 Visual Mock: Anchor & URL Audit */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-3.5 rounded-xl bg-[#040f2b] border border-sky-500/25 space-y-1.5">
                      <span className="text-[10px] font-mono text-sky-300/80 uppercase">Target Landing Page</span>
                      <div className="text-xs font-mono text-white flex items-center justify-between">
                        <span>https://yourwebsite.com/enterprise-cloud/</span>
                        <span className="text-emerald-400 font-bold">200 OK</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#040f2b] border border-sky-500/25 space-y-3">
                      <span className="text-xs font-bold text-white block">Anchor Text Ratio Analysis</span>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-300">Branded & URL Anchors (Recommended: 50–70%)</span>
                            <span className="text-sky-300 font-mono font-bold">62%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-sky-950 overflow-hidden">
                            <div className="h-full bg-sky-400 rounded-full" style={{ width: "62%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-300">Topical / Partial Match (Recommended: 20–30%)</span>
                            <span className="text-sky-300 font-mono font-bold">28%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-sky-950 overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{ width: "28%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-300">Exact Match Keyword (Recommended: 3–8%)</span>
                            <span className="text-sky-300 font-mono font-bold">5%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-sky-950 overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: "5%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-400/40 text-xs text-emerald-300">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                      <span>Natural anchor profile. Safe to deploy contextual niche links without risk of over-optimization.</span>
                    </div>
                  </div>
                )}

                {/* Step 2 Visual Mock: Manual Outreach Pipeline */}
                {activeStep === 1 && (
                  <div className="space-y-3 animate-fade-in">
                    <span className="text-xs font-bold text-white block">Verified Niche Publishers Selected for Your Brief:</span>
                    {[
                      { domain: "techfin-chronicle.com", da: "DA 56", dr: "DR 61", traffic: "48.2k/mo", status: "Outreach Accepted" },
                      { domain: "cloudscalejournal.org", da: "DA 64", dr: "DR 68", traffic: "115.4k/mo", status: "Editor Approved" },
                      { domain: "enterprisewire.net", da: "DA 52", dr: "DR 55", traffic: "32.1k/mo", status: "Slot Reserved" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#040f2b] border border-sky-500/25 flex items-center justify-between text-xs"
                      >
                        <div>
                          <strong className="text-white block">{item.domain}</strong>
                          <span className="text-[10px] text-sky-300/80 font-mono">
                            {item.da} · {item.dr} · {item.traffic} organic traffic
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-sky-950/80 border border-sky-400/40 text-[10px] font-bold text-sky-300">
                          {item.status}
                        </span>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-[#040f2b] border border-sky-500/30 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>All 3 publications verified: zero private blog network (PBN) footprint and clean link histories.</span>
                    </div>
                  </div>
                )}

                {/* Step 3 Visual Mock: Editorial Content & Placement */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="p-4 rounded-xl bg-[#040f2b] border border-sky-500/25 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-sky-300/80 font-mono">
                        <span>Article: 680 Words · Native Tech Writer</span>
                        <span>Dofollow Contextual Placement</span>
                      </div>
                      <h5 className="text-sm font-bold text-white">
                        Modern Cloud Architecture: Scaling High-Throughput Workflows in 2026
                      </h5>
                      <div className="p-3 rounded-lg bg-[#020817] border border-sky-500/20 text-xs text-slate-200 leading-relaxed font-serif">
                        &quot;...when optimizing high-volume distributed pipelines, enterprise teams increasingly rely on specialized{" "}
                        <span className="text-sky-300 font-sans font-bold underline decoration-sky-400 underline-offset-4 bg-sky-500/20 px-1 py-0.5 rounded">
                          cloud computing solutions
                        </span>{" "}
                        to decouple intensive billing cycles from front-end user experience, achieving 99.99% availability under peak loads...&quot;
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-lg bg-[#040f2b] border border-sky-500/20">
                        <span className="text-[10px] font-mono text-sky-300/80 uppercase block">Copyscape Status</span>
                        <strong className="text-white block mt-0.5">100% Original Content</strong>
                      </div>
                      <div className="p-3 rounded-lg bg-[#040f2b] border border-sky-500/20">
                        <span className="text-[10px] font-mono text-sky-300/80 uppercase block">Placement Type</span>
                        <strong className="text-sky-400 block mt-0.5">In-Body Editorial Link</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4 Visual Mock: Verified Client Spreadsheet Report */}
                {activeStep === 3 && (
                  <div className="space-y-3 animate-fade-in">
                    <span className="text-xs font-bold text-white block">Sample Client Live URL Spreadsheet Delivery:</span>
                    <div className="overflow-x-auto rounded-xl border border-sky-500/25 bg-[#040f2b]">
                      <table className="w-full text-left text-[11px] text-slate-200">
                        <thead className="bg-[#020817] text-sky-300 uppercase tracking-wider font-mono border-b border-sky-500/20">
                          <tr>
                            <th className="py-2.5 px-3">Live Placement URL</th>
                            <th className="py-2.5 px-3">Anchor</th>
                            <th className="py-2.5 px-3">DA/DR</th>
                            <th className="py-2.5 px-3">Google Index</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-500/15 font-mono">
                          <tr>
                            <td className="py-2.5 px-3 truncate max-w-[150px] text-sky-400">cloudscalejournal.org/...</td>
                            <td className="py-2.5 px-3 text-white">cloud computing</td>
                            <td className="py-2.5 px-3">64 / 68</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Indexed</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 px-3 truncate max-w-[150px] text-sky-400">techfin-chronicle.com/...</td>
                            <td className="py-2.5 px-3 text-white">brand anchor</td>
                            <td className="py-2.5 px-3">56 / 61</td>
                            <td className="py-2.5 px-3 text-emerald-400 font-bold">✓ Indexed</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/60 border border-emerald-400/40 text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                        <span>12-Month Link Replacement Warranty Active</span>
                      </div>
                      <span className="font-mono text-[10px] text-emerald-200">Export: CSV / Sheets</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Navigation Footer */}
              <div className="pt-6 mt-6 border-t border-sky-500/20 flex items-center justify-between text-xs">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg border border-sky-500/30 text-sky-200 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Previous Step
                </button>
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      aria-label={`Jump to step ${i + 1}`}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        activeStep === i
                          ? "bg-sky-400 w-6 shadow-[0_0_8px_#38bdf8]"
                          : "bg-sky-500/30 hover:bg-sky-400/50"
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 font-semibold"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
