"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Sync state with HTML data attribute on mount
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme") as "day" | "night" | null;
    
    if (initialTheme) {
      setTheme(initialTheme);
    } else {
      // Fallback to media query if no attribute is found
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mql.matches ? "night" : "day");
    }

    // Listen for OS theme changes if user hasn't explicitly set a theme
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem("cv-theme")) {
          const newTheme = e.matches ? "night" : "day";
          setTheme(newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
          const meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute("content", newTheme === "night" ? "#0f1a20" : "#f2f4f3");
        }
      } catch (err) {}
    };

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", handleSystemChange);
    return () => mql.removeEventListener("change", handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "day" ? "night" : "day";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", newTheme === "night" ? "#0f1a20" : "#f2f4f3");

    try {
      localStorage.setItem("cv-theme", newTheme);
    } catch (e) {
      // Ignore localStorage errors (e.g., privacy mode)
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle theme"
        className="p-2 rounded-full text-[var(--ink)]"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "day" ? "Switch to night theme" : "Switch to day theme"}
      className="p-2 rounded-full hover:bg-[var(--line)] text-[var(--ink)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      {theme === "day" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
