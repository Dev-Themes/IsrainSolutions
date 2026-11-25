# Brand Audit: Israin Solutions (Parent Brand) & Sub-brand seo.israinsols.com

**Date:** 2026-11-25  
**Sources:**
- Parent full-page desktop screenshot: `reference/screencapture-israinsols-2026-11-25-15_50_47.png` (1920 x 12206 px)
- Live parent site CSS extraction: `https://israinsols.com/` (Elementor global styles, kit CSS, and typography definitions)
- Pixel sampling via Python PIL (quantize & color frequency analysis)

---

## 1. Visual Identity & Brand Voice

- **Brand Name:** Israin Solutions ("IsrainSols")
- **Sub-brand:** OffPage SEO Services by Israin Solutions (`seo.israinsols.com`)
- **Tagline / Positioning:** "We build brands that scale." / "Your Vision, Our Expertise." Full-service agency established in Hyderabad, Pakistan.
- **Voice & Tone:** Confident, direct, outcome-focused, no hype or artificial promises. Short declarative headings, transparent pricing, concrete deliverables.
- **Theme:** **DARK ONLY**. Pure black, dark charcoal (`#121212`), deep navy hero (`#000B27`), and dark indigo cards (`#03000B`) with high-contrast cyan-blue accents (`#1FA9E0`). No light theme, no toggle.

---

## 2. Design Tokens

### 2.1 Color Palette

| Token Name | Hex Code | Measured / Live Source | Usage / Placement |
|---|---|---|---|
| `--color-brand` (Primary Accent) | `#1FA9E0` | Sampled `#1aade4` / `#1FA9E0` (4,038+ px) | Active nav item, eyebrow dots, stat numerals, card icons, accent borders, primary CTAs |
| `--color-brand-hover` | `#34bbf0` | Derived (+8% lightness) | Hover state for buttons, active link hover |
| `--color-brand-muted` | `rgba(31, 169, 224, 0.15)` | Derived | Icon background glow, subtle badge background |
| `--color-brand-border` | `#3B9DC4` | Measured card outline (80% opacity) | 2px card outlines, button borders |
| `--color-bg-header` | `#000000` | Sampled `#000000` (2,915 px) | Sticky navigation bar with bottom 1px hairline border |
| `--color-bg-hero` | `#000B27` | Sampled `#000b28` (226 px) | Hero section deep navy with gradient fade to `#000000` |
| `--color-bg-section-alt` | `#121212` | Sampled `#121212` / `#131313` (3,379 px) | Alternating section bands (capabilities, why choose us, packages) |
| `--color-bg-section-deep` | `#000000` | Sampled `#000000` | Tools strip, client logo marquee, who we are, footer |
| `--color-bg-card` | `#03000B` | Sampled `#04000b` / `#03000a` (1,146 px) | Service cards, feature blocks, pricing cards |
| `--color-bg-glass` | `#011434` | Measured hero tiles | Glassmorphic visual panels, Link Report Card |
| `--color-border-hairline` | `rgba(255, 255, 255, 0.08)`| Measured grid dividers | 1px dividers, header hairline border, subtle card borders |
| `--color-text-heading` | `#FFFFFF` | Measured | H1, H2, H3, card titles, Inter bold |
| `--color-text-body` | `#EBF1FF` | Measured hero copy | Hero paragraphs (high legibility slightly cool white) |
| `--color-text-muted` | `#B2AFB8` | Measured card copy | Card descriptions, secondary text, timestamps |
| `--color-text-subtle` | `#7898B0` | Measured logo subtitle | Eyebrows, small meta tags, table subtitles |
| `--color-star` | `#FCD404` | Measured review stars | Review star ratings, quality badges |
| `--color-success` | `#10B981` | Tailored accessible | Status badges ("Live", "Indexed", "Dofollow") |
| `--color-error` | `#EF4444` | Tailored accessible | Form validation errors, missing requirements |

### 2.2 Typography

- **Primary Font Family:** Inter, sans-serif (variable font, loaded via `next/font/google`).
- **Headings (H1, H2, H3):** Inter 700 (Bold), sentence case, tight leading (`leading-[1.1]`), color `#FFFFFF`.
- **Sub-headings / Accent Labels:** Inter 700, uppercase, tracking-wider (`0.08em` to `0.12em`), color `#1FA9E0`.
- **Eyebrow Pills:** Uppercase, Inter 600, `text-xs tracking-[0.14em]`, preceded by filled dot (`●`).
- **Navigation:** Inter 600, uppercase, `text-sm` (~14px), white with accent hover / active.
- **Body Text:** Inter 400 (Regular) and 500 (Medium), line height `1.6`, font size fluid `15px` to `17px`.

### 2.3 Component Styling & Spacing

- **Containers:** Centered `max-w-[1240px]` with fluid side padding `clamp(1rem, 4vw, 2.5rem)`.
- **Section Spacing:** Generous vertical rhythm `clamp(4.5rem, 8vw, 7.5rem)`.
- **Card Radius:** Standard `8px` to `12px` (`rounded-xl` / `rounded-lg`).
- **Button Radius:** Pill (`rounded-full`) for hero CTA and contact badges; `rounded-md` (`6px`) for card and header actions.
- **Button Style:** Outlined (ghost) buttons with white uppercase typography and cyan-blue borders (`#3B9DC4`), transitioning to brand glow on hover.

---

## 3. Brand Assets Acquired

1. `public/brand/israin-wordmark-1024x244.webp` (Parent logo wordmark with cyan symbol and typography)
2. `public/brand/israin-wordmark.webp` (Standard WebP wordmark)
3. `public/brand/israin-icon.png` (Symbol mark icon in high resolution)
