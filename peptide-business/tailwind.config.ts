import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "16/10": "16 / 10",
        "16/11": "16 / 11",
        "5/4": "5 / 4",
        "4/5": "4 / 5",
      },
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-muted": "var(--foreground-muted)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          teal: "var(--accent-teal)",
        },
        border: "var(--border)",
        "border-subtle": "var(--border-subtle)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        "surface-card": "var(--surface-card)",
        "editorial-contrast": "var(--editorial-contrast)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        "accordion-down": "accordion-down 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 220ms ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height, auto)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height, auto)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
