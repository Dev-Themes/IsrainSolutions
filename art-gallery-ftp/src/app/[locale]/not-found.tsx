"use client";

import React from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "@/i18n";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-20">
      <div className="container-popart text-center max-w-xl">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[var(--accent)] block mb-4">
          404
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-[var(--foreground)] mb-6">
          {dict.notFound.title}
        </h1>
        <p className="text-base font-light text-[var(--muted)] mb-10 leading-relaxed">
          {dict.notFound.description}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-[var(--inverse-surface)] text-[var(--inverse-foreground)] hover:bg-[var(--accent)] transition-colors text-xs font-mono tracking-[0.2em] uppercase rounded-xs"
        >
          <ArrowLeft size={16} />
          <span>{dict.notFound.action}</span>
        </Link>
      </div>
    </div>
  );
}
