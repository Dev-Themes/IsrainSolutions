# Sub-services Migration Plan

## Current State
- Parent `/services` page exists and renders a high-level overview.
- `/ac-repair` exists as a standalone landing page.
- Header dropdown and Footer currently lack the deep links to specific service categories (residential, commercial, refrigeration, maintenance).
- `site.ts` did not exist; dummy data was hardcoded in multiple components.

## Migration Actions
1. **Create `site.ts`**: Centralize dummy data (`isDummy: true`) to comply with the "No Placeholders" rule.
2. **Create `src/content/service-pages.ts`**: Extract all specific copy, bullet points, FAQs, and SEO data for the 4 new sub-services into a typed data file.
3. **Build `app/services/[slug]/page.tsx`**: Implement a single dynamic template that generates static pages for the 4 slugs.
4. **Build Section Components**:
   - `ServiceDetailHero`
   - `ServiceOfferGrid`
   - `WhySection`
   - `CheckList`
   - `FaqSection`
   - `RelatedServices`
5. **Update Shared Components**:
   - Header `ServicesMenu` dropdown to link to the 4 sub-pages.
   - `/services` page "Learn More" buttons to point to the sub-pages instead of anchors.
   - Footer column "Services" to list all 4 sub-pages.
   - `sitemap.ts` to include the 4 new URLs.
6. **Imagery**: Select and assign 8 unique Unsplash/Pexels images (2 per page) and add them to `images.ts` and `docs/image-manifest.json`.
7. **Testing**: Add Playwright test `service-detail.spec.ts` and run Lighthouse CI.
