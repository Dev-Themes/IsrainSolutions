# Static FTP deployment

The export is generated in `out/`. Work was confined to this FTP project copy. Nothing was uploaded or deployed.

## Build and preview

```powershell
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run build` runs content validation, Next.js static export, then `scripts/prepare-static-export.mjs`. Preview serves only `out/` at `http://127.0.0.1:4173`; it does not run a Next.js server. Verification: `npm run verify:static` and `node scripts/verify-static-assets.mjs`. Browser results and screenshots are in `docs/static-verification/`.

## FTP upload

Upload the **contents** of `out/` directly into the confirmed remote document root `public_html/`, including `.htaccess`, all `_next` files, and the `__next.*.txt` navigation payloads. Preserve filenames, directory structure, and capitalization. The contents go directly inside `public_html/` (for example, `public_html/en/index.html` and `public_html/_next/`). Do not upload the `out` folder itself or create `out/public_html/`. `public_html` is a hosting directory, not a URL prefix; the production origin remains `https://popart.agency`.

Directory-style URLs such as `/en/work/` resolve to `en/work/index.html`, so direct visits and refreshes need no Next.js runtime. The provided Apache `.htaccess` sets `DirectoryIndex index.html`, `ErrorDocument 404 /404.html`, and the PNG MIME type for the extensionless Open Graph image. On non-Apache hosting, configure the equivalent directory index, MIME type, and custom 404 in the hosting control panel. Do not configure an SPA fallback to index.html: missing/hidden URLs must retain HTTP 404.

Legal pages are restored in all three locales. Upload the complete fresh export, including `en/terms/`, `en/privacy/`, `en/cookies/` and their French and Romanian equivalents.

## Routing and preservation

- `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true` generate ordinary static files while serving existing original images at their original quality. Local fonts, images, video posters, and videos remain in the export.
- Runtime language middleware was removed. Root and known unprefixed pages have generated static redirect documents leading to Romanian; these retain query strings and anchors in JavaScript and provide a noscript fallback.
- All 3 locales are generated. Work and product data enumerate 16 work case studies and 12 product case studies per language using the pre-existing content and case-study components. The previous detail handlers redirected to their listing pages; they now render those preserved case studies.
- Portfolio rewrite aliases are enumerated in the localized catch-all route and lead to the matching product page. Unknown paths use the existing 404 experience.
- The three existing package slugs (`essential`, `studio`, `full-creative`) retain their former destination at the homepage packages section through static redirects. They are compatibility URLs and are noindex. Current 2/3/5-video package CTAs still select the offer on Contact and in its mailto subject.
- Contact uses `useSearchParams` within Suspense. Offer selection survives direct visits, refreshes, navigation, and language changes; invalid or repeated offer parameters are ignored.
- Canonicals and localized alternates use the exported directory URLs. Sitemap includes all active case studies and all nine localized legal pages; aliases remain excluded. Robots and Open Graph generation run at build time.
- The export postprocessor copies Windows-generated nested RSC segment payloads to the dot-separated filenames requested by Next.js 16.4.2 in the browser. No node_modules files were changed.
- Homepage geometry, footer EyeToWordmark, header behavior, hover animations, existing listing layouts, palette, and typography were not redesigned. Legal footer navigation is hidden in all three languages at the client's request. Legal page sources, direct localized URLs and sitemap entries remain available. The footer eye animation is unchanged.

## Restored legal pages

`showLegalPages` is enabled in `src/content/features.config.json`. The preserved legal page components and original placeholder content render in English, French, and Romanian. Footer legal links are currently hidden; all nine localized legal pages still work by direct URL. The export postprocessor no longer prunes or filters legal routes, and the sitemap includes all nine localized pages. Legal pages use their localized URLs directly; no new redirect aliases were added. No server middleware or rewrites are required.

## Remaining limitations before client launch

1. **All 36 legacy case-study photos have now been recovered.** Every expected WebP is present in `public/images/work/` and the final `out/images/work/`. Full decoding and identical source/export hashes were verified. Historical missing-image reports describe the earlier state; the latest production-domain report supersedes them.
2. **Production origin is configured as `https://popart.agency`.** The site configuration and `.env.example` now use that origin. Canonicals, all localized alternates, Open Graph/Twitter images, schema, robots, sitemap, and static redirect canonicals were rebuilt. `NEXT_PUBLIC_SITE_URL` remains an optional override; use the production origin for client builds.
3. **The existing email is `hello@popart.example`.** It is preserved as requested, but that reserved example address is not a live client inbox. Set the approved email in `src/content/site.config.json` and rebuild before real enquiries. Generic social URLs were also preserved.
4. Legacy work case studies contain existing English/French content; Romanian falls back to their existing English descriptions where Romanian copy is absent. Current Romanian homepage/listings/contact copy is retained. No new translations were invented.
5. Static redirects use JavaScript with a noscript refresh/link fallback, rather than HTTP 301 responses. Apache or hosting-panel HTTP redirects may be added separately if desired. Real hosting behavior, HTTPS, compression, and mail-client delivery cannot be verified without deployment.
6. Next.js 16.4.2 still prints seven metadataBase warnings while automatically resolving the root social-image convention before localized metadata. The root 404 now also exports an explicit metadataBase. The latest audit checked 199 HTML files and all generated page-data text files: no localhost or old-domain URL remains, and all 1,315 checked metadata URLs use the production domain. Removing the automatic-discovery warning would require changing the root layout or image-route structure; those structures were preserved as requested.

## Files changed

Modified:
- `next.config.ts`, `package.json`
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/work/[slug]/page.tsx`
- `src/app/[locale]/products/[slug]/page.tsx`
- `src/app/[locale]/packages/[slug]/page.tsx`
- `src/app/[locale]/[...unmatched]/page.tsx`
- `src/app/[locale]/terms/page.tsx`, `privacy/page.tsx`, `cookies/page.tsx`
- `src/app/not-found.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`
- `src/components/layout/Footer.tsx`, `src/components/portfolio/ProjectHero.tsx`
- `src/data/projects.ts`, `src/lib/seo.ts`

Added:
- `src/content/features.config.json`, `src/lib/site-features.ts`
- `src/components/routing/StaticRedirect.tsx`, `src/components/sections/ContactQuery.tsx`
- `scripts/prepare-static-export.mjs`, `scripts/serve-static.mjs`
- `scripts/verify-static-export.mjs`, `scripts/verify-static-assets.mjs`
- This guide and `docs/static-verification/` reports/screenshots

Removed: `src/middleware.ts` (replaced by static routing).

Generated: `out/`, `.next/`, TypeScript build cache, and the failed image-cache download report `.animation-review/work-image-download.json`. No legal content source was deleted.

## Latest production verification

See `docs/static-verification/production-domain-verification.json` and `PRODUCTION-EXPORT.md` for the production build audit. The available export contains all recovered originals; prior image-recovery reports are historical. No FTP upload or GitHub push has been performed.
