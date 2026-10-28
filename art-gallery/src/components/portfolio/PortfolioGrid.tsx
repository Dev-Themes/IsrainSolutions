"use client";
import { ui } from "@/i18n/ui";

import { useState, useRef, type RefObject } from "react";
import type { Locale } from "@/types/portfolio";
import type { WorkSample, WorkGroup } from "@/types/work";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioLightbox } from "./PortfolioLightbox";

const groups = [
  { id: "all", ro: "Toate filmele", en: "All films", fr: "Tous les films" },
  { id: "beauty", ro: "Frumusețe", en: "Beauty", fr: "Beauté" },
  { id: "lifestyle", ro: "Viață cotidiană", en: "Lifestyle", fr: "Lifestyle" },
  { id: "fashion", ro: "Modă", en: "Fashion", fr: "Mode" },
  { id: "fragrance", ro: "Parfumuri", en: "Fragrance", fr: "Parfum" },
  { id: "motion", ro: "Animație", en: "Motion", fr: "Animation" },
] as const;

export function PortfolioGrid({ projects, locale, variant = "archive" }: { projects: WorkSample[]; locale: Locale; variant?: "archive" | "featured" }) {
  const [group, setGroup] = useState<WorkGroup | "all">("all");
  const [active, setActive] = useState<number | null>(null);
  const filtered = group === "all" ? projects : projects.filter(project => project.group === group);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const open = (project: WorkSample, ref: RefObject<HTMLButtonElement | null>) => {
    trigger.current = ref.current;
    setActive(filtered.findIndex(item => item.id === project.id));
  };
  return <div className={`work-gallery work-gallery-${variant}`} aria-label={ui(locale, "Galerie de publicités produit", "Product ad gallery")}>
    {variant === "archive" && projects.length > 6 && <div className="work-filter-bar"><div role="group" aria-label={ui(locale, "Filtrer les films", "Filter films")}>
      {groups.map(item => <button type="button" key={item.id} aria-pressed={group === item.id} onClick={() => { setActive(null); setGroup(item.id); }}>{item[locale]}<span>{item.id === "all" ? projects.length : projects.filter(project => project.group === item.id).length}</span></button>)}
    </div><p role="status">{filtered.length} {ui(locale, "films à découvrir", "films to explore")}</p></div>}
    <div className="product-grid">{filtered.map((project, index) => <PortfolioCard key={project.id} project={project} locale={locale} presentation={variant} priority={index === 0} onOpenLightbox={open} />)}</div>
    <PortfolioLightbox project={active === null ? null : filtered[active]} isOpen={active !== null} locale={locale}
      onClose={() => setActive(null)} onPrev={() => setActive(value => value === null ? null : (value - 1 + filtered.length) % filtered.length)}
      onNext={() => setActive(value => value === null ? null : (value + 1) % filtered.length)} total={filtered.length} position={active ?? 0} triggerRef={trigger} />
  </div>;
}
