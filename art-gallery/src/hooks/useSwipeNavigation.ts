"use client";
import { useRef, type TouchEvent } from "react";

export function useSwipeNavigation(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart(event: TouchEvent) { const touch = event.touches[0]; start.current = touch ? { x: touch.clientX, y: touch.clientY } : null; },
    onTouchEnd(event: TouchEvent) {
      const touch = event.changedTouches[0], origin = start.current;
      start.current = null;
      if (!touch || !origin) return;
      const dx = touch.clientX - origin.x, dy = touch.clientY - origin.y;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) { if (dx > 0) onPrev(); else onNext(); }
    },
    onTouchCancel() { start.current = null; },
  };
}
