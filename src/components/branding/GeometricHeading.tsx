"use client";

import React from "react";
import { motion } from "framer-motion";

interface GeometricHeadingProps {
  text: "WORK" | "STUDIO." | "CONTACT";
  className?: string;
  as?: "h1" | "h2";
}

export function GeometricHeading({ text, className = "", as = "h1" }: GeometricHeadingProps) {
  const Component = as;

  if (text === "WORK") {
    return (
      <Component className={`relative block select-none ${className}`}>
        <span className="sr-only">WORK</span>
        {/* Custom Geometric Striped SVG Typography */}
        <motion.svg
          viewBox="0 0 540 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-2xl h-auto"
          aria-hidden="true"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Letter W */}
          <g id="letter-W">
            <path d="M0 0 L32 120 H50 L80 32 L110 120 H128 L160 0 H136 L118 78 L92 0 H68 L42 78 L24 0 H0 Z" fill="#FFFFFF" />
            {/* Striped diagonal accents */}
            <line x1="28" y1="20" x2="48" y2="90" stroke="#050505" strokeWidth="2.5" />
            <line x1="112" y1="90" x2="132" y2="20" stroke="#050505" strokeWidth="2.5" />
          </g>

          {/* Letter O */}
          <g id="letter-O" transform="translate(170, 0)">
            <circle cx="60" cy="60" r="58" stroke="#FFFFFF" strokeWidth="22" />
            {/* Geometric horizontal cut */}
            <rect x="2" y="56" width="116" height="8" fill="#050505" />
            <circle cx="60" cy="60" r="14" fill="#FFFFFF" />
          </g>

          {/* Letter R */}
          <g id="letter-R" transform="translate(305, 0)">
            <rect x="0" y="0" width="22" height="120" fill="#FFFFFF" />
            <path
              d="M22 0 H75 C98 0 114 14 114 36 C114 58 98 72 75 72 H22 V0 Z"
              fill="#FFFFFF"
            />
            <path
              d="M22 22 H68 C76 22 84 27 84 36 C84 45 76 50 68 50 H22 V22 Z"
              fill="#050505"
            />
            {/* Diagonal R leg with striped cuts */}
            <path d="M52 68 L108 120 H80 L36 72 H52 Z" fill="#FFFFFF" />
            <line x1="68" y1="84" x2="98" y2="114" stroke="#050505" strokeWidth="3" />
          </g>

          {/* Letter K */}
          <g id="letter-K" transform="translate(432, 0)">
            <rect x="0" y="0" width="22" height="120" fill="#FFFFFF" />
            <path d="M96 0 L22 66 V42 L70 0 H96 Z" fill="#FFFFFF" />
            <path d="M22 60 L102 120 H74 L14 74 V60 H22 Z" fill="#FFFFFF" />
            {/* Striped parallel cut */}
            <line x1="42" y1="46" x2="78" y2="16" stroke="#050505" strokeWidth="3" />
            <line x1="38" y1="76" x2="78" y2="108" stroke="#050505" strokeWidth="3" />
          </g>
        </motion.svg>
      </Component>
    );
  }

  if (text === "STUDIO.") {
    return (
      <Component className={`relative block select-none ${className}`}>
        <span className="sr-only">STUDIO.</span>
        <motion.svg
          viewBox="0 0 660 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-3xl h-auto"
          aria-hidden="true"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* S */}
          <g id="letter-S">
            <path
              d="M85 24 C74 10 58 4 42 4 C20 4 5 17 5 34 C5 52 22 60 52 68 C84 76 100 87 100 106 C100 126 80 136 50 136 C24 136 8 122 0 106 L18 94 C24 105 35 116 50 116 C68 116 78 107 78 96 C78 82 65 74 36 66 C12 58 0 46 0 28 C0 10 18 0 44 0 C64 0 78 8 92 20 L85 24 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* T */}
          <g id="letter-T" transform="translate(108, 0)">
            <rect x="0" y="0" width="84" height="22" fill="#FFFFFF" />
            <rect x="31" y="22" width="22" height="98" fill="#FFFFFF" />
            <line x1="8" y1="11" x2="76" y2="11" stroke="#050505" strokeWidth="2.5" />
          </g>

          {/* U */}
          <g id="letter-U" transform="translate(204, 0)">
            <path
              d="M0 0 H22 V75 C22 92 32 100 46 100 C60 100 70 92 70 75 V0 H92 V75 C92 104 74 122 46 122 C18 122 0 104 0 75 V0 Z"
              fill="#FFFFFF"
            />
          </g>

          {/* D */}
          <g id="letter-D" transform="translate(308, 0)">
            <rect x="0" y="0" width="22" height="120" fill="#FFFFFF" />
            <path
              d="M22 0 H52 C84 0 102 24 102 60 C102 96 84 120 52 120 H22 V0 Z"
              fill="#FFFFFF"
            />
            <path
              d="M22 22 H48 C68 22 78 36 78 60 C78 84 68 98 48 98 H22 V22 Z"
              fill="#050505"
            />
          </g>

          {/* I */}
          <g id="letter-I" transform="translate(422, 0)">
            <rect x="0" y="0" width="22" height="120" fill="#FFFFFF" />
            <line x1="11" y1="16" x2="11" y2="104" stroke="#050505" strokeWidth="2" strokeDasharray="6 6" />
          </g>

          {/* O */}
          <g id="letter-O2" transform="translate(458, 0)">
            <circle cx="58" cy="60" r="56" stroke="#FFFFFF" strokeWidth="20" />
            <circle cx="58" cy="60" r="12" fill="#E8D49B" />
          </g>

          {/* Dot . */}
          <g id="dot" transform="translate(590, 84)">
            <circle cx="18" cy="18" r="18" fill="#E8D49B" />
          </g>
        </motion.svg>
      </Component>
    );
  }

  // CONTACT
  return (
    <Component className={`relative block select-none ${className}`}>
      <span className="sr-only">CONTACT</span>
      <motion.svg
        viewBox="0 0 740 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-auto"
        aria-hidden="true"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* C */}
        <g id="letter-C">
          <path
            d="M96 32 C85 14 69 4 48 4 C20 4 0 26 0 60 C0 94 20 116 48 116 C69 116 85 106 96 88 L80 76 C72 88 62 96 48 96 C30 96 18 80 18 60 C18 40 30 24 48 24 C62 24 72 32 80 44 L96 32 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* O */}
        <g id="letter-O3" transform="translate(104, 0)">
          <circle cx="48" cy="60" r="46" stroke="#FFFFFF" strokeWidth="18" />
          <circle cx="48" cy="60" r="10" fill="#E8D49B" />
        </g>

        {/* N */}
        <g id="letter-N" transform="translate(210, 0)">
          <rect x="0" y="0" width="18" height="120" fill="#FFFFFF" />
          <path d="M18 0 L68 116 H86 V0 H68 V90 L24 0 H18 Z" fill="#FFFFFF" />
          <rect x="68" y="0" width="18" height="120" fill="#FFFFFF" />
        </g>

        {/* T */}
        <g id="letter-T2" transform="translate(306, 0)">
          <rect x="0" y="0" width="76" height="20" fill="#FFFFFF" />
          <rect x="29" y="20" width="18" height="100" fill="#FFFFFF" />
        </g>

        {/* A */}
        <g id="letter-A" transform="translate(390, 0)">
          <path d="M42 0 L0 120 H22 L32 88 H68 L78 120 H100 L58 0 H42 Z M50 32 L62 70 H38 L50 32 Z" fill="#FFFFFF" />
          <line x1="38" y1="78" x2="62" y2="78" stroke="#050505" strokeWidth="2.5" />
        </g>

        {/* C */}
        <g id="letter-C2" transform="translate(500, 0)">
          <path
            d="M96 32 C85 14 69 4 48 4 C20 4 0 26 0 60 C0 94 20 116 48 116 C69 116 85 106 96 88 L80 76 C72 88 62 96 48 96 C30 96 18 80 18 60 C18 40 30 24 48 24 C62 24 72 32 80 44 L96 32 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* T */}
        <g id="letter-T3" transform="translate(604, 0)">
          <rect x="0" y="0" width="76" height="20" fill="#FFFFFF" />
          <rect x="29" y="20" width="18" height="100" fill="#FFFFFF" />
        </g>
      </motion.svg>
    </Component>
  );
}
