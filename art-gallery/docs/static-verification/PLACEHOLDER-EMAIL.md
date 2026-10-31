# Placeholder contact email audit

`hello@popart.example` is unchanged. No replacement address was invented.

## Source and documentation literals

- `src/content/site.config.json`: lines 10; 1 literal occurrence(s).
- `src/content/pages/contact.config.json`: lines 27, 58, 89; 3 literal occurrence(s).
- `src/content/pages/interface.config.json`: lines 62, 63, 64, 65; 4 literal occurrence(s).
- `scripts/verify-service-contact.mjs`: lines 48, 53; 2 literal occurrence(s).
- `docs/FTP-DEPLOYMENT.md`: lines 46; 1 literal occurrence(s).

## Public behavior and consumers

- `src/content/site.config.json:10` is the runtime source of the contact email.
- `src/components/sections/ContactSection.tsx:23`: package/topic enquiry mailto subject; `:33`: visible address and direct mailto; `:35`: copy-email action. This component appears on the localized homepages, Work listings, Products listings, and Contact pages. The address is split by `<wbr>` in the rendered visible text, so generated HTML also contains forms that are not a contiguous literal address.
- `src/content/pages/contact.config.json`: preserved translated contact dictionary values for Romanian, French, and English (lines 27, 58, 89).
- `src/content/pages/interface.config.json:62`: preserved confidentiality translation lookup key and Romanian/French/English strings (lines 62?65). These are not a second verified email address.
- `src/components/layout/LegalPage.tsx:28` reads `siteConfig.email` if legal pages are restored; legal pages remain unpublished.
- `src/lib/seo.ts:89` deliberately omits `.example` addresses from organization structured data.
- `scripts/verify-service-contact.mjs:48` and `:53` assert the existing copy-email and enquiry behavior; they do not configure the email.

## Generated copies

The accompanying JSON lists every matching generated file and occurrence count in `out/` and `.next/`. They contain compiled/static copies of the source value and should be regenerated after the client supplies the verified address; do not edit compiled output by hand. The JSON and this report are excluded from their own literal counts.

The enquiry and clipboard interactions can be verified locally, but delivery to a real client inbox cannot pass while this reserved example address remains configured.
