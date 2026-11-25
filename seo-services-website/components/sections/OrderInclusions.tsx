import React from "react";
import { CheckCircle2, Shield, Users, Compass, FileSpreadsheet, Lock } from "lucide-react";

export const OrderInclusions: React.FC = () => {
  const inclusions = [
    {
      title: "Manual outreach",
      desc: "We personally contact real webmasters and editors. No automated blast tools, no private PBN farms masquerading as outreach, and no fake sites.",
      icon: Users,
    },
    {
      title: "Real websites with traffic",
      desc: "Every domain is vetted for active search presence, organic keyword rankings, healthy backlink histories, and minimal spam scores.",
      icon: Compass,
    },
    {
      title: "Contextual dofollow links",
      desc: "Your link is placed naturally inside high-relevance editorial body copy using safe, diverse, contextual anchor text.",
      icon: CheckCircle2,
    },
    {
      title: "Permanent placement",
      desc: "Posts and links are placed editorially to remain live indefinitely. If a link drops within 12 months, we replace it free of charge.",
      icon: Lock,
    },
    {
      title: "A full report",
      desc: "Complete transparency on every order. When delivery concludes, you receive an organized sheet containing live URLs, anchor text, and DA/DR metrics.",
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section className="bg-[#020817] py-20 lg:py-28 border-b border-sky-500/15">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>What every order includes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            The same standard on every backlink.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Whether you order a single $10 post or a full-scale corporate authority campaign, our quality assurance criteria remain consistent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#06163b]/80 border border-sky-500/25 hover:border-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#092252] border border-sky-400/40 text-sky-300 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
