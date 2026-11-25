# AGY BUILD PROMPT: seo.israinsols.com

> You are a senior front-end/full-stack engineer and design-minded builder. Build a production-grade, multi-page SEO services website on **Next.js**, to be deployed at **https://seo.israinsols.com** as a sub-brand of **Israin Solutions (https://israinsols.com)**.
> The content/structure comes from the reference site **https://offpageseoservices.com**. The look and feel come from the **parent brand, Israin Solutions**.
> Read this whole file before writing code. Work in the phases in section 14. Do not skip the discovery phase.

---

## 0. Inputs you have

| Input | Location | Use |
|---|---|---|
| Parent brand screenshots | `./reference/` (local folder, added by the owner) | **Source of truth for colors, type, spacing, component style.** |
| Reference site full-page screenshot | `./reference/` (look for `screencapture-offpageseoservices-*.png`) | Source of truth for page sections, copy, layout order. |
| Live parent site | https://israinsols.com | Brand tone, copy patterns, logo, contact details. |
| Live reference site | https://offpageseoservices.com | Content, page list, pricing, copy. |

**Rules for conflicts:** screenshots in `./reference/` beat anything written in this file. The parent theme in section 2.1 was pixel-measured from the parent screenshot; still confirm the exact accent against the parent's CSS in Phase 0. If this file says "verify", you must verify before using the value.

---

## 1. Phase 0: Discovery (do this BEFORE any code)

1. **View every image in `./reference/`.** Write what you see into `docs/brand-audit.md` and `docs/content-audit.md`.
2. **Extract the parent brand's real design tokens.** Do not guess colors.
   - Try fetching the parent site's CSS (e.g. `curl -sL https://israinsols.com/ | grep -oE 'href="[^"]+\.css[^"]*"'`, then fetch the Elementor kit/global CSS and read the `--e-global-color-*` and `--e-global-typography-*` custom properties, plus body/heading/button rules).
   - Also sample dominant colors from the parent screenshots with Python PIL (`quantize` / k-means) to cross-check.
   - Record: primary, secondary, accent, background (light + dark if both exist), surface/card, border, text, muted text, success/warn/error, gradient stops, button radius, card radius, shadows, section padding, container max-width, font families and weights, heading letter-spacing/case.
   - Output the result as a table in `docs/brand-audit.md` and as CSS variables in `app/globals.css`.
3. **Crawl the reference site** (`https://offpageseoservices.com`). If a page is blocked by robots.txt or can't be fetched, say so in `docs/content-audit.md` and **do not invent its content**: mark it `NEEDS CONTENT` and build the page shell with clearly marked TODO content in `content/` (see section 11). Enumerate every URL from the nav, footer, sitemap (`/sitemap.xml`, `/sitemap_index.xml`, `/wp-sitemap.xml`) and in-page links. Record for each page: URL, H1, meta title, meta description, section list, copy, CTAs, internal links, schema.
4. **Produce `docs/site-map.md`** listing final routes (section 6) mapped 1:1 to reference URLs, preserving the reference slugs where sensible so SEO equity and mental model carry over.
5. Stop and show a short summary of tokens + route map before continuing to Phase 1.

---

## 2. Brand: Israin Solutions (parent)

What is verified from the live parent site:

- **Name / legal wording:** Israin Solutions ("IsrainSols"). Tagline/hero: **"We build brands that scale."** Sub-line: "Your Vision, Our Expertise." Positioning: full-service digital agency (web dev, apps, graphics/branding, digital marketing, ORM, animation, Google Business Profile).
- **Voice:** confident, plain, outcome-oriented. Short declarative headings. Promises like "On-time delivery, every time", "Dedicated project manager", "Free revisions included", "24/7 support available". Keep this voice in the SEO site's microcopy (but stay factual, no hype claims we can't back).
- **Recurring UI patterns on the parent site (replicate the *patterns*, restyled in our own system):**
  - Small **eyebrow labels** above H2s ("Our Capabilities", "Why choose us", "Our Successful Tools", "Who we are", "Our portfolio", "Contact Now").
  - A pill/badge such as **"Available for new projects"** with a status dot in the hero.
  - **Animated number counters** (clients, projects, satisfaction %, years of experience).
  - **Numbered feature blocks** (`01.`, `02.`, `03.`) with title + short paragraph.
  - **Uppercase nav and uppercase "LEARN MORE" style link-buttons.**
  - A service-card grid, a logo/tech strip, a "trusted by" logo row, testimonial slider, numbered FAQ accordion, and a closing CTA band ("Ready to Grow? Let's Get Started Today!" → "Start a project").
  - Footer with brand blurb, "Our Expertise" link list, and "Get in Touch With Us" contact list (address, email, WhatsApp, Teams, Telegram, Discord).
- **Logo files (verified URLs, download and optimize locally into `public/brand/`):**
  - Wordmark: `https://israinsols.com/wp-content/uploads/2025/01/Israin-Solutions-1024x244.webp`
  - Wordmark alt: `https://israinsols.com/wp-content/uploads/2025/01/Israin-Solutions.webp`
  - Icon/mark: `https://israinsols.com/wp-content/uploads/2024/10/ISonly-Orig.png`
  - Cropped logo: `https://israinsols.com/wp-content/uploads/2024/10/cropped-cropped-Israin-Solutions-logo2.png`
  - Convert to SVG if the source allows; otherwise keep high-res PNG/WebP and generate favicon set (16/32/180/192/512, maskable).
- **Contact details (parent):** Office #21 Al-Rahim Heights, Unit #06 Latifabad, Hyderabad, Pakistan · contact@israinsols.com · WhatsApp +92 331 3646645 · Telegram `t.me/israinsolutions`.
- **Parent site links to reuse in header/footer cross-linking:** Home `https://israinsols.com/`, About `/creative-agency/`, Services `/digital-agency-services/`, Portfolio `/digital-agency-portfolio/`, Contact `/contact/`.

### 2.1 Measured theme (from the parent screenshot in `./reference/`; pixel-sampled, not guessed)

**Theme: DARK only.** The whole parent site is near-black with a single cyan-blue accent. There is no light mode and no theme toggle. Do not add one.

| Token | Hex | Where it appears |
|---|---|---|
| `--brand` (primary accent) | **#1FA9E0** (measured range #18A8E0 to #23AAE1) | Logo mark, active nav item (HOME), eyebrow labels + dot, hero sub-heading, short underline bar, stat numbers (500+, 99%, 1,000+), card icons, accent borders |
| `--brand-hover` (derive) | lighten ~8% from `--brand` | Hover states (not on the screenshot, derive and document) |
| `--brand-border` (card/button outline) | accent at ~80% on dark, reads as **#3B9DC4** on the screenshot | 2px rounded outline on service cards; 1px outline on the "EXPLORE OUR PORTFOLIO" button (reads as ~#4C95BE, lighter/softer than cards) |
| `--logo-slate` | **#7898B0** | Gray-blue half of the logo mark |
| `--bg-header` | **#000000** | Sticky header, with a 1px hairline underneath |
| `--bg-hero` | **#000B27** (deep navy), fading to #01010B / black at the bottom | Hero + "unique approach" band; dark navy with a faint network/mesh-and-particles background image |
| `--bg-section-alt` | **#121212** (some bands #131313, #141414) | Capabilities section, "Why choose us" band, portfolio/FAQ bands |
| `--bg-section-deep` | **#000000** | Tools strip, "Who we are", client-logo row, footer |
| `--bg-card` | **#03000B** (very dark indigo-black) | Service cards and "Why choose us" cards, set against #121212 |
| `--bg-glass` | **#011434** (navy glass tile) | Hero service tiles (8 small icon tiles) with a very faint border, ~12px radius |
| `--bg-trust-card` | **#121212** | Cards inside the 3-up "Built on trust" row |
| `--text` (headings) | **#FFFFFF** | H1/H2/card titles, bold Inter |
| `--text-body` | **#EBF1FF** (hero body, slightly blue-white); **#B2AFB8** (card body, muted gray) | Hero paragraph vs. card paragraphs |
| `--text-muted` | **#9EB4CC** | Small labels on glass tiles |
| `--star` | **#FCD404** | Review star rating (yellow) |

Notes on the palette:
- The page alternates **black / #121212 / navy** bands. Sections are separated by background shift, not by borders or shadows.
- The accent is used sparingly: icons, numerals, eyebrows, outlines. **Buttons are outlined (ghost) buttons**, not filled, with white uppercase text.
- No gradients on text or buttons. The only gradient is the hero's navy-to-black fade. Faint glow/particle texture sits behind the stats band (dark teal/green tint at ~5% opacity).
- Because the measured values come from anti-aliased pixels, treat them as the **source values**, and have `docs/brand-audit.md` confirm the exact accent by reading the parent's CSS (`--e-global-color-*`). If the CSS differs by a few units, use the CSS value.

**Typography (from the screenshot):** a clean geometric grotesque that matches **Inter**. Use **Inter** (variable, via `next/font`) for everything unless the parent CSS shows otherwise.
- H1: Inter, **bold (700)**, white, sentence case, tight leading (~1.1). Example: "We build brands that scale."
- H2: Inter 700, white, sentence case (e.g. "Built on trust. Driven by expertise.", "Work that speaks for its self").
- Sub-heading under hero H1: **uppercase, bold, accent color** ("YOUR VISION, OUR EXPERTISE DIGITAL MARKETING AGENCY"), followed by a small accent underline made of 3 dots + a short solid bar.
- Eyebrow: **small, uppercase, wide letter-spacing (~0.12em), accent color, preceded by a filled accent dot** (e.g. "● AVAILABLE FOR NEW PROJECTS", "● OUR CAPABILITIES", "● WHY CHOOSE US", "● OUR SUCCESSFUL TOOLS", "● WHO WE ARE", "● OUR PORTFOLIO").
- Nav: Inter 600, uppercase, ~14px, white; active item in accent.
- Buttons/links: uppercase, 600, small; "LEARN MORE →" text-links with an arrow glyph.
- Stat numerals: Inter 600-700, large, **accent color**, with white 14-16px labels beneath; the 2x2 stats block is split by thin vertical + horizontal divider lines (`#ffffff` at ~15% opacity).

**Component styling (from the screenshot):**
- **Header:** pure black, logo left (wordmark "ISRAIN SOLUTIONS" in accent blue with tagline "Developing Beyond Imagination" in light gray beneath, mark on the left), centered nav (HOME, ABOUT, SERVICES with chevron, PORTFOLIO, CONTACT), right side row of small white circular social/contact icons (Telegram, Discord, Teams, WhatsApp, Email).
- **Hero:** 2 columns. Left: eyebrow pill, H1, accent sub-heading + dotted underline, paragraph, outlined pill button "EXPLORE OUR PORTFOLIO", then a 2x2 stat grid (500+ Clients, 99% Satisfaction, 1,000+ Projects, 6+ Years Experience). Right: **2-column x 4-row grid of glass tiles** (navy `#011434`, ~12px radius, hairline border), each with a thin-line accent icon centered above a small label: Brand Identity, Graphics Design, Web Development, Digital Marketing, App & Game Development, 2D/3D Animation, Online Reputation Management, Google Services.
- **Service cards ("We build brands"):** `#03000B` card, **2px accent outline, ~8-10px radius**, line icon in accent at top-left, white 600 title beside it, muted body copy, "LEARN MORE →" at the bottom. 3 columns; the last row has 2 wider cards (Google Business Profile Verification, Online Reputation Management). Left of the grid: a short paragraph, right: four small check-style benefit lines ("On-time delivery, every time", "Dedicated project manager", "Free revisions included", "24/7 support available").
- **"Built on trust" cards:** 3 cards with a line icon, a large faint numeral (01. / 02. / 03.) in the top-right, title, paragraph; thin accent outline.
- **Tools strip:** horizontal carousel with prev/next chevrons; tech logos (JS, Python, CSS3, HTML5, Figma, etc.) in their native colors on black.
- **Who we are:** left an image collage (rounded) with a big "6+ Years Experience" counter; right: eyebrow, H2, paragraph, outlined "START A PROJECT?" button, and a check list.
- **Trusted-by row:** "Trusted Over 100+ Companies in the World", grayscale client logos in a carousel with chevrons.
- **Portfolio:** staggered 2-column grid of rounded flat-illustration thumbnails (light backgrounds) on the dark band; one cell holds "View Our Portfolio" with an outlined "VIEW MORE" button.
- **Reviews:** 2 cards, `#121212`-ish, 5 yellow stars, quote, circular avatar + name + role.
- **FAQ:** numbered accordion rows ("1. How Can Your Development Services Help Scale My Business? +") plus a 2x2 stat block (99% / 1000+ / 6years / 500+).
- **Footer:** black; brand logo + blurb on the left, "Our Expertise" uppercase link list in the middle, "Get in Touch With Us" contact list (icon + text) on the right, centered copyright line at the bottom.
- Overall density is **generous**: large vertical section padding (roughly 96-128px desktop), content width ~1100-1200px centered.

**How to apply this to seo.israinsols.com:** keep the exact same dark system (black / #121212 / navy bands, #1FA9E0 accent, Inter, outlined ghost buttons, accent-outline cards, dotted eyebrow labels, counters, numbered blocks). The SEO site's **hero should reuse the parent's 2-column structure**, with the reference's "Link report" card replacing the 2x4 glass-tile grid, built as a glass-style panel (`#011434` background, hairline border, accent line chart, "Live" chip, dofollow rows). Pricing cards: `#03000B`, accent outline, and the "Popular" card gets a solid accent outline + small accent ribbon. Do **not** carry over the reference site's own look (its light/white sections and its own blue palette); take only its content and layout order.

### Token file requirements
Create `app/globals.css` with a Tailwind v4 `@theme` block (or `tailwind.config.ts` if v3) exposing:
`--color-brand-*` (50–950 scale generated from the extracted primary), `--color-accent`, `--color-ink`, `--color-surface`, `--color-surface-2`, `--color-line`, `--color-muted`, semantic colors, `--radius-*`, `--shadow-*`, `--font-sans`, `--font-display`, `--container`, `--section-y` (fluid with `clamp`). The parent theme is **dark only** (section 2.1). Ship the single dark theme, set `color-scheme: dark`, and don't add a toggle or light mode.
All colors must pass **WCAG AA** contrast (4.5:1 body text, 3:1 large text/UI). If an extracted brand color fails on a given background, derive a compliant shade and document it.

---

## 3. Reference site: offpageseoservices.com (what is known)

**Business:** OffPage SEO Services, a link building agency "since 2016" run by **Abdul Qadir (Founder)**, Hyderabad, Pakistan. Sells manual-outreach guest posts, niche edits, and other link types, with live-URL reports. This site is a **service sub-site of Israin Solutions**, so keep the services, prices, and process, and add a "by Israin Solutions" parent-brand relationship (footer, header strip, About page, JSON-LD `parentOrganization`).

> The copy below is transcribed from the reference screenshot. Small text may contain transcription errors. **Re-verify each string against the live site/screenshot, fix typos, and prefer the live site's exact wording. Do not copy long passages verbatim into the final site; rewrite and expand them in the same meaning and a consistent voice, so we don't ship duplicate content.** Numbers/prices must match the live site until the owner says otherwise.

### 3.1 Global
- **Top nav:** Home · Services (dropdown) · Guest Post Sites · Link Insertion Sites · DA PA Checker · About · Blog · Contact · **[Order links]** (primary button).
- **Footer columns:**
  - Brand blurb: "Guest posts, niche edits and off-page SEO, built by hand since 2016."
  - **Services:** Niche guest posts · General guest posts · Niche edits · Off-page SEO packages · Niche blog comments · PBN links · Wikipedia links · Press releases · SEO content writing
  - **Company:** About · Blog · DA PA checker · Contact · Shop · Privacy policy
  - **Contact:** WhatsApp (+92 321 3060883, verify) · Telegram (verify handle) · contact@offpageseoservices.com (verify; consider moving to an `@israinsols.com` address) · Hyderabad, Pakistan
  - Legal line: © 2016–2026 OffPage SEO Services (update to Israin Solutions attribution as appropriate) · "Run by Abdul Qadir".
- A **floating WhatsApp** button appears bottom-right on the reference.

### 3.2 Home page: section order (keep this order)

1. **Hero**
   - Badge: "Link building agency since 2016"
   - H1: **"Link building services on real websites in your niche."**
   - Body: manual outreach to a list of 2k+ websites; links and brand mentions help rank in Google and get named in AI answers; every order ends with a report of live URLs and site metrics.
   - CTAs: **See services and prices** (primary) · **Ask on WhatsApp** (secondary)
   - Micro-line: "Full refund within 12 to 24 hours before the delivery date."
   - Visual (right): stylized **"Link report" card**: a line chart trending up, a "Live" chip, three rows tagged "Dofollow · Live", and a small floating toast "Link is live: indexed and dofollow" with a shield/check. Also a small rocket icon and a magnifier icon floating. **Build this as real components (SVG + CSS), not an image**, with subtle motion that respects `prefers-reduced-motion`.
2. **Stats strip (overlapping the hero's bottom edge):** `2016` Year we started · `1k+` Orders completed · `1k+` Clients served · `2k+` Websites in our list · `$10` Starting price of a guest post.
3. **"Where we publish": "Sites we place guest posts on."** Sub: "A sample of the 2k+ websites in our list." Logo marquee/grid, e.g. MSN, Business Insider Africa, Markets Insider, The Independent, 1883 Magazine, The Signal, UrbanMatter, Trending US, The Source, Daily Trust, News Ghana, and more. *Use text wordmarks or properly licensed/fair-use logos; confirm with the owner. Do not hotlink.*
4. **"Link building services": "Every backlink building service we offer."** Intro: niche and general guest posts, niche edits, off-page SEO packages, blog comments, PBN and Wikipedia links, press releases, plus SEO content writing for your own site; each one is priced per order and monthly contract is not required.
   - **Tabs** (with counts): `Guest Post & Niche Edit (4)` · `Links (4)` · `Content and PR (3)`. Tab panels are keyboard accessible (ARIA tabs pattern).
   - **Cards (Guest Post & Niche Edit tab):**
     - **Niche Guest Posts**: "A niche guest post on a real site in your niche, with a contextual dofollow link." From **$100** · Learn more
     - **General Guest Posts**: "A 700+ word article on a DA 20+ multi-topic site, with 2 dofollow links in every post." From **$10** · Learn more
     - **Niche Edits**: "Your link added to an existing, indexed article on a site in your niche." From **$50** · Learn more
     - **Casino and iGaming Guest Posts**: "Guest posts on sites that accept casino, betting, iGaming and slots content." From **$30** · Learn more
   - *Links* tab → Off-page SEO packages, Niche blog comments, PBN links, Wikipedia links (confirm grouping on live site). *Content and PR* tab → Press releases, SEO content writing, (+1, confirm).
   - **CTA banner:** WhatsApp icon · "Not sure what to order?" · "Send your URL and target keyword. We'll say which links fit, or if your page needs work first." · **Message us** button.
5. **"Backlinks in SEO": "What is link building, and why does it matter?"** Two paragraphs: link building = getting other sites to link to yours; those links (backlinks) are among signals search engines use to decide which pages deserve to rank; Google says it uses links as a signal when determining relevancy of pages (cite **Google Search Central: link best practices**); a link from a relevant site that real people read tells Google the page is worth showing for that topic. Internal links to: guide to off-page SEO, compare guest posts / niche edits / PBN links.
6. **"AI search (AEO and GEO)": "Do backlinks help you show up in ChatGPT and Google AI Overviews?"** Left: explanation that AI tools draw answers from pages they find on the web, and that the pages/brands other sites write about are more likely to be found; Google says AI features use the same ranking systems as regular search (cite Google's AI features guidance); links help the pages rank, but nobody can guarantee an AI tool will cite you. Right: three definition rows, each with a check icon:
   - **AEO: answer engine optimization**: getting your content chosen for featured snippets, People Also Ask, AI Overviews; clear answers on your pages help most.
   - **GEO: generative engine optimization**: getting your brand named in ChatGPT, Perplexity, Gemini and Copilot answers; mentions on trusted sites help, but the work + links + brand mentions all matter.
   - **SGE, AIO and LLMO**: other names for the same idea. SGE was Google's test name for AI Overviews; AIO is short for AI Overviews; LLMO is another name for GEO.
7. **"How it works": "How our link building process works."** 4 columns with a connecting line: **01 Send your URL and keywords** · **02 We find matching sites** · **03 We write and place the link** · **04 Quality check and report.** (Each has 1–2 sentences, see live site.)
8. **"Guest post packages": "Most clients start with a guest post."** "Three packages, one-time payment. All use DA and DR 30+ sites with Ahrefs traffic of 5k+."
   | | **Basic · $100** | **Premium · $200 (Popular)** | **Advanced · $300** |
   |---|---|---|---|
   | Tagline | One link to test us or support a new page. | Two links for a page you're pushing up the rankings. | Three links for competitive keywords. |
   | Links | 1 guest post link | 2 guest post links | 3 guest post links |
   | Site quality | DA and DR 30+ | DA and DR 30+ | DA and DR 30+ |
   | Traffic | Ahrefs traffic 5k+ | Ahrefs traffic 5k+ | Ahrefs traffic 5k+ |
   | Content | 500+ words unique content | 500+ words unique content | 500+ words unique content |
   | Placement | Dofollow placement | Dofollow placement | Dofollow placement |
   | CTA | Order Basic | Order Premium (primary) | Order Advanced |
   Footnote: "Casino, betting or iGaming only? Those posts start at $30. See casino guest posts." Highlight the middle card with a "Popular" ribbon.
9. **"What every order includes": "The same standard on every backlink."** Five rows (check icon + title + line): **Manual outreach** (we contact real site owners; no bots, software or automation) · **Real websites with traffic** (genuine traffic, checked for authority, traffic and spam score) · **Contextual dofollow links** (link sits inside relevant content with natural anchor text) · **Permanent placement** (links placed editorially and stay up) · **A full report** (live URLs and site metrics for every link, sent when the order is done).
10. **"From the blog": "Link building guides, with real prices and examples."** 3 latest posts as cards (cover, date, title, 2-line excerpt). Reference examples: *Anchor Text for Backlinks: Types, Safe Ratios, Examples* · *What Is SEO? How It Works in Google and AI Search (2026)* · *Do Blog Comments Help SEO? What Google Says About Them.* Link: "See all posts →".
11. **Contact + brief form (final section), two columns:**
    - Left card **"Why clients reply"**: avatar/initials "AQ", **Abdul Qadir, Founder, OffPage SEO Services**, a short note ("On-page and off-page SEO for clients since 2016. Send the page you want to rank and we'll tell you which links fit, or if the page needs work first."), WhatsApp number, email, and three reassurance rows: *Reply within 24 hours on business days* · *Full refund if we're late* (money back before the delivery date and we're within 12 to 24 hours) · *Every niche except adult* (including crypto and finance).
    - Right card **"Link building brief"**, heading "Three minutes. No account, no call needed.": fields **Full name**, **Email** (+ placeholders), **Your website** (https://yoursite.com), **What do you need?** (select: Choose a service…), **Budget** (select: Select a range), **Your niche** (chips, multi-select, optional): General/business · Technology · Health · Finance · Crypto · Casino/iGaming · Real estate · Travel · Other, **Target page and keywords** (textarea, placeholder: "The page you want to rank, one to five keywords, and any deadline. Sites you already have links from help too."), **Human check** (reference uses a small math question like "4 + 7 = ?"; replace with **Cloudflare Turnstile** or a server-verified challenge, see section 9), **Send my brief** button, footnote "No newsletter, no spam. Your details are used only to reply to this brief."
12. **Footer** (section 3.1).

### 3.3 Inner pages to build (from nav + footer + in-page links)
See section 6. For every page that was not crawlable, build it with the same section grammar as the Home page and mark the content `NEEDS CONTENT` in the content file; the owner will supply or approve the copy. **Never leave lorem ipsum. Never fabricate stats, testimonials, case studies, or client names.**

---

## 4. Tech stack (use exactly this unless you have a documented reason)

- **Next.js (latest stable, App Router)**, **React** latest stable, **TypeScript (strict)**.
- **Tailwind CSS** (v4 preferred) + **CSS variables for tokens**. Optional: `class-variance-authority`, `tailwind-merge`, `clsx`.
- **Headless accessible primitives:** Radix UI (Accordion, Tabs, Dialog, Select, Navigation Menu) or `@base-ui`; style them ourselves. Do **not** ship a stock component-library look.
- **Icons:** `lucide-react` **or** a single consistent custom SVG set. Do not mix libraries.
- **Motion:** CSS first (scroll-driven / transitions). `motion` (Framer Motion) only where it adds real value (counters, tab indicator, marquee). Respect `prefers-reduced-motion`. No scroll-jacking.
- **Content:** typed content modules in `content/` + **MDX** for blog posts (`next-mdx-remote` or `@next/mdx` with `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`, Shiki for code). Blog front-matter validated with **Zod**.
- **Forms:** `react-hook-form` + **Zod** (shared client/server schema), submitted to a **Next.js Route Handler / Server Action**; email via **Resend** (or SMTP via Nodemailer); bot protection **Cloudflare Turnstile**; rate limit (Upstash Ratelimit or in-memory fallback); honeypot field. Also push each lead to a WhatsApp deep link as an optional secondary CTA.
- **Fonts:** `next/font` (self-hosted, `display: swap`, subset, variable). Match the parent's fonts if identifiable; otherwise choose a pairing that fits the extracted brand and document why.
- **Images:** `next/image`, AVIF/WebP, explicit `width`/`height`/`sizes`, `priority` only for the LCP image.
- **SEO tooling:** built-in Metadata API, `app/sitemap.ts`, `app/robots.ts`, `opengraph-image.tsx` / `twitter-image.tsx` per route group, JSON-LD helper component.
- **Analytics:** Vercel Analytics or Plausible/GA4 via `next/script` with `strategy="afterInteractive"`/`lazyOnload`; consent-aware if GA4.
- **Quality tooling:** ESLint (next config), Prettier, `tsc --noEmit`, Playwright (responsive + a11y with `@axe-core/playwright`), Lighthouse CI. Husky + lint-staged optional.
- **Package manager:** pnpm. Node LTS.
- **Hosting target:** Vercel (preferred) or Cloudflare; set up for subdomain `seo.israinsols.com` (document DNS CNAME steps in `README.md`). Env vars in `.env.example`.

### Architecture rules
- Server Components by default; `"use client"` only for interactive leaves (tabs, accordion, form, counters, mobile menu).
- Static generation (SSG/ISR) for every marketing/blog page. No client-side data fetching for content.
- Feature-based folder layout:
  ```
  app/
    (site)/ ... routes
    api/contact/route.ts
    sitemap.ts  robots.ts  manifest.ts  not-found.tsx  error.tsx
  components/ ui/  layout/  sections/  seo/  forms/
  content/ services.ts pricing.ts sites.ts faqs.ts blog/*.mdx
  lib/ seo.ts schema.ts utils.ts validators.ts mail.ts
  public/ brand/ logos/ og/
  docs/ brand-audit.md content-audit.md site-map.md
  ```
- One `siteConfig` (name, url, phone, email, socials, address, parent brand) and one `lib/seo.ts` `buildMetadata()` used by every page. No hard-coded URLs/strings scattered around.

---

## 5. Design direction

**Goal:** it must look like a real agency's hand-designed site: not a template, not a generic AI-generated landing page.

### Do
- Follow the extracted Israin Solutions tokens (colors, type, radii). The SEO site should feel like a **sibling** of israinsols.com: same logo lockup, same accent, same eyebrow/number/counter vocabulary; a product-line identity (e.g., a "SEO" sub-mark next to the Israin logo).
- Use the reference site's **information architecture** and the parent's **visual language**.
- Establish a clear typographic scale (fluid `clamp()`), a consistent 4/8 spacing rhythm, a 12-col grid on desktop, 4-col on mobile.
- Make visuals out of **real content**: the link-report UI card, a live-link status chip, DA/DR metric badges, a publisher-logo strip, a pricing comparison, a process timeline. Use realistic data patterns.
- Give each section a distinct layout (split, grid, timeline, table, stacked card) so the page has rhythm, not 12 identical card rows.
- Subtle, purposeful motion: counter count-up on first view, tab underline slide, marquee for publisher logos, hover affordances. Short (150–250 ms), eased.
- Real focus states, real hover states, real empty/error/loading states on forms.

### Don't (these are what make a site look AI-generated; avoid all of them)
- No default purple→blue gradient hero, no glassmorphism everywhere, no floating blurred blobs, no emoji as icons, no "✨" anything.
- No centered-everything layout with identical rounded cards on every section.
- No generic copy such as "Unlock your potential", "Supercharge your SEO", "Elevate", "Seamless", "Revolutionize", "cutting-edge", "in today's fast-paced digital world".
- No fake testimonials, fake logos of companies that haven't worked with us, fake awards, fake counts. Only use facts from the reference/parent or supplied by the owner.
- No lorem ipsum, no placeholder images from Unsplash. If a visual is missing, build it in SVG/CSS or leave a documented TODO.
- No em-dash-heavy, bullet-triplet-heavy "LLM voice". Write like an experienced SEO practitioner: specific, concrete, numbers where we have them.
- No shadcn default look unstyled; if you use any primitives, restyle fully to the tokens.

### Responsiveness (hard requirement: 320px → 2560px)
- Mobile-first. Test at **320, 360, 375, 390, 414, 480, 600, 768, 820, 1024, 1180, 1280, 1440, 1536, 1920, 2560**.
- **No horizontal scroll at any width** (`overflow-x` must never be needed on `body`). Wide tables (pricing, site lists) scroll inside their own container *or* reflow to stacked cards under 768px.
- Header: logo + hamburger under `lg`; accessible full-screen/drawer menu with focus trap, ESC close, scroll lock, nested "Services" accordion. Desktop uses a mega/dropdown for Services.
- Hero visual stacks under copy on mobile and scales down gracefully; stats strip becomes a 2-col → 1-col grid (5th item spans full width) rather than overflowing.
- Tabs become a horizontally scrollable pill row (with scroll-snap) on narrow screens; cards go 1 → 2 → 4 columns.
- Pricing cards: stacked on mobile (Premium first or visually emphasized), 3-col on desktop.
- Forms: single column on mobile, 2-col on `md+`; inputs ≥16px font to prevent iOS zoom; tap targets ≥44×44px.
- Use `min-h-dvh`, `100dvh` (not `100vh`), `env(safe-area-inset-*)` for fixed bars/WhatsApp button.
- Container: `max-w` ~1200–1320px with fluid side padding `clamp(16px, 4vw, 48px)`; on ≥1920px keep content centered and readable, don't stretch text lines past ~75ch.
- Images and logos never overflow; marquee pauses on hover and under reduced motion.

---

## 6. Routes (final site map; confirm against the live site in Phase 0)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Section order in 3.2 |
| `/services` | Services hub | Grid of all services grouped by the 3 tabs; comparison table |
| `/services/niche-guest-posts` | Niche Guest Posts | From $100 |
| `/services/general-guest-posts` | General Guest Posts | From $10, DA 20+, 700+ words, 2 dofollow links |
| `/services/niche-edits` | Niche Edits | From $50 |
| `/services/casino-igaming-guest-posts` | Casino & iGaming Guest Posts | From $30 |
| `/services/off-page-seo-packages` | Off-page SEO packages | |
| `/services/niche-blog-comments` | Niche blog comments | |
| `/services/pbn-links` | PBN links | Include honest risk framing, no overpromising |
| `/services/wikipedia-links` | Wikipedia links | Include honest policy/risk framing |
| `/services/press-releases` | Press releases | |
| `/services/seo-content-writing` | SEO content writing | |
| `/guest-post-sites` | Guest Post Sites | Searchable, filterable, sortable table/list of publishers (niche, DA, DR, traffic, price). Data from `content/sites.ts` |
| `/link-insertion-sites` | Link Insertion Sites | Same pattern for niche-edit/link-insertion inventory |
| `/da-pa-checker` | DA PA Checker (free tool) | See 7.3 |
| `/about` | About | Story since 2016, founder, parent brand Israin Solutions, method, values, numbers |
| `/blog` | Blog index | Pagination, categories, search; 3 featured |
| `/blog/[slug]` | Blog post | TOC, reading time, author, updated date, related posts, share, JSON-LD `Article` |
| `/blog/category/[category]` | Category archive | |
| `/contact` | Contact | Brief form + direct channels + map-free address block |
| `/order` | Order links | Package selector → brief form (prefill `?package=basic|premium|advanced`) |
| `/shop` | Shop | Footer links to it on the reference. Build a simple product-style listing of packages that deep-links to `/order`. Ask the owner before adding real checkout. |
| `/privacy-policy` | Privacy | |
| `/terms` | Terms & refund policy | Reflect "full refund within 12 to 24 hours before delivery date" accurately |
| `/not-found` | 404 | Helpful: search + top links |
| `/thank-you` | Form success | `noindex` |

Redirects: add `next.config` redirects for legacy reference-site slugs if they differ.

---

## 7. Page and component specs

### 7.1 Required shared components
`Header` (sticky, shrink on scroll, `Order links` CTA) · `MobileNav` · `Footer` · `Breadcrumbs` (+ JSON-LD) · `Hero` variants · `StatStrip` · `PublisherMarquee` · `ServiceCard` · `ServiceTabs` · `PricingCards` · `ComparisonTable` · `ProcessTimeline` · `ChecklistRows` · `DefinitionList` (AEO/GEO) · `BlogCard` · `FAQAccordion` (+ FAQPage JSON-LD where truthful) · `CTABand` · `ContactCard` · `BriefForm` · `FloatingWhatsApp` · `LinkReportCard` (hero visual) · `CounterNumber` · `Prose` (MDX typography) · `Pagination` · `SiteTable` (sortable/filterable, responsive).

### 7.2 Service detail pages (template)
Hero (H1 with the service + keyword, price "From $X", CTA) → What you get → Who it's for / not for → How we do it (steps) → Site quality criteria (DA/DR/traffic/spam score) → Sample report preview → Pricing/packages → FAQ (service-specific, 5–8 Qs) → Related services → CTA band. Each page needs unique, substantive copy (≥600 words), unique meta, unique H1, internal links to 2+ related blog posts.

### 7.3 DA PA Checker
- UI: URL input → results card (DA, PA, spam score, linking root domains, etc.).
- Implement behind a **provider interface** (`lib/metrics/provider.ts`) so the data source can be swapped (Moz API / DataForSEO / own). **Do not scrape.** If no API key is configured, render the tool in a graceful "coming soon / request metrics via WhatsApp" state rather than fake numbers.
- Server-side route handler only (keys never reach the client), validate/normalize URLs, rate limit per IP, cache results (e.g., 24h), handle errors clearly.
- Include explainer content below the tool (what DA/PA are, that they're third-party metrics and not Google ranking factors) + FAQ.

### 7.4 Guest Post Sites / Link Insertion Sites
- Data-driven from `content/sites.ts` (typed). Columns: Site, Niche/category, DA, DR, Monthly traffic, Price, Sponsored label, Link type. Filters: niche, DA range, price range; text search; sort. URL-synced filters (`searchParams`), paginated.
- **Do not invent entries.** Seed with the publisher names listed in 3.2 §3 only with fields the owner can confirm; mark unknown metrics `null` and render "On request". Provide a CSV importer script `scripts/import-sites.ts` so the owner can drop in a real list.

### 7.5 Blog
- MDX posts in `content/blog/`, front-matter: `title, slug, description, date, updated, category, tags, author, cover, coverAlt, faq?`.
- Seed with the 3 reference titles listed in 3.2 §10 **as outlines + original, genuinely useful, accurate drafts**, or mark them `draft: true` until the owner approves. Facts must be accurate and cite primary sources (e.g., Google Search Central for link guidance). Include real example prices only where they match our price list.
- Features: auto TOC, heading anchors, reading time, related posts, category pages, RSS (`/feed.xml`), `Article` + `BreadcrumbList` JSON-LD, OG image per post.

### 7.6 Forms (Brief / Order / Contact)
- Shared Zod schema. Fields as in 3.2 §11. Client + server validation, inline accessible errors (`aria-invalid`, `aria-describedby`), loading state, success page, network-failure fallback (offer WhatsApp/email).
- Spam: Turnstile + honeypot + rate limit + minimal time-to-submit check.
- Email: to owner (full brief) + auto-reply to user (plain, no marketing). Log failures; never expose secrets.
- Privacy: checkbox/notice linking to `/privacy-policy`.

---

## 8. SEO requirements (non-negotiable)

**Metadata (every page):**
- Unique `<title>` (≤60 chars, brand suffix pattern `… | OffPage SEO by Israin Solutions`) and `description` (≤155 chars), canonical URL (`https://seo.israinsols.com/...`), `robots` (index/follow; `noindex` for `/thank-you`, search/filter permutations, and tag pages with thin content).
- **Open Graph:** `og:title, og:description, og:type (website | article), og:url, og:site_name, og:locale=en_US, og:image (1200×630), og:image:alt`; article pages add `article:published_time/modified_time/author/section/tag`.
- **Twitter:** `summary_large_image`, title, description, image, alt.
- Generate OG images dynamically with `opengraph-image.tsx` using brand tokens (title + eyebrow + logo), consistent across pages.
- `viewport`, `themeColor` (from brand), `manifest.webmanifest`, full icon set, `lang="en"`, `hreflang` not needed unless multilingual.
- `metadataBase` set to `https://seo.israinsols.com`.

**Structured data (JSON-LD, validated):**
- Site-wide: `Organization` (OffPage SEO Services, `parentOrganization` → Israin Solutions, logo, sameAs, contactPoint), `WebSite` (+ `SearchAction` only if we build site search), `ProfessionalService`/`LocalBusiness` with Hyderabad, PK address (only verified details).
- Page-level: `BreadcrumbList` everywhere (except Home), `Service` + `Offer` on service pages (real prices only), `FAQPage` where a visible FAQ exists, `Article`/`BlogPosting` on posts, `Person` for the founder on About, `WebApplication` for the DA/PA checker, `ItemList` for site directories.
- Do not add `AggregateRating`/`Review` markup without real, verifiable reviews.

**Technical SEO:**
- `app/sitemap.ts` (all indexable routes incl. blog + services, with `lastModified`), `app/robots.ts` (allow all, reference sitemap, disallow `/api/`, `/thank-you`).
- One `<h1>` per page, logical heading order, semantic landmarks (`header/nav/main/section/article/footer`), descriptive anchor text, `rel` handling for external links (`noopener`; `nofollow`/`sponsored` where appropriate).
- Clean URLs, trailing-slash policy consistent, 301 redirects for known legacy URLs, branded 404.
- Internal linking plan: every service page links to related services + 2 blog posts; every blog post links to the relevant service page; breadcrumbs everywhere.
- Image `alt` text meaningful; decorative images `alt=""`.
- Meta descriptions and titles live in the content layer, not hard-coded in components.
- Add a `docs/seo-checklist.md` listing, for each route, title/description/H1/canonical/schema status.

**Content for E-E-A-T:** visible author/founder info, real contact details, clear refund policy, transparent methodology (how sites are vetted), links to parent brand and Google's own guidance where claims are made. Avoid ranking guarantees; say what we can and cannot promise.

---

## 9. Performance, accessibility, security

**Performance targets (mobile, Lighthouse, production build):** Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100. **LCP < 2.0s, INP < 200ms, CLS < 0.05, TBT < 150ms.**
- Ship minimal JS: server components, dynamic import for below-the-fold interactive pieces (`next/dynamic`), no heavy animation libs on the critical path, tree-shaken icons.
- Preload only the LCP image and critical font; `font-display: swap`; subset fonts; limit to ≤2 families, ≤4 weights.
- Inline critical CSS via Next defaults; avoid layout shift (reserve space for images, marquee, counters, sticky header, cookie bar).
- Cache headers, `Cache-Control` for static assets, enable compression; use ISR (`revalidate`) for blog.
- No third-party script on the critical path; analytics deferred.
- Marquee/animated elements use `transform`/`opacity` only.

**Accessibility (WCAG 2.2 AA):** semantic HTML, skip-to-content link, visible focus ring, keyboard-operable menus/tabs/accordions, correct ARIA only where needed, color contrast, reduced motion, form labels (no placeholder-only labels), error summaries, 44px targets, `lang`, and proper alt text. Run axe in Playwright for every route at 320 and 1440.

**Security:** security headers via `next.config` (`Content-Security-Policy` with nonces where feasible, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`/frame-ancestors, HSTS at the host), input sanitization, CSRF-safe route handlers, secrets only in env vars, dependency audit clean.

**Privacy/legal:** cookie/consent banner only if non-essential tracking is used (prefer cookieless analytics); accurate Privacy and Terms pages.

---

## 8b. Copywriting rules

- Write like a working link builder: concrete, plain English, short sentences, active voice. Mention real numbers (prices, DA/DR floors, word counts, turnaround) when we have them.
- Reuse the reference site's **meaning and structure**, rewrite the wording so it's original, richer, and consistent. Expand thin sections with genuinely useful explanation (what a niche edit is, how we vet sites, what a report contains, anchor text strategy, what we won't do).
- Every service page and blog post must answer a real searcher question and link to a next step.
- Keep Israin Solutions' tone: confident, outcome-focused, no fluff.
- Claims about Google/AI search must be accurate and attributed (link to Google Search Central pages), no guarantees of rankings or AI citations.
- Banned phrases: see "Don't" list in section 5.

---

## 10. Responsive QA checklist (must pass before you declare done)

For each route at each width in section 5:
- [ ] No horizontal scrollbar; no clipped/overflowing text, buttons, chips, tables, images.
- [ ] Header/hamburger/drawer works (touch, keyboard, ESC, focus trap).
- [ ] Hero, stats strip, tabs, card grids, pricing, process timeline, forms, footer all reflow cleanly and stay aligned (equal card heights, baseline-aligned prices/CTAs).
- [ ] Text readable without zoom; line length sane; headings don't orphan single words.
- [ ] Tap targets ≥44px; inputs don't trigger iOS zoom; sticky/fixed elements respect safe areas and don't cover content or the CTA.
- [ ] Marquee, counters, and animations don't cause layout shift and obey reduced motion.
- [ ] Print stylesheet is sane for blog posts (optional).
- [ ] Playwright screenshots saved to `docs/qa/` for 320, 768, 1280, 1920.

---

## 11. Content placeholders policy

- Anything not verified goes in `content/*.ts` with `status: "needs-content"` and a visible dev-only marker (not shown in production build; the build should **fail** `pnpm check:content` if production pages still contain `needs-content`).
- Provide `docs/open-questions.md` listing everything the owner must confirm (see section 13).

---

## 12. Deliverables

1. Complete Next.js project, pnpm workspace-ready, `pnpm dev / build / start / lint / typecheck / test / check:content` scripts working.
2. `README.md` (setup, env vars, content editing guide, deploy to Vercel + DNS for `seo.israinsols.com`, how to add a blog post / site entry / service).
3. `.env.example` (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `TURNSTILE_*`, `METRICS_PROVIDER_*`, analytics IDs).
4. `docs/brand-audit.md`, `docs/content-audit.md`, `docs/site-map.md`, `docs/seo-checklist.md`, `docs/open-questions.md`, `docs/qa/*`.
5. Passing Lighthouse + axe + Playwright responsive reports.
6. Clean git history (conventional commits by phase).

---

## 13. Open questions to log in `docs/open-questions.md` (do not guess; ask the owner)

1. Confirm the measured parent tokens in section 2.1 (accent #1FA9E0, Inter, dark-only) against the parent site's actual CSS.
2. Final contact details for the SEO site: phone/WhatsApp, Telegram, email (reference vs `@israinsols.com`), address.
3. Is the founder "Abdul Qadir" / "Run by Abdul Qadir" credit to stay, and should it mention Israin Solutions?
4. Full services list per tab (the screenshot shows counts 4 / 4 / 3 but only the first tab's cards).
5. Real publisher/site list with DA/DR/traffic/price for `/guest-post-sites` and `/link-insertion-sites`, plus permission to show publisher logos.
6. Metrics provider + API key for the DA/PA checker.
7. Is `/shop` a real store (payments?) or a package list?
8. Approved copy for pages that could not be crawled; blog posts approved for publishing; any real client reviews/case studies/permitted logos.
9. Refund policy exact wording (screenshot: "within 12 to 24 hours before the delivery date").
10. Analytics choice and whether a cookie banner is needed.
11. Redirect map from old reference URLs (if the reference site is being retired or folded in).

---

## 14. Execution plan (phases; commit after each; report briefly at each checkpoint)

1. **Discovery:** section 1. Output audits, token table, route map. **Pause for confirmation of tokens/routes.**
2. **Foundation:** Next.js + TS + Tailwind, tokens, fonts, layout shell (Header, MobileNav, Footer, FloatingWhatsApp), `siteConfig`, SEO helpers, sitemap/robots/manifest, base UI primitives.
3. **Home page:** all 11 sections with real components (including the `LinkReportCard` hero visual, counters, marquee, tabs, pricing, process, AEO/GEO block, blog teasers, brief form).
4. **Services hub + all service pages** from one typed template with unique content.
5. **Directories:** Guest Post Sites, Link Insertion Sites, DA/PA checker (provider-abstracted).
6. **Blog:** MDX pipeline, index, post, category, RSS, seeded posts.
7. **About, Contact, Order, Shop, legal, 404, thank-you.**
8. **Forms + API:** validation, Turnstile, rate limit, Resend, success/failure states.
9. **SEO pass:** metadata, OG images, JSON-LD, internal links, checklist doc.
10. **QA pass:** responsive sweep (section 10), axe, Lighthouse, fix everything, remove dead code.
11. **Handover:** README, env docs, open-questions, deployment notes.

**Definition of done:** every route in section 6 exists and renders real content (or a documented `needs-content` state in dev only), all QA checklists pass, Lighthouse targets met, no console errors/warnings, no horizontal scroll from 320px up, metadata/OG/JSON-LD present and valid on every page, and the site reads as a hand-crafted sibling of israinsols.com, not a template.
