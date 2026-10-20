"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductHeroMotifProps {
  size?: number;
  className?: string;
}

export function ProductHeroMotif({ size = 300, className = "" }: ProductHeroMotifProps) {
  return (
    <div
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1/1" }}
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer segmented ring */}
        <circle
          cx="150"
          cy="150"
          r="140"
          stroke="#292929"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Outer Mint Accent Segment (#78E6BF) */}
        <motion.path
          d="M 150 10 A 140 140 0 0 1 290 150"
          stroke="#78E6BF"
          strokeWidth="2.5"
          fill="none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "150px", originY: "150px" }}
        />

        {/* Second ring with crosshairs */}
        <circle cx="150" cy="150" r="105" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="150" y1="35" x2="150" y2="265" stroke="#292929" strokeWidth="1" />
        <line x1="35" y1="150" x2="265" y2="150" stroke="#292929" strokeWidth="1" />

        {/* Third ring with Lavender accent (#BA9CFF) */}
        <motion.circle
          cx="150"
          cy="150"
          r="75"
          stroke="#BA9CFF"
          strokeWidth="2"
          strokeDasharray="12 8"
          strokeOpacity="0.75"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ originX: "150px", originY: "150px" }}
        />

        {/* Inner solid circular core */}
        <circle cx="150" cy="150" r="45" fill="#121214" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="150" cy="150" r="16" fill="#78E6BF" />
        <circle cx="150" cy="150" r="6" fill="#050505" />

        {/* Technical cross ticks */}
        <line x1="145" y1="150" x2="155" y2="150" stroke="#050505" strokeWidth="1.5" />
        <line x1="150" y1="145" x2="150" y2="155" stroke="#050505" strokeWidth="1.5" />
      </motion.svg>
    </div>
  );
}
