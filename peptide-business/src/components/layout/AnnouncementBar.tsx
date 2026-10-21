import React from "react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function AnnouncementBar() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";

  return (
    <aside
      id="announcement-bar"
      aria-label="Announcement"
      className="w-full bg-background-secondary border-b border-border py-2 px-3 sm:px-4 text-xs tracking-wide text-foreground-secondary select-none transition-colors duration-200"
    >
      <div className="container-custom flex items-center justify-between gap-3 text-[11px] sm:text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
          <span className="truncate text-foreground-muted">
            <span className="hidden sm:inline">Curated cosmetic peptide catalog &amp; </span>
            <span>Verified molecular reference standards.</span>
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-foreground-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            18+ Platform
          </span>
          <span className="hidden md:inline text-border">|</span>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-accent hover:text-accent-hover transition-colors whitespace-nowrap"
            aria-label="Official Telegram Channel (opens in new window)"
          >
            <span>Telegram Channel</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
}
