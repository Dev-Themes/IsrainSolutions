"use client";

import React, { useState, useCallback, useRef } from "react";
import { ProductProject } from "@/types/products";
import { Locale } from "@/types/portfolio";
import { ProductCard } from "./ProductCard";
import { ProductLightbox } from "./ProductLightbox";

interface ProductGalleryProps {
  products: ProductProject[];
  locale: Locale;
}

export function ProductGallery({ products, locale }: ProductGalleryProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenLightbox = useCallback(
    (product: ProductProject, triggerRef: React.RefObject<HTMLButtonElement | null>) => {
      setSelectedProduct(product);
      setCurrentImageIndex(0);
      setIsLightboxOpen(true);
      if (triggerRef.current) {
        activeTriggerRef.current = triggerRef.current;
      }
    },
    []
  );

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedProduct(null);
  }, []);

  const handlePrevImage = useCallback(() => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProduct.galleryImages.length - 1 : prev - 1
    );
  }, [selectedProduct]);

  const handleNextImage = useCallback(() => {
    if (!selectedProduct) return;
    setCurrentImageIndex((prev) =>
      prev === selectedProduct.galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [selectedProduct]);

  return (
    <>
      {/* Product Gallery Grid: 2 columns on desktop, alternating wide & standard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            priority={index < 3}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      {/* Interactive Fullscreen Lightbox */}
      <ProductLightbox
        product={selectedProduct}
        currentImageIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        locale={locale}
        onClose={handleCloseLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        triggerRef={activeTriggerRef}
      />
    </>
  );
}
