# Services Migration Plan

- **Route checks**: The existing `/services/residential`, `/services/commercial`, `/services/maintenance` sub-directories will be removed.
- **Redirection**: Added redirects in `next.config.mjs` to send old sub-directory routes to `/services#<anchor>`.
- **Components to reuse**: `Section`, `Button`, `Tag`, `Stat`, `Breadcrumbs`, `JsonLd`, Header, Footer, `ReviewsCarousel`, `CtaBand`, `ServiceAreasSection`.
- **New components**: `ServicesHero`, `ServiceIndex`, `ServiceBlock`, `ServiceMedia`, `ServiceItemList`, `EmergencyCard`.
- **Data**: New typed data added to `src/content/services.ts`.
- **Header**: Updated existing Services dropdown and mobile menu to use `#hash` anchor links instead of sub-routes.
