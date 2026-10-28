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
    path: "cookies",
    title: ui(validLocale, "Gestion des Cookies", "Cookie Policy"),
  });
}

export default async function CookiesPage({
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
          {dict.legal.cookiesTitle}
        </h1>

        <div className="space-y-6 text-sm text-[var(--muted)] font-light leading-relaxed border-t border-[var(--border)] pt-8">
          <p>
            {ui(validLocale, "Ce site web utilise uniquement les mécanismes techniques strictement nécessaires à la navigation et à la mémorisation de votre langue de consultation (Roumain, Français ou Anglais).", "This website strictly uses essential technical mechanisms required for navigation and remembering your language selection (Romanian, French or English).")}
          </p>
          <p>
            {ui(validLocale, "Aucun traceur tiers, pixel publicitaire ou outil invasif d'analyse comportementale n'est déployé sur cette plateforme.", "No third-party trackers, advertising pixels, or invasive behavioral telemetry are deployed across this platform.")}
          </p>
          <p className="text-xs font-mono text-[var(--subtle)] pt-6">
            © 2026 PopArt Agency Studio Créatif — Paris.
          </p>
        </div>
      </div>
    </div>
  );
}
