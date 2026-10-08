# plan.md — Authentication & Authorization

## Approach

Reuse the Better Auth foundation established in Spec 001 and extend it with secure client/admin authentication and server-side role-based authorization.

Keep authentication logic isolated from UI and reusable across protected pages, Server Actions and Route Handlers. Enforce ownership and role checks on the server so future dashboards, publishing and content workflows can safely build on this foundation.

## Key Decisions

* Authentication: Better Auth.
* Roles: `CLIENT` and `ADMIN`.
* Sessions: secure server-side session validation.
* Authorization: explicit server-side RBAC and resource ownership checks.
* Validation: Zod for authentication-related input.
* Security: never trust client-provided roles, IDs or authorization state.
* Protected routes: authenticated pages and server operations require valid sessions.
* Admin access: explicitly restricted to `ADMIN`.
* Client access: restricted to `CLIENT` permissions and owned resources.
* Error handling: safe authentication/authorization errors without sensitive information leakage.
* Reuse: extend the existing authentication foundation rather than introducing another auth provider.

## Touch Points

* reuse: Better Auth configuration from Spec 001
* new: authentication configuration/extensions
* new: session utilities
* new: role/permission utilities
* new: protected-route helpers
* new: server-side authorization guards
* new: resource ownership helpers
* new: authentication validation schemas
* new: client authentication pages/workflows
* new: admin authentication access control
* reuse: environment validation
* reuse: existing application layouts and UI primitives

## Data & Schema

* Add only authentication/user fields required for `CLIENT` and `ADMIN` roles.
* Establish a reliable server-side role representation.
* Ensure user identity and ownership can be referenced by later article, submission and analytics features.
* Do not add feature-specific schemas owned by later specifications.

## Authorization Flow

```text
Request
   ↓
Validate Session
   ↓
Identify User
   ↓
Check Role
   ↓
Check Resource Ownership
   ↓
Allow / Reject
```

Authorization must be applied independently of client-side navigation or UI visibility.

## Validation & Failure Handling

* Missing session → reject protected operation.
* Expired/invalid session → reject and require authentication.
* `CLIENT` accessing admin resource → forbidden.
* Missing/invalid role → deny protected access.
* Cross-user resource access → reject.
* Invalid authentication input → structured validation error.
* Invalid credentials → safe generic error.
* Authentication service failure → fail safely without exposing internal details.
* Client-side manipulation of role or resource identifiers → ignored for authorization decisions.

## Out of Scope

* Admin dashboard.
* Client dashboard.
* Article CRUD.
* Client submissions.
* Editorial review and publishing.
* AI generation.
* Analytics.
* General notification emails.
* Final security hardening and rate-limiting implementation owned by later specifications.

## Implementation Order

1. Extend the Better Auth foundation.
2. Establish `CLIENT` and `ADMIN` role handling.
3. Configure secure session validation.
4. Implement client registration and login.
5. Implement admin authentication access.
6. Create reusable server-side authorization utilities.
7. Implement protected route and server-operation guards.
8. Implement resource ownership checks.
9. Add Zod validation for authentication inputs.
10. Implement safe authentication and authorization error handling.
11. Test role isolation and cross-user access prevention.
12. Run TypeScript, lint, build and manual security checks.
13. Review implementation against the constitution and Spec 003.

## Definition of Done

* Client authentication works.
* Admin authentication works.
* `CLIENT` and `ADMIN` permissions are enforced server-side.
* Protected operations require valid sessions.
* Cross-user resource access is prevented.
* Client users cannot access admin resources.
* Authentication secrets remain server-side.
* Session validation is reusable by later specifications.
* No unnecessary authentication infrastructure is introduced.
* Implementation conforms to the constitution and Spec 003.
* Human validation is completed before proceeding to Spec 004.
