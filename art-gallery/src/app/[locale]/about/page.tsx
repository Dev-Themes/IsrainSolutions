import React from "react";
import type { Metadata } from "next";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata } from "@/lib/seo";
import { AboutSection } from "@/components/sections/AboutSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return constructMetadata({
    locale: validLocale,
    path: "about",
    title: validLocale === "fr" ? "Studio — Philosophie & Savoir-faire" : "Studio — Philosophy & Capabilities",
    description:
      validLocale === "fr"
        ? "Plus qu'une agence. Un espace où les idées prennent forme. Découvrez le manifeste, les disciplines et l'équipe du Studio PopArt Agency."
        : "More than an agency. A space where ideas take shape. Explore PopArt Agency Studio's manifesto, disciplines and creative leadership.",
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return <AboutSection locale={validLocale} />;
}
