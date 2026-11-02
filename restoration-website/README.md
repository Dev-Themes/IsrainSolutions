# Brisbane Restoration homepage

## Run
Node 20+ and pnpm required. Run `pnpm install`, then `pnpm dev`. Production: `pnpm build` and `pnpm start`. Deploy as a Next.js project on Vercel; set NEXT_PUBLIC_SITE_URL to the final HTTPS domain.

## Edit
Business identity, services, suburbs and FAQ content are in `src/config/site.ts`. Some section copy remains in `src/app/page.tsx`. Replace the labelled SVG illustration with client-approved photography and update Next Image dimensions and sizes. Service and area links are planned routes; create their App Router pages before publishing and add them to the sitemap. Privacy and terms pages also need approved content.

## Verification
`pnpm lint`, `pnpm typecheck`, `pnpm build`; with production server running, `pnpm validate:schema` and `pnpm check:meta`. Run Lighthouse desktop and mobile separately. No scores are claimed until measured.

## Current limitations
Installation was blocked by network EACCES; offline cache lacked TypeScript. This source has not been built or browser-tested. It is an incomplete implementation of the full brief: system fonts currently replace next/font; no before/after slider, reveal hook, bundle analyzer or full schema graph; sections are composed in page.tsx rather than individual files. No authentic reviews are supplied or displayed. The illustration is not a project photograph. Configure a real mail provider, distributed rate limiting, and accessible field-level server errors before enabling the quote form. The API returns 503 rather than falsely claiming successful delivery. QUOTE_TO_EMAIL is reserved for this integration.

Business promises, certifications, 60-minute availability, payment arrangements, insurer relationships and service coverage require client confirmation before launch.
