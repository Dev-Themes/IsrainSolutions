# OffPage SEO Services by Israin Solutions (`seo.israinsols.com`)

Production-grade, multi-page link building and SEO services website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

Designed as an official sub-brand division of **Israin Solutions** ([israinsols.com](https://israinsols.com)). Built to mirror the dark-mode aesthetic of the parent company while featuring the complete commercial inventory and informational structure of `offpageseoservices.com`.

---

## 1. Quick Start

### Prerequisites
- **Node.js**: v20+ LTS
- **Package Manager**: `pnpm` (v10+ recommended)

### Installation
```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Run local development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `pnpm dev` | `next dev` | Starts local Next.js dev server with hot reload |
| `pnpm build` | `next build` | Compiles optimized production bundle and generates SSG pages |
| `pnpm start` | `next start` | Runs the compiled production server |
| `pnpm typecheck` | `tsc --noEmit` | Strict TypeScript type validation |
| `pnpm check:content`| `node scripts/check-content.js` | Validates that no unverified placeholder markers exist in production |
| `pnpm test` | `npm test` | Runs test suite verification |

---

## 3. Brand Identity & Design System

The application is styled exclusively in **Dark Mode** matching the Israin Solutions design system measured in `docs/brand-audit.md`:
- **Primary Accent:** `#1FA9E0` (Cyan blue)
- **Accent Hover:** `#34bbf0`
- **Ghost Outlines:** `#3B9DC4`
- **Background Tiers:**
  - Header & Deep bands: `#000000`
  - Hero Section: Deep navy gradient `#000B27` to `#000000`
  - Alternating section bands: `#121212`
  - Cards & Panels: `#03000B`
  - Hero Glass Tile: `#011434`
- **Typography:** `Inter` variable font loaded via `next/font/google`.

---

## 4. Content Management & Extension Guide

### Adding or Editing Services
All service offerings and their detail pages are driven by:
- `content/services.ts` (catalog summary, tabs, pricing)
- `content/service-details.ts` (full criteria, FAQs, deliverables, and who it's for)

### Adding Publisher Inventory
- `content/sites.ts` contains the active publisher lists for `/guest-post-sites` and `/link-insertion-sites`.
- To bulk import publisher lists from a spreadsheet, run:
  ```bash
  node scripts/import-sites.ts path/to/publishers.csv
  ```

### Adding a Blog Post
Add a new object to `content/blog-posts.ts` with `slug`, `title`, `description`, `category`, and `content`. The post will automatically:
1. Generate an SSG page at `/blog/[slug]`.
2. Appear on the blog index `/blog`.
3. Generate Article and Breadcrumb JSON-LD schema.
4. Appear in the RSS feed at `/feed.xml`.

---

## 5. Deployment Guide (Vercel + DNS)

### Deploying to Vercel
1. Push repository to your Git provider (GitHub / GitLab / Bitbucket).
2. Import project in Vercel.
3. Add environment variables from `.env.example` in Vercel Project Settings.
4. Deploy.

### Configuring Subdomain `seo.israinsols.com`
In your domain registrar / Cloudflare DNS for `israinsols.com`:
- **Type:** `CNAME`
- **Name:** `seo`
- **Target:** `cname.vercel-dns.com`
- **Proxy Status:** DNS Only (or Proxied with Full SSL in Cloudflare)

---

## 6. Project Architecture

```
app/
  (routes)/
    page.tsx                      # 11-section Home Page
    services/page.tsx             # Services Hub with comparison matrix
    services/[slug]/page.tsx      # 10 service detail pages
    guest-post-sites/page.tsx     # Publisher inventory table
    link-insertion-sites/page.tsx # Niche edits directory
    da-pa-checker/page.tsx        # DA/PA analysis utility
    about/page.tsx                # Founder & parent company story
    blog/page.tsx                 # Blog archive
    blog/[slug]/page.tsx          # Single blog post
    blog/category/[cat]/page.tsx  # Category archives
    order/page.tsx                # Interactive order brief
    shop/page.tsx                 # Products catalog
    contact/page.tsx              # Direct contact details
    privacy-policy/page.tsx       # Privacy policy
    terms/page.tsx                # Terms & 12-24h refund guarantee
    thank-you/page.tsx            # Order confirmation
    not-found.tsx                 # Custom 404 page
    opengraph-image.tsx           # Dynamic OG image generator
    sitemap.ts                    # Dynamic XML sitemap
    robots.ts                     # Search engine crawler directives
    manifest.ts                   # Web App Manifest
    feed.xml/route.ts             # RSS Feed
components/
  layout/                         # Header, MobileNav, Footer
  sections/                       # Hero, StatStrip, Marquee, ServiceTabs, Pricing, etc.
  ui/                             # LinkReportCard, SiteTable, FloatingWhatsApp
  forms/                          # BriefForm with validation and bot protection
  seo/                            # JsonLd helper
content/                          # Typed data modules for services, pricing, sites, blog
lib/                              # SiteConfig, SEO metadata builder, validators, metrics
docs/                             # Audits, site map, open questions, SEO checklist, QA
```
