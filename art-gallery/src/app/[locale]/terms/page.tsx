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
    path: "terms",
    title: ui(validLocale, "Mentions Légales", "Terms & Legal"),
  });
}

export default async function TermsPage({
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
          {dict.legal.termsTitle}
        </h1>

        <div className="space-y-6 text-sm text-[var(--muted)] font-light leading-relaxed border-t border-[var(--border)] pt-8">
          <p>
            {ui(validLocale, "PopArt Agency est une agence fictive d'art contemporain et de communication visuelle conçue dans le cadre d'une démonstration d'architecture web et de design éditorial haut de gamme.", "PopArt Agency is a fictional contemporary art direction and visual communication studio created as an architectural showcase of high-end editorial web design.")}
          </p>
          <p>
            {ui(validLocale, "L'ensemble des visuels présentés au sein des études de cas sont des œuvres sous licence de libre diffusion artistique ou des créations conceptuelles originales. Tout usage sans mention préalable est proscrit.", "All visuals presented across case studies are openly licensed artistic works or original conceptual compositions. Any unauthorized redistribution without proper attribution is prohibited.")}
          </p>
          <p className="text-xs font-mono text-[var(--subtle)] pt-6">
            © 2026 PopArt Agency Studio Créatif — Paris, France.
          </p>
        </div>
      </div>
    </div>
  );
}
