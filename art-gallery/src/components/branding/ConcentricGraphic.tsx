"use client";

import React from "react";
import { motion } from "framer-motion";

interface ConcentricGraphicProps {
  className?: string;
  size?: number;
}

export function ConcentricGraphic({ className = "", size = 320 }: ConcentricGraphicProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none max-w-full ${className}`}
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
      aria-label="Graphique orbital cinétique du Studio PopArt Agency"
    >
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-full max-h-full pointer-events-auto"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Static Background Base */}
        <circle cx="200" cy="200" r="198" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />

        {/* Static Crosshairs / Measuring Graticules anchored at fixed axle */}
        <line
          x1="10"
          y1="200"
          x2="390"
          y2="200"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeOpacity="0.7"
        />
        <line
          x1="200"
          y1="10"
          x2="200"
          y2="390"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 4"
          strokeOpacity="0.7"
        />

        {/* Outer Reference Guideline */}
        <circle cx="200" cy="200" r="185" stroke="var(--border)" strokeWidth="1" strokeDasharray="1 8" />

        {/* CONTINUOUS ROTATING ORBIT GROUP (All circles rotate at the fixed central axle 200, 200) */}
        <g
          className="animate-hero-orbit origin-center"
          style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
        >
          {/* Ring 1 (r=175) — Electric Coral Accent & Dash Segment */}
          <circle
            cx="200"
            cy="200"
            r="175"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {/* Coral Arc (Quarter top-right) */}
          <path
            d="M 200 25 A 175 175 0 0 1 375 200"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Subtle dotted opposite arc */}
          <path
            d="M 375 200 A 175 175 0 0 1 200 375"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* Ring 2 (r=145) — Vibrant Yellow & Pure White Arcs */}
          {/* White Semi-arc */}
          <path
            d="M 55 200 A 145 145 0 0 1 200 55"
            stroke="var(--foreground)"
            strokeWidth="2"
            strokeOpacity="0.9"
          />
          {/* Vibrant Yellow Segment */}
          <path
            d="M 200 55 A 145 145 0 0 1 345 200"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 345 200 A 145 145 0 0 1 55 200"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Ring 3 (r=115) — Electric Blue & Mint Green Arcs */}
          {/* Electric Blue Arc */}
          <path
            d="M 200 315 A 115 115 0 0 1 85 200"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Mint Green Arc Segment */}
          <path
            d="M 85 200 A 115 115 0 0 1 200 85"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          <path
            d="M 200 85 A 115 115 0 0 1 315 200"
            stroke="var(--muted)"
            strokeWidth="1.5"
          />

          {/* Ring 4 (r=85) — Soft Lavender & Graphic Dashes */}
          <path
            d="M 115 200 A 85 85 0 0 1 285 200"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 3"
          />
          <path
            d="M 285 200 A 85 85 0 0 1 115 200"
            stroke="var(--foreground)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Ring 5 (r=55) — Gold Accent Core Track */}
          <path
            d="M 145 200 A 55 55 0 0 1 255 200"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path
            d="M 255 200 A 55 55 0 0 1 145 200"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* Ring 6 (r=30) — Crisp White Center Orbit */}
          <circle cx="200" cy="200" r="30" stroke="var(--foreground)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Radial Astronomical Tick Cluster (Centered relative to fixed axle) */}
          <g id="dial-ticks" stroke="var(--foreground)" strokeWidth="1.5" strokeOpacity="0.75">
            <line x1="200" y1="20" x2="200" y2="30" />
            <line x1="215" y1="21" x2="213" y2="31" />
            <line x1="230" y1="24" x2="227" y2="34" />
            <line x1="245" y1="29" x2="240" y2="38" />
            <line x1="260" y1="35" x2="254" y2="44" stroke="var(--accent)" strokeWidth="2" />
          </g>

          {/* Secondary Tick Cluster (Mint Accent) */}
          <g id="dial-ticks-mint" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.8">
            <line x1="70" y1="200" x2="80" y2="200" />
            <line x1="71" y1="215" x2="81" y2="213" />
            <line x1="74" y1="230" x2="84" y2="227" />
          </g>
        </g>

        {/* Fixed Center Core Pinpoint Axle */}
        <circle cx="200" cy="200" r="10" fill="var(--accent)" />
        <circle cx="200" cy="200" r="5" fill="var(--background)" />
        <circle cx="200" cy="200" r="2" fill="var(--foreground)" />
      </motion.svg>
    </div>
  );
}
