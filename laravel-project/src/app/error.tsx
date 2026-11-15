"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="section-light py-24 text-center">
      <div className="container-custom max-w-md">
        <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--accent-light)] text-[var(--accent)] mx-auto flex items-center justify-center mb-4 border border-[var(--line)]">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text)] mb-2">
          Something went wrong
        </h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
          We encountered an unexpected issue while retrieving trade listings. You can retry the connection or return home.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2.5 rounded-[var(--radius-sm)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-bold text-xs inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-4 py-2.5 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--bg-alt)] text-[var(--text)] font-semibold text-xs inline-flex items-center space-x-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
