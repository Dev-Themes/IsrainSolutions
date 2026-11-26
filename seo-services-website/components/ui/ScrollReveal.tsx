"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down" | "fade";
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  distance?: number; // in pixels
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 36,
  threshold = 0.05,
  once = true,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fast check: if element is already within viewport on load, reveal immediately
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (once) return;
    }

    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px 80px 0px", // Trigger slightly before it hits the viewport
      }
    );

    observer.observe(element);

    // Failsafe timer: ensures content is never permanently hidden if observer lags
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 400 + delay);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [once, threshold, delay]);

  const getTransform = () => {
    if (isVisible) return "none";
    switch (direction) {
      case "left":
        return `translateX(-${distance}px)`;
      case "right":
        return `translateX(${distance}px)`;
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "fade":
      default:
        return "none";
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn("will-change-transform transform-gpu transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
};
