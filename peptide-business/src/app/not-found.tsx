import React from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-background">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background-secondary border border-border text-accent mb-2">
          <Search className="w-6 h-6" />
        </div>
        
        <div className="space-y-2">
          <span className="editorial-badge">404 Error</span>
          <h1 className="text-3xl font-display font-medium text-foreground tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-foreground-muted leading-relaxed">
            The peptide ingredient or page you are looking for does not exist in our current catalog directory.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-btn-primary-text bg-btn-primary hover:bg-btn-primary-hover rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
