"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface EyeToWordmarkProps {
  className?: string;
  ariaLabel?: string;
}

export function EyeToWordmark({
  className = "",
  ariaLabel = "Symbole interactif FORME — Cliquez ou survolez pour transformer l'œil en signature de marque",
}: EyeToWordmarkProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);

  const isRevealed = isLocked || isHovered;

  // Toggle on click/tap
  const handleToggle = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  // Close lock when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsLocked(false);
      }
    };
    if (isLocked) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isLocked]);

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      className={`group relative flex items-center justify-center cursor-pointer select-none bg-transparent border-0 p-2 sm:p-4 max-w-full rounded-sm transition-transform duration-500 focus-visible:ring-2 focus-visible:ring-[#F7D85B] ${className}`}
      aria-label={ariaLabel}
      aria-pressed={isRevealed}
      title={ariaLabel}
    >
      <div className="relative w-[280px] h-[140px] sm:w-[440px] sm:h-[180px] md:w-[580px] md:h-[180px] max-w-full flex items-center justify-center">
        {/* EYE VECTOR COMPOSITION */}
        <motion.svg
          viewBox="0 0 500 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none"
          initial={false}
          animate={{
            opacity: isRevealed ? 0 : 1,
            scale: isRevealed ? 0.9 : 1,
            filter: isRevealed ? "blur(3px)" : "blur(0px)",
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative 3 Rays above the almond eye */}
          <g id="eye-rays">
            {/* Center ray */}
            <motion.line
              x1="250"
              y1="8"
              x2="250"
              y2="42"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
              animate={{
                y2: isRevealed ? 18 : 42,
                opacity: isRevealed ? 0 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
            {/* Left diagonal ray */}
            <motion.line
              x1="205"
              y1="18"
              x2="222"
              y2="50"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                y2: isRevealed ? 24 : 50,
                opacity: isRevealed ? 0 : 1,
              }}
              transition={{ duration: 0.4, delay: 0.05 }}
            />
            {/* Right diagonal ray */}
            <motion.line
              x1="295"
              y1="18"
              x2="278"
              y2="50"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                y2: isRevealed ? 24 : 50,
                opacity: isRevealed ? 0 : 1,
              }}
              transition={{ duration: 0.4, delay: 0.05 }}
            />
          </g>

          {/* Symmetrical Almond-Shaped Eye Outline */}
          <motion.path
            d="M 60 140 C 130 50, 370 50, 440 140 C 370 230, 130 230, 60 140 Z"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinejoin="round"
            fill="none"
            animate={{
              strokeWidth: isRevealed ? 1 : 5,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Subtle inner eyelid contour */}
          <path
            d="M 100 140 C 150 78, 350 78, 400 140 C 350 202, 150 202, 100 140 Z"
            stroke="#292929"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Circular Inner Iris */}
          <motion.circle
            cx="250"
            cy="140"
            r="48"
            stroke="#FFFFFF"
            strokeWidth="4"
            fill="none"
            animate={{
              scale: isRevealed ? 1.2 : 1,
              opacity: isRevealed ? 0 : 1,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Iris Concentric Detail in Accent Gold */}
          <circle
            cx="250"
            cy="140"
            r="38"
            stroke="#F7D85B"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            strokeDasharray="3 3"
            fill="none"
          />

          {/* Central Pupil */}
          <motion.circle
            cx="250"
            cy="140"
            r="20"
            fill="#FFFFFF"
            animate={{
              scale: isRevealed ? 0.3 : 1,
              opacity: isRevealed ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Pupil highlight */}
          <circle cx="243" cy="133" r="5" fill="#000000" />
        </motion.svg>

        {/* FORME BRAND WORDMARK COMPOSITION */}
        <motion.svg
          viewBox="0 0 580 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none"
          initial={false}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.88,
            filter: isRevealed ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* F */}
          <g id="brand-F" transform="translate(25, 20)">
            <rect x="0" y="0" width="18" height="100" fill="#FFFFFF" />
            <rect x="18" y="0" width="60" height="18" fill="#FFFFFF" />
            <line x1="20" y1="9" x2="74" y2="9" stroke="#050505" strokeWidth="2.5" />
            <rect x="18" y="42" width="45" height="16" fill="#FFFFFF" />
          </g>

          {/* O */}
          <g id="brand-O" transform="translate(140, 20)">
            <circle cx="50" cy="50" r="48" stroke="#FFFFFF" strokeWidth="18" />
            {/* Subtle concentric inner accent */}
            <circle cx="50" cy="50" r="22" stroke="#F7D85B" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="50" cy="50" r="8" fill="#FFFFFF" />
          </g>

          {/* R */}
          <g id="brand-R" transform="translate(265, 20)">
            <rect x="0" y="0" width="18" height="100" fill="#FFFFFF" />
            <path
              d="M18 0 H62 C80 0 94 12 94 32 C94 50 80 62 62 62 H18 V0 Z"
              fill="#FFFFFF"
            />
            <path
              d="M18 18 H56 C65 18 72 23 72 32 C72 41 65 46 56 46 H18 V18 Z"
              fill="#050505"
            />
            <path d="M42 58 L88 100 H66 L26 62 H42 Z" fill="#FFFFFF" />
            <line x1="56" y1="72" x2="80" y2="94" stroke="#F7D85B" strokeWidth="2" />
          </g>

          {/* M */}
          <g id="brand-M" transform="translate(385, 20)">
            <rect x="0" y="0" width="16" height="100" fill="#FFFFFF" />
            <path d="M16 0 L48 65 L80 0 H96 V100 H80 V32 L54 82 H42 L16 32 V100 H0 V0 H16 Z" fill="#FFFFFF" />
            <rect x="80" y="0" width="16" height="100" fill="#FFFFFF" />
            <line x1="48" y1="20" x2="48" y2="60" stroke="#050505" strokeWidth="2" />
          </g>

          {/* E */}
          <g id="brand-E" transform="translate(495, 20)">
            <rect x="0" y="0" width="16" height="100" fill="#FFFFFF" />
            <rect x="16" y="0" width="55" height="16" fill="#FFFFFF" />
            <rect x="16" y="42" width="40" height="14" fill="#FFFFFF" />
            <rect x="16" y="84" width="55" height="16" fill="#FFFFFF" />
            <line x1="18" y1="8" x2="68" y2="8" stroke="#050505" strokeWidth="2" />
            <line x1="18" y1="92" x2="68" y2="92" stroke="#050505" strokeWidth="2" />
          </g>
        </motion.svg>
      </div>

      <span className="sr-only">
        {isRevealed ? "Signature FORME révélée" : "Œil abstrait FORME"}
      </span>
    </button>
  );
}
