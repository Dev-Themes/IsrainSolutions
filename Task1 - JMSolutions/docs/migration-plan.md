# Migration Plan

- **Kept:** `layout.tsx` structure (updated), `globals.css` (updated to strict dark theme tokens), `tailwind.config` dependencies, overall Next.js setup.
- **Rewritten:** `page.tsx`, `services/page.tsx`, `about/page.tsx`, `contact/page.tsx`. Replaced old light components with `Section`, `BentoGrid`, `GlassBox`, `Button` using strict dark colors and responsive grid logic.
- **Deleted:** Old `ac-repair-tx` location pages (not in blueprint), old `ContourBackground.tsx`, `Hero.tsx`, `Footer.tsx` (rewritten inline and in `layout/Footer.tsx`).
- **Added:** `scripts/guard-no-light.mjs` to enforce dark mode. Playwright layout tests. `docs/` documentation.
