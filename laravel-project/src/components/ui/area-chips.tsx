"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/data";

export function AreaChips() {
  const [activeTab, setActiveTab] = React.useState<"UK" | "US">("UK");
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>("plumbing");

  const currentCities = CITIES.filter((c) => c.country === activeTab);

  return (
    <div className="space-y-8">
      {/* Country Selector Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-[var(--radius)] bg-[var(--bg-alt)] border border-[var(--line)]">
          <button
            type="button"
            onClick={() => setActiveTab("UK")}
            className={`px-5 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer ${
              activeTab === "UK"
                ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            🇬🇧 United Kingdom Towns & Regions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("US")}
            className={`px-5 py-2 rounded-[var(--radius-sm)] text-xs font-bold transition-all cursor-pointer ${
              activeTab === "US"
                ? "bg-[var(--surface)] text-[var(--text)] shadow-xs"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            🇺🇸 United States Metropolitan Areas
          </button>
        </div>
      </div>

      {/* Direct City Chips */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 text-center sm:text-left">
          {activeTab === "UK" ? "Major UK Towns & Boroughs" : "Major US Metro Areas"}
        </div>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {currentCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${activeTab.toLowerCase()}/plumbing/${city.slug}`}
              className="inline-flex items-center px-3.5 py-2 rounded-[var(--radius-sm)] bg-[var(--surface)] border border-[var(--line)] text-xs font-semibold text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--accent)] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-[var(--accent)]" />
              <span>{city.name}</span>
              <span className="text-[10px] text-[var(--text-light)] ml-1.5">
                ({city.stateCounty})
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Expandable Accordions per Trade Service listing covered areas */}
      <div className="pt-6 border-t border-[var(--line)]">
        <h4 className="font-bold text-sm text-[var(--text)] mb-4">
          Browse Specific Trade Coverage in {activeTab === "UK" ? "the United Kingdom" : "the United States"}
        </h4>

        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const isOpen = expandedCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedCategory(isOpen ? null : cat.slug)}
                  className="w-full px-5 py-3.5 text-left font-bold text-xs sm:text-sm text-[var(--text)] flex items-center justify-between hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-[var(--accent)] font-mono">0{CATEGORIES.indexOf(cat) + 1}.</span>
                    <span>{cat.name} Coverage Directory</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-[var(--line-subtle)] bg-[var(--bg-alt)]/40">
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      Select your town or city below to view verified local {cat.name.toLowerCase()} contractors:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {currentCities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/${activeTab.toLowerCase()}/${cat.slug}/${city.slug}`}
                          className="px-2.5 py-1.5 rounded-[4px] bg-[var(--surface)] border border-[var(--line-subtle)] text-[11px] font-medium text-[var(--text)] hover:text-[var(--accent)] hover:border-[var(--brand)] transition-colors truncate"
                        >
                          {cat.name.split(" ")[0]} in {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
