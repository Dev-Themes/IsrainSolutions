import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-20">
      <div className="container-popart text-center max-w-xl">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[var(--accent)] block mb-4">
          404 ERROR
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-6">
          Œuvre Introuvable
        </h1>
        <p className="text-base font-light text-[var(--muted)] mb-10 leading-relaxed">
          La page, l&apos;archive ou l&apos;étude de cas que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/fr"
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--inverse-surface)] text-[var(--inverse-foreground)] hover:bg-[var(--accent)] transition-colors text-xs font-mono tracking-[0.2em] uppercase rounded-xs"
        >
          <ArrowLeft size={16} />
          <span>Retour aux Travaux</span>
        </Link>
      </div>
    </div>
  );
}
