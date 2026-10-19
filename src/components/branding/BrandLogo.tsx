"use client";

import React from "react";
import Link from "next/link";
import { Locale } from "@/types/portfolio";

interface BrandLogoProps {
  locale?: Locale;
  className?: string;
  showDescriptor?: boolean;
}

export function BrandLogo({ locale = "fr", className = "", showDescriptor = true }: BrandLogoProps) {
  return (
    <Link
      href={`/${locale}`}
      className={`group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80 focus-visible:ring-1 focus-visible:ring-[#E8D49B] ${className}`}
      aria-label="FORME Studio Créatif — Accueil"
    >
      {/* Geometric SVG Brand Logo */}
      <svg
        width="110"
        height="32"
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-auto md:h-8"
        aria-hidden="true"
      >
        {/* Letter F */}
        <g id="letter-f">
          <rect x="0" y="4" width="7" height="40" fill="#FFFFFF" />
          <rect x="7" y="4" width="22" height="6" fill="#FFFFFF" />
          <line x1="7" y1="12" x2="26" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="7" y="20" width="16" height="5" fill="#FFFFFF" />
        </g>

        {/* Letter O */}
        <g id="letter-o" transform="translate(38, 4)">
          <circle cx="19" cy="20" r="18" stroke="#FFFFFF" strokeWidth="6" />
          {/* Subtle concentric inner accent */}
          <circle cx="19" cy="20" r="8" stroke="#E8D49B" strokeWidth="1.5" strokeOpacity="0.75" />
          <circle cx="19" cy="20" r="3" fill="#FFFFFF" />
        </g>

        {/* Letter R */}
        <g id="letter-r" transform="translate(84, 4)">
          <rect x="0" y="0" width="7" height="40" fill="#FFFFFF" />
          <path
            d="M7 0H22C27.5 0 31 3.8 31 9.5C31 15.2 27.5 19 22 19H7V0Z"
            fill="#FFFFFF"
          />
          <path
            d="M7 6H19C21.5 6 23 7.5 23 9.5C23 11.5 21.5 13 19 13H7V6Z"
            fill="#050505"
          />
          {/* Striped diagonal leg */}
          <path d="M16 19L31 40H22L10 21H16Z" fill="#FFFFFF" />
          <line x1="24" y1="26" x2="33" y2="38" stroke="#E8D49B" strokeWidth="1" strokeOpacity="0.8" />
        </g>

        {/* Letter M */}
        <g id="letter-m" transform="translate(124, 4)">
          <rect x="0" y="0" width="6" height="40" fill="#FFFFFF" />
          <path d="M6 0L17 26L28 0H34V40H28V12L19 32H15L6 12V40H0V0H6Z" fill="#FFFFFF" />
          <rect x="28" y="0" width="6" height="40" fill="#FFFFFF" />
        </g>
      </svg>

      {showDescriptor && (
        <span className="hidden text-[9px] font-light tracking-[0.22em] text-[#B8B8B8] uppercase sm:inline-block border-l border-[#424242] pl-3 py-0.5">
          Studio Créatif
        </span>
      )}
    </Link>
  );
}
