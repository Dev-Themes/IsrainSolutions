import { videoOffers } from "@/data/video-offers";
import { ui } from "@/i18n/ui";
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
    title: ui(validLocale, "Contact & Collaborations — Paris", "Contact & Collaborations — Paris"),
    description:
      ui(validLocale, "Initiez une collaboration artistique avec le Studio PopArt Agency à Paris. Direction artistique, identité visuelle et projets culturels.", "Initiate an artistic collaboration with PopArt Agency Studio in Paris. Art direction, visual identity and cultural commissions."),
  });
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ offer?: string | string[] }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  const query = await searchParams;
  const offer = typeof query.offer === "string" && videoOffers.some(item => String(item.count) === query.offer) ? Number(query.offer) : undefined;
  return <ContactSection locale={validLocale} as="h1" offer={offer} />;
}
