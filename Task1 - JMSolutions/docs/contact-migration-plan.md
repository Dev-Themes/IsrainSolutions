# Contact Page Migration Plan

## Current State
- The app needs a dedicated `/contact` route that aligns with the newly established design tokens (contour lines, cool-to-warm gradient, no vibe-coded layouts).

## Decisions: Keep, Rewrite, Delete
- **Keep:** 
  - Standard site header and footer.
  - Existing primitives (`Section`, `Button`, `Card`, `Tag`, `SectionHeader`, `Breadcrumbs`, `JsonLd`, `CtaBand`, `ReviewsSection`, `ServiceAreasSection`).
  - Site config dummy data from `site.ts`.
- **Rewrite/Create:**
  - Create `src/app/contact/page.tsx` as a static server component.
  - Create `src/app/contact/actions.ts` for form submission via Server Actions.
  - Create `src/content/contact.ts` to hold typed data, avoiding inline strings and placeholders.
  - Build `ContactHero.tsx`, `RequestSection.tsx`, `ContactForm.tsx`, `RequestTypeToggle.tsx`, `ContactSidebar.tsx`, `ProcessSteps.tsx`, and `ContactFaq.tsx`.
  - Create `src/lib/lead-delivery.ts` for lead submission.
  - Create `src/lib/validation/contact.ts` using `zod`.
  - Update `sitemap.ts` to include the `/contact` route.
- **Delete:**
  - Any old dummy contact pages or client-side-only form submission logic.

## SEO & Accessibility
- Strictly one H1.
- No images (LCP is the H1).
- Add `ContactPage`, `HVACBusiness`, `BreadcrumbList`, and `FAQPage` schemas.
- Ensure all fields have visible labels, `aria-invalid` logic, and `role="alert"` or `role="status"`.
- Adhere to the client JS budget (≤ 10KB gzip).
