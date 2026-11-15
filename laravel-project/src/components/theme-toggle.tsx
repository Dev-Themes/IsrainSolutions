"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(callback: () => void) {
  window.addEventListener("storage", callback);
  const observer = new MutationObserver(() => callback());
  if (typeof document !== "undefined") {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  return () => {
    window.removeEventListener("storage", callback);
    observer.disconnect();
  };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const currentTheme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light"
  );

  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--brand)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--accent)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--text-muted)]" />
      )}
    </button>
  );
}
