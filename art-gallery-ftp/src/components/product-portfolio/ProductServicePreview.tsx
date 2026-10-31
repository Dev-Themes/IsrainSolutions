"use client";

import { useEffect, useRef } from "react";

export function ProductServicePreview({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reducedMotion.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    reducedMotion.addEventListener("change", sync);
    return () => { reducedMotion.removeEventListener("change", sync); video.pause(); };
  }, []);
  return <video ref={ref} controls muted loop playsInline preload="metadata" poster={poster} width={720} height={1280} aria-label={label}>
    <source src={src} type="video/mp4" />
    <a href={src}>{label}</a>
  </video>;
}
