import React from "react";
import type { Metadata } from "next";
import { PopArtGraphic } from "@/components/sections/PopArtGraphic";
import { PackageSection } from "@/components/sections/PackageSection";
import { HeroAnimated } from "@/components/sections/HeroAnimated";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { HomeAboutSection } from "@/components/sections/HomeAboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { projects } from "@/data/projects";
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
      validLocale === "fr"
        ? "Studio Créatif, Direction Artistique & Expériences Visuelles"
        : "Creative Studio, Art Direction & Visual Experiences",
    description:
      validLocale === "fr"
        ? "Studio créatif indépendant explorant la direction artistique, les identités visuelles, la narration cinématique et le design expérimental. Découvrez nos réalisations et notre vision."
        : "An independent creative studio exploring art direction, visual identities, cinematic storytelling, and experimental design. Discover our selected work and creative vision.",
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
      {/* 1. Animated Geometric Brand Hero (4-State Multicolor Transitions & Kinetic Typography) */}
      <HeroAnimated locale={validLocale} />
      <PopArtGraphic locale={validLocale} />

      {/* 2. Featured Work Section (Selected Large Cinematic Photographic Projects) */}
      <FeaturedWorkSection projects={projects} locale={validLocale} />

      {/* 3. About / Studio Introduction (Experimental Typography & Agency Manifesto) */}
      <PackageSection locale={validLocale} />
      <HomeAboutSection locale={validLocale} />

      {/* 4. Existing Contact Section (Reused as specified) */}
      <ContactSection locale={validLocale} />
    </div>
  );
}
