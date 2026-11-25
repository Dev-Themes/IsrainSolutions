import React from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { servicesData } from "@/content/services";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const metadata = buildMetadata({
  title: "Guest Post & Niche Edit Services",
  description:
    "Manual outreach guest posts and niche edits on verified DA 20+ to DA 50+ websites with organic traffic.",
  path: "/guest-posts",
});

export default function GuestPostsHubPage() {
  const guestServices = servicesData.filter((s) => s.tab === "guest-posts");

  return (
    <div className="flex flex-col w-full py-16 sm:py-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1FA9E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA9E0]" />
            <span>Manual Outreach Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Guest Post &amp; Niche Edit Services
          </h1>
          <p className="text-sm sm:text-base text-[#EBF1FF] leading-relaxed">
            Acquire permanent contextual dofollow backlinks placed on genuine websites within your topic vertical. Choose between new article guest posts or niche edits on aged articles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guestServices.map((svc) => (
            <div
              key={svc.id}
              className="p-8 rounded-2xl bg-[#06163b]/85 border-2 border-sky-400/40 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-sky-300/80">
                    {svc.metrics.da}
                  </span>
                  <span className="text-xs font-bold text-[#1FA9E0] bg-[#092252] px-3 py-1 rounded-full border border-sky-400/30">
                    From ${svc.startingPrice}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">{svc.name}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{svc.description}</p>
                <ul className="space-y-2 pt-2 border-t border-white/5 text-xs text-[#EBF1FF]">
                  {svc.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#1FA9E0]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/services/${svc.slug}`}
                  className="font-bold text-xs uppercase tracking-wider text-white hover:text-[#1FA9E0] flex items-center gap-1"
                >
                  <span>Read full specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/order?service=${svc.slug}`}
                  className="px-5 py-2.5 rounded-full bg-[#1FA9E0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#34bbf0] transition-all"
                >
                  Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
