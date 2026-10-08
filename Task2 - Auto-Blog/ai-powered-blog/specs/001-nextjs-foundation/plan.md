# Implementation Plan: Next.js Foundation

**Branch**: `[###-nextjs-foundation]` | **Date**: 2026-10-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-nextjs-foundation/spec.md`

## Summary

Establish the minimum production-ready Next.js foundation required by the constitution, setting up the App Router architecture, responsive UI layout constraints, and initializing the core infrastructure services (Database, Authentication, AI, Email, Background Jobs) without fully implementing their downstream workflows.

## Technical Context

**Language/Version**: TypeScript

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, shadcn/ui, Better Auth, Vercel AI SDK, Drizzle ORM, Inngest, Resend, Zod

**Storage**: Neon PostgreSQL, Vercel Blob

**Testing**: Linting and Strict Type Checking; Manual responsive layout validation. Automated tests out of scope for this foundation iteration.

**Target Platform**: Vercel Serverless Web Application

**Project Type**: Next.js Web Application / Publishing Platform

**Performance Goals**: Instant failure on invalid environments. Fast TTFB leveraging Next.js caching. No horizontal layout shifting.

**Constraints**: Strict environment validation. Responsive scaling from 320px up to a fixed maximum global container width (e.g., 1440px).

**Scale/Scope**: Fundamental architecture setup for all future features.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Validated against Next.js-first architecture constraints.
- [x] Confirmed human-controlled publishing workflow is respected.
- [x] Security, type-safety, and production quality standards are addressed.
- [x] AI rules (validation, persistence, retry without duplication) are handled.

## Project Structure

### Documentation (this feature)

```text
specs/001-nextjs-foundation/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/                  # Next.js App Router (layout, loading, not-found, error, page)
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── shared/           # Reusable functional components
│   └── layout/           # Max-width global container, header, footer
├── features/             # Feature-specific implementations
├── actions/              # Next.js Server Actions
├── db/                   # Drizzle ORM configuration and schemas
├── lib/                  # Generic utilities
├── services/             # Better Auth, Inngest, Vercel AI SDK, Resend initializers
├── types/                # Global TypeScript definitions
└── config/               # Environment variables (Zod schema) validation
```

**Structure Decision**: A standard Next.js directory structure enhanced with domain-driven `features/` separation, while keeping global services (`db`, `services`, `actions`) easily accessible. This layout cleanly separates UI concerns from business logic and database access.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
