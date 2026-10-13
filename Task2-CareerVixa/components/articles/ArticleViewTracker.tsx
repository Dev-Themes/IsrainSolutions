"use client";

import { useEffect } from "react";

export function ArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug || typeof window === "undefined") return;

    const storageKey = `cv_viewed_${slug}`;
    if (sessionStorage.getItem(storageKey)) {
      return; // Deduplicate within same tab session
    }

    sessionStorage.setItem(storageKey, "1");

    // Send view event asynchronously
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        eventType: "VIEW",
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // Fail silently to never degrade user experience
    });
  }, [slug]);

  return null;
}
