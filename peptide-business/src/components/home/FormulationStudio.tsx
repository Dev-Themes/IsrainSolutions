"use client";

import React, { useState } from "react";
import { Calculator, FlaskConical, Send, ArrowUpRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { useDossier } from "@/lib/dossier-context";

const BATCH_VOLUMES = [30, 50, 100, 250, 500, 1000];

export default function FormulationStudio() {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>(PRODUCTS[0].slug);
  const [batchVolumeMl, setBatchVolumeMl] = useState<number>(100);
  const [targetPercent, setTargetPercent] = useState<number>(0.1);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("Aqueous Gel Base (Hydrosol / 1,3-Propanediol)");

  const { addToDossier } = useDossier();

  const currentProduct: Product = PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  // Dynamic calculations
  // Active mass (mg) = volume (ml) * (targetPercent / 100) * 1000 mg/ml (assuming density ~ 1.0 g/ml)
  const activeMassMg = (batchVolumeMl * (targetPercent / 100) * 1000).toFixed(1);
  const activeMassGrams = (parseFloat(activeMassMg) / 1000).toFixed(3);
  const solventVolumeMl = (batchVolumeMl - parseFloat(activeMassGrams)).toFixed(1);

  // Pre-formatted Telegram URL
  const telegramBase = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/REPLACE_WITH_ACTUAL_USERNAME";
  const inquiryText = `Hello, I am formulating a custom peptide batch using ${currentProduct.name} (CAS: ${currentProduct.casNumber || "N/A"}).
Parameters:
• Batch Volume: ${batchVolumeMl}ml
• Target Active Concentration: ${targetPercent}%
• Calculated Active Material: ${activeMassMg}mg (${activeMassGrams}g)
• Target Vehicle: ${selectedVehicle}
• Recommended pH: ${currentProduct.suggestedPh || "5.0 - 7.0"}

Please confirm product availability, lot purity, and technical formulation datasheet.`;

  const telegramUrl = `${telegramBase}?text=${encodeURIComponent(inquiryText)}`;

  return (
    <section id="formulation-studio" className="py-20 sm:py-24 lg:py-28 bg-[#101513] border-t border-[#354239]/60">
      <div className="container-custom space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#19211D] border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
            Formulation &amp; Dilution Studio
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            Simulate laboratory batch requirements in real time. Calculate exact active compound mass, review amino acid chains, and initiate specialized inquiries.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Formulator Controls */}
          <div className="lg:col-span-6 bg-[#19211D] rounded-2xl border border-[#354239] p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Step 1: Compound Selector */}
            <div className="space-y-2">
              <label htmlFor="peptide-selector" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                1. Select Peptide Compound
              </label>
              <select
                id="peptide-selector"
                value={selectedProductSlug}
                onChange={(e) => setSelectedProductSlug(e.target.value)}
                className="w-full py-3 px-4 text-xs sm:text-sm bg-[#222C26] border border-[#354239] rounded-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.slug} value={prod.slug} className="bg-[#19211D] text-foreground">
                    {prod.name} {prod.casNumber ? `(CAS: ${prod.casNumber})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Batch Volume Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-foreground">
                  2. Target Batch Volume (ml)
                </span>
                <span className="font-mono text-accent font-semibold">{batchVolumeMl} ml</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BATCH_VOLUMES.map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setBatchVolumeMl(vol)}
                    className={`py-2 px-2 text-xs font-mono font-medium rounded-lg border transition-all ${
                      batchVolumeMl === vol
                        ? "bg-accent text-white border-accent font-semibold shadow-xs"
                        : "bg-[#222C26] border-[#354239] text-foreground-muted hover:text-foreground hover:bg-[#222C26]/80"
                    }`}
                  >
                    {vol} ml
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Active Concentration Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-foreground">
                  3. Active Concentration (%)
                </span>
                <span className="font-mono text-accent font-semibold">{targetPercent}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="2.0"
                step="0.01"
                value={targetPercent}
                onChange={(e) => setTargetPercent(parseFloat(e.target.value))}
                className="w-full accent-accent h-2 bg-[#222C26] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-foreground-muted font-mono">
                <span>0.01% (Micro-Dosing)</span>
                <span>0.5% (Standard)</span>
                <span>2.0% (Concentrate)</span>
              </div>
            </div>

            {/* Step 4: Formulation Vehicle */}
            <div className="space-y-2">
              <label htmlFor="vehicle-selector" className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                4. Intended Formulation Vehicle
              </label>
              <select
                id="vehicle-selector"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full py-2.5 px-3.5 text-xs bg-[#222C26] border border-[#354239] rounded-xl text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <option value="Aqueous Serum (Water / 1,3-Propanediol / Glycerin)" className="bg-[#19211D] text-foreground">
                  Aqueous Hydrosol Serum Base
                </option>
                <option value="Hyaluronic Acid Hydrogel (High & Low MW)" className="bg-[#19211D] text-foreground">
                  Hyaluronic Acid Hydrogel Base
                </option>
                <option value="Oil-in-Water Emulsion (Light Restorative Cream)" className="bg-[#19211D] text-foreground">
                  O/W Cream Emulsion Vehicle
                </option>
                <option value="Liposomal Suspension Base" className="bg-[#19211D] text-foreground">
                  Liposomal Suspension Vector
                </option>
              </select>
            </div>
          </div>

          {/* Right Column: Live Laboratory Calculations */}
          <div className="lg:col-span-6 bg-[#19211D] rounded-2xl border border-[#354239] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#354239] pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" />
                <h3 className="font-display font-medium text-lg text-foreground">
                  Calculated Batch Parameters
                </h3>
              </div>
              <span className="text-[11px] font-mono bg-[#222C26] border border-[#354239] px-2.5 py-0.5 rounded-full text-accent font-semibold">
                Live Output
              </span>
            </div>

            {/* Metric Displays */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#222C26] rounded-xl border border-[#354239] p-4 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-foreground-muted font-mono block">
                  Active Peptide Powder
                </span>
                <span className="font-mono text-2xl font-bold text-foreground block">
                  {activeMassMg} <span className="text-xs font-normal text-foreground-muted">mg</span>
                </span>
                <span className="text-[11px] font-mono text-accent font-medium block">
                  ({activeMassGrams} grams)
                </span>
              </div>

              <div className="bg-[#222C26] rounded-xl border border-[#354239] p-4 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-foreground-muted font-mono block">
                  Vehicle Base Volume
                </span>
                <span className="font-mono text-2xl font-bold text-foreground block">
                  {solventVolumeMl} <span className="text-xs font-normal text-foreground-muted">ml</span>
                </span>
                <span className="text-[11px] font-mono text-foreground-muted block">
                  Final Volume: {batchVolumeMl}ml
                </span>
              </div>
            </div>

            {/* Chemical & Formulation Specs */}
            <div className="bg-[#222C26] rounded-xl border border-[#354239] p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#354239] pb-2">
                <span className="text-foreground-muted">Optimal pH Range</span>
                <span className="font-mono font-semibold text-accent">
                  {currentProduct.suggestedPh || "5.0 – 7.0"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#354239] pb-2">
                <span className="text-foreground-muted">Storage Protocol</span>
                <span className="font-medium text-foreground text-right">
                  {currentProduct.storage || "2°C – 8°C"}
                </span>
              </div>

              {currentProduct.sequence && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-foreground-muted text-[11px] block">Amino Acid Sequence Motif:</span>
                  <div className="flex flex-wrap gap-1 font-mono text-xs">
                    {currentProduct.aminoAcids ? (
                      currentProduct.aminoAcids.map((aa, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                            aa.type === "basic"
                              ? "bg-blue-950/40 text-blue-300 border-blue-800/50"
                              : aa.type === "acidic"
                              ? "bg-red-950/40 text-red-300 border-red-800/50"
                              : aa.type === "aromatic"
                              ? "bg-amber-950/40 text-amber-300 border-amber-800/50"
                              : "bg-[#19211D] text-foreground border-[#354239]"
                          }`}
                          title={`${aa.name} (${aa.type})`}
                        >
                          {aa.abbr}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-foreground">{currentProduct.sequence}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Incompatibility Notice */}
            {currentProduct.incompatibilities && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold block text-[11px] uppercase tracking-wider text-amber-300">
                    Formulation Compatibility Caution:
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-200/90">
                    Avoid: {currentProduct.incompatibilities.join(" • ")}.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent-hover rounded-xl transition-all shadow-md hover:shadow-accent/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inquire This Formula</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() =>
                  addToDossier(
                    currentProduct,
                    `${activeMassGrams}g active (${batchVolumeMl}ml @ ${targetPercent}%)`,
                    selectedVehicle
                  )
                }
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground bg-[#222C26] hover:bg-[#222C26]/80 rounded-xl border border-[#354239] hover:border-accent/40 transition-colors"
              >
                <FlaskConical className="w-3.5 h-3.5 text-accent" />
                <span>Save to Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
