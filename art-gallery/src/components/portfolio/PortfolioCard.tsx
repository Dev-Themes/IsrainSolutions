"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import { Play, ArrowUpRight, Expand } from "lucide-react";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";
import type { Locale } from "@/types/portfolio";
import type { WorkSample } from "@/types/work";

export function PortfolioCard({ project, locale, priority = false, onOpenLightbox }: {
  project: WorkSample; locale: Locale; priority?: boolean;
  onOpenLightbox: (project: WorkSample, trigger: RefObject<HTMLButtonElement | null>) => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const video = project.media.type === "video";
  const action = video ? (locale === "fr" ? "Voir le film" : "Watch the film") : (locale === "fr" ? "Voir la création" : "View the creative");
  return <article className={`project-card work-media-card ${project.layout === "wide" ? "project-card-wide" : ""}`}>
    <button ref={trigger} type="button" className="work-media-trigger" aria-haspopup="dialog" aria-label={`${action} — ${project.brand}: ${project.title}`} onClick={() => onOpenLightbox(project, trigger)}>
      <span className="project-card-image">
        <InteractiveSurface className="project-image-surface" label={locale === "fr" ? "VOIR" : "PLAY"}>
          <Image src={project.media.thumbnail ?? project.media.poster} alt={project.alt[locale]} fill preload={priority} quality={80}
            sizes={project.layout === "wide" ? "(max-width: 1600px) 94vw, 1500px" : "(max-width: 767px) 94vw, (max-width: 1600px) 46vw, 740px"} />
        </InteractiveSurface>
        <span className="work-play-mark" aria-hidden="true">{video ? <Play size={22} fill="currentColor" /> : <Expand size={22} />}</span>
        <span className="work-format">{project.media.type === "video" ? `${project.media.duration}s / ${project.media.height > project.media.width ? "3:4" : "16:9"}` : project.media.type.toUpperCase()}</span>
      </span>
      <span className="project-card-body work-card-caption">
        <span className="project-card-meta"><span>{project.category[locale]}</span><span>{locale === "fr" ? "Film conceptuel" : "Concept ad"}</span></span>
        <span className="project-card-title">{project.title}</span>
        <span className="work-card-bottom"><span className="section-kicker">{project.brand}</span><span>{action}<ArrowUpRight size={16} aria-hidden="true" /></span></span>
      </span>
    </button>
  </article>;
}
