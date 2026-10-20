"use client";

import React from "react";
import { motion } from "framer-motion";

interface GeometricProductsHeadingProps {
  className?: string;
  as?: "h1" | "h2";
}

export function GeometricProductsHeading({
  className = "",
  as = "h1",
}: GeometricProductsHeadingProps) {
  const Component = as;

  return (
    <Component className={`relative block select-none ${className}`}>
      <span className="sr-only">PORTFOLIO.</span>
      <motion.svg
        viewBox="0 0 900 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl h-auto"
        aria-hidden="true"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* P */}
        <g id="letter-p" transform="translate(0, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <path d="M18 0 H65 C85 0 98 14 98 34 C98 54 85 68 65 68 H18 V0 Z" fill="#FFFFFF" />
          <path d="M18 18 H60 C70 18 78 24 78 34 C78 44 70 50 60 50 H18 V18 Z" fill="#050505" />
          <line x1="20" y1="9" x2="58" y2="9" stroke="#78E6BF" strokeWidth="2" />
        </g>

        {/* O */}
        <g id="letter-o-1" transform="translate(108, 0)">
          <circle cx="52" cy="55" r="52" stroke="#FFFFFF" strokeWidth="18" />
          <circle cx="52" cy="55" r="22" stroke="#78E6BF" strokeWidth="2" strokeDasharray="4 3" />
        </g>

        {/* R */}
        <g id="letter-r" transform="translate(222, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <path d="M18 0 H64 C82 0 96 14 96 34 C96 52 82 66 64 66 H18 V0 Z" fill="#FFFFFF" />
          <path d="M18 18 H58 C66 18 74 24 74 34 C74 44 66 48 58 48 H18 V18 Z" fill="#050505" />
          <path d="M44 62 L94 110 H70 L28 66 H44 Z" fill="#FFFFFF" />
          <line x1="56" y1="78" x2="84" y2="104" stroke="#050505" strokeWidth="2.5" />
        </g>

        {/* T */}
        <g id="letter-t" transform="translate(330, 0)">
          <rect x="0" y="0" width="86" height="18" fill="#FFFFFF" />
          <rect x="34" y="18" width="18" height="92" fill="#FFFFFF" />
          <line x1="38" y1="9" x2="48" y2="9" stroke="#78E6BF" strokeWidth="3" />
        </g>

        {/* F */}
        <g id="letter-f" transform="translate(426, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <rect x="18" y="0" width="62" height="18" fill="#FFFFFF" />
          <rect x="18" y="46" width="46" height="16" fill="#FFFFFF" />
          <line x1="22" y1="9" x2="76" y2="9" stroke="#78E6BF" strokeWidth="2" />
        </g>

        {/* O */}
        <g id="letter-o-2" transform="translate(516, 0)">
          <circle cx="52" cy="55" r="52" stroke="#FFFFFF" strokeWidth="18" />
          <circle cx="52" cy="55" r="22" stroke="#78E6BF" strokeWidth="2" strokeDasharray="4 3" />
        </g>

        {/* L */}
        <g id="letter-l" transform="translate(630, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <rect x="18" y="92" width="58" height="18" fill="#FFFFFF" />
          <line x1="4" y1="96" x2="72" y2="96" stroke="#050505" strokeWidth="2" />
        </g>

        {/* I */}
        <g id="letter-i" transform="translate(716, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <rect x="0" y="0" width="18" height="10" fill="#78E6BF" />
        </g>

        {/* O */}
        <g id="letter-o-3" transform="translate(748, 0)">
          <circle cx="52" cy="55" r="52" stroke="#FFFFFF" strokeWidth="18" />
          <circle cx="52" cy="55" r="22" stroke="#78E6BF" strokeWidth="2" strokeDasharray="4 3" />
        </g>

        {/* Period dot (.) */}
        <g id="period-dot" transform="translate(864, 0)">
          <rect x="4" y="88" width="22" height="22" fill="#78E6BF" />
        </g>
      </motion.svg>
    </Component>
  );
}
