# Plan — Spec 004: CareerVixa Admin Dashboard & Blog Management

## Approach

Extend CareerVixa's existing Next.js application with a secure, database-driven admin CMS.

Reuse the Phase 1 Prisma foundation, Phase 2 public blog components, and Phase 3 Auth.js authentication and RBAC.

Prioritize modular architecture, reliable CRUD operations, professional admin UX, server-side security, and seamless public blog integration.

Inspect the existing repository, specifications, constitution, installed package versions, and database schema before implementation.

## Key Decisions

- **Framework:** Existing Next.js App Router and TypeScript.
- **Admin UI:** Tailwind CSS v4 and shadcn/ui.
- **Database:** Neon PostgreSQL through Prisma ORM.
- **Authentication:** Existing Auth.js and ADMIN role authorization.
- **Editor:** Tiptap with HTML sanitization and reusable editing components.
- **Validation:** Zod for form inputs and server operations.
- **Mutations:** Next.js Server Actions where appropriate.
- **Data Access:** Server-side Prisma queries and reusable service functions.
- **Media Storage:** Vercel Blob or existing configured provider.
- **SEO:** Reuse Phase 2 metadata and public article infrastructure.
- **Cache:** Use appropriate Next.js cache invalidation after content changes.
- **Concurrency:** Optimistic concurrency checks using article versions or timestamps.
- **Deletion:** Prefer soft deletion or archiving where appropriate to preserve relationships and historical data.

## Dashboard Structure

- `/admin` — Overview and content statistics.
- `/admin/articles` — Article management.
- `/admin/articles/new` — Create article.
- `/admin/articles/[id]/edit` — Edit article.
- `/admin/categories` — Manage categories.
- `/admin/tags` — Manage tags.
- `/admin/media` — Manage uploaded media, if supported by the existing storage architecture.

Maintain existing admin account settings from Phase 3.

## Article Management Flow

1. Admin opens the article management section.
2. Admin creates an article with title, body, category, tags, and metadata.
3. Article is saved as Draft.
4. Admin previews and edits the article.
5. System validates required publishing fields.
6. Admin publishes the article.
7. Public blog pages, category listings, search, and sitemap reflect the published article.
8. Admin may edit, unpublish, archive, or delete the article later.

## Database Requirements

Reuse the existing Prisma schema and extend only when necessary.

Ensure support for:

- Article author ownership and content origin.
- Article body HTML and optional structured editor content.
- Unique slugs and article summaries.
- Publication status and publication timestamps.
- Category and tag relationships.
- Featured images and SEO metadata.
- Archive or soft-delete behavior.
- Optimistic concurrency/version checks.

Use safe, version-controlled migrations without resetting existing data.

## Security & Content Integrity

- Require ADMIN authorization for every operation.
- Never rely solely on hidden UI controls for security.
- Validate forms with Zod on the server.
- Sanitize article HTML and restrict unsafe URLs.
- Validate image MIME type, file size, and upload permissions.
- Prevent unauthorized access to draft previews.
- Protect against XSS, CSRF, mass assignment, and destructive operations.
- Preserve content and relationships during failed mutations.
- Never allow admin CRUD to bypass future client approval requirements.

## Component Architecture

Build reusable components for:

- AdminSidebar and AdminHeader.
- DashboardStatCard.
- ArticleTable and ArticleFilters.
- ArticleForm.
- TiptapEditor.
- SEOFields.
- CategorySelector and TagSelector.
- MediaUploader.
- ArticlePreview.
- ConfirmationDialog.
- EmptyState and LoadingState.

Use Server Components by default and Client Components only for interactive functionality.

## Suggested Touch Points

- `src/app/admin/` — Admin dashboard routes.
- `src/components/admin/` — Admin interface components.
- `src/components/editor/` — Rich-text editor.
- `src/lib/articles/` — Article queries and mutations.
- `src/lib/categories/` — Category management.
- `src/lib/tags/` — Tag management.
- `src/lib/storage/` — Media upload utilities.
- `src/lib/validations/` — Zod schemas.
- `src/lib/auth/` — Existing authorization helpers.
- `prisma/schema.prisma` — Minimal required schema updates.

Adjust these paths to the existing repository organization.

## Verification

- Test article CRUD and lifecycle transitions.
- Verify ADMIN-only authorization across every operation.
- Test category/tag CRUD and relational constraints.
- Test safe HTML rendering and media validation.
- Verify draft previews remain private.
- Confirm published content appears on CareerVixa.
- Verify unpublishing removes content from public results.
- Test slug collisions, concurrent edits, and failed mutations.
- Test responsive admin layouts and accessibility.
- Run TypeScript, linting, tests, and production build.

Do not implement AI automation, client submissions, approval workflows, emails, or advanced analytics.
