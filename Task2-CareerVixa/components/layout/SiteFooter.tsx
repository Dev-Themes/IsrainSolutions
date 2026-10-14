"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { ThemeToggle } from "./ThemeToggle";
import { ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const pathname = usePathname();
  const isDashboardOrAdmin = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  return (
    <footer
      className={cn(
        "w-full max-w-full overflow-x-clip bg-bg-surface border-t border-border-default mt-20 sm:mt-24 pt-14 sm:pt-20 pb-12 sm:pb-16 transition-all",
        isDashboardOrAdmin && "sm:pl-16 lg:pl-64"
      )}
    >
      <Container className={cn(isDashboardOrAdmin && "max-w-7xl px-4 sm:px-6 lg:px-8")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 mb-14 sm:mb-16">
          {/* Brand & Mission Column (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 pr-0 lg:pr-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit min-h-[44px]">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary-hover to-brand-primary flex items-center justify-center text-white font-black text-base shadow-sm">
                CV
              </div>
              <span className="text-xl font-extrabold tracking-tight text-text-heading">
                CareerVixa
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              The premier executive career intelligence publication. Data-backed strategies, compensation benchmarks, and actionable interview roadmaps to accelerate professional trajectories.
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs text-text-muted font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Independent Editorial Standards &middot; Verified Industry Research</span>
            </div>
          </div>

          {/* Topics Column (2 cols) */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-col min-w-0">
            <h3 className="font-bold text-xs text-text-heading uppercase tracking-wider mb-4">
              Career Guides
            </h3>
            <ul className="space-y-2.5 text-sm" aria-label="Career Guides Links">
              <li>
                <Link href="/category/career-development" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Career Growth
                </Link>
              </li>
              <li>
                <Link href="/category/job-search-strategies" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Job Search Tactics
                </Link>
              </li>
              <li>
                <Link href="/category/resume-and-cover-letters" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Resumes &amp; Portfolios
                </Link>
              </li>
              <li>
                <Link href="/category/interview-preparation" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Interview Mastery
                </Link>
              </li>
              <li>
                <Link href="/category/salary-and-negotiation" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Salary Negotiation
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Governance (2 cols) */}
          <div className="sm:col-span-1 lg:col-span-2 flex flex-col min-w-0">
            <h3 className="font-bold text-xs text-text-heading uppercase tracking-wider mb-4">
              About &amp; Editorial
            </h3>
            <ul className="space-y-2.5 text-sm" aria-label="About and Editorial">
              <li>
                <Link href="/about" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words font-semibold">
                  About Platform
                </Link>
              </li>
              <li>
                <Link href="/publish" className="text-brand-primary-text font-bold hover:underline inline-flex items-center gap-1 min-h-[36px] sm:min-h-0 break-words">
                  Write For Us <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Contributor Hub
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-muted hover:text-brand-primary-text transition-colors min-h-[36px] sm:min-h-0 inline-flex items-center break-words">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-3 pl-0 lg:pl-2 min-w-0">
            <h3 className="font-bold text-xs text-text-heading uppercase tracking-wider">
              Weekly Career Intelligence
            </h3>
            <p className="text-text-muted text-xs leading-relaxed">
              Actionable compensation frameworks, negotiation tactics, and leadership scripts delivered to your inbox every Tuesday morning.
            </p>
            <div className="mt-1 w-full max-w-full">
              <NewsletterForm buttonText="Subscribe" stacked />
            </div>
            <span className="text-[11px] text-text-muted font-medium">
              Zero spam. Strict privacy guarantee. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* Bottom Bar with Theme Toggle & Legal Links */}
        <div className="pt-8 border-t border-border-default flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} CareerVixa Publication. All rights reserved.
            </p>
            <span aria-hidden="true" className="hidden sm:inline">&middot;</span>
            <Link href="/about" className="hover:text-brand-primary-text transition-colors">
              About
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/privacy" className="hover:text-brand-primary-text transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">&middot;</span>
            <Link href="/publish" className="hover:text-brand-primary-text transition-colors">
              Editorial Guidelines
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="italic hidden md:inline text-[11px]">
              Verified executive insights &amp; career intelligence.
            </span>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
