import React from "react";
import type { Metadata } from "next";
import { WorkHero } from "@/components/sections/WorkHero";
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
    title: validLocale === "fr" ? "Tous les Projets — Galerie" : "All Projects — Gallery",
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
      <WorkHero locale={validLocale} />
      <div className="container-forme pt-12 sm:pt-16">
        <PortfolioGrid projects={projects} locale={validLocale} />
      </div>
      <ContactSection locale={validLocale} />
    </div>
  );
}
