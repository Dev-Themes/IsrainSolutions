# Implementation Tasks: CareerVixa Authentication & Role Management

**Feature**: CareerVixa Authentication & Role Management
**Total Tasks**: 24
**User Stories**: 4

## Dependencies & Execution Order

1.  **Phase 1 & 2** (Setup & Foundational) must be completed sequentially first.
2.  **Phase 3 ([US1])** (Registration & Verification) establishes the core user flow and must be completed next.
3.  **Phase 4 ([US2])** (Login & Dashboard) depends on Phase 3 to create users.
4.  **Phase 5 ([US3])** (Account Management) depends on Phase 4 for authenticated access.
5.  **Phase 6 ([US4])** (Public Browsing) integrates the auth flows into the public site and can be completed alongside Phase 5.
6.  **Phase 7** (Polish) wraps up cross-cutting concerns.

## Phase 1: Setup

- [x] T001 Install Auth.js v5 beta, Resend, React Email, Zod, and Argon2 dependencies in `package.json`
- [x] T002 Generate `AUTH_SECRET` and add to `.env.example` and local `.env`
- [x] T003 Configure `lib/auth.ts` with basic Auth.js setup and Prisma adapter
- [x] T004 Create Next.js API route for NextAuth in `app/api/auth/[...nextauth]/route.ts`

## Phase 2: Foundational

- [x] T005 Define `UserRole` enum in `prisma/schema.prisma`
- [x] T006 Update `User` model with `passwordHash`, `role`, and NextAuth standard fields in `prisma/schema.prisma`
- [x] T007 Add `Account`, `Session`, and `VerificationToken` models to `prisma/schema.prisma`
- [ ] T008 Generate Prisma client and create database migration

## Phase 3: Client Registration & Verification [US1]

**Goal**: A visitor can register for a new client account and verify their email.
**Test Criteria**: New account created with CLIENT role; verification email sent; clicking link verifies email.

- [x] T009 [P] [US1] Create Zod schemas for signup and verification forms in `lib/validations/auth.ts`
- [x] T010 [P] [US1] Create React Email template for email verification in `components/emails/VerifyEmailTemplate.tsx`
- [x] T011 [US1] Implement user registration server action with Argon2 hashing in `app/actions/auth/register.ts`
- [x] T012 [P] [US1] Build signup UI page and form component in `app/(auth)/signup/page.tsx`
- [x] T013 [US1] Create email verification route handler logic in `app/(auth)/verify-email/route.ts`

## Phase 4: Role-Based Login & Dashboard Access [US2]

**Goal**: Users with different roles log in and are routed to their respective secure areas.
**Test Criteria**: Client goes to `/dashboard`, Admin goes to `/admin`, unauthorized access is blocked.

- [x] T014 [P] [US2] Create Zod schema for login form in `lib/validations/auth.ts`
- [x] T015 [US2] Configure Credentials provider with Argon2 verification in `lib/auth.ts`
- [x] T016 [P] [US2] Build login UI page and form component in `app/(auth)/login/page.tsx`
- [x] T017 [P] [US2] Implement Next.js middleware for route protection in `middleware.ts`
- [x] T018 [US2] Create Client Dashboard placeholder page in `app/(protected)/dashboard/page.tsx`
- [x] T019 [US2] Create Admin Dashboard placeholder page in `app/(protected)/admin/page.tsx`

## Phase 5: Account Management & Recovery [US3]

**Goal**: Users can recover passwords and update basic profile info.
**Test Criteria**: Request reset link, set new password, update profile details securely.

- [x] T020 [P] [US3] Create Zod schemas for forgot/reset password forms in `lib/validations/auth.ts`
- [x] T021 [P] [US3] Create React Email template for password reset in `components/emails/ResetPasswordTemplate.tsx`
- [x] T022 [US3] Implement forgot password request action in `app/actions/auth/forgot-password.ts`
- [x] T023 [P] [US3] Build forgot password UI in `app/(auth)/forgot-password/page.tsx`
- [x] T024 [P] [US3] Build reset password UI in `app/(auth)/reset-password/page.tsx`
- [x] T025 [US3] Implement reset password action with Argon2 in `app/actions/auth/reset-password.ts`
- [x] T026 [US3] Build basic account settings UI and action in `app/(protected)/dashboard/settings/page.tsx`

## Phase 6: Seamless Public Browsing [US4]

**Goal**: Public browsing remains unaffected, but CTA integrates properly.
**Test Criteria**: CTA redirects to signup if unauthenticated, to dashboard if authenticated.

- [x] T027 [P] [US4] Update header navigation to show User Menu or Login/Signup links in `components/navigation.tsx`
- [x] T028 [US4] Update `/publish` CTA logic to check auth state and redirect properly in `app/page.tsx`

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T029 Implement rate limiting on authentication routes
- [x] T030 Ensure unified error handling and safe error messages across all auth actions
- [x] T031 Write an admin provisioning script (e.g., `scripts/provision-admin.ts`) to securely create the first admin user
