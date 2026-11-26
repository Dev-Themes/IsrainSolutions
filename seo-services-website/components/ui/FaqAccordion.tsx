"use client";

import React, { useState } from "react";
import { ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  eyebrow = "Have Questions?",
  title = "Have Questions? Our Link Building Specialists Got You Covered!",
  subtitle = "Everything you need to know about manual outreach standards, turnaround times, anchor safety, and refund policies.",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#00081d] py-20 lg:py-28 relative overflow-hidden border-b border-sky-500/20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/5 blur-[160px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with ElementsKit Separator */}
        <ScrollReveal direction="up" delay={100}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
          />
        </ScrollReveal>

        {/* Numbered Nested Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = `${idx + 1}. `;

            return (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={150 + idx * 60}
                duration={600}
              >
                <div
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? "bg-[#03000B] border-[#1FA9E0] shadow-[0_10px_35px_rgba(2,8,23,0.9),0_0_20px_rgba(31,169,224,0.22)]"
                      : "bg-[#03000B]/80 border-sky-500/25 hover:border-sky-400/60 hover:bg-[#06163b]/60"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none group"
                  >
                    <span className="text-xs sm:text-base font-bold text-white flex items-start gap-2.5 group-hover:text-sky-300 transition-colors">
                      <span className="text-[#1FA9E0] font-mono mt-0.5">{itemNumber}</span>
                      <span className="leading-snug">{faq.question.replace(/^\d+\.\s*/, "")}</span>
                    </span>
                    <div
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5",
                        isOpen
                          ? "bg-[#1FA9E0] text-slate-950 rotate-180 shadow-[0_0_12px_#1FA9E0]"
                          : "bg-white/5 text-sky-400 group-hover:bg-white/10"
                      )}
                    >
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </button>

                  {/* Smooth Animated Accordion Content */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-sky-500/15">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <ScrollReveal direction="up" delay={500}>
          <div className="max-w-2xl mx-auto mt-12 p-6 rounded-2xl bg-[#03000B] border border-sky-500/30 text-center space-y-4 shadow-[0_15px_40px_rgba(2,8,23,0.9)]">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Still Have Questions About Your Campaign?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Our link building directors are available 24/7 to analyze your target URLs, review anchor distributions, and recommend the best publishers.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-sky-400/40 bg-[#06173d]/70 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0a2355] transition-all"
              >
                <span>Submit URL Brief</span>
                <ArrowRight className="w-4 h-4 text-[#1FA9E0]" />
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
