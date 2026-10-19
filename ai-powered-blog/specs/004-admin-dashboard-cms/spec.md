# Spec 004 — CareerVixa Admin Dashboard & Blog Management

## Goal

Build a secure, professional admin dashboard and Content Management System (CMS) for CareerVixa, a blogging platform focused on Career, Jobs & Professional Growth.

Enable authenticated administrators to manage articles, categories, tags, media, and SEO through an intuitive interface without modifying source code.

## User Scenarios

- An Admin logs in and views an overview of CareerVixa's content and publishing activity.
- An Admin creates a career-related article using a rich-text editor (Tiptap).
- An Admin saves an unfinished article as a draft and edits it later.
- An Admin publishes an article, making it visible on the public website.
- An Admin updates, unpublishes, archives, or deletes an existing article.
- An Admin manages career categories and article tags.
- An Admin uploads article cover images and configures SEO metadata.
- An Admin searches, filters, and manages existing articles.
- A Client or unauthenticated visitor cannot access administrative features.

## Functional Requirements

FR-1 Build a responsive CareerVixa admin dashboard with sidebar navigation, header, account controls, and overview statistics.

FR-2 Implement complete article CRUD operations, including create, read, update, and delete.

FR-3 Integrate Tiptap rich-text editing with headings, paragraphs, lists, links, images, formatting, and safe HTML output.

FR-4 Support article lifecycle operations: Draft, Published, Unpublished, and Archived, consistent with the existing database schema.

FR-5 Provide article management tables with search, filtering, sorting, pagination, and status indicators.

FR-6 Allow admins to manage article titles, slugs, summaries, content, authorship, featured images, categories, and tags.

FR-7 Implement category and tag CRUD with unique slugs and referential integrity.

FR-8 Provide SEO controls for meta title, meta description, canonical URL, and Open Graph image.

FR-9 Implement secure image uploads using the configured media storage provider, with file validation and optimized display.

FR-10 Display dashboard statistics based on actual database records, including total articles, published articles, drafts, and categories.

FR-11 Provide article preview before publication without exposing private drafts through public routes.

FR-12 Enforce ADMIN-only authorization for every dashboard route, Server Action, Route Handler, and database mutation.

FR-13 Validate all article and category inputs, sanitize HTML, and protect against XSS, unauthorized mutations, and accidental data loss.

FR-14 Ensure published articles immediately become eligible for CareerVixa's existing public pages, search, and SEO indexing through appropriate cache invalidation.

FR-15 Implement clear success/error feedback, loading states, deletion confirmations, and responsive interfaces.

## CareerVixa Content Rules

- Articles must be relevant to Career, Jobs & Professional Growth.
- Support categories such as Career Development, Job Search, Resume Writing, Interviews, Professional Skills, Remote Work, and Freelancing.
- Admins can assign multiple relevant tags to each article.
- Only Published articles are publicly accessible.
- Unpublished, Draft, and Archived articles must remain private.
- Preserve future support for AI-generated articles and client-submitted promotional content.
- Admin-authored articles must be distinguishable from future client submissions.

## Edge Cases & Rules

- Duplicate slugs must be rejected safely.
- Empty or invalid article bodies cannot be published.
- Drafts may contain incomplete content.
- Invalid category/tag references must be rejected.
- Deleting a category must not unintentionally delete its articles.
- Uploaded files must meet permitted type and size restrictions.
- Failed uploads must not create broken article references.
- Unsaved changes must trigger an appropriate warning.
- Concurrent article edits must not silently overwrite newer changes.
- Public pages must never expose private article content.
- Failed publishing operations must not leave inconsistent article states.
- Do not fabricate dashboard analytics or content statistics.

## Success Criteria

1. **Dashboard Load Time**: Admin dashboard overview loads in under 1 second.
2. **Editor Stability**: Tiptap editor correctly saves and renders complex formatted text (lists, headers, inline styles) without data loss.
3. **Image Uploads**: Images under 5MB upload and process within 5 seconds, rejecting unsupported formats.
4. **Data Integrity**: 100% of CRUD operations accurately reflect in the database and respect foreign key constraints (e.g., categories to articles).
5. **Security Enforcement**: 0% access granted to non-admin users attempting to reach `/admin` routes or execute admin server actions.

## Out of Scope

- AI article generation or scheduled automation.
- Client article creation and submission.
- Admin approval/rejection workflow for client submissions.
- Email notifications.
- Detailed visitor analytics.
- Payment and monetization features.
- Additional authentication providers.

## Acceptance Criteria

- [ ] Only authenticated ADMIN users can access CMS features.
- [ ] Admin dashboard displays accurate database statistics.
- [ ] Article CRUD operations work correctly.
- [ ] Rich-text editor supports safe HTML content.
- [ ] Drafts can be saved and edited without publication.
- [ ] Publishing makes valid articles visible on CareerVixa.
- [ ] Unpublishing removes articles from public pages and SEO indexing.
- [ ] Categories and tags can be managed safely.
- [ ] SEO metadata and cover images can be configured.
- [ ] Article preview works without exposing private drafts.
- [ ] Search, filtering, sorting, and pagination work.
- [ ] Input validation, permissions, and error handling are enforced.
- [ ] Existing public blog and authentication functionality remain intact.
- [ ] TypeScript, linting, tests, and production build pass.
