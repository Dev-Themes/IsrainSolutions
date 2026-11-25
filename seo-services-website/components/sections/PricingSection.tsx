import React from "react";
import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import { guestPostPackages } from "@/content/pricing";

export const PricingSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#020817] via-[#04133b] to-[#020817] py-20 lg:py-28 border-b border-sky-500/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>Guest post packages</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Most clients start with a guest post.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Three transparent packages with a one-time payment. All placements use DA and DR 30+ sites with verified Ahrefs organic traffic of 5,000+.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {guestPostPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 backdrop-blur-sm ${
                pkg.isPopular
                  ? "bg-gradient-to-b from-[#082255] to-[#05163b] border-2 border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.3)] md:-translate-y-2"
                  : "bg-[#06163b]/85 border border-sky-400/35 hover:border-sky-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
              }`}
            >
              {/* Popular Ribbon */}
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-sky-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-300 mt-1.5 min-h-[32px]">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pb-4 border-b border-sky-500/20">
                  <span className="text-4xl font-extrabold text-white">${pkg.price}</span>
                  <span className="text-xs text-sky-300">/ one-time</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span><strong>{pkg.linksCount} guest post link{pkg.linksCount > 1 ? "s" : ""}</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{pkg.siteQuality} guaranteed</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{pkg.traffic}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{pkg.content}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{pkg.placement}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>Live URL delivery report</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/order?package=${pkg.id}`}
                  className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black hover:from-[#34bbf0] hover:to-[#7dd3fc] shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                      : "border border-sky-400/50 text-sky-200 hover:text-white hover:bg-sky-500/15 hover:border-sky-300"
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="mt-8 text-center text-xs text-[#7898B0]">
          Casino, betting, or iGaming only? Placements start at $30.{" "}
          <Link
            href="/services/casino-igaming-guest-posts"
            className="text-[#1FA9E0] hover:underline font-semibold"
          >
            See casino guest posts →
          </Link>
        </div>
      </div>
    </section>
  );
};
