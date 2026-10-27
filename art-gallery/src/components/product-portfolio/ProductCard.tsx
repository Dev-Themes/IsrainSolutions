"use client";
import type { RefObject } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import type { ProductProject } from "@/types/products";
import type { Locale } from "@/types/portfolio";

export function ProductCard({ product, locale, priority = false, onOpenLightbox }: {
  product: ProductProject; locale: Locale; priority?: boolean;
  onOpenLightbox: (product: ProductProject, trigger: RefObject<HTMLButtonElement | null>) => void;
}) {
  return <ProjectCard href={`/${locale}/products/${product.slug}`} image={product.coverImage} alt={product.alt[locale]} title={product.title} label={product.brand} category={product.category} year={product.year} description={product.summary[locale]} wide={product.layout === "wide"} priority={priority} locale={locale} onPreview={ref => onOpenLightbox(product, ref)} />;
}
