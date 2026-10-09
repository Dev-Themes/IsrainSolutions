# About Page Migration Plan

- **Route Rename**: Renamed `app/about-us` to `app/about` to keep URLs short and match the reference. Added permanent redirect in `next.config.mjs` (wait, since we rely on `next start`, we added it to `next.config.mjs`).
- **Links**: Updated `Header.tsx`, `Footer.tsx`, and `sitemap.ts` to point to `/about`.
- **Components**: 
  - Extracted shared styling primitives into new components where necessary (`Tag.tsx`, `SectionHeader.tsx`, `Stat.tsx`, `Breadcrumbs.tsx`).
  - Added new sections in `src/components/sections/about/`.
  - Used `TimelineProgress.tsx` as a tiny client-side intersection observer island.
- **Content**: Copied structural intent of the reference but injected original JM Comfort Solutions text and logo colors. Extracted content into `src/content/about.ts`.
- **SEO**: Created `src/lib/seo.ts` and `src/lib/schema.ts` with `JsonLd` to implement proper structured data and meta tags.
