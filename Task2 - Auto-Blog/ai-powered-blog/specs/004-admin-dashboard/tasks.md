---
description: "Task list for Admin Dashboard & CMS feature implementation"
---

# Tasks: Admin Dashboard & CMS

**Input**: Design documents from `/specs/004-admin-dashboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths are included in descriptions.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create feature branch `004-admin-dashboard`
- [x] T002 Update `src/lib/db/schema.ts` to include or extend `articles`, `categories`, `tags`, and `articleTags` tables based on data-model.md.
- [x] T003 Generate and apply Drizzle migrations for the updated schema in `src/lib/db/schema.ts`.
- [x] T004 [P] Create shared Admin layout in `src/app/admin/layout.tsx`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement `requireAdmin()` authorization guard in `src/lib/auth/guards.ts`.
- [x] T006 Add protected route middleware or layout checks for `/admin/*` using Better Auth in `src/app/admin/layout.tsx`.
- [x] T007 [P] Create reusable data table components with pagination in `src/components/admin/data-table.tsx`.
- [x] T008 [P] Create reusable form and confirmation dialog components in `src/components/admin/ui/`.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Central Admin Dashboard (Priority: P1) 🎯 MVP

**Goal**: An admin views platform content, drafts, and publishing activity from a central dashboard.

**Independent Test**: Navigate to `/admin` as an ADMIN user and verify the aggregated overview renders correctly.

### Implementation for User Story 1

- [x] T009 [P] [US1] Create server action to fetch dashboard statistics in `src/actions/admin/dashboard.ts`.
- [x] T010 [US1] Build the dashboard overview UI in `src/app/admin/page.tsx`.
- [x] T011 [US1] Add a recent activity or recent drafts section to `src/app/admin/page.tsx`.
- [x] T012 [US1] Create admin navigation menu with links to Articles, Categories, Tags, and Users in `src/components/admin/navigation.tsx`.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Article CMS (Priority: P1)

**Goal**: An admin creates, edits, saves drafts, previews, and manages career-focused articles.

**Independent Test**: Create a draft, preview it, edit it, publish it, and verify the status transitions and database states.

### Implementation for User Story 2

- [x] T013 [P] [US2] Create Zod schemas for article mutations in `src/lib/validations/admin.ts`.
- [x] T014 [P] [US2] Implement article Server Actions (create, update, delete, publish) in `src/actions/admin/articles.ts`.
- [x] T015 [US2] Build the Articles list view with pagination in `src/app/admin/articles/page.tsx`.
- [x] T016 [US2] Build the Article creation form UI in `src/app/admin/articles/new/page.tsx`.
- [x] T017 [US2] Build the Article edit/publishing form UI in `src/app/admin/articles/[id]/edit/page.tsx`.
- [x] T018 [US2] Implement destructive action confirmation for deleting an article.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Taxonomy Management (Priority: P2)

**Goal**: An admin manages career-focused categories and tags.

**Independent Test**: Create, edit, and safely attempt to delete a category and tag.

### Implementation for User Story 3

- [x] T019 [P] [US3] Create Zod schemas for category and tag mutations in `src/lib/validations/admin.ts`.
- [x] T020 [P] [US3] Implement category and tag Server Actions in `src/actions/admin/taxonomy.ts` (with deletion protection for referenced taxonomy).
- [x] T021 [US3] Build Categories list and management UI in `src/app/admin/categories/page.tsx`.
- [x] T022 [US3] Build Tags list and management UI in `src/app/admin/tags/page.tsx`.

**Checkpoint**: All taxonomy features should now be functional.

---

## Phase 6: User Story 4 - User Management (Priority: P2)

**Goal**: An admin views and manages client accounts.

**Independent Test**: View the users list in the admin panel and verify correct roles and metadata.

### Implementation for User Story 4

- [x] T023 [P] [US4] Implement user fetching Server Action in `src/actions/admin/users.ts`.
- [x] T024 [US4] Build the Users list view in `src/app/admin/users/page.tsx`.
- [x] T025 [US4] Integrate user metadata and article count display into the users list.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T026 [P] Verify responsive design across all admin pages (320px to 1440px+).
- [x] T027 Add global error and not-found boundaries for `/admin/*` routes in `src/app/admin/error.tsx` and `src/app/admin/not-found.tsx`.
- [x] T028 Add loading state UI (skeletons) for dashboard, articles list, and taxonomy pages in `src/app/admin/loading.tsx` and respective directories.
- [x] T029 Run quickstart.md validation to ensure end-to-end functionality.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2)
- **User Story 3 (P2)**: Can start after Foundational (Phase 2)
- **User Story 4 (P2)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 2

```bash
# Launch server actions and validations for US2 together:
Task: "T013 [P] [US2] Create Zod schemas for article mutations in src/lib/validations/admin.ts"
Task: "T014 [P] [US2] Implement article Server Actions in src/actions/admin/articles.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Dashboard)
4. Complete Phase 4: User Story 2 (Article CMS)
5. **STOP and VALIDATE**: Test Dashboard and Article publishing flow independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy/Demo
3. Add US2 → Test independently → Deploy/Demo
4. Add US3 & US4 → Test independently → Deploy/Demo
