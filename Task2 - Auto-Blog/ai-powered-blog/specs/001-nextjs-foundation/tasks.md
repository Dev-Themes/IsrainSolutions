# Implementation Tasks: Next.js Foundation

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js project with App Router, TypeScript, and Tailwind CSS in project root
- [x] T002 Configure ESLint, Prettier, and strict TypeScript checks in `tsconfig.json` and `.eslintrc.json`
- [x] T003 Initialize shadcn/ui and configure standard components path in `components.json`
- [x] T004 Create project directory structure (`src/app`, `src/components`, `src/features`, `src/actions`, `src/db`, `src/lib`, `src/services`, `src/types`, `src/config`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**🚨 CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Setup Drizzle ORM configuration and database connection in `src/db/index.ts`
- [x] T006 Create base Better Auth schema (`users`, `sessions`, `accounts`, `verifications`) in `src/db/schema.ts`
- [x] T007 Initialize Better Auth instance in `src/services/auth.ts` and set up Next.js API route handler in `src/app/api/auth/[...all]/route.ts`
- [x] T008 [P] Initialize Vercel AI SDK foundation (OpenAI integration) in `src/services/ai.ts`
- [x] T009 [P] Initialize Inngest client in `src/services/inngest/client.ts` and API route handler in `src/app/api/inngest/route.ts`
- [x] T010 [P] Initialize Resend client for React Email foundation in `src/services/email.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Environment Validation & Startup (Priority: P1) 🚀 MVP

**Goal**: Developers configure required services via environment variables and run the application successfully without runtime errors.

**Independent Test**: Remove a required `.env.local` variable and verify the application fails to start with a clear validation error.

### Implementation for User Story 1

- [x] T011 [US1] Create Zod environment schema and validation in `src/config/env.ts`
- [x] T012 [US1] Integrate `src/config/env.ts` validation into Next.js config or a root layout file to ensure it runs at build/start time
- [x] T013 [US1] Provide a `.env.example` file at the repository root outlining all required keys

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Application fails to start if environment is misconfigured.

---

## Phase 4: User Story 2 - Global Responsive Container (Priority: P2)

**Goal**: Establish a foundational responsive layout with a defined `max-width` where all content remains constrained and correctly aligned from 320px to 1440px+.

**Independent Test**: Resize the browser from 320px to 1440px and verify content stays within a central container without horizontal scrolling or clipping.

### Implementation for User Story 2

- [x] T014 [P] [US2] Create responsive global `Container` component in `src/components/layout/container.tsx`
- [x] T015 [P] [US2] Create base `Header` and `Footer` components in `src/components/layout/header.tsx` and `src/components/layout/footer.tsx`
- [x] T016 [US2] Update `src/app/layout.tsx` to wrap children in the `Container` and include `Header`/`Footer`
- [x] T017 [US2] Create a basic `src/app/page.tsx` utilizing the layout container for visual validation

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Layout constraints are active globally.

---

## Phase 5: User Story 3 - Global Error & Loading States (Priority: P3)

**Goal**: Ensure visitors experience consistent loading and error states during data fetches and navigation failures.

**Independent Test**: Navigate to an undefined route and verify the `not-found` page appears. Throw an error in a Server Component and verify the `error` page catches it.

### Implementation for User Story 3

- [x] T018 [P] [US3] Create global loading UI component in `src/app/loading.tsx`
- [x] T019 [P] [US3] Create global error boundary component in `src/app/error.tsx`
- [x] T020 [P] [US3] Create global not-found component in `src/app/not-found.tsx`

**Checkpoint**: All user stories should now be independently functional. The Next.js App Router utilizes the global loading and error boundaries.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T021 Code cleanup and standard formatting pass across all files
- [x] T022 Verification of successful production build (`pnpm build`)
- [x] T023 Run quickstart.md validation locally

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (US1 ➔ US2 ➔ US3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2)

### Parallel Opportunities

- All AI, Inngest, and Email service initializations (T008, T009, T010) in Phase 2 can run in parallel.
- All global state files (loading, error, not-found) in Phase 5 can run in parallel.
- Different user stories can be implemented in parallel by different team members once the foundation is set.

---

## Parallel Example: User Story 3

```bash
# Launch global Next.js boundary files concurrently:
Task: "Create global loading UI component in src/app/loading.tsx"
Task: "Create global error boundary component in src/app/error.tsx"
Task: "Create global not-found component in src/app/not-found.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify startup immediately fails with missing environment variables.

### Incremental Delivery
1. Complete Setup + Foundational ➔ Foundation ready
2. Add User Story 1 ➔ Application starts safely (MVP!)
3. Add User Story 2 ➔ Responsive UI container active
4. Add User Story 3 ➔ Loading/Error states active
