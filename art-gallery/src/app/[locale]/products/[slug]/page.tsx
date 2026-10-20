import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productProjects, getProductBySlug, getRelatedProducts } from "@/data/product-projects";
import { defaultLocale, locales, isValidLocale } from "@/i18n/config";
import { Locale } from "@/types/portfolio";
import { constructMetadata, generateProductCreativeWorkSchema } from "@/lib/seo";
import { ProductCaseStudyHero } from "@/components/product-portfolio/ProductCaseStudyHero";
import { ProductCaseStudyGallery } from "@/components/product-portfolio/ProductCaseStudyGallery";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productProjects.map((product) => ({
      locale,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const product = getProductBySlug(slug);

  if (!product) {
    return constructMetadata({
      locale: validLocale,
      title: validLocale === "fr" ? "Produit Introuvable" : "Product Not Found",
      description:
        validLocale === "fr"
          ? "Cette campagne produit n'existe pas dans nos archives."
          : "This product campaign does not exist in our archives.",
    });
  }

  return constructMetadata({
    locale: validLocale,
    path: `products/${product.slug}`,
    title: `${product.brand} — ${product.title}`,
    description: product.summary[validLocale],
    ogImage: product.coverImage,
  });
}

export default async function ProductCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 2);

  // Compute next and previous product in cyclical order
  const currentIndex = productProjects.findIndex((p) => p.slug === product.slug);
  const nextProduct = productProjects[(currentIndex + 1) % productProjects.length];
  const prevProduct =
    productProjects[(currentIndex - 1 + productProjects.length) % productProjects.length];

  const productSchema = generateProductCreativeWorkSchema(product, validLocale);

  return (
    <article className="w-full">
      {/* Schema.org CreativeWork JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Case Study Cinematic Hero */}
      <ProductCaseStudyHero product={product} locale={validLocale} />

      {/* Case Study Storytelling Body, Palette, Materials, Specs, Navigation */}
      <ProductCaseStudyGallery
        product={product}
        relatedProducts={relatedProducts}
        nextProduct={nextProduct}
        prevProduct={prevProduct}
        locale={validLocale}
      />
    </article>
  );
}
