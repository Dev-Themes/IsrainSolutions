"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PublisherSite } from "@/content/sites";
import { Search, ArrowUpDown, Filter, Globe, ExternalLink, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteTableProps {
  sites: PublisherSite[];
  type: "guest-post" | "link-insertion";
}

export const SiteTable: React.FC<SiteTableProps> = ({ sites, type }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"da" | "dr" | "price">("da");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Extract categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(sites.map((s) => s.category)));
    return ["all", ...cats];
  }, [sites]);

  // Filter & sort
  const filteredSites = useMemo(() => {
    return sites
      .filter((site) => {
        const matchesSearch =
          site.name.toLowerCase().includes(search.toLowerCase()) ||
          site.domain.toLowerCase().includes(search.toLowerCase()) ||
          site.category.toLowerCase().includes(search.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || site.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let valA = a[sortBy] ?? 0;
        let valB = b[sortBy] ?? 0;
        if (sortOrder === "asc") {
          return valA > valB ? 1 : -1;
        } else {
          return valA < valB ? 1 : -1;
        }
      });
  }, [sites, search, selectedCategory, sortBy, sortOrder]);

  const toggleSort = (col: "da" | "dr" | "price") => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Search and Filters Bar - 100% responsive for 320px viewports */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[#06163b]/85 border border-sky-400/35 shadow-[0_0_20px_rgba(56,189,248,0.1)]">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-300" />
          <input
            type="text"
            placeholder="Search publication, domain, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-lg bg-[#040f2b] border border-sky-500/30 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 sm:py-2.5 rounded-lg bg-[#040f2b] border border-sky-500/30 text-white text-xs focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 cursor-pointer"
          >
            <option value="all">All Categories ({sites.length})</option>
            {categories
              .filter((c) => c !== "all")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Mobile Quick Sort Controls (< md) */}
      <div className="flex md:hidden items-center justify-between px-1 text-xs text-slate-300">
        <span className="text-[11px] uppercase tracking-wider text-sky-400 font-mono">
          Showing {filteredSites.length} publishers
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">Sort:</span>
          <button
            type="button"
            onClick={() => toggleSort("da")}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-bold border transition-colors",
              sortBy === "da"
                ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0]"
                : "bg-[#06173d] text-slate-300 border-sky-500/25"
            )}
          >
            DA {sortBy === "da" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
          </button>
          <button
            type="button"
            onClick={() => toggleSort("dr")}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-bold border transition-colors",
              sortBy === "dr"
                ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0]"
                : "bg-[#06173d] text-slate-300 border-sky-500/25"
            )}
          >
            DR {sortBy === "dr" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
          </button>
          <button
            type="button"
            onClick={() => toggleSort("price")}
            className={cn(
              "px-2 py-1 rounded text-[11px] font-bold border transition-colors",
              sortBy === "price"
                ? "bg-[#1FA9E0] text-slate-950 border-[#1FA9E0]"
                : "bg-[#06173d] text-slate-300 border-sky-500/25"
            )}
          >
            $ {sortBy === "price" ? (sortOrder === "desc" ? "↓" : "↑") : ""}
          </button>
        </div>
      </div>

      {/* MOBILE CARDS VIEW: 100% Responsive for 320px to 767px (hidden on md+) */}
      <div className="grid grid-cols-1 gap-3.5 md:hidden w-full">
        {filteredSites.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-xl bg-[#06163b]/70 border border-sky-500/20 text-slate-400 text-xs">
            No publisher matching &quot;{search}&quot; found.
          </div>
        ) : (
          filteredSites.map((site) => (
            <div
              key={site.id}
              className="p-4 rounded-xl bg-[#06163b]/90 border border-sky-400/30 space-y-3 shadow-md"
            >
              {/* Publisher Title & Category Badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-sm truncate">{site.name}</h3>
                  <span className="text-[11px] text-sky-300 font-mono block truncate">
                    {site.domain}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-[#1FA9E0] text-[10px] font-semibold whitespace-nowrap flex-shrink-0">
                  {site.category}
                </span>
              </div>

              {/* 4-Pill Metric Grid */}
              <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
                <div className="p-1.5 rounded-lg bg-[#040f2b] border border-sky-500/20">
                  <span className="text-[9px] uppercase text-slate-400 block font-mono">Moz DA</span>
                  <strong className="text-xs font-bold text-white block">
                    {site.da !== null ? site.da : "—"}
                  </strong>
                </div>
                <div className="p-1.5 rounded-lg bg-[#040f2b] border border-sky-500/20">
                  <span className="text-[9px] uppercase text-slate-400 block font-mono">Ahrefs DR</span>
                  <strong className="text-xs font-bold text-[#1FA9E0] block">
                    {site.dr !== null ? site.dr : "—"}
                  </strong>
                </div>
                <div className="p-1.5 rounded-lg bg-[#040f2b] border border-sky-500/20">
                  <span className="text-[9px] uppercase text-slate-400 block font-mono">Traffic</span>
                  <strong className="text-xs font-bold text-white block truncate">
                    {site.trafficMonthly ? site.trafficMonthly.replace(/ monthly|\+/g, "") : "5k+"}
                  </strong>
                </div>
                <div className="p-1.5 rounded-lg bg-[#040f2b] border border-sky-500/20">
                  <span className="text-[9px] uppercase text-slate-400 block font-mono">Price</span>
                  <strong className="text-xs font-bold text-emerald-400 block">
                    {site.price !== null ? `$${site.price}` : "Quote"}
                  </strong>
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="flex items-center justify-between pt-2 border-t border-sky-500/15 text-xs">
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 font-semibold">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{site.linkType || "Dofollow"}</span>
                </span>
                <Link
                  href={`/order?site=${encodeURIComponent(site.domain)}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1FA9E0] hover:bg-[#34bbf0] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(31,169,224,0.3)] active:scale-95"
                >
                  Select &amp; Order →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP / TABLET DATA TABLE VIEW (hidden on < md, visible on md+) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-sky-400/30 bg-[#06163b]/90 shadow-[0_10px_30px_rgba(2,8,23,0.7)]">
        <table className="w-full text-left text-xs text-slate-200 min-w-[720px]">
          <thead className="bg-[#081e4a] text-[11px] uppercase tracking-wider text-sky-300 border-b border-sky-400/30">
            <tr>
              <th className="py-3.5 px-4 font-bold">Publisher Name &amp; Domain</th>
              <th className="py-3.5 px-4 font-bold">Category</th>
              <th
                onClick={() => toggleSort("da")}
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Moz DA</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => toggleSort("dr")}
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Ahrefs DR</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4 font-bold">Monthly Traffic</th>
              <th
                onClick={() => toggleSort("price")}
                className="py-3.5 px-4 font-bold cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4 font-bold">Link Type</th>
              <th className="py-3.5 px-4 font-bold text-right">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-500/15">
            {filteredSites.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-slate-400">
                  No publisher matching &quot;{search}&quot; found.
                </td>
              </tr>
            ) : (
              filteredSites.map((site) => (
                <tr key={site.id} className="hover:bg-sky-500/10 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block text-sm">{site.name}</span>
                    <span className="text-[11px] text-sky-300/80 font-mono">{site.domain}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{site.category}</td>
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {site.da !== null ? `DA ${site.da}` : <span className="text-slate-400">On request</span>}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-sky-400">
                    {site.dr !== null ? `DR ${site.dr}` : <span className="text-slate-400">On request</span>}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {site.trafficMonthly || "5,000+"}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {site.price !== null ? `$${site.price}` : <span className="text-slate-400">Quote</span>}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40 font-semibold">
                      {site.linkType || "Dofollow"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/order?site=${encodeURIComponent(site.domain)}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 hover:bg-[#1FA9E0] hover:text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(56,189,248,0.15)]"
                    >
                      <span>Select</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
