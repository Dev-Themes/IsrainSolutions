# Tasks: CareerVixa Public Blog Website

**Input**: Design documents from `/specs/002-public-blog-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure (building on Phase 1 foundation)

- [x] T001 Create `(public)` route group directory in `src/app/(public)`
- [x] T002 [P] Install `lucide-react` for icons if not already present
- [x] T003 [P] Verify/Create `src/lib/prisma.ts` for database connection (reusing Phase 1 setup)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create `src/components/shared/Header.tsx` with logo and navigation links
- [x] T005 [P] Create `src/components/shared/Footer.tsx` with secondary links and copyright
- [x] T006 Implement `src/app/(public)/layout.tsx` incorporating the Header and Footer
- [x] T007 [P] Create `src/lib/utils.ts` and initialize shadcn/ui components (`button`, `input`) in `src/components/ui/` if missing

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Content Discovery & Navigation (Priority: P1) 🎯 MVP

**Goal**: A visitor lands on CareerVixa and explores featured, trending, and recent career-related articles, alongside discovering the guest-publishing CTA.

**Independent Test**: Load `http://localhost:3000/`. The homepage must render featured/latest articles from the database and display a prominent guest-publishing CTA.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create data access queries `getFeaturedArticles` and `getLatestArticles` in `src/lib/queries/articles.ts`
- [x] T009 [P] [US1] Create `src/components/shared/ArticleCard.tsx` for displaying article previews
- [x] T010 [US1] Implement `src/app/(public)/page.tsx` for Homepage with Hero, Featured, and Latest sections (depends on T008, T009)
- [x] T011 [US1] Add "Want to Publish Your Article on CareerVixa?" CTA section to `src/app/(public)/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Article Consumption & SEO (Priority: P1)

**Goal**: A reader opens an article and sees well-formatted content, author information, publication date, and related articles, while search engines index the page.

**Independent Test**: Navigate to `/blog/[slug]`. The page must display content safely, exclude unpublished articles, and include all necessary metadata.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create data access queries `getArticleBySlug`, `getRelatedArticles`, `getAllPublishedSlugs` in `src/lib/queries/articles.ts`
- [x] T013 [US2] Implement `src/app/(public)/blog/[slug]/page.tsx` to display article details safely using `dangerouslySetInnerHTML`
- [x] T014 [US2] Implement dynamic Next.js Metadata and JSON-LD structured data in `src/app/(public)/blog/[slug]/page.tsx`
- [x] T015 [P] [US2] Create `src/app/sitemap.ts` generating URLs dynamically from `getAllPublishedSlugs`
- [x] T016 [P] [US2] Create `src/app/robots.txt`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Search & Filtering (Priority: P2)

**Goal**: A reader explores articles by selecting specific categories, clicking tags, or using the search functionality to find relevant content.

**Independent Test**: Execute a search query or click a category/tag link, ensuring paginated lists of matching published articles are returned.

### Implementation for User Story 3

- [x] T017 [P] [US3] Create data access queries `searchArticles`, `getArticlesByCategory`, `getArticlesByTag` in `src/lib/queries/articles.ts`
- [x] T018 [US3] Implement `src/app/(public)/search/page.tsx` for search results, reading `?q=` param, and empty states
- [x] T019 [US3] Implement `src/app/(public)/categories/[slug]/page.tsx` for category filtering
- [x] T020 [US3] Implement `src/app/(public)/tags/[slug]/page.tsx` for tag filtering

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Static Informational Pages (Priority: P3)

**Goal**: A visitor accesses the About, Contact, Privacy Policy, and Terms & Conditions pages to learn more about the platform.

**Independent Test**: Navigate to `/about`, `/contact`, `/privacy`, and `/terms` to ensure static content renders correctly.

### Implementation for User Story 4

- [x] T021 [P] [US4] Implement `src/app/(public)/about/page.tsx` with placeholder content
- [x] T022 [P] [US4] Implement `src/app/(public)/contact/page.tsx` with placeholder content
- [x] T023 [P] [US4] Implement `src/app/(public)/privacy/page.tsx` with placeholder content
- [x] T024 [P] [US4] Implement `src/app/(public)/terms/page.tsx` with placeholder content

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T025 [P] Create `src/app/(public)/loading.tsx` to handle route transition states
- [x] T026 [P] Create `src/app/(public)/not-found.tsx` for global 404 pages
- [x] T027 Run validation scenarios in `specs/002-public-blog-website/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can proceed sequentially in priority order (P1 → P1 → P2 → P3) or in parallel.
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2).
- **User Story 2 (P1)**: Can start after Foundational (Phase 2). Relies on UI components from US1 (like ArticleCard) if used in related articles, but primarily independent.
- **User Story 3 (P2)**: Can start after Foundational. Reuses ArticleCard component.
- **User Story 4 (P3)**: Completely independent static pages.

### Parallel Opportunities

- Many data queries (`lib/queries/articles.ts`) can be implemented in parallel.
- Static pages (US4) can be built in parallel immediately after Foundational Phase 2.
- Sitemap and robots.txt (T015, T016) can be built in parallel to page UI.

---

## Implementation Strategy

### MVP First (User Story 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Homepage)
4. Complete Phase 4: User Story 2 (Article Consumption)
5. **STOP and VALIDATE**: Ensure users can view the homepage and click into articles successfully. This forms the core MVP.
