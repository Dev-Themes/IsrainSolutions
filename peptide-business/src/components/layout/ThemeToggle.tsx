"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Use mounted state for hydration safety, defaulting to dark for SSR consistency
  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-2 p-1.5 sm:p-2 text-xs font-semibold uppercase tracking-wider rounded-lg border border-border bg-surface text-foreground hover:bg-background-secondary hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
      ) : (
        <Sun className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="font-mono text-xs text-foreground">
          {isDark ? "Dark Theme" : "Light Theme"}
        </span>
      )}
      <span className="sr-only">
        {isDark ? "Dark theme active. Click to switch to light theme." : "Light theme active. Click to switch to dark theme."}
      </span>
    </button>
  );
}
