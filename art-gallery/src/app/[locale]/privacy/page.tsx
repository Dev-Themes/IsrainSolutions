import { ui } from "@/i18n/ui";
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return constructMetadata({
    locale: validLocale,
    path: "privacy",
    title: ui(validLocale, "Politique de Confidentialité", "Privacy Policy"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(validLocale);

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="container-popart max-w-4xl">
        <Link
          href={`/${validLocale}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          <span>{dict.project.backToWork}</span>
        </Link>

        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--foreground)] mb-8">
          {dict.legal.privacyTitle}
        </h1>

        <div className="space-y-6 text-sm text-[var(--muted)] font-light leading-relaxed border-t border-[var(--border)] pt-8">
          <p>
            {ui(validLocale, "Le studio PopArt Agency attache une importance fondamentale à la préservation de la vie privée de ses visiteurs et collaborateurs. Nous ne collectons aucune donnée personnelle à des fins commerciales ou publicitaires.", "PopArt Agency Studio places fundamental importance on preserving the privacy of our visitors and collaborators. We do not collect personal data for commercial or marketing tracking.")}
          </p>
          <p>
            {ui(validLocale, "Les communications électroniques initiées vers hello@popart.example sont traitées dans la plus stricte confidentialité professionnelle et ne sont jamais transmises à des tiers sans accord explicite préalable.", "Electronic communications initiated to hello@popart.example are handled under strict professional confidentiality and are never transmitted to third parties without prior explicit consent.")}
          </p>
          <p className="text-xs font-mono text-[var(--subtle)] pt-6">
            © 2026 PopArt Agency Studio Créatif — Paris.
          </p>
        </div>
      </div>
    </div>
  );
}
