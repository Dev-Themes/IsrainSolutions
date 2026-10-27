"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/** Local pointer feedback; no global cursor, scrolling listeners or React updates per frame. */
export function InteractiveSurface({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const reset = () => {
    cancelAnimationFrame(frame.current);
    const element = surface.current;
    if (!element) return;
    element.style.removeProperty("--pointer-x");
    element.style.removeProperty("--pointer-y");
    element.style.removeProperty("--drift-x");
    element.style.removeProperty("--drift-y");
    element.removeAttribute("data-pointer-active");
  };
  return <div ref={surface} className={`interactive-surface ${className}`}
    onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const element = event.currentTarget;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        element.style.setProperty("--pointer-x", `${x}px`);
        element.style.setProperty("--pointer-y", `${y}px`);
        element.style.setProperty("--drift-x", `${(x / width - .5) * 18}px`);
        element.style.setProperty("--drift-y", `${(y / height - .5) * 18}px`);
        element.dataset.pointerActive = "true";
      });
    }} onPointerLeave={reset} onPointerCancel={reset}>
    {children}
    {label && <span className="project-pointer-label" aria-hidden="true">{label}<span>↗</span></span>}
  </div>;
}
