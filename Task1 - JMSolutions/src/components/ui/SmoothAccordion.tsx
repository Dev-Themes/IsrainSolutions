"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function SmoothAccordion({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-[880px] mx-auto space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        
        return (
          <div key={i} className="border-b border-line border-b-[image:var(--grad-brand)] overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-6 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ice min-h-[48px]"
              aria-expanded={isOpen}
            >
              <h3 className="text-fg-0 font-display font-bold text-lg md:text-xl pe-4 select-none">
                {faq.q}
              </h3>
              <span className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-fg-0' : 'text-fg-1'}`}>
                {isOpen ? (
                  <Minus className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Plus className="w-5 h-5" aria-hidden="true" />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className="pb-6 pt-2">
                    <p className="text-fg-1 text-[15px] md:text-base leading-relaxed max-w-[65ch]">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
