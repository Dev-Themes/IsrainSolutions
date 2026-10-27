"use client";
import type { RefObject } from "react";
import { ProjectCard } from "./ProjectCard";
import type { PortfolioProject, Locale } from "@/types/portfolio";

export function PortfolioCard({ project, locale, priority = false, onOpenLightbox }: {
  project: PortfolioProject; locale: Locale; priority?: boolean;
  onOpenLightbox: (project: PortfolioProject, trigger: RefObject<HTMLButtonElement | null>) => void;
}) {
  return <ProjectCard href={`/${locale}/work/${project.slug}`} image={project.coverImage} alt={project.alt[locale]} title={project.title} label={project.client} category={project.category} year={project.year} description={project.tagline?.[locale]} wide={project.layout === "wide"} priority={priority} locale={locale} onPreview={ref => onOpenLightbox(project, ref)} />;
}
