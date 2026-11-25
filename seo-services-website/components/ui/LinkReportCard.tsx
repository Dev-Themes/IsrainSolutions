import React from "react";
import { CheckCircle2, ShieldCheck, TrendingUp, Search, Rocket, ExternalLink } from "lucide-react";

export const LinkReportCard: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating subtle badges */}
      <div className="absolute -top-4 -left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#061e47]/95 border border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] text-[11px] text-sky-200 font-semibold animate-bounce duration-1000">
        <Rocket className="w-3.5 h-3.5 text-sky-400" />
        <span>+142% Organic Growth</span>
      </div>

      <div className="absolute -bottom-3 -right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#061e47]/95 border border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] text-[11px] text-sky-200 font-semibold">
        <Search className="w-3.5 h-3.5 text-sky-400" />
        <span>Google & AI Indexed</span>
      </div>

      {/* Main Glass Panel */}
      <div className="relative overflow-hidden rounded-2xl bg-[#061b47]/90 backdrop-blur-md border border-sky-400/40 p-5 sm:p-6 shadow-[0_20px_50px_rgba(2,8,23,0.9),0_0_30px_rgba(56,189,248,0.12)]">
        {/* Top Header of Card */}
        <div className="flex items-center justify-between pb-4 border-b border-sky-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Client Live Link Report</span>
              </div>
              <span className="text-[10px] text-sky-300/80">Verified Ahrefs DR 30+ · Organic Traffic</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-[10px] font-bold text-emerald-300 uppercase tracking-widest shadow-[0_0_10px_rgba(52,211,153,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live
          </span>
        </div>

        {/* Mini SVG Trend Chart */}
        <div className="py-4">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-[11px] font-medium text-slate-300">Keyword Authority & Impressions</span>
            <span className="text-xs font-bold text-sky-400">+384% YoY</span>
          </div>
          <div className="w-full h-16 sm:h-20 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 300 70"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,60 C 50,55 90,45 130,35 C 170,25 210,30 250,15 C 275,8 290,5 300,2 L 300,70 L 0,70 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M 0,60 C 50,55 90,45 130,35 C 170,25 210,30 250,15 C 275,8 290,5 300,2"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="300" cy="2" r="4" fill="#7dd3fc" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Placement Table Rows */}
        <div className="space-y-2 pt-2">
          {[
            {
              domain: "techtrends-insider.com",
              niche: "Tech & SaaS",
              da: "DA 54",
              traffic: "18.4k",
            },
            {
              domain: "financestrategyjournal.org",
              niche: "Finance & B2B",
              da: "DA 61",
              traffic: "42.1k",
            },
            {
              domain: "digitalmarketingwire.net",
              niche: "Marketing & SEO",
              da: "DA 48",
              traffic: "9.2k",
            },
          ].map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#082255]/80 border border-sky-500/25 hover:border-sky-400/60 hover:bg-[#0a2b6b] transition-all text-xs"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white block text-[11px] sm:text-xs">
                    {row.domain}
                  </span>
                  <span className="text-[10px] text-sky-200/70">{row.niche}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/30 text-[10px] font-mono text-sky-200">
                  {row.da}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  Dofollow · Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Verified Toast at bottom */}
        <div className="mt-4 p-2.5 rounded-lg bg-[#041336] border border-sky-400/40 flex items-center justify-between text-xs shadow-[inset_0_1px_0_rgba(125,211,252,0.15)]">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span className="font-medium text-[11px] text-sky-100">Link is live: indexed and dofollow</span>
          </div>
          <span className="text-[10px] text-sky-300 font-mono">100% Verified</span>
        </div>
      </div>
    </div>
  );
};
