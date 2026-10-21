"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Send, ArrowUpRight, Scale } from "lucide-react";
import { Product } from "@/types/product";
import { formatTelegramInquiryUrl } from "@/lib/utils";

interface ProductComparisonModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveProduct: (id: string) => void;
}

export default function ProductComparisonModal({
  products,
  isOpen,
  onClose,
  onRemoveProduct,
}: ProductComparisonModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-border rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col text-foreground"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-alt border border-accent/40 text-accent flex items-center justify-center shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="comparison-title" className="font-display font-medium text-base sm:text-lg text-foreground">
                Ingredient Specification Comparison
              </h2>
              <span className="text-[11px] text-foreground-muted font-mono">
                Comparing {products.length} peptide candidate compounds side by side
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-alt transition-colors"
            aria-label="Close comparison dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
          {products.length === 0 ? (
            <div className="text-center py-12 text-sm text-foreground-muted">
              Select at least one ingredient to compare.
            </div>
          ) : (
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-3.5 text-left font-mono font-semibold uppercase tracking-wider text-foreground-muted bg-surface-alt rounded-l-xl w-44">
                    Parameter
                  </th>
                  {products.map((p) => (
                    <th key={p.id} className="p-3.5 text-left bg-surface-alt min-w-[200px]">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface border border-border">
                            <Image src={p.image} alt={p.imageAlt} fill className="object-cover" />
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveProduct(p.id)}
                            className="text-foreground-muted hover:text-red-500 p-1 rounded hover:bg-surface transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h4 className="font-display font-medium text-xs text-foreground leading-snug">
                          {p.name}
                        </h4>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Category</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-semibold text-accent">
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">CAS Registry Number</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-mono text-foreground">
                      {p.casNumber || "N/A"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Molecular Weight</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-mono text-foreground">
                      {p.molecularWeight || "N/A"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Sequence Motif</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-mono text-[11px] text-accent">
                      {p.sequence || "Proprietary Blend"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Optimal pH Window</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-mono text-accent">
                      {p.suggestedPh || "5.0 – 7.0"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Solubility Profile</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 text-foreground">
                      {p.solubility || "Standard"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Formulation Usage Level</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5 font-medium text-foreground">
                      {p.suggestedUsage || "0.05% – 1%"}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-surface-alt/50 transition-colors">
                  <td className="p-3.5 font-medium text-foreground-muted">Inquire on Telegram</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-3.5">
                      <a
                        href={formatTelegramInquiryUrl(p.name, p.casNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover text-[11px] font-semibold uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>Inquire</span>
                        <ArrowUpRight className="w-3 h-3 opacity-80" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
