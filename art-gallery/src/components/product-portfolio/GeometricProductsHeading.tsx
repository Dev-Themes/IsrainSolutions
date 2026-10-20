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
      <span className="sr-only">PRODUCTS.</span>
      <motion.svg
        viewBox="0 0 840 120"
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

        {/* R */}
        <g id="letter-r" transform="translate(108, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <path d="M18 0 H64 C82 0 96 14 96 34 C96 52 82 66 64 66 H18 V0 Z" fill="#FFFFFF" />
          <path d="M18 18 H58 C66 18 74 24 74 34 C74 44 66 48 58 48 H18 V18 Z" fill="#050505" />
          <path d="M44 62 L94 110 H70 L28 66 H44 Z" fill="#FFFFFF" />
          <line x1="56" y1="78" x2="84" y2="104" stroke="#050505" strokeWidth="2.5" />
        </g>

        {/* O */}
        <g id="letter-o" transform="translate(216, 0)">
          <circle cx="50" cy="55" r="52" stroke="#FFFFFF" strokeWidth="18" />
          <circle cx="50" cy="55" r="22" stroke="#78E6BF" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="50" cy="55" r="8" fill="#FFFFFF" />
        </g>

        {/* D */}
        <g id="letter-d" transform="translate(330, 0)">
          <rect x="0" y="0" width="18" height="110" fill="#FFFFFF" />
          <path d="M18 0 H52 C82 0 100 24 100 55 C100 86 82 110 52 110 H18 V0 Z" fill="#FFFFFF" />
          <path d="M18 18 H48 C68 18 80 34 80 55 C80 76 68 92 48 92 H18 V18 Z" fill="#050505" />
          <line x1="20" y1="100" x2="48" y2="100" stroke="#78E6BF" strokeWidth="2" />
        </g>

        {/* U */}
        <g id="letter-u" transform="translate(444, 0)">
          <path d="M0 0 H18 V68 C18 86 28 94 44 94 C60 94 70 86 70 68 V0 H88 V68 C88 98 68 112 44 112 C20 112 0 98 0 68 V0 Z" fill="#FFFFFF" />
          <line x1="44" y1="40" x2="44" y2="76" stroke="#050505" strokeWidth="2.5" />
        </g>

        {/* C */}
        <g id="letter-c" transform="translate(544, 0)">
          <path d="M86 24 L74 38 C66 26 56 18 42 18 C26 18 18 34 18 55 C18 76 26 92 42 92 C56 92 66 84 74 72 L86 86 C74 102 58 110 42 110 C18 110 0 88 0 55 C0 22 18 0 42 0 C58 0 74 8 86 24 Z" fill="#FFFFFF" />
        </g>

        {/* T */}
        <g id="letter-t" transform="translate(642, 0)">
          <rect x="0" y="0" width="76" height="18" fill="#FFFFFF" />
          <rect x="29" y="18" width="18" height="92" fill="#FFFFFF" />
          <line x1="8" y1="9" x2="68" y2="9" stroke="#050505" strokeWidth="2.5" />
        </g>

        {/* S */}
        <g id="letter-s" transform="translate(726, 0)">
          <path d="M42 0 C64 0 76 12 76 28 C76 44 64 52 46 56 L32 59 C22 62 18 66 18 74 C18 82 24 88 38 88 C50 88 60 82 66 74 L76 86 C68 98 54 106 38 106 C18 106 2 96 2 74 C2 58 14 48 32 44 L46 41 C56 38 60 34 60 26 C60 18 52 14 40 14 C30 14 20 18 14 26 L2 14 C12 4 26 0 42 0 Z" fill="#FFFFFF" />
        </g>

        {/* Dot period . */}
        <g id="dot-period" transform="translate(808, 88)">
          <rect x="0" y="0" width="20" height="20" fill="#78E6BF" />
        </g>
      </motion.svg>
    </Component>
  );
}
