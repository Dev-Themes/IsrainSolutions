# Implementation Plan: CareerVixa Authentication & Role Management

**Branch**: `main` | **Date**: 2026-10-10 | **Spec**: [Spec 003](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/003-auth-role-management/spec.md)

## Summary

Extend the existing CareerVixa Next.js application with secure authentication and role-based access control using Auth.js, Prisma, and Neon PostgreSQL. This implementation provides a robust, credentials-based authentication system supporting CLIENT and ADMIN roles, complete with secure session management, email verification, password recovery via Resend, and comprehensive server-side route protection.

## Technical Context

**Language/Version**: TypeScript, Node.js

**Primary Dependencies**: Next.js App Router, Auth.js (NextAuth.js v5 beta), Prisma ORM, Resend, React Email, Argon2id, Zod, shadcn/ui

**Storage**: Neon PostgreSQL

**Testing**: Linting and TypeScript type checking

**Target Platform**: Web (Vercel)

**Project Type**: Next.js Full Stack Web Application

**Performance Goals**: Fast server-side authentication rendering, minimal layout shifts

**Constraints**: Must integrate cleanly with the existing Phase 1 database foundation and Phase 2 public website without breaking existing features.

**Scale/Scope**: Registration/login flow, password recovery, verification, role-based dashboards

## Constitution Check

*GATE: Passed*
- **Technology Choice**: Utilizes Next.js, Prisma, and PostgreSQL which are approved in the core constitution. Uses Auth.js (NextAuth) as the standard authentication library.
- **Security**: Argon2id for password hashing, server-side RBAC, and secure session management. Uses Zod for validation.
- **Maintainability**: Keeps authentication modular and separated from the main content logic. Follows shadcn/ui styling conventions.

## Project Structure

### Documentation (this feature)

```text
specs/003-auth-role-management/
├── plan.md              # This file
├── research.md          # Technical decisions and approach
├── data-model.md        # Database schema additions
├── quickstart.md        # Validation scenarios
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
app/
├── (auth)/
│   ├── login/
│   ├── signup/
│   ├── verify-email/
│   ├── forgot-password/
│   └── reset-password/
├── (protected)/
│   ├── dashboard/
│   └── admin/
├── api/
│   └── auth/
│       └── [...nextauth]/

lib/
├── auth.ts              # Auth.js configuration and helpers
├── mail.ts              # Resend email helpers
└── tokens.ts            # Token generation and verification

components/
└── auth/                # Reusable auth UI components (forms, wrappers)

prisma/
└── schema.prisma        # Database schema modifications
```

**Structure Decision**: The Next.js App Router structure utilizes route groups `(auth)` and `(protected)` to isolate layouts and middleware effectively. A central `lib/auth.ts` will house the NextAuth setup to keep standard modularity.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
