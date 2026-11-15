# TradeConnect Design System Specification (DESIGN.md)

> **Philosophy:** Grounded, documentary-style craftsmanship. Zero generic AI template aesthetics (no neon glows, no gradient text, no floating amorphous cards). Built for high information density, rapid mobile loading, and strict contrast compliance.

---

## 1. Color Tokens & Theme Engine

All colors are controlled via CSS custom properties on `<html>` through `data-theme="light"` (default) and `data-theme="dark"`. An inline pre-paint script in `<head>` ensures zero flash of unstyled content.

| CSS Variable | Light Theme | Dark Theme | Purpose |
| :--- | :--- | :--- | :--- |
| `--bg` | `#f6f1e9` (Paper) | `#0e1715` (Charcoal Pine) | Page canvas |
| `--bg-alt` | `#ebe3d6` (Sand) | `#13201d` (Milled Slate) | Alternating section background |
| `--bg-deep` | `#1f3a34` (Deep Forest Pine) | `#080f0d` (Dark Obsidian) | Inverted contrast bands |
| `--bg-deep-text` | `#f6f1e9` | `#f6f1e9` | High-contrast text on deep bands |
| `--surface` | `#ffffff` (Crisp White) | `#142421` (Card Slate) | Primary card / container surface |
| `--text` | `#1a2421` (Charred Oak) | `#f3efe6` (Warm Off-White) | High-contrast body text (WCAG AAA) |
| `--text-muted` | `#53645e` | `#95a6a0` | Secondary description & metadata |
| `--brand` | `#1f3a34` (Heritage Pine) | `#2f6b5c` | Primary brand accent & headers |
| `--accent` | `#b4481f` (Terracotta) | `#c7562c` (Bright Ochre) | Action buttons & badges |
| `--pine-accent` | `#2f6b5c` | `#498e7d` | Verification badges & checkmarks |
| `--line` | `#ded5c7` | `#223732` | 1px clean architectural hairline borders |

---

## 2. Typography

* **Headings (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`):** `Source Serif 4` (self-hosted via `next/font/google`, `display: swap`). Sturdy, editorial serif with `-0.015em` letter spacing.
* **Body, UI, & Forms:** `Inter` (self-hosted via `next/font/google`, `display: swap`). Clean, highly legible sans-serif.

---

## 3. Strict Image & Photography Rules

To ensure authentic human craftsmanship and avoid artificial AI-generated clichés:
1. **Absolute Content Prohibitions:**
   * **NO** women, females, or girls.
   * **NO** children, babies, or teenagers.
   * **NO** nudity, suggestive content, or faces of identifiable people.
   * **NO** corporate stock models pointing at clipboards.
   * **NO** readable branded logos or artificial AI text artifacts.
2. **Permitted Subject Matter:**
   * Close-up hands holding tools (e.g. pipe cutters, soldering torches, multimeters, trowels).
   * Mechanical and trade components: copper pipework, manifolds, combi boiler heat exchangers, 18th edition RCBO consumer units, slate roof valleys, heat pump vacuum gauges, and outdoor timber framing.
   * Unbranded work vehicles, workshops, and honest daylight architectural exteriors.
3. **Format & Performance:**
   * Served via `next/image` in WebP / AVIF.
   * File targets: hero under 150 KB, inner photos under 80 KB.
   * Mandatory descriptive `alt` tags on every informational image.

---

## 4. Copywriting & Tone Standards

* Write in plain, direct sentences like an experienced trade professional.
* **Banned Buzzwords:** *seamless, revolutionise, cutting-edge, unlock, empower, elevate, next-generation, world-class*.
* **Authenticity:** No fake 5-star awards, fake review counts, or invented logos. Real trade accreditations only (*Gas Safe Register*, *NICEIC*, *NAPIT*, *NFRC*, *TDLR Master HVAC*).

---

## 5. Shared Components Reference

* `AnnouncementBar`: Thin top banner with emergency dispatch phone and quote turnaround promise.
* `Header`: Sticky navigation with services dropdown (hover & keyboard focus), regional switcher, and 320px slide-in hamburger drawer with focus trap and body scroll lock.
* `Footer`: Multi-column directory with trade services, regional hubs, business hours, and privacy links.
* `Accordion`: Accessible expanding disclosure (`aria-expanded`, keyboard navigable) for FAQs and area coverage.
* `ReviewsCarousel`: CSS scroll-snap carousel with accessible prev/next buttons and pause on focus.
* `WorkGallery`: Accessible documentary photography grid with lightbox modal (Esc key operable).
* `AreaChips`: Multi-tab selector linking directly to programmatic city pages.
* `ThemeToggle`: Zero-flash hydration-safe toggle operating on `data-theme`.

---

## 6. How to Add a New Page

1. Create `src/app/[your-route]/page.tsx`.
2. Add a unique `metadata` object with `<title>` under 60 chars and description under 160 chars.
3. Structure with semantic section tags and rhythmic background classes:
   * `.section-light` for paper background.
   * `.section-sand` for sand-colored alternating bands.
   * `.section-deep` for dark pine contrast bands.
4. Wrap main content within `.container-custom`.
5. Add the route to `src/app/sitemap.ts` with appropriate change frequency and priority.
