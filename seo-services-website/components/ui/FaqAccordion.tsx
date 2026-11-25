"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  title = "Frequently asked questions.",
  subtitle = "Everything you need to know about our link building quality, indexation, safety, and money-back guarantee.",
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="bg-[#020817] py-20 border-b border-sky-500/15">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-2 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? "bg-[#06183d] border-sky-400/50 shadow-[0_0_25px_rgba(56,189,248,0.15)]"
                      : "bg-[#06163b]/75 border-sky-500/20 hover:border-sky-400/40 hover:bg-[#071d4a]/75"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                      <HelpCircle
                        className={cn(
                          "w-4 h-4 flex-shrink-0 transition-colors",
                          isOpen ? "text-sky-400" : "text-sky-300/60"
                        )}
                      />
                      <span>{faq.question}</span>
                    </span>
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                        isOpen
                          ? "bg-sky-500/20 text-sky-300 rotate-180"
                          : "bg-white/5 text-slate-400"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth animated accordion drawer */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-sky-500/15">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
