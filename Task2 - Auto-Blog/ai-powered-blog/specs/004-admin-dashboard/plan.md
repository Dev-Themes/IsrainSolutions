# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement a server-first Admin Dashboard and CMS for managing career, jobs, and professional growth content. The implementation will rely on Next.js Server Components, Better Auth for `ADMIN` role-based access control, and Drizzle ORM for type-safe server-side data mutations, keeping publishing strictly under human control.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, shadcn/ui, Better Auth, Vercel AI SDK, Drizzle ORM

**Storage**: Neon PostgreSQL, Vercel Blob

**Testing**: Playwright / Jest

**Target Platform**: Web browsers (Desktop and Mobile)

**Project Type**: Next.js web application

**Performance Goals**: Fast loading, prefer Server Components

**Constraints**: Admin role required, no AI auto-publishing, responsive 320px to 1440px+

**Scale/Scope**: Internal admin dashboard, server-side pagination for large datasets

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Validated against Next.js-first architecture constraints.
- [x] Confirmed human-controlled publishing workflow is respected.
- [x] Security, type-safety, and production quality standards are addressed.
- [x] AI rules (validation, persistence, retry without duplication) are handled.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

```text
src/
├── app/
│   └── admin/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── articles/
│       ├── categories/
│       ├── tags/
│       └── users/
├── components/
│   └── admin/
├── lib/
│   └── db/
│       └── schema.ts
└── actions/
    └── admin/
```

**Structure Decision**: Standard Next.js App Router structure within the `src/` directory. All admin routes are protected under `src/app/admin/`. Server Actions are placed in `src/actions/admin/` and UI components in `src/components/admin/`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No complexity violations identified.


## Approach

Reuse the authentication, authorization, database, responsive container and UI foundations established in previous specifications.

Build the admin dashboard as a server-first CMS for managing career, jobs and professional growth content, taxonomy and users. Keep publishing under explicit human admin control and prepare extension points for the AI and editorial workflows defined in later specifications.

## Key Decisions

* Access: `ADMIN` role required for every dashboard operation.
* Rendering: Server Components by default; Client Components only for required interactions.
* Data access: server-side Drizzle queries and Server Actions/Route Handlers where appropriate.
* Validation: Zod for all administrative input.
* Content: support admin-managed drafts and published articles.
* Publishing: admin-controlled; AI never publishes automatically.
* Taxonomy: categories and tags remain centrally managed.
* Destructive actions: require explicit confirmation.
* Large datasets: server-side pagination/filtering rather than loading everything into the browser.
* Responsive layout: reuse the global `max-width` container and shared UI primitives.
* Reuse: extend existing authentication and authorization rather than introducing new access-control infrastructure.

## Touch Points

* new: `app/admin/*`
* new: admin dashboard layouts and navigation
* new: article management UI
* new: article CRUD actions/services
* new: category management
* new: tag management
* new: client/user management
* new: admin dashboard overview
* new: validation schemas
* new: admin authorization guards
* reuse: Better Auth/session utilities
* reuse: authorization utilities
* reuse: Drizzle database layer
* reuse: shared UI components
* reuse: responsive container
* reuse: global loading/error/not-found states

## Admin Flow

```text
Admin Login
    ↓
Admin Dashboard
    ├── Articles
    │     ├── Create
    │     ├── Edit
    │     ├── Draft
    │     └── Publish
    ├── Categories
    ├── Tags
    └── Users
```

## Validation & Failure Handling

* Unauthenticated request → reject/redirect.
* Non-admin request → forbidden.
* Invalid form data → structured validation error.
* Duplicate slug/category/tag → reject safely.
* Missing required publication data → prevent publishing.
* Referenced taxonomy deletion → prevent or safely reassign.
* Missing record → not-found.
* Database failure → safe error state without leaking internals.
* Empty dataset → intentional empty state.
* Destructive operation without confirmation → do not execute.
* Public queries must never expose drafts or unpublished admin content.

## Out of Scope

* Client dashboard.
* Client article submissions.
* Editorial review queue.
* Approval/rejection workflow.
* AI article generation.
* Automated AI scheduling.
* Article analytics.
* Client email notifications.
* Final SEO, security hardening and performance optimization owned by later specifications.

## Implementation Order

1. Establish protected admin layout and navigation.
2. Build dashboard overview.
3. Implement article data access and CRUD.
4. Implement article draft and publication management.
5. Implement category management.
6. Implement tag management.
7. Implement client/user management.
8. Add validation and destructive-action confirmation.
9. Add loading, empty and error states.
10. Verify server-side authorization for every admin operation.
11. Verify unpublished content remains private.
12. Test responsive behavior from 320px through 1440px+.
13. Run TypeScript, lint, build and acceptance checks.
14. Review implementation against the constitution and Spec 004.

## Definition of Done

* Admin dashboard is accessible only to `ADMIN`.
* Admin can manage articles, drafts, categories and tags.
* Admin can view/manage client accounts within authorized scope.
* Article status and ownership are clearly represented.
* Publishing remains under explicit human control.
* All mutations use server-side authorization and validation.
* Destructive actions require confirmation.
* Dashboard is responsive across required viewport sizes.
* No horizontal overflow, clipping or layout overlap exists.
* Loading, empty and error states are implemented.
* No unnecessary infrastructure or dependencies are introduced.
* Implementation conforms to the constitution and Spec 004.
* Human validation is completed before proceeding to Spec 005.
