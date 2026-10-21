# Peptide Ingredients Lab — Production Showcase Platform

A modern, editorial-style commercial showcase platform for cosmetic peptides and bio-active raw materials. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and cryptographic server-side 18+ age verification.

---

## 1. Business Workflow & Architecture

```
Visitor Arrival
      │
      ▼
Edge Middleware Interception ──(No valid token)──► /age-verification
      │ (HMAC-SHA256 Verified)
      ▼
Landing Page (Editorial Showcase)
      │
      ├── Category Filter & Real-Time Search
      ├── Quick Specs Modal & Dedicated Detail Routes (/products/[slug])
      ├── Why Choose Us & How to Inquire Workflows
      ├── Smooth FAQ Accordion
      └── Official Telegram Inquiry Button
```

This website is a **product showcase and inquiry platform**:
- No shopping cart, no online checkout, and no payment processing.
- No unverified medical or therapeutic claims.
- Centralized direct inquiries via the official business Telegram channel.
- Complete regulatory and cosmetic raw-material disclaimers.

---

## 2. Mandatory 18+ Age Verification Engine

Access is restricted using Next.js Edge Middleware request handling:

1. **Request Interception**: Unverified visitors attempting to browse any protected page are redirected to `/age-verification?returnUrl=...`.
2. **Cryptographic Signing**: Upon confirming 18+, `POST /api/age-verification` issues an `HttpOnly`, `SameSite=Lax`, 30-day cookie (`age_verified_token`) signed via HMAC-SHA256 using the server-only `AGE_VERIFICATION_SECRET`.
3. **Web Crypto API**: Built with standard `crypto.subtle` for zero-overhead validation across Edge Middleware and Node.js runtimes.
4. **Tamper & Expiry Protection**: Middleware verifies token format, timestamp freshness (<30 days), and cryptographic signature. Tampered or expired tokens are rejected immediately.
5. **Open Redirect Defense**: All `returnUrl` parameters are strictly validated to prevent external domain redirects.
6. **Crawler & SEO Integrity**: `/robots.txt` and `/sitemap.xml` remain publicly crawlable. `/age-verification` is marked `noindex, nofollow`.

---

## 3. Design System & Tokens

Natural, minimal, editorial aesthetics inspired by premium cosmetic formulations (The Ordinary, Paula's Choice):

- **Primary Background**: Warm Off-White (`#FAF9F6`)
- **Secondary Background**: Soft Beige (`#F2F0EB`)
- **Primary Text**: Charcoal (`#242522`)
- **Secondary Text**: Muted Gray (`#6D716B`)
- **Accent**: Muted Olive (`#63735B`) / Hover (`#4F5D48`) / Light (`#EDF1EA`)
- **Borders**: Subtle Warm Gray (`#E5E5DF`)
- **Product Surfaces**: Pure White (`#FFFFFF`)

Typography leverages `next/font/google` with `DM_Sans` for headings and `Inter` for technical data tables.

---

## 4. Product Catalog Maintenance

Product catalog data is strictly typed and centralized in [`src/data/products.ts`](src/data/products.ts):

```typescript
export interface Product {
  id: string;
  slug: string;
  name: string;
  inciName?: string;
  casNumber?: string;
  category: string;
  description: string;
  extendedDescription?: string;
  image: string;
  imageAlt: string;
  specifications: Record<string, string>;
  availability?: string;
  featured?: boolean;
  molecularFormula?: string;
  molecularWeight?: string;
  appearance?: string;
  storage?: string;
  suggestedUsage?: string;
  solubility?: string;
}
```

To update or add products, edit [`src/data/products.ts`](src/data/products.ts). Dedicated routes (`/products/[slug]`) and metadata update automatically upon rebuild.

---

## 5. Configuration & Environment Variables

Copy `.env.example` to `.env.local`:

```ini
# Production Domain
NEXT_PUBLIC_SITE_URL=https://peptideshowcase.com
NEXT_PUBLIC_SITE_NAME="Peptide Ingredients Lab"

# Official Telegram Inquiry Channel
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/REPLACE_WITH_ACTUAL_USERNAME
NEXT_PUBLIC_TELEGRAM_HANDLE=@PeptideIngredientsLab

# Server-Only Secret (Minimum 32 characters, NEVER expose to client)
AGE_VERIFICATION_SECRET=replace_with_a_secure_random_32_character_string_for_production
```

---

## 6. Testing & Quality Verification

All tests are verified and passing:

```bash
# 1. TypeScript Strict Type-Check
pnpm run type-check

# 2. Production Build Verification
pnpm run build

# 3. ESLint Core Web Vitals
pnpm exec eslint src/

# 4. Playwright End-to-End & 14-Viewport Responsive Tests
# Tests 320px, 360px, 375px, 390px, 430px, 500px, 640px, 768px, 1024px, 1280px, 1440px, 1600px, 1920px, 2560px
pnpm run test:e2e
```
