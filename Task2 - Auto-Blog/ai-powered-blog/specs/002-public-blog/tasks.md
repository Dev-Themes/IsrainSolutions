---
description: "Task list for Public Blog & Content feature implementation"
---

# Tasks: Public Blog & Content

**Input**: Design documents from `/specs/002-public-blog/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and data model that MUST be complete before ANY user story can be implemented.

- [x] T001 Update Drizzle schema with Category, Tag, Article, ArticleTag entities in src/db/schema.ts
- [x] T002 Generate and push database migrations using drizzle-kit
- [x] T003 Create seed script with dummy PUBLISHED and DRAFT articles in src/db/seed.ts
- [x] T004 Implement server actions for public content queries (articles, categories, tags) in src/actions/public.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 2: User Story 1 - Homepage (Priority: P1) 🎯 MVP

**Goal**: A visitor lands on the homepage and discovers relevant career content.
**Independent Test**: Navigate to `/` and see featured and recent PUBLISHED articles correctly laid out within the global container.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create Homepage Hero / Featured section component in src/components/shared/HeroSection.tsx
- [x] T006 [US1] Build Recent Articles section and integrate into src/app/page.tsx

**Checkpoint**: User Story 1 (Homepage) should be fully functional and testable independently.

---

## Phase 3: User Story 2 - Blog Listing (Priority: P2)

**Goal**: A visitor browses published articles by category or tag in a paginated list.
**Independent Test**: Navigate to `/blog` and see paginated article cards showing titles, excerpts, authors, and dates.

### Implementation for User Story 2

- [x] T007 [P] [US2] Create Article Card component in src/components/shared/ArticleCard.tsx
- [x] T008 [P] [US2] Create Pagination component in src/components/shared/Pagination.tsx
- [x] T009 [US2] Create Blog Listing page at src/app/blog/page.tsx using public content queries

**Checkpoint**: User Story 2 (Blog Listing) works independently.

---

## Phase 4: User Story 3 - Categories & Tags (Priority: P3)

**Goal**: A visitor can filter content using specific career-focused categories or tags.
**Independent Test**: Navigate to `/category/job-search` and see only articles belonging to that category.

### Implementation for User Story 3

- [x] T010 [P] [US3] Create Taxonomy List component (for rendering tags/categories) in src/components/shared/TaxonomyList.tsx
- [x] T011 [P] [US3] Create Category detail page at src/app/category/[slug]/page.tsx
- [x] T012 [P] [US3] Create Tag detail page at src/app/tag/[slug]/page.tsx

**Checkpoint**: Category and Tag filtering works independently.

---

## Phase 5: User Story 4 - Article Search (Priority: P4)

**Goal**: A visitor searches for career, job and professional-growth content.
**Independent Test**: Search for a keyword and verify only relevant PUBLISHED articles are returned.

### Implementation for User Story 4

- [x] T013 [P] [US4] Create Search Input component in src/components/shared/SearchInput.tsx
- [x] T014 [US4] Create Search Results page at src/app/search/page.tsx integrating with postgres ilike queries

**Checkpoint**: Search functionality works independently.

---

## Phase 6: User Story 5 - Article Detail (Priority: P5)

**Goal**: A visitor opens an article and reads its complete, sanitized content safely.
**Independent Test**: Navigate to `/article/[slug]`, view the content, and confirm malicious HTML tags are stripped. Non-published slugs return 404.

### Implementation for User Story 5

- [x] T015 [P] [US5] Install sanitize-html and its types via pnpm
- [x] T016 [US5] Create Article Detail page at src/app/article/[slug]/page.tsx integrating sanitize-html

**Checkpoint**: Article reading works independently and securely.

---

## Phase 7: User Story 6 - Related Content (Priority: P6)

**Goal**: A visitor discovers related articles after reading an article.
**Independent Test**: View an article and see relevant related articles below it based on tags/categories.

### Implementation for User Story 6

- [x] T017 [P] [US6] Create Related Articles component in src/components/shared/RelatedArticles.tsx
- [x] T018 [US6] Integrate Related Articles component into src/app/article/[slug]/page.tsx

**Checkpoint**: Related articles dynamically load based on content relevance.

---

## Phase 8: User Story 7 - Contributor CTA (Priority: P7)

**Goal**: A visitor sees a clear CTA to publish an article on the platform.
**Independent Test**: View the homepage or blog list and see the "Want to publish?" CTA without needing to log in.

### Implementation for User Story 7

- [x] T019 [P] [US7] Create Contributor CTA component in src/components/shared/ContributorCTA.tsx
- [x] T020 [US7] Integrate Contributor CTA into src/app/page.tsx and src/app/blog/page.tsx

**Checkpoint**: CTA is visible globally on public routes.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect navigation, layout, and comprehensive testing.

- [x] T021 [P] Update Global Navigation Header in src/components/layout/Header.tsx to link to /blog and search
- [x] T022 [P] Update Footer in src/components/layout/Footer.tsx with required links
- [x] T023 Run quickstart.md validation manually to ensure responsive behavior across 320px-1440px and 404 handling

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: BLOCKS all user stories. Must be completed first.
- **User Stories (Phase 2-8)**: All depend on Foundational phase completion. Can proceed sequentially or in parallel.
- **Polish (Phase 9)**: Depends on desired user stories being complete.

### Parallel Opportunities

- Foundational DB tasks must run sequentially (T001 -> T002 -> T003).
- Once Foundational completes, UI components (T005, T007, T008, T010, T013, T017, T019) can be built in parallel.
- Page integrations rely on their respective components.

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Foundational (CRITICAL - blocks all stories)
2. Complete Phase 2: Homepage (US1)
3. Complete Phase 3: Blog Listing (US2)
4. **STOP and VALIDATE**: Verify public articles can be listed and displayed on the homepage.
5. Deploy/demo if ready.

### Incremental Delivery

1. Foundation ready.
2. Add US1 (Homepage) → Test independently.
3. Add US2 (Blog Listing) → Test independently.
4. Add US3 (Categories/Tags) → Test independently.
5. Proceed down the priority list. Each story adds value without breaking previous stories.
