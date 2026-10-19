"use client";

import { useState } from "react";
import { Check, Copy, ChevronDown, Mail } from "lucide-react";

interface PitchTemplateCardProps {
  email: string;
  templateText: string;
}

export function PitchTemplateCard({ email, templateText }: PitchTemplateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(templateText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="rounded-2xl border border-border-default bg-bg-surface overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 bg-bg-surface-subtle border-b border-border-default flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-heading">
            Recommended Pitch Format
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-brand-primary-text bg-brand-soft px-2 py-0.5 rounded border border-brand-primary/20">
            Structured Pitch Template
          </span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border-default bg-bg-surface hover:bg-bg-surface-subtle text-text-heading transition-colors"
          aria-label="Copy pitch template to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-text-muted" />
              <span>Copy Template</span>
            </>
          )}
        </button>
      </div>
      <div className="p-5 sm:p-6 text-xs sm:text-sm text-text-body font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto bg-bg-surface">
        {templateText}
      </div>
    </div>
  );
}

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border-default bg-bg-surface hover:bg-bg-surface-subtle text-text-heading text-xs font-semibold transition-colors shadow-2xs"
      aria-label="Copy editorial email address"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Email Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-text-muted" />
          <span>Copy Email</span>
        </>
      )}
    </button>
  );
}

const FAQ_ITEMS = [
  {
    question: "What topics have the highest chance of editorial acceptance?",
    answer:
      "Articles with concrete frameworks, specific scripts, data benchmarks, and firsthand lessons perform best. Our readers value tactical, actionable guides across career transitions, salary negotiations, resume architecture, technical interviews, and freelance business operations over high-level platitudes.",
  },
  {
    question: "Should I submit a pitch first or a complete article draft?",
    answer:
      "We strongly recommend pitching first using our structured email format. This saves you time by allowing our editorial team to review your concept, ensure alignment with our content calendar, and suggest specific focus areas before you write the complete draft.",
  },
  {
    question: "Can I include links to my personal website, LinkedIn, or portfolio?",
    answer:
      "Yes. Every accepted article includes verified author attribution with your name, a concise biographical summary, and an approved link to your professional profile or personal portfolio. Self-promotional sales funnels, affiliate links, or paid backlink insertions are strictly prohibited.",
  },
  {
    question: "How does the editorial review and editing process work?",
    answer:
      "Once your pitch is approved, you submit your draft via email. Our editors review your piece for clarity, depth, and factual accuracy. We may suggest structural adjustments or copy edits before formatting and staging the piece in our publishing CMS.",
  },
  {
    question: "Do you charge contributor fees or pay for articles?",
    answer:
      "CareerVixa does not charge fees to submit, review, or publish articles. We evaluate all pitches purely on editorial merit and value to our audience. Commercial partnerships or specialized syndicated arrangements are handled individually by our publishing team.",
  },
  {
    question: "Can I republish my article on my personal website or Medium later?",
    answer:
      "We request an initial exclusivity period for published guest articles. Republication on personal blogs with canonical attribution to the original CareerVixa article can be coordinated directly with our editorial desk.",
  },
];

export function WriteForUsFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto w-full">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-border-default bg-bg-surface overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-text-heading hover:bg-bg-surface-subtle transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-text-muted shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-default/50">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
