import React from "react";
import { siteConfig } from "@/lib/site-config";
import { BriefForm } from "@/components/forms/BriefForm";
import { Mail, MessageSquare, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ContactBriefSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#020817] via-[#041238] to-[#020817] py-20 lg:py-28 border-b border-sky-500/20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Why clients reply */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Direct outreach</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Why clients reply.
            </h2>

            {/* Founder Note Card */}
            <div className="p-6 rounded-xl bg-[#06163b]/90 border border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.15)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-extrabold text-base flex items-center justify-center font-mono shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                  AQ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {siteConfig.founder.name}
                  </h3>
                  <span className="text-xs text-sky-300">
                    {siteConfig.founder.role}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                &quot;{siteConfig.founder.bio} Send the page you want to rank and we will tell you which links fit, or if the page needs on-page work first.&quot;
              </p>

              <div className="pt-2 border-t border-sky-500/20 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-white">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <a
                    href={siteConfig.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-slate-200 hover:text-white"
                  >
                    WhatsApp: {siteConfig.contact.whatsapp}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline text-slate-200 hover:text-white">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* 3 Reassurance Rows */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Reply within 24 hours</strong>
                  <span>Fast analysis and placement options on all business days.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Full refund if we&apos;re late</strong>
                  <span>Money back if placement cannot be finalized within 12 to 24 hours of delivery target.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Every niche except adult</strong>
                  <span>We build links for technology, finance, crypto, real estate, health, and iGaming.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Link building brief form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#06163b]/95 border-2 border-sky-400/50 p-6 sm:p-8 shadow-[0_0_35px_rgba(56,189,248,0.22)] backdrop-blur-md">
              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-bold text-white">Link building brief</h3>
                <p className="text-xs text-sky-300">
                  Three minutes. No account, no sales call needed.
                </p>
              </div>

              <BriefForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
