"use client";

import { useEffect } from "react";

/** Exportable replacement for former server redirects; keep queries and anchors. */
export function StaticRedirect({ href }: { href: string }) {
  useEffect(() => {
    const target = new URL(href, window.location.origin);
    target.search = window.location.search;
    if (window.location.hash) target.hash = window.location.hash;
    window.location.replace(target.href);
  }, [href]);
  return <><noscript><meta httpEquiv="refresh" content={`0;url=${href}`} /></noscript><p className="container-popart py-16"><a href={href}>Continue &rarr;</a></p></>;
}
