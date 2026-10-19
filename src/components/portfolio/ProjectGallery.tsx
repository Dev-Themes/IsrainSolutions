"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortfolioProject, Locale } from "@/types/portfolio";
import { getDictionary } from "@/i18n";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface ProjectGalleryProps {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
  nextProject?: PortfolioProject;
  locale: Locale;
}

export function ProjectGallery({
  project,
  relatedProjects,
  nextProject,
  locale,
}: ProjectGalleryProps) {
  const dict = getDictionary(locale);
  const details = project.details[locale];

  return (
    <div className="w-full">
      {/* Visual Storytelling & Conceptual Narrative Section */}
      <section className="w-full py-16 sm:py-24 border-b border-[#1f1f1f]">
        <div className="container-forme">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-sm">
            {/* Concept */}
            <div className="border-t border-[#424242] pt-4">
              <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-[#E8D49B] mb-3">
                01. {dict.project.conceptTitle}
              </h2>
              <p className="text-[#B8B8B8] leading-relaxed font-light">{details.concept}</p>
            </div>

            {/* Art Direction */}
            <div className="border-t border-[#424242] pt-4">
              <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-[#E8D49B] mb-3">
                02. {dict.project.artDirectionTitle}
              </h2>
              <p className="text-[#B8B8B8] leading-relaxed font-light">{details.artDirection}</p>
            </div>

            {/* Execution */}
            <div className="border-t border-[#424242] pt-4">
              <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-[#E8D49B] mb-3">
                03. {dict.project.executionTitle}
              </h2>
              <p className="text-[#B8B8B8] leading-relaxed font-light">{details.execution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Curated High Resolution Gallery Images */}
      {project.galleryImages.length > 1 && (
        <section className="w-full py-16 sm:py-24 border-b border-[#1f1f1f]">
          <div className="container-forme space-y-12 sm:space-y-16">
            {project.galleryImages.slice(1).map((imgUrl, idx) => (
              <div
                key={imgUrl}
                className="relative w-full h-[320px] sm:h-[480px] md:h-[620px] overflow-hidden bg-[#000000] border border-[#292929]"
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} — Vue ${idx + 2}`}
                  fill
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 95vw, 1400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Teaser */}
      {nextProject && (
        <section className="w-full py-20 sm:py-28 bg-[#0a0a0a] border-b border-[#1f1f1f]">
          <div className="container-forme flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#717171] block mb-2">
                {dict.project.nextProject}
              </span>
              <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#FFFFFF]">
                {nextProject.title}
              </h3>
              <p className="text-sm font-light text-[#B8B8B8] mt-1">
                [{nextProject.category}] — {nextProject.client}
              </p>
            </div>

            <Link
              href={`/${locale}/work/${nextProject.slug}`}
              style={{ "--next-accent": nextProject.accentColor || "#E8D49B" } as React.CSSProperties}
              className="inline-flex items-center gap-3 px-6 py-4 bg-[#FFFFFF] text-[#050505] hover:bg-[var(--next-accent)] transition-colors text-xs font-mono tracking-[0.2em] uppercase rounded-xs"
            >
              <span>{locale === "fr" ? "Projet Suivant" : "Next Project"}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Related Projects Grid */}
      {relatedProjects.length > 0 && (
        <section className="w-full py-16 sm:py-24">
          <div className="container-forme">
            <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-[#717171] mb-8">
              {dict.project.relatedProjects}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((rel) => {
                const relAccent = rel.accentColor || "#E8D49B";
                return (
                  <Link
                    key={rel.id}
                    href={`/${locale}/work/${rel.slug}`}
                    style={{ "--rel-accent": relAccent } as React.CSSProperties}
                    className="group block relative overflow-hidden bg-[#000000] border border-[#1f1f1f] hover:border-[var(--rel-accent)]/60 transition-colors"
                  >
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <Image
                        src={rel.coverImage}
                        alt={rel.alt[locale]}
                        fill
                        quality={80}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span
                            style={{ color: relAccent }}
                            className="text-[10px] font-mono uppercase tracking-widest block mb-1"
                          >
                            [{rel.category}]
                          </span>
                          <h4 className="text-lg font-medium text-[#FFFFFF]">{rel.title}</h4>
                        </div>
                        <ArrowUpRight size={18} style={{ color: relAccent }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
