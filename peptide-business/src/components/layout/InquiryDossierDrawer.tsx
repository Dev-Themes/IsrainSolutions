"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Trash2, Send, ArrowUpRight, FolderHeart, CheckCircle2 } from "lucide-react";
import { useDossier } from "@/lib/dossier-context";

const QUANTITY_OPTIONS = [
  "25g (Lab Scale R&D)",
  "50g (Pilot Formulation)",
  "100g (Trial Batch)",
  "250g (Pre-Production)",
  "500g (Commercial Scale)",
  "1kg+ (Bulk Inquiry)",
];

export default function InquiryDossierDrawer() {
  const { items, removeFromDossier, updateQuantity, clearDossier, isDossierOpen, setIsDossierOpen } = useDossier();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDossierOpen) {
        setIsDossierOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDossierOpen, setIsDossierOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isDossierOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDossierOpen]);

  if (!isDossierOpen) return null;

  // Build bundled Telegram inquiry message
  const telegramBase = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  let message = "Hello, I would like to submit a formal commercial inquiry for the following peptide ingredients from your catalog:\n\n";

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`;
    if (item.product.casNumber) message += `   • CAS: ${item.product.casNumber}\n`;
    message += `   • Requested Batch Size: ${item.requestedQuantity}\n\n`;
  });

  message += "Please provide availability, lot-specific COA documentation, and inquiry details.";
  const telegramBundleUrl = `${telegramBase}?text=${encodeURIComponent(message)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={() => setIsDossierOpen(false)}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-border transition-transform duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-background sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface border border-accent/40 text-accent flex items-center justify-center shadow-xs">
              <FolderHeart className="w-5 h-5" />
            </div>
            <div>
              <h2 id="dossier-drawer-title" className="font-display font-medium text-base text-foreground">
                Inquiry Dossier
              </h2>
              <span className="text-[11px] text-foreground-muted font-mono">
                {items.length} {items.length === 1 ? "item" : "items"} selected for batch inquiry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearDossier}
                className="text-xs text-foreground-muted hover:text-red-400 transition-colors px-2 py-1"
                title="Clear all items"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDossierOpen(false)}
              className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
              aria-label="Close dossier drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto text-foreground-muted">
                <FolderHeart className="w-7 h-7" />
              </div>
              <p className="font-display font-medium text-sm text-foreground">
                Your inquiry dossier is empty
              </p>
              <p className="text-xs text-foreground-muted leading-relaxed max-w-xs mx-auto">
                Click &ldquo;+ Add to Dossier&rdquo; on any peptide in the catalog to build a bundled batch inquiry.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl border border-border bg-surface flex flex-col gap-3 shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative w-14 h-14 rounded-lg bg-surface-alt border border-border overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.imageAlt}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-medium text-xs text-foreground truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromDossier(item.product.id)}
                          className="text-foreground-muted hover:text-red-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.product.casNumber && (
                        <span className="text-[10px] font-mono text-foreground-muted block">
                          CAS: {item.product.casNumber}
                        </span>
                      )}
                      <span className="text-[10px] text-accent font-medium">
                        {item.product.category}
                      </span>
                    </div>
                  </div>

                  {/* Batch Quantity Selector */}
                  <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                    <label htmlFor={`qty-${item.product.id}`} className="text-[10px] text-foreground-muted uppercase tracking-wider font-mono">
                      Scale:
                    </label>
                    <select
                      id={`qty-${item.product.id}`}
                      value={item.requestedQuantity}
                      onChange={(e) => updateQuantity(item.product.id, e.target.value)}
                      className="text-xs bg-surface-alt border border-border rounded-lg px-2 py-1 text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      {QUANTITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-surface text-foreground">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-border bg-background-secondary space-y-3">
            <div className="flex items-center justify-between text-xs text-foreground">
              <span className="text-foreground-muted">Total Compounds Selected:</span>
              <span className="font-semibold font-mono text-accent">{items.length}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface border border-border text-[11px] text-foreground-muted flex items-start gap-2 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>
                All selected items and requested batch quantities will be bundled into a pre-filled Telegram inquiry message.
              </span>
            </div>

            <a
              href={telegramBundleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-btn-primary-text bg-btn-primary hover:bg-btn-primary-hover rounded-xl transition-all shadow-md hover:shadow-accent/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire Batch via Telegram ({items.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
