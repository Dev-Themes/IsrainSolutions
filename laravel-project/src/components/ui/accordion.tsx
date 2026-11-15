"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  id,
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] overflow-hidden transition-colors">
      <button
        type="button"
        id={`accordion-btn-${id}`}
        aria-controls={`accordion-panel-${id}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 text-left font-bold text-sm text-[var(--text)] flex items-center justify-between hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 shrink-0 ml-3 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Smooth CSS Grid animated expansion */}
      <div
        id={`accordion-panel-${id}`}
        role="region"
        aria-labelledby={`accordion-btn-${id}`}
        className={`accordion-wrapper ${isOpen ? "open" : ""}`}
      >
        <div className="accordion-content">
          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--line-subtle)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
}
