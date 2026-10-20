import React from "react";
import type { Metadata } from "next";
import { ProductHero } from "@/components/product-portfolio/ProductHero";
import { ProductGallery } from "@/components/product-portfolio/ProductGallery";
import { productProjects } from "@/data/product-projects";
import { ContactSection } from "@/components/sections/ContactSection";
import { defaultLocale, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata } from "@/lib/seo";
import { getDictionary } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const dict = getDictionary(validLocale);

  return constructMetadata({
    locale: validLocale,
    path: "products",
    title: validLocale === "fr" ? "Campagnes Produits & Directions Artistiques" : "Product Campaigns & Creative Direction",
    description: dict.productsPage.heroSubtext,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return (
    <div className="w-full">
      <ProductHero locale={validLocale} />
      <div className="container-forme pt-12 sm:pt-16 pb-16 sm:pb-24">
        <ProductGallery products={productProjects} locale={validLocale} />
      </div>
      <ContactSection locale={validLocale} />
    </div>
  );
}
