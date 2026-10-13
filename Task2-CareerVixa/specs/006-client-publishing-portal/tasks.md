# Tasks: CareerVixa Client Dashboard & Guest Publishing Portal

**Input**: Design documents from `specs/006-client-publishing-portal/`  
**Prerequisites**: [plan.md](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/plan.md), [spec.md](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/spec.md), [data-model.md](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/data-model.md), [contracts/client-portal.contract.json](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/contracts/client-portal.contract.json), [quickstart.md](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/quickstart.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Database schema expansion, Prisma client generation, and shared validation schemas.

- [X] T001 Update Prisma schema with ContributorProfile model and extended ArticleStatus enum values in `prisma/schema.prisma`
- [X] T002 Push database schema updates to Neon PostgreSQL and regenerate Prisma Client using `npx prisma db push` and `npx prisma generate`
- [X] T003 [P] Implement Contributor Profile Zod validation schema in `src/lib/validation/contributor-profile.ts`
- [X] T004 [P] Implement Client Article draft and submission Zod validation schemas in `src/lib/validation/client-article.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core authentication guards, authorization checks, Server Actions, and client layout navigation.

**⚠️ CRITICAL**: Must be completed before any User Story tasks can proceed.

- [X] T005 [P] Implement Client authentication and ownership authorization helpers (`requireClientUser`, `verifyArticleOwnership`) in `src/lib/client/auth.ts`
- [X] T006 [P] Implement Contributor Profile Server Actions (`getContributorProfile`, `upsertContributorProfile`) in `src/lib/actions/client-profile.ts`
- [X] T007 [P] Implement Client Article CRUD & lifecycle Server Actions (`saveClientDraft`, `submitArticleForReview`, `deleteClientDraft`) in `src/lib/actions/client-articles.ts`
- [X] T008 [P] Implement Client Navigation Sidebar and Header components in `src/components/client/ClientSidebar.tsx` and `src/components/client/ClientHeader.tsx`
- [X] T009 Implement Protected Client Dashboard layout and route guards in `src/app/dashboard/layout.tsx`

**Checkpoint**: Core data layer, security guards, and layout established. User story phases can now proceed.

---

## Phase 3: User Story 1 - Client Access, Onboarding & Overview (Priority: P1) 🎯 MVP

**Goal**: External guest contributors land on a branded dashboard showing real-time metrics of their private drafts, pending reviews, revisions, and published articles.

**Independent Test**: Sign in with `CLIENT` credentials (`devthemes4@gmail.com`), visit `/dashboard`, verify metric cards display accurate counts from PostgreSQL, and verify `/publish` redirects authenticated clients to `/dashboard`.

- [X] T010 [P] [US1] Create Dashboard Metric summary cards component in `src/components/client/DashboardMetrics.tsx`
- [X] T011 [US1] Implement Client Dashboard Overview page with real-time metrics fetching in `src/app/dashboard/page.tsx`
- [X] T012 [US1] Connect public `/publish` CTA page with client authentication and dashboard redirection in `src/app/(auth)/publish/page.tsx`

**Checkpoint**: User Story 1 is fully functional and independently testable as the core MVP.

---

## Phase 4: User Story 2 - Manual Article Drafting & Contributor Profile (Priority: P1)

**Goal**: Contributors manage their profile details (company, country, bio, website) and craft career articles manually using the Tiptap editor, saving them as private drafts.

**Independent Test**: Complete profile settings in `/dashboard/settings`, create an article draft in `/dashboard/articles/new` with headings and bullet points, save it, and verify reopening it retains all content.

- [X] T013 [P] [US2] Create Contributor Profile management form component in `src/components/client/ContributorProfileForm.tsx`
- [X] T014 [US2] Implement Contributor Settings page in `src/app/dashboard/settings/page.tsx`
- [X] T015 [P] [US2] Create Client Article Form component integrating Tiptap editor and metadata in `src/components/client/ArticleForm.tsx`
- [X] T016 [US2] Implement New Article creation page in `src/app/dashboard/articles/new/page.tsx`
- [X] T017 [US2] Implement Edit Draft page with client ownership verification in `src/app/dashboard/articles/[id]/edit/page.tsx`

**Checkpoint**: Manual article creation, draft editing, and contributor profile persistence are operational.

---

## Phase 5: User Story 3 - Article Submission & Mandatory Review Gate (Priority: P1)

**Goal**: Contributors preview formatted articles and submit drafts with required promotional URLs, rights declarations, and publishing terms. The submission transitions to `PENDING_REVIEW` and is locked from casual editing, with 0% auto-publish.

**Independent Test**: Submit a completed draft with promotional URL and rights declaration, confirm status becomes `Pending Review`, verify the article does NOT appear on public `/articles`, and verify direct editing is locked.

- [X] T018 [P] [US3] Create Article Submission Modal with rights and terms declarations in `src/components/client/SubmissionDialog.tsx`
- [X] T019 [US3] Implement Private Article Preview page with rel="sponsored nofollow" link formatting in `src/app/dashboard/articles/[id]/preview/page.tsx`
- [X] T020 [US3] Wire Submission Modal into Article Form and implement status transition locking in `src/components/client/ArticleForm.tsx`

**Checkpoint**: Submission gate ensures articles enter `PENDING_REVIEW` without publishing automatically.

---

## Phase 6: User Story 4 - AI-Assisted Article Generation (Priority: P2)

**Goal**: Contributors enter a career topic and keywords to generate an AI-researched, structured draft that deposits directly into the editor as a private draft without touching the daily platform cron quota.

**Independent Test**: Request an AI draft in `/dashboard/ai/generate`, verify redirect to editor with `DRAFT` status and verified citations, and confirm `lib/automation/lock.ts` was not touched.

- [X] T021 [P] [US4] Implement Client AI generation Server Action with quota isolation and draft-only status in `src/lib/actions/client-ai.ts`
- [X] T022 [US4] Implement Contributor AI Generator page with topic inputs, keywords, and live progress state in `src/app/dashboard/ai/generate/page.tsx`

**Checkpoint**: Client AI generation creates private drafts reliably and isolates contributor usage from platform automation.

---

## Phase 7: User Story 5 - Contributor Article Management & Revision Workflow (Priority: P2)

**Goal**: Contributors view their full submission portfolio with status badges, search, and category filters, delete unfinished drafts, and inspect editorial feedback to revise and resubmit articles marked `CHANGES_REQUESTED`.

**Independent Test**: In `/dashboard/articles`, search and filter articles, delete an unfinished draft, open a `Changes Requested` article to view feedback notes, update content, and resubmit to `Pending Review`.

- [X] T023 [P] [US5] Create Contributor Article Table component with status badges and action menus in `src/components/client/ArticleTable.tsx`
- [X] T024 [US5] Implement Client Articles listing page with search, category filtering, and status tabs in `src/app/dashboard/articles/page.tsx`
- [X] T025 [US5] Add editorial revision notes banner and resubmit workflow in `src/app/dashboard/articles/[id]/edit/page.tsx`

**Checkpoint**: Complete editorial lifecycle and portfolio management is functional for guest contributors.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: System hardening, security validation, and complete build verification.

- [X] T026 [P] Enhance server-side HTML sanitization and external link attribute enforcement in `src/lib/validation/content.ts`
- [X] T027 [P] Verify role-based navigation links and header menu in `src/components/layout/Header.tsx`
- [X] T028 Run full project compilation check (`npm run build`) and execute quickstart validation scenarios

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1: Setup (T001-T004)
        │
        ▼
Phase 2: Foundational (T005-T009)
        │
        ├──────────────────────┬──────────────────────┐
        ▼                      ▼                      ▼
Phase 3: US1 (T010-T012)   Phase 4: US2 (T013-T017)  Phase 6: US4 (T021-T022)
        │                      │                      │
        │                      ▼                      │
        │                  Phase 5: US3 (T018-T020)   │
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
                           Phase 7: US5 (T023-T025)
                               │
                               ▼
                           Phase 8: Polish (T026-T028)
```

### Parallel Execution Opportunities

- **Phase 1**: T003 (`contributor-profile.ts`) and T004 (`client-article.ts`) can run in parallel.
- **Phase 2**: T005 (`auth.ts`), T006 (`client-profile.ts`), T007 (`client-articles.ts`), and T008 (`ClientSidebar.tsx`, `ClientHeader.tsx`) can run in parallel.
- **Phase 4**: T013 (`ContributorProfileForm.tsx`) and T015 (`ArticleForm.tsx`) can run in parallel.
- **Phase 5**: T018 (`SubmissionDialog.tsx`) and T019 (`preview/page.tsx`) can run in parallel.
- **Phase 8**: T026 (`content.ts`) and T027 (`Header.tsx`) can run in parallel.

---

## Implementation Strategy

### MVP First (Phases 1, 2 & 3)
1. Complete Setup (T001–T004) to expand schema and validation models.
2. Complete Foundational (T005–T009) to provide auth guards, Server Actions, and layout navigation.
3. Complete User Story 1 (T010–T012) to deliver a working onboarding flow and live dashboard metrics.
4. **Validate MVP**: Log in as `devthemes4@gmail.com`, verify `/publish` redirect, verify dashboard overview metrics.

### Incremental Feature Delivery
1. **User Story 2 (T013–T017)**: Add contributor profile editing and manual draft creation via Tiptap.
2. **User Story 3 (T018–T020)**: Implement the mandatory review submission modal, preview page, and editorial gate locking.
3. **User Story 4 (T021–T022)**: Deliver AI draft generation with quota isolation.
4. **User Story 5 (T023–T025)**: Deliver the articles portfolio table, filtering, and revision workflow for `CHANGES_REQUESTED`.
5. **Polish (T026–T028)**: Run HTML sanitization checks, verify public header navigation, and run `npm run build`.
