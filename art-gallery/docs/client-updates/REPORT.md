# Client updates ? final FTP export

Completed 2026-10-31T09:13:38.111Z. Only this FTP-specific project copy was edited. No deployment, FTP upload or GitHub push was performed.

## Delivered changes

1. Homepage identity now reads EST. 2026. Only the last digit's traced outline changed. All 19 other artwork objects, colors, animation engine, timing, styles and controls are unchanged. See hero-before.png and hero-after.png.
2. Regenerated 54 video posters/tiles from all 27 original videos using lossless PNG frame capture and WebP quality 94 instead of intermediate JPEG and quality 87/88. Full posters can reach 1920px and tiles 1080px, capped by native source dimensions. Original frame choices and crops remain. Added a cache version to the media URLs.
3. The calculated per-video price is prominent in the former savings-badge position: 249,5 lei / videoclip for the two-video Romanian offer. Savings remain secondary. Prices, quantities, package totals and enquiry destinations are unchanged.
4. Romanian glyphs render in the same typeface without fallback. The bundled fonts lacked several Romanian characters. Offline OFL derivatives now compose the missing letters from the original font's own base letters, breve and comma outlines, preserving Latin glyph outlines and metrics. Original font files and licenses remain intact. Verified glyphs at weights 100, 400, 500, 600, 700, 800 and 900; Chromium confirmed custom-font rendering for Romanian sans, bold and mono samples. See font-rendering.json and romanian-fonts.png.
5. FOLDEAT, RICINUS and MOS start muted in the Work viewer, identified by stable media IDs. Controls remain available and visitors can enable sound. The fourth film's sound setting is unchanged. No source video was re-encoded.
6. Products rebuilt from the supplied index.html reference in Romanian, French and English: hero/phone preview, product-to-film sequence, shared homepage packages, included services, four production steps, five-film reel, FAQs and enquiry section. Desktop reel uses five columns; mobile scrolls horizontally. Preview video respects reduced motion. Existing gallery controls, lightboxes and real contact/package enquiry workflow are reused. Existing product case-study routes and assets remain intact.
7. Legal links are hidden in every localized footer. All nine legal pages, original content, exported routes and sitemap entries remain available by direct URL, as agreed in the approved plan. Footer EyeToWordmark animation code is unchanged.

## Source and asset changes

Existing source files:
- src/app/globals.css
- src/data/work-samples.ts
- src/fonts/README.md
- src/types/work.ts
- src/components/layout/Footer.tsx
- src/components/portfolio/PortfolioLightbox.tsx
- src/components/sections/brand-glyphs.json
- src/components/sections/PackageSection.tsx
- src/app/[locale]/layout.tsx
- src/app/[locale]/products/page.tsx

New source/assets:
- src/components/product-portfolio/ProductServicePage.tsx
- src/components/product-portfolio/ProductServicePage.module.css
- src/components/product-portfolio/ProductServicePreview.tsx
- src/content/pages/product-service.config.json
- src/fonts/Geist-Romanian-Variable.woff2
- src/fonts/GeistMono-Romanian-Variable.woff2
- public/images/product-service/ricinus-{product,detail,final}.webp
- 54 existing public/videos/posters/*.webp files regenerated.

Scripts/documentation:
- scripts/prepare-client-posters.mjs (higher quality, source-aware sizing)
- scripts/prepare-product-service-frames.mjs (real Ricinus frame extraction)
- scripts/prepare-romanian-fonts.py (reproducible offline font derivatives)
- scripts/update-hero-year.py (isolated final digit replacement)
- scripts/verify-client-updates.mjs (new focused browser checks)
- scripts/verify-static-export.mjs (footer visibility expectations updated)
- docs/FTP-DEPLOYMENT.md and this report.
- Generated out/, .next/, TypeScript cache, screenshots and audit logs.

## Verification

- npm run typecheck: passed.
- npm run lint: passed, no warnings. Final verification-script lint also passed.
- npm run build: passed; complete out/ regenerated.
- Focused client browser checks: 91 passed.
- Existing static browser checks: 592 passed.
- Browser errors: 0. Failed local requests: 0. Recorded remote image failures: 0.
- Asset/link audit: 156 localized routes, 146 internal links, 125 referenced assets, zero failures.
- 36 recovered case-study images and 27 source videos remain unchanged.
- All 152 public files exported byte-identically to their current source assets.
- 1387 metadata URLs inspected: all use https://popart.agency.
- 208 exported HTML files; all nine legal pages remain present.
- Products checked in all three languages at 320, 375, 480, 768, 1024, 1440, 1920 and 2560px. Broader suite also verifies homepage, Work, About, Contact, case studies and legal pages across responsive widths.
- Homepage animation/pause/remix, footer eye hover/click reveal, package enquiries, contact mailto subjects, language switching, video/image lightboxes, direct navigation and refresh passed.

## Practical limits

- Most supplied films are 720px wide. Higher-quality extraction reduces compression loss but cannot recover detail absent from those originals; two exports gained pixel dimensions where native resolution allowed it. See poster-dimensions.json.
- The reference's img/ files were not supplied. Product-sequence images use selected frames of the existing Ricinus film; the storyboard layout is an illustrative frame sequence. No unrelated or generated imagery was substituted for recovered case-study assets. The prototype's mock submission handler was replaced by the existing working contact flow.
- The pre-existing Next.js metadataBase warnings still appear during root Open Graph processing. Exported production metadata passed the URL audit. No blocking verification failures remain.
- Live FTP-host behavior is untested because no upload was performed.

## Manual deployment

Upload the CONTENTS of out/ directly into /public_html/, including .htaccess, _next/ and navigation payloads. Do not upload an extra out/ folder or create out/public_html/. Static export, trailingSlash compatibility and the production domain are preserved.

## Review artifacts

- products-desktop.png / products-mobile.png
- romanian-fonts.png / font-rendering.json
- hero-before.png / hero-after.png
- preservation.json / poster-dimensions.json
- browser.log / static-browser.log / build.log / typecheck.log / lint.log / assets.log

Earlier dated reports describe earlier requirements; this report describes the final client update export.
