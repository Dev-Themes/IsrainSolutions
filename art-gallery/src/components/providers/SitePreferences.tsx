"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Shared motion preferences. PopArt Agency has one permanent light visual identity. */
export function SitePreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user" transition={{ duration: .45, ease: [.16, 1, .3, 1] }}>{children}</MotionConfig>;
}
