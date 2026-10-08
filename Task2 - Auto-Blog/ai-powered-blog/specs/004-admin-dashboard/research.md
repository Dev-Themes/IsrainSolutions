# Phase 0: Outline & Research

## Technical Context Unknowns Resolved

- **Testing**: Playwright for acceptance testing and basic Next.js Jest setup if needed, based on constitution.
- **Target Platform**: Modern web browsers (320px to 1440px+ viewport sizes).
- **Project Type**: Next.js App Router web application (admin dashboard).
- **Performance Goals**: Fast loading, prefers Server Components, server-side data access.
- **Constraints**: Admin role required, no AI auto-publishing.
- **Scale/Scope**: Admin interface for managing content (articles, taxonomy, users). Large datasets require server-side pagination/filtering.

## Architectural Decisions

### Decision: Server-first CMS architecture
- **Rationale**: The specification mandates Server Components by default, server-side authorization, and Drizzle server-side queries. This reduces client bundle size and provides secure access control.
- **Alternatives considered**: Client-side SPA dashboard fetching from APIs. Rejected because it violates the constitution's Next.js-first architecture principle (Server Components preferred).

### Decision: Better Auth integration for Admin Role
- **Rationale**: Reusing the existing Better Auth foundation ensures consistent session validation and RBAC without introducing new infrastructure.
- **Alternatives considered**: Custom JWT or separate admin session cookie. Rejected due to complexity and duplication of auth responsibilities.

### Decision: Direct Drizzle ORM queries in Server Actions/Route Handlers
- **Rationale**: Provides type-safe database access for CMS mutations (create, edit, publish) while keeping logic on the server.
- **Alternatives considered**: Separate backend API server. Rejected because Next.js App Router can securely handle this within the same project.
