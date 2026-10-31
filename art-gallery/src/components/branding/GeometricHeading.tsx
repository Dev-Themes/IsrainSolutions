import type { ReactNode } from "react";

interface GeometricHeadingProps { text: string; className?: string; as?: "h1" | "h2"; }

export function GeometricHeading({ text, className = "", as = "h1" }: GeometricHeadingProps) {
  const Component = as;
  const marker: ReactNode = <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 0A20 20 0 0 0 20 40V20H40V0H20Z" fill="currentColor" /><path d="M24 24H40A16 16 0 0 1 24 40V24Z" fill="currentColor" /></svg>;
  return <Component className={`display-heading ${className}`}>{marker}<span>{text}</span></Component>;
}
