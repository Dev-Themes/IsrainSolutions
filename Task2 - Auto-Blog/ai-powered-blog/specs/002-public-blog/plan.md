# plan.md — Public Blog & Content

## Approach

Build the public career, jobs and professional growth experience on top of the Spec 001 foundation.

Reuse the existing shared layout, responsive container, UI primitives, database layer and validation utilities. Use Server Components and server-side queries by default, exposing only published content through public data access.

Keep the implementation focused on public discovery and reading; defer authentication, CMS, AI generation, submissions, analytics and final SEO implementation to later specifications.

## Key Decisions

* Rendering: Server Components by default; Client Components only for required interactions such as search/filter controls.
* Content: public queries return only `PUBLISHED` articles.
* Niche: Career, Jobs & Professional Growth.
* Taxonomy: Career Development, Job Search, Resumes & Interviews, Remote Work, Freelancing, Professional Skills, Certifications & Learning.
* URLs: stable, unique, human-readable article slugs.
* Search: PostgreSQL-based search initially; no external search service.
* Content safety: sanitize article HTML before rendering.
* Related content: use category/tag relevance rather than introducing a recommendation service.
* Responsive layout: reuse the global `max-width` container from Spec 001.
* Data access: keep database queries server-side and isolate them from presentation components.
* SEO: provide the content structure required for future metadata/structured-data implementation without completing Spec 009.

## Touch Points

* new: public homepage
* new: blog listing
* new: article detail pages
* new: category/tag filtering
* new: public article search
* new: related-article component
* new: contributor CTA
* new: public content queries/services
* reuse: `components/layout/*`
* reuse: `components/ui/*`
* reuse: shared responsive container
* reuse: Drizzle database layer
* reuse: Zod validation
* reuse: global loading/error/not-found states

## Data & Schema

* Add only the article/category/tag data structures required by this specification.
* Support article publication state and publication date.
* Support unique article slugs.
* Support category and tag relationships.
* Support author attribution required for public article display.
* Keep future client ownership, submissions, analytics and editorial workflow extensible.
* Do not add unrelated feature schemas.

## Content & Discovery Flow

```text
Homepage
   ↓
Blog Listing
   ↓
Category / Tag
   ↓
Article
   ↓
Related Articles
   ↓
Contributor CTA
```

Search must return only published articles relevant to the visitor's query.

## Validation & Failure Handling

* Invalid slug → not-found.
* Non-published article → never publicly returned.
* Empty article database → intentional empty state.
* No search results → useful empty state.
* No related articles → omit related section.
* Missing optional article metadata → graceful rendering.
* Unsafe article HTML → sanitize before rendering.
* Invalid pagination/filter parameters → normalize or reject safely.
* Database/query failure → use the established application error boundary.
* Long titles, excerpts and article content → remain readable without layout breakage.

## Out of Scope

* Authentication and authorization workflows.
* Client dashboard.
* Admin dashboard/CMS.
* Article creation/editing workflows.
* Client submissions.
* Editorial review and approval.
* AI article generation.
* Automated AI scheduling.
* Article analytics.
* Email notifications.
* Final SEO/security/performance implementation owned by later specifications.

## Implementation Order

1. Establish article/category/tag data structures required for public content.
2. Implement server-side public content queries.
3. Build shared public navigation and page structure.
4. Build homepage content sections.
5. Build paginated blog listing.
6. Build category and tag filtering.
7. Build article search.
8. Build individual article pages with sanitized content.
9. Add related-article discovery.
10. Add contributor CTA.
11. Implement loading, empty, not-found and error states.
12. Verify responsive behavior from 320px through 1440px+.
13. Validate that unpublished content cannot appear in public queries.
14. Run TypeScript, lint, build and manual acceptance checks.
15. Review implementation against the constitution and Spec 002.

## Definition of Done

* Public homepage works with published content.
* Blog listing, categories, tags and search work correctly.
* Article pages render sanitized published content.
* Draft, rejected and unapproved content is never publicly exposed.
* Related articles are relevant and gracefully omitted when unavailable.
* Contributor CTA is accessible.
* Public content uses Server Components where appropriate.
* Responsive behavior is verified across required viewport sizes.
* No horizontal overflow, clipping or layout overlap exists.
* No unnecessary infrastructure or dependencies are introduced.
* Implementation conforms to the constitution and Spec 002.
* Human validation is completed before proceeding to Spec 003.
