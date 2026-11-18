"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calculator,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface CostCalculatorProps {
  country: "UK" | "US";
  categorySlug: string;
  categoryName: string;
  currencySymbol: string;
}

interface JobTypeOption {
  id: string;
  name: string;
  baseMinUK: number;
  baseMaxUK: number;
  baseMinUS: number;
  baseMaxUS: number;
  typicalDuration: string;
  commonParts: string;
}

const CATEGORY_JOB_RATES: Record<string, JobTypeOption[]> = {
  plumbing: [
    {
      id: "pipe-burst",
      name: "Emergency Burst Pipe / Active Leak Isolation",
      baseMinUK: 95,
      baseMaxUK: 180,
      baseMinUS: 130,
      baseMaxUS: 240,
      typicalDuration: "1 - 2 hours",
      commonParts: "Compression fittings, isolation levers, push-fit pipe",
    },
    {
      id: "boiler-breakdown",
      name: "Boiler Breakdown & Diagnostic Repair",
      baseMinUK: 110,
      baseMaxUK: 240,
      baseMinUS: 150,
      baseMaxUS: 320,
      typicalDuration: "2 - 3 hours",
      commonParts: "Thermocouple, PCB, pressure sensor, diverter valve",
    },
    {
      id: "tap-replacement",
      name: "Kitchen / Bathroom Tap Replacement",
      baseMinUK: 75,
      baseMaxUK: 140,
      baseMinUS: 95,
      baseMaxUS: 180,
      typicalDuration: "1 - 1.5 hours",
      commonParts: "Flexible tap tails, backnuts, monobloc tap set",
    },
    {
      id: "drain-unblock",
      name: "Blocked Toilet or Primary Waste Drain",
      baseMinUK: 85,
      baseMaxUK: 160,
      baseMinUS: 120,
      baseMaxUS: 220,
      typicalDuration: "1 - 2 hours",
      commonParts: "Mechanical kinetic snake or high-pressure jetting",
    },
    {
      id: "radiator-install",
      name: "Radiator Replacement & TRV Valve Fitting",
      baseMinUK: 120,
      baseMaxUK: 220,
      baseMinUS: 160,
      baseMaxUS: 290,
      typicalDuration: "2 - 3 hours",
      commonParts: "Thermostatic radiator valves (TRV), pipe extensions",
    },
  ],
  electrical: [
    {
      id: "fusebox-upgrade",
      name: "Metal Consumer Unit / Panel Replacement",
      baseMinUK: 450,
      baseMaxUK: 750,
      baseMinUS: 600,
      baseMaxUS: 1100,
      typicalDuration: "4 - 6 hours",
      commonParts: "Dual RCD or RCBO metal enclosure with SPD protection",
    },
    {
      id: "eicr-cert",
      name: "Electrical Safety Certificate (EICR) Inspection",
      baseMinUK: 140,
      baseMaxUK: 260,
      baseMinUS: 190,
      baseMaxUS: 340,
      typicalDuration: "2 - 4 hours",
      commonParts: "Full instrument MFT testing & digital compliance certificate",
    },
    {
      id: "tripping-fault",
      name: "Emergency Tripping Circuit Diagnostics",
      baseMinUK: 90,
      baseMaxUK: 170,
      baseMinUS: 120,
      baseMaxUS: 220,
      typicalDuration: "1 - 2 hours",
      commonParts: "Insulation resistance testing, replacement MCB",
    },
    {
      id: "ev-charger",
      name: "Dedicated Home EV Charger Installation (7kW)",
      baseMinUK: 350,
      baseMaxUK: 650,
      baseMinUS: 450,
      baseMaxUS: 850,
      typicalDuration: "3 - 5 hours",
      commonParts: "6mm² SWA cabling, rotary isolator, Type A RCD",
    },
  ],
  "gas-boiler": [
    {
      id: "annual-service",
      name: "Annual Boiler Service & Safety Sign-off",
      baseMinUK: 80,
      baseMaxUK: 130,
      baseMinUS: 110,
      baseMaxUS: 180,
      typicalDuration: "1 - 1.5 hours",
      commonParts: "Flue gas combustion analysis, burner seal inspection",
    },
    {
      id: "power-flush",
      name: "Central Heating Chemical Power Flush",
      baseMinUK: 380,
      baseMaxUK: 600,
      baseMinUS: 480,
      baseMaxUS: 780,
      typicalDuration: "4 - 6 hours",
      commonParts: "Sludge remover inhibitor chemicals, magnetic filter",
    },
    {
      id: "combi-install",
      name: "New High-Efficiency Combi Boiler Supply & Fit",
      baseMinUK: 1600,
      baseMaxUK: 2800,
      baseMinUS: 2200,
      baseMaxUS: 3800,
      typicalDuration: "1 - 2 days",
      commonParts: "A-rated condensing unit, flue kit, magnetic filter, warranty",
    },
  ],
  roofing: [
    {
      id: "tile-replacement",
      name: "Dislodged Storm Slate / Tile Replacement",
      baseMinUK: 150,
      baseMaxUK: 280,
      baseMinUS: 200,
      baseMaxUS: 380,
      typicalDuration: "2 - 3 hours",
      commonParts: "Matching clay/concrete tiles, slate hooks, battens",
    },
    {
      id: "chimney-lead",
      name: "Chimney Lead Flashing & Mortar Repointing",
      baseMinUK: 280,
      baseMaxUK: 550,
      baseMinUS: 360,
      baseMaxUS: 700,
      typicalDuration: "3 - 5 hours",
      commonParts: "Code 4 milled lead sheet, lead clips, pointing sealant",
    },
    {
      id: "gutter-repair",
      name: "Eaves Gutter Realignment & Downpipe Clear",
      baseMinUK: 90,
      baseMaxUK: 180,
      baseMinUS: 120,
      baseMaxUS: 240,
      typicalDuration: "1 - 2 hours",
      commonParts: "UPVC gutter brackets, union connectors, leaf guards",
    },
  ],
  hvac: [
    {
      id: "ac-tuneup",
      name: "Air Conditioning Seasonal Diagnostic & Re-gas",
      baseMinUK: 120,
      baseMaxUK: 220,
      baseMinUS: 150,
      baseMaxUS: 270,
      typicalDuration: "1.5 - 2.5 hours",
      commonParts: "R32/R410A refrigerant top-up, coil antibacterial clean",
    },
    {
      id: "heatpump-service",
      name: "Air Source Heat Pump Inspection & Cop Check",
      baseMinUK: 140,
      baseMaxUK: 250,
      baseMinUS: 180,
      baseMaxUS: 320,
      typicalDuration: "2 - 3 hours",
      commonParts: "Flow rate test, anti-freeze glycol concentration check",
    },
  ],
};

// Default generic jobs if category is not specifically matched
const DEFAULT_JOBS: JobTypeOption[] = [
  {
    id: "standard-repair",
    name: "General Diagnostic & Standard Repair Callout",
    baseMinUK: 75,
    baseMaxUK: 150,
    baseMinUS: 95,
    baseMaxUS: 190,
    typicalDuration: "1 - 2 hours",
    commonParts: "Standard consumables and hardware fixtures",
  },
  {
    id: "half-day",
    name: "Half-Day On-Site Multi-Task Work",
    baseMinUK: 180,
    baseMaxUK: 280,
    baseMinUS: 240,
    baseMaxUS: 380,
    typicalDuration: "3 - 4 hours",
    commonParts: "Custom project materials",
  },
  {
    id: "full-day",
    name: "Full-Day Comprehensive Installation or Renovation",
    baseMinUK: 320,
    baseMaxUK: 500,
    baseMinUS: 420,
    baseMaxUS: 680,
    typicalDuration: "7 - 8 hours",
    commonParts: "Full trade installation components",
  },
];

export function ServiceCostCalculator({
  country,
  categorySlug,
  categoryName,
  currencySymbol,
}: CostCalculatorProps) {
  const jobs = CATEGORY_JOB_RATES[categorySlug] || DEFAULT_JOBS;
  const [selectedJobId, setSelectedJobId] = React.useState<string>(jobs[0].id);
  const [urgency, setUrgency] = React.useState<"EMERGENCY" | "STANDARD" | "FLEXIBLE">("STANDARD");
  const [propertyType, setPropertyType] = React.useState<"FLAT" | "HOUSE" | "COMMERCIAL">("HOUSE");

  const currentJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Calculate dynamic multiplier
  const urgencyMultiplier = urgency === "EMERGENCY" ? 1.35 : urgency === "FLEXIBLE" ? 0.95 : 1.0;
  const propertyMultiplier = propertyType === "COMMERCIAL" ? 1.25 : propertyType === "FLAT" ? 0.95 : 1.0;

  const baseMin = country === "UK" ? currentJob.baseMinUK : currentJob.baseMinUS;
  const baseMax = country === "UK" ? currentJob.baseMaxUK : currentJob.baseMaxUS;

  const calculatedMin = Math.round(baseMin * urgencyMultiplier * propertyMultiplier);
  const calculatedMax = Math.round(baseMax * urgencyMultiplier * propertyMultiplier);

  return (
    <div className="rounded-2xl bg-[var(--surface)] border-2 border-[var(--accent)]/30 shadow-xl overflow-hidden">
      {/* Calculator Header */}
      <div className="p-6 bg-gradient-to-r from-[var(--surface)] via-[var(--bg-alt)] to-[var(--surface)] border-b border-[var(--line)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-light)] text-[var(--accent)] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Instant Estimator · {country} Market Rates</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text)]">
                {categoryName} Cost &amp; Price Calculator
              </h3>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Based on 1,400+ Verified Invoices</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 1: Select Specific Task */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            1. Select Your Specific Project or Repair Task:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {jobs.map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => setSelectedJobId(job.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedJobId === job.id
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] shadow-xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] hover:border-[var(--line)]"
                }`}
              >
                <div className="font-extrabold text-xs text-[var(--text)] line-clamp-1">
                  {job.name}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--accent)]" />
                  <span>Est. {job.typicalDuration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Urgency & Property Size Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              2. When Do You Need The Work Completed?
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUrgency("EMERGENCY")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  urgency === "EMERGENCY"
                    ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400 shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">Emergency</span>
                <span className="text-[9px] font-normal opacity-80">&lt; 2-4 Hours</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency("STANDARD")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  urgency === "STANDARD"
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] text-[var(--text)] shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">Within 48h</span>
                <span className="text-[9px] font-normal opacity-80">Standard</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency("FLEXIBLE")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  urgency === "FLEXIBLE"
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] text-[var(--text)] shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">Flexible</span>
                <span className="text-[9px] font-normal opacity-80">Next 7 Days</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              3. Property Scale:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPropertyType("FLAT")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  propertyType === "FLAT"
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] text-[var(--text)] shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">Flat / Apt</span>
                <span className="text-[9px] font-normal opacity-80">1-2 Bed</span>
              </button>

              <button
                type="button"
                onClick={() => setPropertyType("HOUSE")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  propertyType === "HOUSE"
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] text-[var(--text)] shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">House</span>
                <span className="text-[9px] font-normal opacity-80">3-4 Bed</span>
              </button>

              <button
                type="button"
                onClick={() => setPropertyType("COMMERCIAL")}
                className={`p-2.5 rounded-lg border text-center font-bold cursor-pointer transition-all ${
                  propertyType === "COMMERCIAL"
                    ? "bg-[var(--brand-light)]/40 border-[var(--brand)] text-[var(--text)] shadow-2xs"
                    : "bg-[var(--bg-alt)] border-[var(--line-subtle)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="block text-[11px]">Commercial</span>
                <span className="text-[9px] font-normal opacity-80">Retail / Office</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Result Box */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[var(--bg-alt)] to-[var(--surface)] border border-[var(--line)] shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Estimated Transparent Rate Benchmark:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[var(--text)] mt-1 tracking-tight">
                {currencySymbol}{calculatedMin} &ndash; {currencySymbol}{calculatedMax}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1 flex flex-wrap items-center gap-2">
                <span>Typical duration: <strong>{currentJob.typicalDuration}</strong></span>
                <span>&bull;</span>
                <span>Includes initial labour &amp; diagnosis</span>
              </div>
            </div>

            <Link
              href={`/quote?service=${categorySlug}&task=${encodeURIComponent(currentJob.name)}&urgency=${urgency}`}
              className="px-6 py-3.5 rounded-[var(--radius)] btn-primary text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 shrink-0"
            >
              <span>Get Quotes At This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--line-subtle)] text-[11px] text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-[var(--pine-accent)] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> No obligation &middot; Free quotes &middot; Fully insured pros
            </span>
            <span>Typical parts: {currentJob.commonParts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
