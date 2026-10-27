import React from "react";
import type { Metadata } from "next";
import { WorkHero } from "@/components/sections/WorkHero";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { workSamples } from "@/data/work-samples";
import { ContactSection } from "@/components/sections/ContactSection";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return constructMetadata({
    locale: validLocale,
    path: "work",
    title: validLocale === "fr" ? "Films Produit & Publicités Vidéo" : "Product Films & Video Ads",
    description:
      validLocale === "fr"
        ? "Découvrez notre sélection de films produit : beauté, mode, parfum et lifestyle. Filtrez la collection et regardez chaque film sans quitter la galerie."
        : "Explore our selected product films across beauty, fashion, fragrance and lifestyle. Filter the collection and watch any film without leaving the gallery.",
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <div className="w-full">
      {/* Work Intro Hero Section */}
      <WorkHero locale={validLocale} />

      {/* Main Portfolio Grid Gallery */}
      <section className="dark-section section-space" aria-label={validLocale === "fr" ? "Films produit" : "Product films"}>
        <div className="container-popart"><PortfolioGrid projects={workSamples} locale={validLocale} /></div>
      </section>

      {/* Contact Section */}
      <ContactSection locale={validLocale} />
    </div>
  );
}
