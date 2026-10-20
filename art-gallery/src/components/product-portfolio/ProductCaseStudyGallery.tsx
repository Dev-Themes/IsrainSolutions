"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductProject } from "@/types/products";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { ProductLightbox } from "./ProductLightbox";
import { ProductCard } from "./ProductCard";
import { Maximize2, ArrowLeft, ArrowRight, Layers, Sliders, Palette, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCaseStudyGalleryProps {
  product: ProductProject;
  relatedProducts: ProductProject[];
  nextProduct: ProductProject;
  prevProduct: ProductProject;
  locale: Locale;
}

export function ProductCaseStudyGallery({
  product,
  relatedProducts,
  nextProduct,
  prevProduct,
  locale,
}: ProductCaseStudyGalleryProps) {
  const dict = getDictionary(locale);
  const accent = product.accentColor || "#78E6BF";

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxProduct, setLightboxProduct] = useState<ProductProject | null>(product);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenImage = useCallback((index: number, buttonEl: HTMLButtonElement | null) => {
    setActiveImageIndex(index);
    setLightboxProduct(product);
    setIsLightboxOpen(true);
    if (buttonEl) {
      triggerRef.current = buttonEl;
    }
  }, [product]);

  const handleCardLightbox = useCallback((p: ProductProject, ref: React.RefObject<HTMLButtonElement | null>) => {
    setActiveImageIndex(0);
    setLightboxProduct(p);
    setIsLightboxOpen(true);
    if (ref.current) {
      triggerRef.current = ref.current;
    }
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handlePrevImage = useCallback(() => {
    if (!lightboxProduct) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? lightboxProduct.galleryImages.length - 1 : prev - 1
    );
  }, [lightboxProduct]);

  const handleNextImage = useCallback(() => {
    if (!lightboxProduct) return;
    setActiveImageIndex((prev) =>
      prev === lightboxProduct.galleryImages.length - 1 ? 0 : prev + 1
    );
  }, [lightboxProduct]);

  const conceptData = product.concept[locale];
  const creativeData = product.creativeDirection[locale];
  const designDetailsData = product.designDetails[locale];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* SECTION 2: THE CONCEPT                                                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#1f1f1f]">
        <div className="container-forme">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF] block mb-2">
                {dict.productsPage.overviewTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
                {conceptData.headline}
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base font-light text-[#C4C4C4] leading-relaxed">
              {conceptData.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CREATIVE DIRECTION & COLOR PALETTE                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#1f1f1f] bg-[#08080a]">
        <div className="container-forme">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF] block mb-2">
              {dict.productsPage.artDirectionTitle}
            </span>
            <p className="text-lg sm:text-2xl font-light text-[#FFFFFF] max-w-3xl leading-relaxed">
              {creativeData.narrative}
            </p>
          </div>

          {/* Color Palette Swatches */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-[#717171]">
              <Palette size={14} style={{ color: accent }} />
              <span>{dict.productsPage.paletteSubtitle}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {creativeData.palette.map((swatch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-sm bg-[#121214] border border-[#292929] flex flex-col justify-between"
                >
                  <div
                    style={{ backgroundColor: swatch.hex }}
                    className="w-full h-16 rounded-xs mb-3 border border-[#333333]"
                  />
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#FFFFFF] mb-1">
                      <span>{swatch.name}</span>
                      <span className="text-[#888888]">{swatch.hex}</span>
                    </div>
                    <span className="text-[11px] font-light text-[#888888]">
                      {swatch.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Direction Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#1f1f1f]">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#78E6BF]">
                [TYPOGRAPHIE]
              </span>
              <p className="text-xs sm:text-sm text-[#B8B8B8] font-light leading-relaxed">
                {creativeData.typography}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#78E6BF]">
                [MATIÈRES & TOUCHER]
              </span>
              <p className="text-xs sm:text-sm text-[#B8B8B8] font-light leading-relaxed">
                {creativeData.materials}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#78E6BF]">
                [DIRECTION PHOTOGRAPHIQUE]
              </span>
              <p className="text-xs sm:text-sm text-[#B8B8B8] font-light leading-relaxed">
                {creativeData.photography}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: VISUAL GALLERY WITH LIGHTBOX EXPANSION                         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#1f1f1f]">
        <div className="container-forme">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF] block mb-1">
                {dict.productsPage.galleryTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
                {product.brand} — {product.title}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#717171] hidden sm:inline">
              {product.galleryImages.length} {locale === "fr" ? "Vues Photographiques" : "Camera Angles"}
            </span>
          </div>

          {/* Varied Gallery Presentation: Full-Width & Two-Column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Image 0: Full-Width Detail */}
            {product.galleryImages[0] && (
              <div className="relative group overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] rounded-xs">
                <button
                  type="button"
                  onClick={(e) => handleOpenImage(0, e.currentTarget)}
                  className="w-full text-left block relative cursor-pointer select-none"
                  aria-label={`${dict.productsPage.lightboxAria} — Image 1`}
                >
                  <div className="relative w-full h-[320px] sm:h-[480px] md:h-[620px]">
                    <Image
                      src={product.galleryImages[0]}
                      alt={product.imageDetails[0]?.alt[locale] || product.alt[locale]}
                      fill
                      quality={80}
                      sizes="(max-width: 1400px) 100vw, 1400px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#000000]/60 backdrop-blur-md text-[#FFFFFF] border border-[#424242] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={15} style={{ color: accent }} />
                    </div>
                    {product.imageDetails[0]?.caption && (
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 max-w-lg p-3 rounded-sm bg-[#050505]/75 backdrop-blur-md border border-[#292929]">
                        <p className="text-xs sm:text-sm text-[#FFFFFF] font-light">
                          {product.imageDetails[0].caption[locale]}
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Images 1 & 2: Two-Column Composition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {product.galleryImages.slice(1, 3).map((imgSrc, idx) => {
                const imgIndex = idx + 1;
                const meta = product.imageDetails[imgIndex];
                return (
                  <div
                    key={imgSrc}
                    className="relative group overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] rounded-xs"
                  >
                    <button
                      type="button"
                      onClick={(e) => handleOpenImage(imgIndex, e.currentTarget)}
                      className="w-full text-left block relative cursor-pointer select-none"
                      aria-label={`${dict.productsPage.lightboxAria} — Image ${imgIndex + 1}`}
                    >
                      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px]">
                        <Image
                          src={imgSrc}
                          alt={meta?.alt[locale] || product.alt[locale]}
                          fill
                          quality={80}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#000000]/60 backdrop-blur-md text-[#FFFFFF] border border-[#424242] opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 size={15} style={{ color: accent }} />
                        </div>
                        {meta?.caption && (
                          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-sm bg-[#050505]/75 backdrop-blur-md border border-[#292929]">
                            <p className="text-xs text-[#FFFFFF] font-light">
                              {meta.caption[locale]}
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DESIGN DETAILS & SPECIFICATIONS                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-[#1f1f1f] bg-[#08080a]">
        <div className="container-forme">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF] block mb-2">
              {dict.productsPage.specificationsTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
              {locale === "fr" ? "Ingénierie & Rigueur Matérielle" : "Engineering & Material Rigor"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Materials List */}
            <div className="p-6 rounded-sm bg-[#121214] border border-[#292929]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-[#78E6BF]">
                <Layers size={15} />
                <span>{dict.productsPage.materialsLabel}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#C4C4C4] font-light">
                {designDetailsData.materialsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#78E6BF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications */}
            <div className="p-6 rounded-sm bg-[#121214] border border-[#292929]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-[#78E6BF]">
                <Sliders size={15} />
                <span>{dict.productsPage.specsLabel}</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#C4C4C4] font-light">
                {designDetailsData.specifications.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#78E6BF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Innovation Note */}
            <div className="p-6 rounded-sm bg-[#121214] border border-[#292929]">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-[#78E6BF]">
                <CheckCircle2 size={15} />
                <span>{dict.productsPage.innovationLabel}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C4C4C4] font-light leading-relaxed">
                {designDetailsData.innovationNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PREVIOUS / NEXT PRODUCT NAVIGATION                            */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#1f1f1f]">
        <div className="container-forme">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Product */}
            <Link
              href={`/${locale}/products/${prevProduct.slug}`}
              className="group p-6 rounded-sm bg-[#0d0d0f] hover:bg-[#151518] border border-[#1f1f1f] hover:border-[#78E6BF]/50 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <ArrowLeft
                  size={18}
                  className="text-[#717171] group-hover:text-[#78E6BF] transition-transform duration-300 group-hover:-translate-x-1"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#717171] block mb-0.5">
                    {dict.productsPage.prevProduct}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-[#FFFFFF]">
                    {prevProduct.brand}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#717171] hidden md:inline">
                [{prevProduct.category}]
              </span>
            </Link>

            {/* Next Product */}
            <Link
              href={`/${locale}/products/${nextProduct.slug}`}
              className="group p-6 rounded-sm bg-[#0d0d0f] hover:bg-[#151518] border border-[#1f1f1f] hover:border-[#78E6BF]/50 transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#717171] block mb-0.5">
                  {dict.productsPage.nextProduct}
                </span>
                <span className="text-sm sm:text-base font-medium text-[#FFFFFF]">
                  {nextProduct.brand}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#717171] hidden md:inline">
                  [{nextProduct.category}]
                </span>
                <ArrowRight
                  size={18}
                  className="text-[#717171] group-hover:text-[#78E6BF] transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: RELATED PRODUCTS                                              */}
      {/* ========================================================================= */}
      {relatedProducts.length > 0 && (
        <section className="py-16 sm:py-24 border-b border-[#1f1f1f]">
          <div className="container-forme">
            <div className="mb-10 sm:mb-14">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#78E6BF] block mb-2">
                {dict.productsPage.relatedTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#FFFFFF]">
                {locale === "fr" ? "Poursuivre la découverte" : "Continue Exploring"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  locale={locale}
                  onOpenLightbox={handleCardLightbox}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Modal */}
      <ProductLightbox
        product={lightboxProduct}
        currentImageIndex={activeImageIndex}
        isOpen={isLightboxOpen}
        locale={locale}
        onClose={handleCloseLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        triggerRef={triggerRef}
      />
    </div>
  );
}
