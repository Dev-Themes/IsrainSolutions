"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, Send, ArrowRight } from "lucide-react";
import { FAQS } from "@/data/faq";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-inquire");
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 sm:py-24 lg:py-28 bg-[#151B18] border-y border-[#354239]/60">
      <div className="container-custom max-w-4xl space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="editorial-badge">Clarifications</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Concise answers regarding our catalog listings, specifications, and Telegram inquiry process.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#222C26] border-accent/50 shadow-md"
                    : "bg-[#19211D] border-[#354239] hover:border-[#354239]/90"
                }`}
              >
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full text-left py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
                  >
                    <span className="font-display font-medium text-sm sm:text-base text-foreground group-hover:text-accent transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                        isOpen
                          ? "bg-accent text-white border-accent rotate-180"
                          : "bg-[#222C26] border-[#354239] text-foreground-muted group-hover:border-accent/40 group-hover:text-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 transition-transform duration-200" />
                      ) : (
                        <Plus className="w-4 h-4 transition-transform duration-200" />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Smooth CSS Grid Row Transition */}
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className="grid transition-all duration-250 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-foreground-muted leading-relaxed transition-opacity duration-200 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="border-t border-[#354239]/70 pt-3.5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Telegram inquiry reminder below FAQs */}
        <div className="text-center p-6 rounded-2xl bg-[#19211D] border border-[#354239] max-w-lg mx-auto space-y-2">
          <p className="text-xs text-foreground-muted">
            Have a question not addressed in our documentation?
          </p>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent-hover inline-flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Consult Our Technical Desk on Telegram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
