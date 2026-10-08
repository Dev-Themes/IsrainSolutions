# Implementation Tasks: Authentication & Authorization

**Feature**: Authentication & Authorization
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Data Model**: [data-model.md](./data-model.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify existing Better Auth installation and environment variables from Spec 001 in `.env.local`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**s,? CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Update `src/db/schema.ts` to add a `role` field (Enum `CLIENT` | `ADMIN` with default `CLIENT`) to the `user` table
- [x] T003 Push database schema changes via Drizzle (`npm run db:push`)
- [x] T004 Create `src/lib/auth/validation.ts` with Zod schemas for login and registration
- [x] T005 Update `src/lib/auth/index.ts` (or `auth.ts`) to configure Better Auth to include the `role` field in sessions and users

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Client Authentication (Priority: P1) [US1] MVP

**Goal**: A client can register, log in, and establish a secure server-side session.

**Independent Test**: Navigate to `/register`, create an account, and verify a secure session cookie is set.

### Implementation for User Story 1

- [x] T006 [US1] Create Client Server Actions for auth (register/login) using Better Auth in `src/actions/auth.ts`
- [x] T007 [P] [US1] Create the Registration Page UI in `src/app/(auth)/register/page.tsx`
- [x] T008 [P] [US1] Create the Login Page UI in `src/app/(auth)/login/page.tsx`
- [x] T009 [US1] Integrate Zod validation and safe error handling into auth forms in `src/components/auth/AuthForms.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Admin Authentication (Priority: P2) [US2]

**Goal**: An admin can access protected administrative areas using secure credentials.

**Independent Test**: Log in with an admin account and access an admin-only path.

### Implementation for User Story 2

- [x] T010 [US2] Create Admin Server Actions for secure admin login in `src/actions/admin-auth.ts`
- [x] T011 [US2] Create Admin Login UI (ensure administrative functionality is isolated) in `src/app/admin/login/page.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - RBAC & Server-Side Authorization (Priority: P3) [US3]

**Goal**: Establish reusable server-side authorization guards that protect routes, enforce roles, and check resource ownership securely.

**Independent Test**: Attempt to access protected admin routes as a `CLIENT` and verify a 403 response.

### Implementation for User Story 3

- [x] T012 [P] [US3] Create authorization utilities in `src/lib/auth/rbac.ts`
- [x] T013 [P] [US3] Implement server-side protected route wrappers or Next.js Middleware in `src/middleware.ts`
- [x] T014 [US3] Apply authorization utilities to a sample protected route in `src/app/admin/page.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T015 Run validation script to ensure no sensitive auth secrets are exposed to the client in `.env.local`
- [x] T016 Test invalid session/expired session edge cases and fix handling in `src/middleware.ts`
- [x] T017 Run TypeScript compiler (`npm run typecheck`) and linter (`npm run lint`) on the root project

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (Client Auth) should be completed first.
  - US2 (Admin Auth) can be done in parallel or sequentially.
  - US3 (RBAC) relies on user/admin authentication being functional.

### Parallel Opportunities

- Foundational tasks (T004, T005) can be developed in parallel after schema push.
- Client Registration UI (T007) and Client Login UI (T008) can be built concurrently.
- RBAC Utilities (T012) and Middleware (T013) can be built in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently by registering and logging in successfully.
5. Deploy/demo if ready.
