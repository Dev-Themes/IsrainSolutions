import React from "react";
import type { Metadata } from "next";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  return constructMetadata({
    locale: validLocale,
    path: "contact",
    title: validLocale === "fr" ? "Contact & Collaborations — Paris" : "Contact & Collaborations — Paris",
    description:
      validLocale === "fr"
        ? "Initiez une collaboration artistique avec le Studio PopArt Agency à Paris. Direction artistique, identité visuelle et projets culturels."
        : "Initiate an artistic collaboration with PopArt Agency Studio in Paris. Art direction, visual identity and cultural commissions.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return <ContactSection locale={validLocale} as="h1" />;
}
