# Production FTP export: popart.agency

Static package ready for manual FTP upload. No upload or GitHub push was performed. Only the FTP-specific copy was changed.

Output: `D:\Muhammad Shariq\Internship\Israin Solutions - Ongoing\art-gallery-ftp\out`

## Changes

- `src/content/site.config.json`: production URL changed to `https://popart.agency`; email and all other content preserved.
- `.env.example`: public production origin updated consistently.
- `src/app/not-found.tsx`: explicit metadataBase added for the root 404, which is outside localized layouts. Its markup and behavior are unchanged.
- Deployment documentation and verification reports updated. No layout, animation, route, or enquiry workflow implementation was changed.

The existing shared metadata constructor already supplies metadataBase to localized pages; it now uses the correct production origin. Sitemap, robots, schema, social cards, and compatibility-page canonical URLs use the same configuration.

## Verification

- `npm run build`: passed, including content validation, TypeScript, static export, and postbuild processing.
- Separate `npm run typecheck` and `npm run lint`: passed.
- All 199 exported HTML documents retained their prior titles, descriptions, Open Graph/Twitter text, and localized metadata values. Compared with the saved pre-change baseline.
- 99 active localized pages include canonical, all four localized/default alternate links, Open Graph URL/images, and Twitter images. All 1,315 inspected metadata URLs use `https://popart.agency`.
- No localhost:3000 or old Vercel-domain URL exists in generated HTML or page-data text files.
- All 36 recovered WebP originals fully decode in `public/`; every corresponding file is present in `out/` with an identical SHA-256 hash.
- Terms, Privacy, and Cookies files/directories are absent, as are their sitemap entries. The shared legal flag remains false. Old URL variants return 404 on the static test server.
- Browser regression: 528 checks passed, no runtime errors, no failed local requests, and no failed remote requests. Includes localized navigation, refreshes, package enquiries, language switching, lightboxes, homepage/footer animations, and responsive overflow checks at 320?2560px.
- Local static audit: 147 routes, 145 internal links, 119 assets; zero failures and no unverified remote image references.

## Remaining build warnings

Seven metadataBase warnings remain during Next.js 16.4.2 automatic root social-image resolution, before localized layout metadata is applied. The root opengraph-image convention is collected at a level with no shared root layout. This is a build-time warning; all final generated metadata URLs were verified as production URLs. The root layout and image-route structure were preserved to honor the requested layout/routing constraints. No warnings were suppressed or node_modules files modified.

The existing `hello@popart.example` address remains unchanged pending the client's verified address. Contact interactions pass, but this example address is not a live inbox; real delivery was not tested.

Upload the contents of `out/`, including `.htaccess`, `_next`, and navigation text payloads, to the domain document root. Remove stale legal-page files left by an earlier deployment. The supplied `.htaccess` handles Apache directory indexes, the existing 404 experience, and the extensionless PNG social image. Real FTP-host behavior has not been tested because deployment was not authorized.
