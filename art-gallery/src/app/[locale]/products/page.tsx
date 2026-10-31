import React from "react";
import type { Metadata } from "next";
import { ProductServicePage } from "@/components/product-portfolio/ProductServicePage";
import serviceCopy from "@/content/pages/product-service.config.json";
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
    title: dict.nav.products,
    description: serviceCopy[validLocale].intro,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;

  return <ProductServicePage locale={validLocale} />;
}
