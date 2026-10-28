"use client";
import { ui } from "@/i18n/ui";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale } from "@/types/portfolio";
import type { WorkSample } from "@/types/work";
import { workTitle, workLabel, workBrand } from "@/lib/work-media";

interface Props {
  project: WorkSample | null;
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  position: number;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const subscribe = () => () => {};
export function PortfolioLightbox({ project, isOpen, locale, onClose, onPrev, onNext, total, position, triggerRef }: Props) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const handlers = useRef({ onClose, onPrev, onNext });
  useEffect(() => { handlers.current = { onClose, onPrev, onNext }; }, [onClose, onPrev, onNext]);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    const element = dialog.current;
    if (!element) return;
    const trigger = triggerRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [mounted, isOpen, triggerRef]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) void element.play().catch(() => {});
    return () => { element.pause(); element.removeAttribute("src"); element.load(); };
  }, [project?.id]);

  if (!mounted || !isOpen || !project) return null;
  const close = ui(locale, "Fermer", "Close");
  return createPortal(<dialog ref={dialog} className="work-viewer dark-section" aria-label={`${workBrand(project, locale)} — ${workTitle(project, locale)}`}
    onCancel={event => { event.preventDefault(); handlers.current.onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) handlers.current.onClose(); }}
    onKeyDown={event => {
      // Native video controls retain keyboard seeking and volume controls.
      if ((event.target as HTMLElement).tagName === "VIDEO") return;
      if (total > 1 && event.key === "ArrowLeft") { event.preventDefault(); handlers.current.onPrev(); }
      if (total > 1 && event.key === "ArrowRight") { event.preventDefault(); handlers.current.onNext(); }
    }}>
    <div className="work-viewer-layout">
      <header className="work-viewer-top"><span>{workBrand(project, locale)} / {workLabel(project, locale)}</span><button type="button" autoFocus onClick={onClose} aria-label={close}>{close}<X size={20} aria-hidden="true" /></button></header>
      <div className="work-viewer-media" key={project.id}>
        {project.media.type === "video" ? <video ref={video} controls playsInline preload="metadata" src={project.media.src} poster={project.media.poster} width={project.media.width} height={project.media.height} aria-label={workTitle(project, locale)}>
          {ui(locale, "Votre navigateur ne peut pas lire ce film.", "Your browser cannot play this film.")} <a href={project.media.src}>{ui(locale, "Ouvrir le film", "Open the film")}</a>
        </video> : <Image src={project.media.src} alt={project.alt[locale]} width={project.media.width} height={project.media.height} unoptimized={project.media.type === "gif"} className="work-viewer-image" />}
      </div>
      <footer className="work-viewer-bottom"><div><h2>{workTitle(project, locale)}</h2><p>{project.description[locale]}</p></div>
        {total > 1 && <nav className="work-viewer-navigation" aria-label={locale === "ro" ? "Filme" : "Films"}>
          <button type="button" onClick={onPrev} aria-label={ui(locale, "Création précédente", "Previous creative")}><ChevronLeft size={22} /></button>
          <span>{position + 1} / {total}</span>
          <button type="button" onClick={onNext} aria-label={ui(locale, "Création suivante", "Next creative")}><ChevronRight size={22} /></button>
        </nav>}
      </footer>
    </div>
  </dialog>, document.body);
}
