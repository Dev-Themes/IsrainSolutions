"use client";

import { useState, useRef, type RefObject } from "react";
import type { Locale } from "@/types/portfolio";
import type { WorkSample } from "@/types/work";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioLightbox } from "./PortfolioLightbox";

export function PortfolioGrid({ projects, locale }: { projects: WorkSample[]; locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const open = (project: WorkSample, ref: RefObject<HTMLButtonElement | null>) => {
    trigger.current = ref.current;
    setActive(projects.findIndex(item => item.id === project.id));
  };
  return <div className="work-gallery" aria-label={locale === "fr" ? "Galerie de publicités produit" : "Product ad gallery"}>
    <div className="product-grid">{projects.map((project, index) => <PortfolioCard key={project.id} project={project} locale={locale} priority={index === 0} onOpenLightbox={open} />)}</div>
    <PortfolioLightbox project={active === null ? null : projects[active]} isOpen={active !== null} locale={locale}
      onClose={() => setActive(null)} onPrev={() => setActive(value => value === null ? null : (value - 1 + projects.length) % projects.length)}
      onNext={() => setActive(value => value === null ? null : (value + 1) % projects.length)} total={projects.length} position={active ?? 0} triggerRef={trigger} />
  </div>;
}
