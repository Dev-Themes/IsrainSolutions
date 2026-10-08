# Research: Authentication & Authorization

All technical decisions were explicitly established in the provided plan.

- **Decision**: Better Auth
  - **Rationale**: Extends the existing foundation from Spec 001. Provides secure session management.
- **Decision**: Roles `CLIENT` and `ADMIN`
  - **Rationale**: Simplifies access control while allowing strict separation between authors and site administrators.
- **Decision**: Server-side Role-based Access Control (RBAC)
  - **Rationale**: Essential for a secure architecture where UI restrictions are not the only security boundary.
