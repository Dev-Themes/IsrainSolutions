"use client";

import { useState } from "react";
import { InteractiveSurface } from "@/components/branding/InteractiveSurface";
import type { Locale } from "@/types/portfolio";

/** Original vector identity study. Geometry echoes the animated PopArt Agency letters. */
export function PopArtGraphic({ locale }: { locale: Locale }) {
  const [variation, setVariation] = useState(0);
  return <section data-variation={variation} className="brand-study section-space" aria-labelledby="brand-study-title">
    <div className="container-popart">
      <div className="study-caption"><h2 id="brand-study-title">PopArt Agency / {locale === "fr" ? "EN LIBERTÉ" : "IN FREE FORM"}</h2><span>PARIS / 2026</span></div>
      <InteractiveSurface className="poster-playground">
      <svg className="brand-poster" viewBox="0 0 1200 610" role="img" aria-label={locale === "fr" ? "Composition PopArt Agency : lettres géométriques, disque rouge, demi-cercle bleu et trames noires." : "PopArt Agency composition: geometric lettering, a red disc, blue semicircle and black halftone."}>
        <defs>
          <pattern id="popart-study-dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="2.2" fill="currentColor" /></pattern>
          <pattern id="popart-study-lines" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 0V14" stroke="currentColor" strokeWidth="5" /></pattern>
        </defs>
        <text x="30" y="300" fill="currentColor" fontSize="230" fontWeight="900" letterSpacing="-14">PopArt</text>
        <circle className="poster-sun" cx="1045" cy="112" r="53" fill="var(--brand-coral)" />
        <path className="poster-bowl" d="M880 220H1160A140 140 0 0 1 880 220Z" fill="var(--brand-blue)" />
        <rect x="35" y="399" width="258" height="155" fill="url(#popart-study-dots)" />
        <circle cx="399" cy="495" r="57" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="399" cy="495" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="399" cy="495" r="23" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="570" y="510" fill="currentColor" fontSize="95" fontWeight="700" letterSpacing="8">Agency</text>
        <rect x="1110" y="392" width="50" height="162" fill="url(#popart-study-lines)" />
      </svg>
      </InteractiveSurface>
      <div className="study-caption study-baseline"><p>{locale === "fr" ? "Direction artistique. Identité. Motion." : "Art direction. Identity. Motion."}</p><div className="poster-controls"><span className="poster-variation" role="status" aria-live="polite">0{variation + 1} / 03</span><button type="button" className="remix-control" onClick={() => setVariation(value => (value + 1) % 3)}>{locale === "fr" ? "RECOMPOSER" : "REMIX THE FORM"}<span aria-hidden="true">↗</span></button></div></div>
    </div>
  </section>;
}
