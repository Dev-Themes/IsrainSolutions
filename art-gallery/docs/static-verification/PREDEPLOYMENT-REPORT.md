# Final predeployment report

## Image recovery

- 36 exact legacy originals identified from `src/data/projects.ts` and `src/data/work-image-manifest.json`.
- Restored: **0**. Unresolved: **36**.
- Checked 187 raster files inside this FTP copy; no matching cached originals were present. No unrelated image or screenshot was substituted.
- Retried all 36 exact Unsplash URLs. Every request failed with local network-denial cause `EACCES`; no HTTP status was received. This is not proof that the remote URLs are invalid. The original URLs remain unchanged.
- Affected: all 16 legacy work case studies in English, French, and Romanian, totaling 48 localized pages. [Exact page and asset mapping](MISSING-IMAGES.md), with full rendered usages and source lines in [JSON](missing-images.json).

## Placeholder email

The address is unchanged. Literal source locations: `src/content/site.config.json:10`; `src/content/pages/contact.config.json:27,58,89`; `src/content/pages/interface.config.json:62?65`. Tests also contain it at `scripts/verify-service-contact.mjs:48,53`, and deployment documentation at `docs/FTP-DEPLOYMENT.md:46`.

ContactSection consumes the configured address for display, mailto links, enquiry subjects, and copying on homepages, Work listings, Products listings, and Contact pages in all languages. The preserved LegalPage component also consumes it if later enabled. [Full email audit and consumer locations](PLACEHOLDER-EMAIL.md); [generated-file occurrences](placeholder-email.json).

## Final rebuilt export

- Production static build: **passed**. Output: `D:\Muhammad Shariq\Internship\Israin Solutions - Ongoing\art-gallery-ftp\out`.
- TypeScript: **passed** (`npm run typecheck`).
- ESLint: **passed with no errors or warnings** on the final full run (`npm run lint`).
- Browser regression: **528 local checks passed**, including localized routes, navigation, package enquiries, language switching, refreshes, lightboxes, homepage geometry, footer eye reveal, and no horizontal overflow at 320?2560px.
- Local asset audit: 147 localized routes, 130 internal links, 83 referenced local assets passed.
- Export completeness: **all 113 existing public files** copied; **all 86 raster images fully decoded**, with identical source/export SHA-256 hashes. No missing export copies, mismatches, or invalid local images.
- Additional Contact check: English/French/Romanian display and mailto address, all four topics with selected offer, clipboard success, and clipboard error feedback passed. Real email delivery was not tested; the placeholder remains configured.
- Legal routes: absent from export and sitemap; old URL variants returned HTTP 404 in browser verification.
- **Complete image validation has not passed:** the 36 missing originals are not contained in `out/`. The eight remote requests encountered by the browser suite were reported separately, not counted as successful asset checks. All 36 remote retrieval attempts failed in the dedicated recovery audit.

Only the audit script, reports, logs, screenshots, and build artifacts were added/updated during this follow-up. No application design, animation, layout, email configuration, or legal feature flag was changed. The original project was not accessed or modified. Nothing was pushed or uploaded.
