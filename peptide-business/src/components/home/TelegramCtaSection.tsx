"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, ArrowUpRight, ShieldCheck, Copy, Check, MessageSquare, Clock, Sparkles } from "lucide-react";

export default function TelegramCtaSection() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  const telegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@PeptideIngredientsLab";
  const [copied, setCopied] = useState(false);

  const handleCopyHandle = async () => {
    try {
      await navigator.clipboard.writeText(telegramHandle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-28 bg-[#101513] overflow-hidden">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden border border-[#354239] bg-[#19211D] shadow-2xl">
          {/* Background Moody Laboratory Imagery */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/editorial/telegram-cta-banner.webp"
              alt="Panoramic editorial commercial photograph of luxury cosmetic peptide ingredient vials with atmospheric lighting"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-right opacity-60"
            />
            {/* Dark moody gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101513] via-[#101513]/90 to-[#101513]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101513] via-transparent to-[#101513]/60" />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl mx-auto text-center space-y-8">
            {/* Top Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#222C26] border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Direct Commercial Channel</span>
            </div>

            {/* Headline and Copy */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight leading-tight">
                Need More Information?<br className="hidden sm:inline" /> Connect Directly.
              </h2>
              <p className="text-sm sm:text-base text-foreground-muted leading-relaxed font-normal max-w-xl mx-auto">
                Our technical team is available through our official Telegram desk for product inquiries, lot-specific COA verification, and customized pilot batch formulation questions.
              </p>
            </div>

            {/* Interactive Telegram Badge & Direct Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Open Official Telegram Channel"
              >
                <Send className="w-4 h-4" />
                <span>Open Telegram Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Copy Handle Button */}
              <button
                type="button"
                onClick={handleCopyHandle}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-mono font-medium rounded-xl border border-[#354239] bg-[#222C26] text-foreground hover:bg-[#222C26]/80 hover:border-accent/40 transition-all duration-200"
                title="Copy Telegram handle to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-accent">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-foreground-muted" />
                    <span>Handle: <strong className="text-foreground">{telegramHandle}</strong></span>
                  </>
                )}
              </button>
            </div>

            {/* Transparency & Response Indicator */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-foreground-muted border-t border-[#354239]/60">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Usually replies within 1–2 hours during business hours</span>
              </div>
              <div className="hidden sm:inline text-[#354239]">•</div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Verified Direct Line • No automated bots</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
