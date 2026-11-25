import React from "react";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service & Refund Policy",
  description: "Terms of service, delivery policies, and full refund guarantee terms for OffPage SEO Services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-sm text-[#EBF1FF] leading-relaxed">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <span className="text-xs font-bold text-[#1FA9E0] uppercase tracking-widest">
            Service Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Terms of Service & Refund Policy</h1>
          <p className="text-xs text-sky-300/80">
            Last updated: November 25, 2026 · {siteConfig.brandName}
          </p>
        </div>

        {/* Exact Refund Policy Box */}
        <div className="p-6 rounded-xl bg-[#092252] border border-sky-400/40 space-y-2">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            Our Refund Guarantee Policy
          </h2>
          <p className="text-[#EBF1FF]">
            <strong>Full refund within 12 to 24 hours before the delivery date:</strong> If our outreach team is unable to secure placement on an agreed publisher meeting your domain criteria, or if the delivery date cannot be fulfilled, you are eligible for an immediate 100% full refund upon written request.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Placement Standards</h2>
          <p className="text-slate-300">
            All guest posts, niche edits, and backlinks are executed in accordance with the metrics specified on our product pages (e.g. DA/DR thresholds, traffic filters, dofollow attribution). We guarantee permanent placement with a 12-month free replacement warranty if a host webmaster removes or alters a link.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Permitted Niches</h2>
          <p className="text-slate-300">
            We accept virtually all commercial niches, including technology, finance, crypto, SaaS, health, real estate, and iGaming/casino (via specialized casino tiers). We strictly prohibit adult content, illegal wares, hate speech, or defamatory campaigns.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Search Engine Rankings Disclaimer</h2>
          <p className="text-slate-300">
            While our backlinks strictly follow authoritative, contextual manual outreach standards designed to boost organic search presence, third-party search engines and AI answers control their proprietary algorithms. We guarantee verified placements, live URLs, and metric thresholds, but do not guarantee specific numerical search rankings.
          </p>
        </section>
      </div>
    </div>
  );
}
