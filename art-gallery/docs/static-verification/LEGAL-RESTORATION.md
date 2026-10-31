# Restored legal pages: final FTP export

Verified 2026-10-29T13:33:39.460Z. No upload, deployment, or GitHub push was performed. Work stayed inside the FTP copy.

## Modified files

- src/components/layout/Footer.tsx: restored localized legal links in the original footer column, with existing hover styles and wrapping for long labels on narrow screens. EyeToWordmark unchanged.
- src/content/features.config.json: enabled the preserved legal page handlers.
- src/app/sitemap.ts: includes all nine localized legal pages.
- src/lib/site-features.ts: updated the feature comment.
- scripts/prepare-static-export.mjs: removed legal pruning and route-list exclusion; existing compatibility aliases remain scoped to existing sections, without new legal redirects.
- scripts/verify-static-export.mjs: checks footer navigation, original legal content, direct visits, refreshes, sitemap entries, responsive layouts, and existing workflows.
- scripts/verify-static-assets.mjs: includes legal pages in the asset/link audit.
- docs/FTP-DEPLOYMENT.md: updated legal-page status and confirmed public_html upload instructions.
- README.md: production domain and manual FTP instructions updated during this session.
- Generated: out/, .next/, TypeScript cache, verification logs/reports, and responsive screenshots in docs/static-verification/.

## Restored URLs

- https://popart.agency/en/terms/ -> out/en/terms/index.html
- https://popart.agency/en/privacy/ -> out/en/privacy/index.html
- https://popart.agency/en/cookies/ -> out/en/cookies/index.html
- https://popart.agency/fr/terms/ -> out/fr/terms/index.html
- https://popart.agency/fr/privacy/ -> out/fr/privacy/index.html
- https://popart.agency/fr/cookies/ -> out/fr/cookies/index.html
- https://popart.agency/ro/terms/ -> out/ro/terms/index.html
- https://popart.agency/ro/privacy/ -> out/ro/privacy/index.html
- https://popart.agency/ro/cookies/ -> out/ro/cookies/index.html

All nine exist in out/ and sitemap.xml. Each passed footer click navigation, direct navigation, browser refresh, translated heading, section count, and original paragraph checks. Original legal JSON and LegalPage layout sources remain unchanged.

## Verification

- npm run typecheck: passed.
- npm run lint: passed without warnings after removing an unused import.
- npm run build: passed; out/ regenerated with static export and trailing-slash directory URLs.
- npm run verify:static: 651 checks passed, zero browser errors, failed local requests, or remote image failures.
- Asset audit: 156 localized routes, 154 internal links, 119 assets; zero failures.
- All 149 public files are unchanged and byte-identical in out/, including all 36 recovered case-study images.
- All 1387 inspected canonical, alternate, Open Graph, and Twitter URLs use https://popart.agency.
- Homepage animation controls, footer eye hover/click reveal, package CTAs, contact offers/mailto subjects, language switching, video/image lightboxes, compatibility routes, and responsive widths 320?2560px passed.
- No nested out/public_html directory. No middleware, rewrites, or new runtime redirects introduced.

## Outstanding issues and manual upload

No verification failures remain. The build repeats the pre-existing Next.js metadataBase warnings during root Open Graph processing; exported metadata passed the production URL audit. Placeholder legal wording remains exactly as supplied, as requested.

Upload the contents of out/ directly into /public_html/, including .htaccess, _next/, and navigation text payloads. Live hosting behavior remains untested because no upload was performed. Earlier dated reports describe prior project states; this report and legal-restoration-* logs describe the final restored export.
