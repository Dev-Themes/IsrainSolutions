# AC Repair Migration Plan

## 1. Configuration Changes
- `src/config/site.ts`: Add `features` (claim flags) and `license` fields.
- `src/config/serviceAreas.ts`: Update `ServiceArea` interface with `town`, `st`, `stateName`, `status`, `localFaq`, `recentWork`, `nearby`, `placeholder` fields. Add some sample/placeholder data to test against.
- `src/config/services.ts`: Create new registry with `ac-repair` enabled, and `heating-repair` and `refrigeration-repair` disabled.

## 2. Route Changes
- Remove `src/app/ac-repair-[slug]` as it's invalid Next.js routing.
- Create `src/app/[localSlug]/page.tsx` for town pages.
- Update `src/app/ac-repair/page.tsx` as the Hub page.
- Create `src/app/[localSlug]/opengraph-image.tsx` for dynamic OG image.

## 3. Libraries and Utilities
- Create `src/lib/local.ts`: Functions `parseLocalSlug`, `allLocalSlugs`, `isIndexable`, `getAreaCtx`.
- Create `src/lib/schema.ts`: structured data for `HVACBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `WebPage`.
- Create `src/lib/seo.ts`: Metadata building utility `buildLocalMetadata`.

## 4. Content Module
- Create `src/content/localServices/ac.ts`: all AC repair copy as typed functions of ctx.

## 5. UI Components
- Create components in `src/components/sections/local/`:
  - `LocalHero.tsx`
  - `DiagnosticsSplit.tsx`
  - `IssueCards.tsx`
  - `SecondOpinion.tsx`
  - `LocalProof.tsx`
  - `WhyChoose.tsx`
  - `FaqCard.tsx`
  - `LocalCta.tsx`
  - `NearbyAreas.tsx`

## 6. QA and Tests
- Verify dark-mode only luminance check, claims flags correctly removing text.
- Create tests in `tests/local-page.spec.ts`.
- Run uniqueness report script.
- Verify production build.
