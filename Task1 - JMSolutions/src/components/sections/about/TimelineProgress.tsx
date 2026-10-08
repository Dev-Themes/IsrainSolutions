"use client";

import { useEffect, useRef } from "react";

export function TimelineProgress() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('li.timeline-item');
    if (items.length === 0) return;

    let observer = new IntersectionObserver(
      (entries) => {
        let allActive = true;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-active", "true");
          }
          if (entry.target.getAttribute("data-active") !== "true") {
            allActive = false;
          }
        });

        if (allActive && observer) {
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );

    items.forEach(item => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>;
}
