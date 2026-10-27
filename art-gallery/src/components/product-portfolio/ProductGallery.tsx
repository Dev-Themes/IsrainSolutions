"use client";

import { useState, useCallback, useRef } from "react";
import { ProductCard } from "./ProductCard";
import { ProductLightbox } from "./ProductLightbox";
import type { ProductProject } from "@/types/products";
import type { Locale } from "@/types/portfolio";

const FILTERS = [
  { id: "all", en: "All products", fr: "Tous les produits", categories: [] },
  { id: "beauty", en: "Beauty & packaging", fr: "Beauté & packaging", categories: ["Luxury Fragrance", "Skincare", "Sustainable Packaging"] },
  { id: "objects", en: "Home & objects", fr: "Maison & objets", categories: ["Furniture", "Lighting Design", "Home Objects", "Stationery"] },
  { id: "technology", en: "Technology", fr: "Technologie", categories: ["Audio Technology", "Wearable Technology"] },
  { id: "accessories", en: "Accessories", fr: "Accessoires", categories: ["Watches", "Fashion Accessories", "Eyewear"] },
];

export function ProductGallery({ products, locale, showFilters = true }: { products: ProductProject[]; locale: Locale; showFilters?: boolean }) {
  const [filter, setFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const handleOpenLightbox = useCallback((product: ProductProject, trigger: React.RefObject<HTMLButtonElement | null>) => {
    setSelectedProduct(product); setCurrentImageIndex(0); activeTriggerRef.current = trigger.current;
  }, []);
  const categories = FILTERS.find(item => item.id === filter)?.categories ?? [];
  const visible = products.filter(product => !categories.length || categories.includes(product.category));
  const displayed = visible.map(product => ({ ...product }));
  if (showFilters && filter !== "all") {
    displayed.forEach((product, index) => { product.layout = index === 0 && displayed.length % 2 === 1 ? "wide" : "standard"; });
  } else if (showFilters) {
    let openRow = false;
    displayed.forEach((product, index) => {
      if (product.layout === "wide") {
        if (openRow && index > 0) displayed[index - 1].layout = "wide";
        openRow = false;
      } else openRow = !openRow;
    });
    if (openRow && displayed.length) displayed[displayed.length - 1].layout = "wide";
  }
  return <>
    {showFilters && <>
      <div className="product-filters" role="group" aria-label={locale === "fr" ? "Filtrer les produits" : "Filter products"}>
        {FILTERS.map(item => <button key={item.id} type="button" className="filter-button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item[locale]}</button>)}
      </div>
      <p className="text-sm text-[var(--muted)] mb-7" role="status" aria-live="polite">{visible.length} {locale === "fr" ? "concepts de produits" : "product concepts"}</p>
    </>}
    <div className="product-grid">
      {displayed.map((product, index) => <ProductCard key={product.id} product={product} locale={locale} priority={showFilters && index === 0} onOpenLightbox={handleOpenLightbox} />)}
    </div>
    <ProductLightbox product={selectedProduct} currentImageIndex={currentImageIndex} isOpen={selectedProduct !== null} locale={locale}
      onClose={() => setSelectedProduct(null)}
      onPrev={() => selectedProduct && setCurrentImageIndex(index => (index - 1 + selectedProduct.galleryImages.length) % selectedProduct.galleryImages.length)}
      onNext={() => selectedProduct && setCurrentImageIndex(index => (index + 1) % selectedProduct.galleryImages.length)}
      triggerRef={activeTriggerRef} />
  </>;
}
