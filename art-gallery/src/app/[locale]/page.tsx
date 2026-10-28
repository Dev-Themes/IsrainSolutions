import { ui } from "@/i18n/ui";
import React from "react";
import type { Metadata } from "next";
import { PackageSection } from "@/components/sections/PackageSection";
import { HeroAnimated } from "@/components/sections/HeroAnimated";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { HomeAboutSection } from "@/components/sections/HomeAboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { workSamples } from "@/data/work-samples";
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
    path: "",
    title:
      ui(validLocale, "Publicités Vidéo Produit & Studio Créatif", "Product Video Ads & Creative Studio"),
    description:
      ui(validLocale, "Découvrez nos films produit et nos offres de 2, 3 ou 5 vidéos publicitaires. Des directions créatives distinctes pour mettre votre produit en scène.", "Explore our product films and packages of 2, 3 or 5 video ads. Distinct creative directions that bring your product to life."),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <div className="w-full">
      {/* Animated geometric brand identity. */}
      <HeroAnimated locale={validLocale} />

      {/* Product films open directly in the shared media viewer. */}
      <FeaturedWorkSection projects={workSamples} locale={validLocale} />

      {/* Launch offers and studio introduction. */}
      <PackageSection locale={validLocale} />
      <HomeAboutSection locale={validLocale} />

      {/* Project enquiries. */}
      <ContactSection locale={validLocale} />
    </div>
  );
}
