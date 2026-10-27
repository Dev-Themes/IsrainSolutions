"use client";

import { useState, useRef, type RefObject } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { PortfolioLightbox } from "@/components/portfolio/PortfolioLightbox";
import { getDictionary } from "@/i18n";
import type { PortfolioProject, Locale } from "@/types/portfolio";

export function FeaturedWorkSection({ projects, locale }: { projects: PortfolioProject[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const featured = ["color-studies", "noise-visual-system", "motion-without-borders"].map(slug => projects.find(project => project.slug === slug)).filter((project): project is PortfolioProject => !!project);
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const [index, setIndex] = useState(0);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const open = (project: PortfolioProject, ref: RefObject<HTMLButtonElement | null>) => { setSelected(project); setIndex(0); trigger.current = ref.current; };
  return <section id="featured-work" className="section-space border-b border-[var(--border)]">
    <div className="container-popart">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 sm:mb-14">
        <div><p className="section-kicker mb-3">{dict.home.featuredTag}</p><h2 className="section-title">{dict.home.featuredHeading}</h2></div>
        <span className="section-kicker !text-[var(--muted)]">01—03</span>
      </div>
      <div className="product-grid">
        {featured.map((project, i) => <PortfolioCard key={project.id} project={{ ...project, tagline: undefined, layout: i === 0 ? "wide" : "standard" }} locale={locale} onOpenLightbox={open} />)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 mt-9">
        <p className="text-sm text-[var(--muted)]">{projects.length} {locale === "fr" ? "projets dans nos archives" : "projects in the archive"}</p>
        <Link href={`/${locale}/work`} className="button-secondary">{dict.home.viewAllWork}<ArrowUpRight size={17} /></Link>
      </div>
    </div>
    <PortfolioLightbox project={selected} currentImageIndex={index} isOpen={selected !== null} locale={locale} onClose={() => setSelected(null)}
      onPrev={() => selected && setIndex(value => (value - 1 + selected.galleryImages.length) % selected.galleryImages.length)}
      onNext={() => selected && setIndex(value => (value + 1) % selected.galleryImages.length)} triggerRef={trigger} />
  </section>;
}
