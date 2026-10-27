"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface EyeToWordmarkProps {
  className?: string;
  ariaLabel?: string;
}

export function EyeToWordmark({
  className = "",
  ariaLabel = "Symbole interactif PopArt Agency — Cliquez ou survolez pour transformer l'œil en signature de marque",
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
      className={`brand-reveal group relative flex items-center justify-center cursor-pointer select-none bg-transparent border-0 p-2 sm:p-4 max-w-full rounded-sm transition-transform duration-500 focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
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
              stroke="currentColor"
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
              stroke="currentColor"
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
              stroke="currentColor"
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
            stroke="currentColor"
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
            stroke="currentColor"
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
            stroke="var(--accent)"
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
            fill="currentColor"
            animate={{
              scale: isRevealed ? 0.3 : 1,
              opacity: isRevealed ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Pupil highlight */}
          <circle cx="243" cy="133" r="5" fill="var(--background)" />
        </motion.svg>

        {/* The provided transparent identity is revealed by the existing interaction. */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={false}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.88,
            filter: isRevealed ? "blur(0px)" : "blur(4px)",
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/brand/final-logo.png" alt="PopArt Agency" width={1060} height={803} sizes="(max-width: 640px) 260px, 520px" className="h-full w-full object-contain" />
        </motion.div>
      </div>

      <span className="sr-only">
        {isRevealed ? "Signature PopArt Agency révélée" : "Œil abstrait PopArt Agency"}
      </span>
    </button>
  );
}
