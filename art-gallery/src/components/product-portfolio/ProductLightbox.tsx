"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ProductProject } from "@/types/products";
import { Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductLightboxProps {
  product: ProductProject | null;
  currentImageIndex: number;
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function ProductLightbox({
  product,
  currentImageIndex,
  isOpen,
  locale,
  onClose,
  onPrev,
  onNext,
  triggerRef,
}: ProductLightboxProps) {
  const dict = getDictionary(locale);
  const swipe = useSwipeNavigation(onPrev, onNext);
  const handlers = useRef({ onClose, onPrev, onNext });
  useEffect(() => { handlers.current = { onClose, onPrev, onNext }; }, [onClose, onPrev, onNext]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Lock body scroll and manage keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open for instant accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.current.onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlers.current.onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handlers.current.onNext();
      } else if (e.key === "Tab") {
        // Focus trap inside dialog
        if (!dialogRef.current) return;
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const triggerElem = triggerRef?.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to trigger element
      triggerElem?.focus();
    };
  }, [isOpen, triggerRef]);

  if (!isOpen || !product || !mounted) return null;

  const currentImageSrc = product.galleryImages[currentImageIndex] || product.coverImage;
  const currentImageMeta = product.imageDetails[currentImageIndex] || {
    src: currentImageSrc,
    alt: product.alt,
    caption: product.tagline,
  };
  const totalImages = product.galleryImages.length || 1;
  const accent = product.accentColor || "#FF9B70";
  const closeLabel = locale === "fr" ? "Fermer" : "Close";

  return createPortal(
    <AnimatePresence>
      <div
        ref={dialogRef}
        {...swipe}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.brand} — ${product.title} — ${locale === "fr" ? "Aperçu" : "Preview"}`}
        style={{ zIndex: 9999 }}
        className="lightbox-frame fixed inset-0 flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 bg-[var(--background)]/95 backdrop-blur-xl"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handlers.current.onClose();
          }
        }}
      >
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[var(--background)]/80 pointer-events-none"
        />

        {/* Top Control Bar: Brand Metadata & Close Pill Button */}
        <div className="w-full flex items-center justify-between z-30 pointer-events-auto shrink-0 mb-2">
          {/* Left: Category Badge, Brand, Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span
              style={{ borderColor: accent }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono border px-2.5 py-1 rounded-xs shrink-0"
            >
              [{product.category.toUpperCase()}]
            </span>
            <span className="text-xs sm:text-sm font-normal text-[var(--muted)] truncate hidden sm:inline">
              <strong className="text-[var(--foreground)] font-medium">{product.brand}</strong> — {product.title} • {product.year}
            </span>
          </div>

          {/* Right: Primary Close Button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[var(--surface-raised)] hover:bg-[var(--surface-alt)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] hover:text-[var(--accent)] transition-all duration-200 shadow-xl focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:scale-95 shrink-0 cursor-pointer"
            aria-label={dict.lightbox.close}
            title={dict.lightbox.close}
          >
            <span className="text-[11px] font-mono uppercase tracking-widest font-medium">
              {closeLabel}
            </span>
            <X size={18} className="text-current shrink-0" />
          </button>
        </div>

        {/* Center Media: Responsive Image Container */}
        <div className="relative w-full h-[52vh] sm:h-[66vh] md:h-[72vh] max-w-6xl flex items-center justify-center z-10 my-auto">
          <motion.div
            key={currentImageSrc}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center select-none"
          >
            <div className="relative w-full h-full max-h-[50vh] sm:max-h-[64vh] md:max-h-[70vh]">
              <Image
                src={currentImageSrc}
                alt={currentImageMeta.alt[locale]}
                fill
                preload
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Previous / Next Arrows (if multiple images) */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[var(--surface-raised)]/95 text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--surface-alt)] border border-[var(--border)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                style={{ "--modal-accent": accent } as React.CSSProperties}
                aria-label={dict.lightbox.previous}
                title={dict.lightbox.previous}
              >
                <ChevronLeft size={22} className="sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={onNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[var(--surface-raised)]/95 text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--surface-alt)] border border-[var(--border)] transition-colors focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                style={{ "--modal-accent": accent } as React.CSSProperties}
                aria-label={dict.lightbox.next}
                title={dict.lightbox.next}
              >
                <ChevronRight size={22} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Drawer: Image Caption, Counter, and Dedicated Case Study Link */}
        <div className="w-full max-w-4xl z-30 pointer-events-auto shrink-0 mt-2">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--surface-raised)]/90 border border-[var(--border)] backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xl">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-medium text-[var(--foreground)] truncate">
                  {product.brand} — {product.title}
                </span>
                {totalImages > 1 && (
                  <span className="text-[10px] font-mono text-[var(--subtle)] bg-[var(--surface-raised)] px-2 py-0.5 rounded-full shrink-0">
                    {currentImageIndex + 1}/{totalImages}
                  </span>
                )}
              </div>
              {currentImageMeta.caption && (
                <p className="text-[11px] sm:text-xs text-[var(--muted)] font-normal line-clamp-2 leading-relaxed">
                  {currentImageMeta.caption[locale]}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-end border-t border-[var(--border)] sm:border-t-0 pt-2 sm:pt-0">
              {/* Secondary Close Button (Thumb-accessible for mobile & tablet) */}
              <button
                type="button"
                onClick={onClose}
                className="sm:hidden px-3 py-1.5 rounded-sm bg-[var(--surface)] hover:bg-[var(--surface-alt)] text-[var(--muted)] hover:text-[var(--foreground)] text-[11px] font-mono uppercase tracking-wider border border-[var(--border)] transition-colors"
              >
                {closeLabel}
              </button>

              {/* View Project Action Link */}
              <Link
                href={`/${locale}/products/${product.slug}`}
                onClick={onClose}
                style={{ borderColor: accent }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xs border text-xs font-mono uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[var(--inverse-surface)] hover:text-[var(--inverse-foreground)] hover:border-[var(--foreground)]"
              >
                <span>{dict.productsPage.viewProject}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
