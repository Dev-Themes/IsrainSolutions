# Tasks — Spec 004: CareerVixa Admin Dashboard & Blog Management

## Phase 1: Setup
- [x] T001 Inspect existing CareerVixa code, Prisma schema, authentication helpers, prior specifications, and constitution in `prisma/schema.prisma` and `lib/auth.ts`

## Phase 2: Foundational
- [x] T002 Verify database compatibility and introduce only necessary schema changes with safe migrations in `prisma/schema.prisma`
- [x] T003 Create reusable ADMIN authorization helpers for protected pages, actions, and data operations in `lib/auth.ts`

## Phase 3: Dashboard Layout & Overview [US1]
- [x] T004 [US1] Build the responsive admin layout with sidebar, header, navigation, and account controls in `app/admin/layout.tsx`
- [x] T005 [US1] Implement accurate admin dashboard statistics using Prisma queries in `app/admin/page.tsx`

## Phase 4: Article Management & Editing [US2]
- [x] T006 [P] [US2] Build article management queries with search, sorting, pagination, status filters, and category filtering in `lib/articles/queries.ts`
- [x] T007 [US2] Implement secure article create/read/update/delete operations with Zod validation in `app/actions/articles.ts`
- [x] T008 [P] [US2] Integrate Tiptap rich-text editor with safe HTML handling and reusable form controls in `components/editor/TiptapEditor.tsx`
- [x] T009 [US2] Implement article metadata fields, authorship, slugs, summaries, and associations in `components/admin/ArticleForm.tsx`
- [x] T010 [US2] Implement Draft, Published, Unpublished, and Archived lifecycle transitions with publication validation in `app/actions/articles.ts`
- [x] T011 [US2] Implement SEO fields and integrate them with existing public article metadata generation in `components/admin/SEOFields.tsx`
- [x] T012 [P] [US2] Implement secure cover image uploads and storage validation in `lib/storage/upload.ts`
- [x] T013 [US2] Implement authorized article preview without public draft exposure in `app/admin/articles/[id]/preview/page.tsx`
- [x] T014 [US2] Implement publishing-related cache invalidation for public pages, search, categories, tags, and sitemap in `app/actions/articles.ts`
- [x] T015 [US2] Build responsive article management UI, filters, status indicators, dialogs, loading states, and notifications in `app/admin/articles/page.tsx`
- [x] T016 [US2] Implement safeguards for unsaved changes, slug collisions, concurrent edits, and failed mutations in `components/admin/ArticleForm.tsx`

## Phase 5: Categories & Tags [US3]
- [x] T017 [US3] Implement category and tag CRUD with unique slugs and safe deletion behavior in `app/admin/categories/page.tsx` and `app/admin/tags/page.tsx`

## Phase 6: Polish & Cross-Cutting Concerns
- [x] T018 Write automated tests for CRUD, authorization, lifecycle transitions, validation, HTML sanitization, and relational integrity.
- [x] T019 Test end-to-end admin workflows: create draft → edit → preview → publish → verify public visibility → unpublish.
- [x] T020 Verify category/tag management, media uploads, SEO metadata, responsive layouts, and accessibility.
- [x] T021 Update documentation for admin CMS usage, migrations, media configuration, and publishing rules.
- [x] T022 Run TypeScript checks, linting, tests, and production build; resolve all failures.
- [x] T023 Review all changes against Spec 004, acceptance criteria, and the project constitution.
