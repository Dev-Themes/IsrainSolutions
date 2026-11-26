"use client";

import React from "react";
import { siteConfig } from "@/lib/site-config";
import { BriefForm } from "@/components/forms/BriefForm";
import { Mail, MessageSquare, Clock, MapPin, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const ContactBriefSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#00081d] via-[#020b24] to-[#010615] py-20 lg:py-28 border-b border-sky-500/20 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            eyebrow="Get In Touch With Us"
            title={
              <>
                Let’s Discuss Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA9E0] to-[#38bdf8]">
                  Link Authority Goals
                </span>
              </>
            }
            subtitle="Connect directly with our senior link building team. Submit your target URL to receive verified publisher placements and transparent metrics."
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-8">
          
          {/* Left Column: Official Agency Contact Cards (Slides in from Left) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left" delay={200} duration={800}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#03000B] border border-sky-500/30 shadow-[0_15px_40px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.15)] space-y-5">
                
                {/* Director Header */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-sky-500/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FA9E0] to-[#38bdf8] text-slate-950 font-black text-base flex items-center justify-center font-mono shadow-[0_0_15px_rgba(31,169,224,0.35)] flex-shrink-0">
                    AQ
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                      {siteConfig.founder.name}
                    </h3>
                    <span className="text-xs text-[#1FA9E0] font-medium block">
                      {siteConfig.founder.role}
                    </span>
                  </div>
                </div>

                {/* Director Note */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  &quot;Send the exact page you want to rank. We evaluate topical gaps, inspect your anchor profile, and hand-match real publishers with proven Google search traffic.&quot;
                </p>

                {/* Direct Agency Contacts */}
                <div className="space-y-3 pt-3 border-t border-sky-500/20 text-xs">
                  <div className="flex items-start gap-3 text-slate-200">
                    <MapPin className="w-4 h-4 text-[#1FA9E0] flex-shrink-0 mt-0.5" />
                    <span>{siteConfig.parentCompany.address.street}, {siteConfig.parentCompany.address.city}, Pakistan</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                    <a
                      href={siteConfig.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#1FA9E0] transition-colors font-medium"
                    >
                      WhatsApp: {siteConfig.contact.whatsapp}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <a
                      href={siteConfig.contact.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#1FA9E0] transition-colors font-medium"
                    >
                      Telegram: @{siteConfig.contact.telegram}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white hover:text-[#1FA9E0] transition-colors font-medium"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Reassurance Badges */}
            <ScrollReveal direction="left" delay={350} duration={800}>
              <div className="space-y-3 p-4 rounded-xl bg-[#06173d]/40 border border-sky-500/20 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                  <span><strong>Rapid Response:</strong> Replies within 2 to 4 business hours.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Free Evaluation:</strong> Comprehensive anchor &amp; URL audit included.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#1FA9E0] flex-shrink-0" />
                  <span><strong>Full Protection:</strong> 100% money-back guarantee on all agreed delivery dates.</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Handcrafted Agency Consultation Brief Form (Slides in from Right) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delay={250} duration={800}>
              <BriefForm />
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
