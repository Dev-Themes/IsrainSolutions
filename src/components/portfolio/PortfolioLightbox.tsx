"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { PortfolioProject, Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioLightboxProps {
  project: PortfolioProject | null;
  currentImageIndex: number;
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function PortfolioLightbox({
  project,
  currentImageIndex,
  isOpen,
  locale,
  onClose,
  onPrev,
  onNext,
  triggerRef,
}: PortfolioLightboxProps) {
  const dict = getDictionary(locale);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
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

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to trigger element
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, onPrev, onNext, triggerRef]);

  if (!isOpen || !project || !mounted) return null;

  const currentImage = project.galleryImages[currentImageIndex] || project.coverImage;
  const totalImages = project.galleryImages.length || 1;
  const accent = project.accentColor || "#E8D49B";
  const closeLabel = locale === "fr" ? "Fermer" : "Close";

  return createPortal(
    <AnimatePresence>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — Vue Agrandie`}
        style={{ zIndex: 9999 }}
        className="fixed inset-0 flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 bg-[#050505]/95 backdrop-blur-xl"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Backdrop Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#000000]/80 pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* TOP CONTROL BAR: Metadata & High-Visibility Close Button (All Devices)     */}
        {/* ========================================================================= */}
        <div className="w-full flex items-center justify-between z-30 pointer-events-auto shrink-0 mb-2">
          {/* Left: Category Badge & Project Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span
              style={{ color: accent, borderColor: `${accent}60` }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono border px-2.5 py-1 rounded-xs shrink-0"
            >
              [{project.category.toUpperCase()}]
            </span>
            <span className="text-xs sm:text-sm font-light text-[#B8B8B8] truncate hidden sm:inline">
              {project.title} • {project.year}
            </span>
          </div>

          {/* Right: PRIMARY CLOSE BUTTON (Accessible on ALL mobile, tablet, and desktop devices) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#292929] border border-[#424242] hover:border-[#FF665C] text-[#FFFFFF] hover:text-[#FF665C] transition-all duration-200 shadow-xl focus-visible:ring-2 focus-visible:ring-[#FF665C] active:scale-95 shrink-0 cursor-pointer"
            aria-label={dict.lightbox.close}
            title={dict.lightbox.close}
          >
            <span className="text-[11px] font-mono uppercase tracking-widest font-medium">
              {closeLabel}
            </span>
            <X size={18} className="text-current shrink-0" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CENTER MEDIA: Optimized High-Speed Responsive Image Container            */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[52vh] sm:h-[66vh] md:h-[72vh] max-w-6xl flex items-center justify-center z-10 my-auto">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center select-none"
          >
            <div className="relative w-full h-full max-h-[50vh] sm:max-h-[64vh] md:max-h-[70vh]">
              <Image
                src={currentImage}
                alt={project.alt[locale]}
                fill
                priority
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Navigation Controls (if multiple images in project) */}
          {totalImages > 1 && (
            <>
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#121212]/85 text-[#FFFFFF] hover:text-[var(--modal-accent)] hover:bg-[#202020] border border-[#333333] transition-colors focus-visible:ring-1 focus-visible:ring-[#E8D49B]"
                style={{ "--modal-accent": accent } as React.CSSProperties}
                aria-label={dict.lightbox.previous}
                title={dict.lightbox.previous}
              >
                <ChevronLeft size={22} className="sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={onNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-[#121212]/85 text-[#FFFFFF] hover:text-[var(--modal-accent)] hover:bg-[#202020] border border-[#333333] transition-colors focus-visible:ring-1 focus-visible:ring-[#E8D49B]"
                style={{ "--modal-accent": accent } as React.CSSProperties}
                aria-label={dict.lightbox.next}
                title={dict.lightbox.next}
              >
                <ChevronRight size={22} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM EDITORIAL PLAQUE & SECONDARY CLOSE BUTTON                          */}
        {/* ========================================================================= */}
        <div className="w-full max-w-6xl bg-[#0a0a0a]/95 backdrop-blur-md border border-[#292929] p-3 sm:p-5 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 z-20 pointer-events-auto shrink-0 shadow-2xl">
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 mb-1">
              <span
                style={{ color: accent }}
                className="text-[10px] uppercase font-mono tracking-widest"
              >
                [{project.category.toUpperCase()}]
              </span>
              <span className="text-xs text-[#717171] font-mono">• {project.client} ({project.year})</span>
            </div>
            <h2 className="text-sm sm:text-lg md:text-xl font-medium tracking-tight text-[#FFFFFF] truncate">
              {project.title}
            </h2>
            {/* Short brief description of the image as requested */}
            <p className="text-xs sm:text-sm text-[#D4D4D4] font-light mt-1 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-none">
              {project.caption ? project.caption[locale] : project.description[locale]}
            </p>
          </div>

          {/* Action buttons: Image Counter + Case Study Link + Secondary Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t border-[#1f1f1f] md:border-t-0">
            {totalImages > 1 && (
              <span className="text-[11px] font-mono text-[#D4D4D4] bg-[#1a1a1a] px-2.5 py-1.5 rounded-xs border border-[#333333]">
                {currentImageIndex + 1} / {totalImages}
              </span>
            )}
            <Link
              href={`/${locale}/work/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#050505] bg-[#E8D49B] hover:bg-[#FFFFFF] font-medium transition-colors px-3 sm:px-4 py-2 rounded-xs shrink-0"
            >
              <span>{dict.lightbox.viewDetails}</span>
              <ArrowUpRight size={14} />
            </Link>
            {/* Secondary Close Button for easy thumb-reach on mobile & tablets */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-mono text-[#B8B8B8] hover:text-[#FFFFFF] border border-[#424242] hover:border-[#FFFFFF] bg-[#1a1a1a] px-3 py-2 rounded-xs transition-colors shrink-0 cursor-pointer"
              aria-label={dict.lightbox.close}
            >
              <X size={14} />
              <span>{closeLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
