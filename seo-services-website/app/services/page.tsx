import React from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import { servicesData } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { ServiceTabs } from "@/components/sections/ServiceTabs";

export const metadata = buildMetadata({
  title: "Link Building Packages and Prices, Side by Side",
  description:
    "Compare all off-page SEO services and backlink packages. Niche guest posts, general guest posts, niche edits, PBN links, and PR distribution with transparent pricing.",
  path: "/services",
});

export default function ServicesHubPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#000B27] via-black to-black py-16 sm:py-24 border-b border-white/5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Complete catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Link building packages and prices, side by side.
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] max-w-2xl mx-auto leading-relaxed">
            Every service is priced per order. No recurring retainer commitments, no hidden setup fees. Choose the placement tier that matches your keyword difficulty.
          </p>
        </div>
      </section>

      {/* Services Tabs Catalog */}
      <ServiceTabs />

      {/* Side-by-Side Comparison Matrix */}
      <section className="bg-[#020817] py-20 border-b border-white/5">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Service Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Compare metrics, link types, and starting rates across our primary backlink products.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#06163b]/85">
            <table className="w-full text-left text-xs text-[#EBF1FF] min-w-[700px]">
              <thead className="bg-[#040f2b] text-[11px] uppercase tracking-wider text-[#1FA9E0] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Service</th>
                  <th className="py-3.5 px-4 font-bold">Starting Price</th>
                  <th className="py-3.5 px-4 font-bold">Site Quality</th>
                  <th className="py-3.5 px-4 font-bold">Content Included</th>
                  <th className="py-3.5 px-4 font-bold">Link Type</th>
                  <th className="py-3.5 px-4 font-bold">Turnaround</th>
                  <th className="py-3.5 px-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {servicesData.map((svc) => (
                  <tr key={svc.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="hover:text-[#1FA9E0] transition-colors"
                      >
                        {svc.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-[#1FA9E0]">
                      From ${svc.startingPrice}
                    </td>
                    <td className="py-4 px-4 font-mono text-sky-300/80">
                      {svc.metrics.da} {svc.metrics.dr ? `/ ${svc.metrics.dr}` : ""}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {svc.tab === "content-pr" ? "100% Original" : "500–700 words"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {svc.metrics.dofollow ? "Dofollow" : "Editorial"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sky-300/80">{svc.deliveryTime}</td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1FA9E0] hover:underline"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
