"use client";

import React, { useState, useCallback, useRef } from "react";
import { PortfolioProject, Locale } from "@/types/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioLightbox } from "./PortfolioLightbox";

interface PortfolioGridProps {
  projects: PortfolioProject[];
  locale: Locale;
}

export function PortfolioGrid({ projects, locale }: PortfolioGridProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpenLightbox = useCallback(
    (project: PortfolioProject, ref: React.RefObject<HTMLButtonElement | null>) => {
      setActiveProject(project);
      setCurrentImageIndex(0);
      triggerRef.current = ref.current;
    },
    []
  );

  const handleCloseLightbox = useCallback(() => {
    setActiveProject(null);
    setCurrentImageIndex(0);
  }, []);

  const handlePrevImage = useCallback(() => {
    if (!activeProject) return;
    const total = activeProject.galleryImages.length;
    if (total <= 1) {
      // Cycle to previous project in array
      const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      setActiveProject(projects[prevIndex]);
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + total) % total);
    }
  }, [activeProject, projects]);

  const handleNextImage = useCallback(() => {
    if (!activeProject) return;
    const total = activeProject.galleryImages.length;
    if (total <= 1) {
      // Cycle to next project in array
      const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
      const nextIndex = (currentIndex + 1) % projects.length;
      setActiveProject(projects[nextIndex]);
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % total);
    }
  }, [activeProject, projects]);

  return (
    <section className="w-full pb-20 sm:pb-32" aria-label={locale === "fr" ? "Galerie de projets" : "Project gallery"}>
      {/* 2-Column Responsive Grid with narrow gutters and alternating full-width feature cards */}
      <div className="product-grid">
        {projects.map((project, idx) => (
          <PortfolioCard
            key={project.id}
            project={project}
            locale={locale}
            priority={idx === 0}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </div>

      {/* Global Interactive Lightbox Modal */}
      <PortfolioLightbox
        project={activeProject}
        currentImageIndex={currentImageIndex}
        isOpen={activeProject !== null}
        locale={locale}
        onClose={handleCloseLightbox}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
        triggerRef={triggerRef}
      />
    </section>
  );
}
