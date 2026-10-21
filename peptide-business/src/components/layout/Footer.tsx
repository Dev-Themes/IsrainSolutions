"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Send, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/products";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  const telegramHandle = process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || "@PeptideIngredientsLab";

  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const handleResetAge = async () => {
    try {
      await fetch("/api/age-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      window.location.href = "/age-verification";
    } catch (e) {
      console.error(e);
      window.location.href = "/age-verification";
    }
  };

  return (
    <footer className="bg-[#101513] border-t border-[#354239]/80 mt-20 text-xs text-foreground-muted">
      <div className="container-custom py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent text-white font-display font-bold text-xs shadow-sm">
                PI
              </span>
              <span className="font-display font-medium text-lg tracking-tight text-foreground">
                Peptide Lab
              </span>
            </div>
            <p className="text-foreground-muted text-xs leading-relaxed max-w-sm">
              An editorial, catalog-focused showcase dedicated to cosmetic peptide ingredients, molecular descriptors, and direct inquiry communication for qualified formulators.
            </p>
            <div className="pt-2">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-accent" />
                <span>Official Channel: {telegramHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-foreground-muted" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-foreground text-xs font-semibold uppercase tracking-wider font-mono">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#products" className="hover:text-accent transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/#why-choose-us" className="hover:text-accent transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link href="/#how-to-inquire" className="hover:text-accent transition-colors">
                  How to Inquire
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-accent transition-colors">
                  About Our Approach
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-accent transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-foreground text-xs font-semibold uppercase tracking-wider font-mono">
              Categories
            </h3>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.filter((c) => c !== "All Products").map((category) => (
                <li key={category}>
                  <Link
                    href={`/#products?cat=${encodeURIComponent(category)}`}
                    className="hover:text-accent transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & Compliance */}
          <div className="space-y-3">
            <h3 className="text-foreground text-xs font-semibold uppercase tracking-wider font-mono">
              Compliance &amp; Access
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-foreground/80">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>18+ Age Gate Enforced</span>
              </li>
              <li>
                <button
                  onClick={handleResetAge}
                  className="text-left text-xs text-accent hover:underline focus-visible:underline"
                >
                  Reset Age Confirmation (Test)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-accent transition-colors"
                >
                  Terms &amp; Inquiry Guidelines
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Formulation Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#354239]/60 space-y-4">
          <div className="bg-[#151B18] border border-[#354239] rounded-xl p-4 sm:p-5 text-[11px] leading-relaxed text-foreground-muted">
            <strong className="text-foreground font-semibold block mb-1">
              Regulatory Notice &amp; Disclaimer:
            </strong>
            The peptide compounds and specifications presented on this website are intended exclusively for cosmetic raw ingredient formulation, research, and technical evaluation. These items are not finished pharmaceutical products and are not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition. No direct online checkout or consumer dispensing is conducted through this site. All commercial inquiries are reviewed subject to applicable regional laws and compliance requirements.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-foreground-muted/80">
            <p>&copy; {currentYear} Peptide Ingredients Lab. All catalog specifications subject to batch verification.</p>
            <div className="flex items-center gap-4">
              <span>Editorial Peptide Showcase</span>
              <span>•</span>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent inline-flex items-center gap-1 transition-colors"
              >
                Telegram <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightweight Privacy / Terms Modal */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-[#222C26] border border-[#354239] rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-4 text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#354239] pb-3">
              <h2 id="legal-modal-title" className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                {activeModal === "privacy" ? "Privacy Policy" : "Terms & Inquiry Guidelines"}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-foreground-muted hover:text-foreground text-sm font-semibold p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-foreground-muted leading-relaxed space-y-3">
              {activeModal === "privacy" ? (
                <>
                  <p>
                    <strong className="text-foreground">Cookie Usage:</strong> We utilize an HTTP-only, cryptographically signed cookie to remember your 18+ age confirmation across browsing sessions for up to 30 days. No extraneous tracking or invasive advertising cookies are deployed.
                  </p>
                  <p>
                    <strong className="text-foreground">Direct Communications:</strong> When you initiate an inquiry through our official Telegram account, communications are handled directly through Telegram’s platform under Telegram’s terms of service and privacy policies.
                  </p>
                  <p>
                    <strong className="text-foreground">Personal Data:</strong> This website does not process user accounts, passwords, or credit card transactions.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong className="text-foreground">Catalog Information:</strong> All molecular specifications, CAS numbers, and suggested usage levels are compiled for professional formulation chemists and development teams. Values represent draft reference specifications subject to authentic Certificate of Analysis (COA) verification per lot.
                  </p>
                  <p>
                    <strong className="text-foreground">Inquiry Model:</strong> This website is an informational catalog and inquiry directory. Placement of an inquiry via Telegram does not constitute a completed commercial transaction until mutual documentation and eligibility checks are confirmed.
                  </p>
                </>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-[#19211D] hover:bg-[#151B18] text-foreground border border-[#354239] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
