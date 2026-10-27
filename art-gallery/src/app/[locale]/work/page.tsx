import React from "react";
import type { Metadata } from "next";
import { WorkHero } from "@/components/sections/WorkHero";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { projects } from "@/data/projects";
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
    title: validLocale === "fr" ? "Travaux & Direction Artistique" : "Work & Art Direction",
    description:
      validLocale === "fr"
        ? "Explorez l'ensemble des projets et réalisations du Studio PopArt Agency : direction artistique, identité visuelle, photographie et scénographie."
        : "Explore the complete portfolio of PopArt Agency Studio: art direction, visual identity, fine art photography, moving image, and spatial design.",
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

      {/* Capabilities Section ('WE MAKE IDEAS VISIBLE.') */}
      <CapabilitiesSection locale={validLocale} />

      {/* Main Portfolio Grid Gallery */}
      <div className="container-popart pt-12 sm:pt-16">
        <PortfolioGrid projects={projects} locale={validLocale} />
      </div>

      {/* Contact Section */}
      <ContactSection locale={validLocale} />
    </div>
  );
}
