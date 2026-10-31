import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// The root 404 is outside the localized layouts and needs its own metadata base.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

export default function RootNotFound() {
  return (
    <html lang="ro" data-theme="light" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex items-center justify-center p-6" suppressHydrationWarning>
        <div className="text-center max-w-md">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[var(--accent)] block mb-4">
            404
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-[var(--foreground)] mb-4">
            Pagina nu a fost găsită
          </h1>
          <p className="text-sm font-light text-[var(--muted)] mb-8">
            Pagina căutată nu există.
          </p>
          <Link
            href="/ro"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--inverse-surface)] text-[var(--inverse-foreground)] hover:bg-[var(--accent)] transition-colors text-xs font-mono uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Acasă</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
