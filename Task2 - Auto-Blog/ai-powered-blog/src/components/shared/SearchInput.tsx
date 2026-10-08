"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchInput({ className = "relative hidden sm:block w-[200px] md:w-[240px]" }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <input
        type="search"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-10 w-full rounded-full border border-[var(--line)] bg-[var(--card)] pl-10 pr-4 text-sm text-[var(--ink)] placeholder:text-[var(--mute)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] transition-shadow"
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--mute)] hover:text-[var(--accent)] transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
