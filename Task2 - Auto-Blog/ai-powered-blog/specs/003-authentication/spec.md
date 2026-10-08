# spec.md — Authentication & Authorization

## Goal

Implement secure authentication and role-based authorization for the career, jobs and professional growth platform, supporting `CLIENT` and `ADMIN` users while following the project constitution.

## User Scenarios

* A client can create and manage their authenticated account.
* A client can access only client-authorized areas and their own content.
* An admin can access protected administrative areas.
* An unauthenticated visitor attempting to access protected areas is redirected or rejected appropriately.
* A client cannot access admin functionality.
* An admin can manage platform resources according to their authorization level.

## Functional Requirements

FR-1 Implement Better Auth authentication for `CLIENT` and `ADMIN` roles.

FR-2 Provide secure registration and login for clients.

FR-3 Provide secure admin authentication without exposing administrative functionality to clients.

FR-4 Establish session management with secure, server-side session validation.

FR-5 Protect authenticated routes and server actions.

FR-6 Enforce authorization server-side; UI restrictions must never be the only security boundary.

FR-7 Implement role-based access control for `CLIENT` and `ADMIN`.

FR-8 Ensure clients can access only resources explicitly owned by or authorized for their account.

FR-9 Ensure admin-only resources reject client and unauthenticated requests.

FR-10 Validate authentication-related input with Zod.

FR-11 Handle invalid credentials, expired sessions, unauthorized access and invalid requests safely without exposing sensitive information.

FR-12 Establish the authentication architecture required by the client dashboard, admin dashboard and publishing workflows in later specifications.

FR-13 Keep authentication logic isolated from presentation components and reusable across server actions, route handlers and protected pages.

## Security Requirements

* Passwords and authentication secrets must never be exposed to the client.
* Sessions must use secure configuration appropriate for production.
* Authorization must be checked on the server for every protected operation.
* Client-provided role values must never determine authorization.
* Users must not be able to access another user's resources by modifying IDs, URLs or request payloads.
* Authentication errors must not reveal sensitive account information unnecessarily.
* Secrets must remain in validated environment variables.
* Rate limiting/brute-force protection must use the security foundation established by the project architecture where applicable.

## Edge Cases & Rules

* Unauthenticated protected request → reject or redirect appropriately.
* `CLIENT` accessing admin resource → `403`/forbidden response.
* Invalid or expired session → require authentication.
* Missing user role → deny protected access rather than assuming permissions.
* Invalid credentials → return a safe generic authentication error.
* Attempted cross-user resource access → reject server-side.
* Tampered client-side role/session data → never grant elevated permissions.
* Authentication service failure → fail safely without exposing internal details.

## Out of Scope

* Admin dashboard functionality.
* Client dashboard functionality.
* Article creation or editing.
* Article submissions.
* Editorial review and publishing.
* AI generation workflows.
* Analytics.
* Email notification workflows beyond authentication requirements.
* Final security hardening owned by Spec 009.

## Acceptance Criteria

* [ ] Client registration and login work securely.
* [ ] Admin authentication works securely.
* [ ] `CLIENT` and `ADMIN` roles are enforced server-side.
* [ ] Protected routes reject unauthenticated users.
* [ ] Client users cannot access admin resources.
* [ ] Users cannot access another user's protected resources.
* [ ] Sessions are securely validated server-side.
* [ ] Invalid and expired sessions are handled correctly.
* [ ] Authentication inputs are validated with Zod.
* [ ] Authentication secrets are never exposed to the client.
* [ ] Authorization cannot be bypassed through client-side manipulation.
* [ ] Authentication logic is reusable by later dashboard and publishing specifications.
* [ ] No unnecessary authentication infrastructure is introduced.
* [ ] Implementation follows the project constitution.
* [ ] A human reviews the implementation against this specification before completion.
