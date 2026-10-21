"use client";

import React, { useState } from "react";
import { Send, ArrowUpRight, Plus, Check, Calculator } from "lucide-react";
import { Product } from "@/types/product";
import { formatTelegramInquiryUrl } from "@/lib/utils";
import { useDossier } from "@/lib/dossier-context";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addToDossier, hasItem } = useDossier();
  const inDossier = hasItem(product.id);
  const [selectedBatch, setSelectedBatch] = useState("100ml @ 0.1%");

  const telegramUrl = formatTelegramInquiryUrl(product.name, product.casNumber);

  return (
    <div className="space-y-4 pt-2">
      {/* Quick Batch Options */}
      <div className="p-4 rounded-xl bg-surface-alt border border-border space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-foreground font-medium">
          <span className="flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-accent" />
            <span className="font-mono">Select Pilot Batch Scale:</span>
          </span>
          <span className="font-mono text-accent font-semibold">{selectedBatch}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["50ml @ 0.05%", "100ml @ 0.1%", "250ml @ 0.5%"].map((batch) => (
            <button
              key={batch}
              type="button"
              onClick={() => setSelectedBatch(batch)}
              className={`py-2 px-2 rounded-lg text-[11px] font-mono border transition-all ${
                selectedBatch === batch
                  ? "bg-accent text-white border-accent font-semibold shadow-xs"
                  : "bg-surface border-border text-foreground-muted hover:text-foreground hover:bg-background-secondary"
              }`}
            >
              {batch}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-btn-primary-text bg-btn-primary hover:bg-btn-primary-hover rounded-xl transition-all shadow-md hover:shadow-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Send className="w-4 h-4" />
          <span>Inquire on Telegram</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>

        <button
          type="button"
          onClick={() => addToDossier(product, selectedBatch)}
          className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-xl border transition-colors ${
            inDossier
              ? "bg-accent/20 border-accent text-accent font-bold"
              : "bg-surface border-border text-foreground hover:bg-surface-alt"
          }`}
        >
          {inDossier ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{inDossier ? "Added to Dossier" : "+ Add to Dossier"}</span>
        </button>
      </div>
    </div>
  );
}
