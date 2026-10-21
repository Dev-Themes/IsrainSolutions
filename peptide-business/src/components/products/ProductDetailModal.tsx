"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Send, ArrowUpRight, CheckCircle2, Plus, Check, Dna } from "lucide-react";
import { Product } from "@/types/product";
import { formatTelegramInquiryUrl } from "@/lib/utils";
import { useDossier } from "@/lib/dossier-context";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { addToDossier, hasItem } = useDossier();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const inDossier = hasItem(product.id);
  const telegramUrl = formatTelegramInquiryUrl(product.name, product.casNumber);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#222C26] border border-[#354239] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto flex flex-col transition-all"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#354239] sticky top-0 bg-[#222C26]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="editorial-badge text-[10px]">{product.category}</span>
            {product.casNumber && (
              <span className="text-xs font-mono text-foreground-muted">
                CAS: {product.casNumber}
              </span>
            )}
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-[#19211D] transition-colors"
            aria-label="Close product quick specs dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            <div className="sm:col-span-5 relative aspect-square min-h-[220px] rounded-xl bg-[#19211D] border border-[#354239] overflow-hidden">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover object-center"
              />
            </div>

            <div className="sm:col-span-7 space-y-3">
              <h2 id="modal-product-title" className="text-xl sm:text-2xl font-display font-medium text-foreground leading-snug">
                {product.name}
              </h2>
              {product.inciName && (
                <p className="text-xs font-mono text-foreground-muted">
                  INCI: <span className="text-accent">{product.inciName}</span>
                </p>
              )}
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {product.extendedDescription || product.description}
              </p>
            </div>
          </div>

          {/* Molecular Amino Acid Sequence Display */}
          {product.sequence && (
            <div className="p-4 rounded-xl bg-[#19211D] border border-[#354239] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                <Dna className="w-4 h-4 text-accent" />
                <span>Amino Acid Sequence Architecture</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {product.aminoAcids ? (
                  product.aminoAcids.map((aa, idx) => (
                    <div
                      key={idx}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border flex items-center gap-1 ${
                        aa.type === "basic"
                          ? "bg-blue-950/40 text-blue-300 border-blue-800/50"
                          : aa.type === "acidic"
                          ? "bg-red-950/40 text-red-300 border-red-800/50"
                          : aa.type === "aromatic"
                          ? "bg-amber-950/40 text-amber-300 border-amber-800/50"
                          : aa.type === "terminal"
                          ? "bg-purple-950/40 text-purple-300 border-purple-800/50"
                          : "bg-[#222C26] text-foreground border-[#354239]"
                      }`}
                    >
                      <span>{aa.abbr}</span>
                      {aa.charge && <span className="text-[10px] opacity-75 font-bold">{aa.charge}</span>}
                    </div>
                  ))
                ) : (
                  <span className="font-mono text-xs text-foreground bg-[#222C26] px-3 py-1 rounded border border-[#354239]">
                    {product.sequence}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Specifications Table */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground font-mono">
              Technical Descriptors &amp; Specifications
            </h3>
            <div className="border border-[#354239] rounded-xl overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-[#354239]">
                  {product.molecularFormula && (
                    <tr className="bg-[#222C26]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted w-1/3">Molecular Formula</td>
                      <td className="py-2.5 px-3.5 font-mono text-foreground">{product.molecularFormula}</td>
                    </tr>
                  )}
                  {product.molecularWeight && (
                    <tr className="bg-[#19211D]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Molecular Weight</td>
                      <td className="py-2.5 px-3.5 font-mono text-foreground">{product.molecularWeight}</td>
                    </tr>
                  )}
                  {product.appearance && (
                    <tr className="bg-[#222C26]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Appearance</td>
                      <td className="py-2.5 px-3.5 text-foreground">{product.appearance}</td>
                    </tr>
                  )}
                  {product.solubility && (
                    <tr className="bg-[#19211D]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Solubility Profile</td>
                      <td className="py-2.5 px-3.5 text-foreground">{product.solubility}</td>
                    </tr>
                  )}
                  {product.suggestedPh && (
                    <tr className="bg-[#222C26]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Target pH Window</td>
                      <td className="py-2.5 px-3.5 font-mono text-accent">{product.suggestedPh}</td>
                    </tr>
                  )}
                  {product.storage && (
                    <tr className="bg-[#19211D]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Storage Protocol</td>
                      <td className="py-2.5 px-3.5 text-foreground">{product.storage}</td>
                    </tr>
                  )}
                  {product.suggestedUsage && (
                    <tr className="bg-[#222C26]">
                      <td className="py-2.5 px-3.5 font-medium text-foreground-muted">Suggested Formulation Use</td>
                      <td className="py-2.5 px-3.5 text-foreground">{product.suggestedUsage}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Notice */}
          <div className="p-3 bg-[#19211D] border border-[#354239] rounded-xl flex items-start gap-2 text-[11px] text-foreground-muted">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              All specifications displayed are draft reference data for qualified formulation evaluation. Official lot analysis documents are provided upon inquiry.
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 border-t border-[#354239] bg-[#19211D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sticky bottom-0">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <button
              type="button"
              onClick={() => addToDossier(product)}
              className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg border transition-colors ${
                inDossier
                  ? "bg-accent/20 border-accent text-accent"
                  : "bg-[#222C26] border-[#354239] text-foreground hover:bg-[#28342D]"
              }`}
            >
              {inDossier ? <Check className="w-3.5 h-3.5 shrink-0" /> : <Plus className="w-3.5 h-3.5 shrink-0" />}
              <span className="truncate">{inDossier ? "In Dossier" : "Add to Dossier"}</span>
            </button>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1 px-3 sm:px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-accent rounded-lg border border-[#354239] hover:bg-[#222C26] transition-colors text-center"
            >
              <span className="truncate">Full Page</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#101513] bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-sm font-bold text-center"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span>Inquire on Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
