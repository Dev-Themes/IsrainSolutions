"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { Locale } from "@/types/portfolio";

interface ProjectCardProps {
  href: string; image: string; alt: string; title: string; label: string;
  category: string; year: number; description?: string; wide?: boolean;
  priority?: boolean; locale: Locale;
  onPreview: (ref: RefObject<HTMLButtonElement | null>) => void;
}

export function ProjectCard({ href, image, alt, title, label, category, year, description, wide = false, priority = false, locale, onPreview }: ProjectCardProps) {
  const trigger = useRef<HTMLButtonElement>(null);
  return <article className={`project-card ${wide ? "project-card-wide" : ""}`}>
    <Link href={href} className="project-card-image" aria-label={`${locale === "fr" ? "Découvrir" : "Explore"} ${title}`}>
      <InteractiveSurface className="project-image-surface" label={locale === "fr" ? "VOIR" : "VIEW"}>
      <Image src={image} alt={alt} fill preload={priority} quality={80}
        sizes={wide ? "(max-width: 1600px) 94vw, 1500px" : "(max-width: 767px) 94vw, (max-width: 1600px) 46vw, 740px"} />
      </InteractiveSurface>
    </Link>
    <button ref={trigger} type="button" className="project-card-preview" aria-haspopup="dialog" aria-label={`${locale === "fr" ? "Aperçu des images" : "Preview images"} — ${title}`} onClick={() => onPreview(trigger)}>
      <Maximize2 size={17} aria-hidden="true" />
    </button>
    <div className="project-card-body">
      <div className="project-card-meta"><span>{category}</span><span>{year}</span></div>
      <h3 className="project-card-title"><Link href={href}>{title}</Link></h3>
      {description && <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] max-w-[60ch]">{description}</p>}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
        <span className="section-kicker !text-[var(--subtle)]">{label}</span>
        <Link href={href} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">{locale === "fr" ? "Étude de cas" : "Case study"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>
  </article>;
}
