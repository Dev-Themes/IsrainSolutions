# Feature Specification: CareerVixa Authentication & Role Management

**Feature Branch**: `[branch-name]`

**Created**: 2026-10-10

**Status**: Draft

**Input**: User description: "/speckit-specify /sp.specify\n\n# Spec 003 — CareerVixa Authentication & Role Management\n..."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Client Registration & Verification (Priority: P1)

A visitor to CareerVixa wishes to publish an article and registers for a new client account.

**Why this priority**: Without registration, the platform cannot onboard external contributors, which is a core business goal.

**Independent Test**: Can be fully tested by creating a new account via the UI, receiving an email verification link, clicking it, and successfully accessing the client dashboard.

**Acceptance Scenarios**:

1. **Given** an unauthenticated visitor on the signup page, **When** they submit valid registration details, **Then** a CLIENT account is created and a verification email is sent.
2. **Given** a user with an unverified account, **When** they click the valid verification link, **Then** their email is verified and they are granted access.
3. **Given** an unverified user attempting to access the dashboard, **When** they navigate to `/dashboard`, **Then** they are prompted to verify their email.

---

### User Story 2 - Role-Based Login & Dashboard Access (Priority: P1)

Users with different roles (Admin vs. Client) log in and are routed to their respective secure areas.

**Why this priority**: Critical for security and separation of concerns between administration and client contribution.

**Independent Test**: Can be tested by logging in with an Admin account and a Client account and verifying the post-login redirect and access controls.

**Acceptance Scenarios**:

1. **Given** an existing CLIENT user, **When** they log in successfully, **Then** they are redirected to their client dashboard.
2. **Given** an existing ADMIN user, **When** they log in successfully, **Then** they are redirected to the admin dashboard.
3. **Given** a logged-in CLIENT user, **When** they attempt to navigate to `/admin`, **Then** access is denied and they are redirected to an unauthorized or home page.

---

### User Story 3 - Account Management & Recovery (Priority: P2)

Users need to recover forgotten passwords and manage their basic profile information.

**Why this priority**: Essential for reducing support tickets and maintaining account security lifecycle.

**Independent Test**: Can be tested by requesting a password reset, using the emailed token to set a new password, and subsequently updating the profile name and email from the dashboard.

**Acceptance Scenarios**:

1. **Given** a user who forgot their password, **When** they submit their email, **Then** they receive a secure, single-use, expiring reset token.
2. **Given** an authenticated user, **When** they update their email address, **Then** the new email requires verification before becoming active.
3. **Given** an authenticated user, **When** they click logout, **Then** their session is completely invalidated server-side.

---

### User Story 4 - Seamless Public Browsing (Priority: P3)

Visitors browsing the public blog should not be disrupted by authentication systems.

**Why this priority**: Protects SEO and the primary reader experience.

**Independent Test**: Can be tested by navigating the public articles without logging in.

**Acceptance Scenarios**:

1. **Given** an unauthenticated visitor, **When** they read articles on the public site, **Then** they experience no authentication prompts or errors.
2. **Given** a visitor clicks the "/publish" CTA, **When** they are unauthenticated, **Then** they are directed to the signup/login flow with a proper return URL.

### Edge Cases

- **Duplicate Email:** Registration with an existing email must be rejected safely without exposing account existence.
- **Token Expiration:** Invalid or expired verification/reset tokens must be rejected.
- **Account Enumeration:** Login and password reset failures must not reveal whether an account exists.
- **Privilege Escalation:** Users must absolutely not be able to change their own roles through profile updates or API mutations.
- **Open Redirects:** Return URLs after login must be validated to prevent open redirect vulnerabilities.
- **Fail-Safe Email:** Missing email configuration must fail clearly and safely without exposing credentials.
- **Log Security:** Passwords and tokens must never appear in logs or API responses.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement Auth.js authentication integrated with the existing Prisma and PostgreSQL database.
- **FR-002**: System MUST provide responsive, CareerVixa-branded UI for signup, login, logout, email verification, and password recovery.
- **FR-003**: System MUST support two explicit roles: ADMIN and CLIENT.
- **FR-004**: System MUST ensure public registration assigns the CLIENT role only.
- **FR-005**: System MUST restrict ADMIN role assignment to a secure, explicitly authorized provisioning process (no self-assignment).
- **FR-006**: System MUST protect `/admin` and `/dashboard` routes using server-side authentication and authorization.
- **FR-007**: System MUST redirect authenticated users to role-specific dashboards and unauthenticated users to login with a validated return URL.
- **FR-008**: System MUST implement secure session management, password hashing, session expiration, and explicit logout invalidation.
- **FR-009**: System MUST implement email verification and password-reset flows using expiring, single-use tokens.
- **FR-010**: System MUST allow authenticated users to view and update basic profile information (name and email), with email updates requiring re-verification.
- **FR-011**: System MUST enforce authorization and resource ownership at the server/data-access layer, not only in UI components or middleware.
- **FR-012**: System MUST integrate the existing `/publish` CTA with client authentication and dashboard navigation.
- **FR-013**: System MUST implement validation (via Zod), safe error messages, authentication rate limiting, and protection against account enumeration.

### Key Entities

- **User**: Represents an account. Attributes: ID, Name, Email, PasswordHash, EmailVerified (timestamp), Role (Enum: ADMIN, CLIENT), Image.
- **Session**: Represents an active login session. Attributes: ID, SessionToken, UserID, Expires.
- **VerificationToken**: Used for email verification. Attributes: Identifier, Token, Expires.
- **PasswordResetToken**: Used for account recovery. Attributes: Identifier, Token, Expires.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of unauthorized attempts to access `/admin` or `/dashboard` by unauthenticated or incorrectly permissioned users are rejected.
- **SC-002**: Users can successfully complete the entire registration, email verification, and login flow in under 3 minutes.
- **SC-003**: No sensitive credentials (passwords, tokens, secrets) are exposed in API responses, logs, or client bundles during automated and manual testing.
- **SC-004**: Public blog page load times and accessibility scores remain unaffected by the introduction of the authentication system.
- **SC-005**: All functional requirements pass automated security and TypeScript/linting tests.

## Assumptions

- We will utilize Auth.js (formerly NextAuth) using the credentials provider for password-based auth.
- Email delivery will be handled by Resend + React Email as dictated by the constitution.
- Role-based routing will leverage Next.js Middleware and server-side layout/page checks.
- A secure script or CLI tool will be used to provision initial Admin accounts.
