# Implementation Plan: Project Setup & Database Foundation

**Branch**: `001-project-db-setup` | **Date**: 2026-10-10 | **Spec**: [spec.md](./spec.md)

**Input**: Plan input from user request.

## Summary

Implement a modular Next.js foundation using App Router, TypeScript, Tailwind CSS v4, shadcn/ui, PostgreSQL (Neon), and Prisma ORM to establish the technical foundation for the AI-powered blogging platform.

## Technical Context

**Language/Version**: TypeScript (Strict Mode)

**Primary Dependencies**: Next.js (App Router), Tailwind CSS v4, shadcn/ui, Prisma ORM, Zod

**Storage**: PostgreSQL (Neon)

**Testing**: Jest / Playwright / vitest (to be configured based on repo standard)

**Target Platform**: Web / Vercel

**Project Type**: Fullstack Web Application

**Constraints**: Clean separation of concerns (frontend/backend/DB/AI), secure environment validation, defer auth enforcement to future phases, no default admin credentials.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-Driven Development (SDD)**: ✅ Approved spec exists.
- **Clean, Modular Code**: ✅ Foundation establishes `src/` and reusable db clients.
- **Modern Web Best Practices**: ✅ Next.js, TS, Tailwind, shadcn setup.
- **Simplicity**: ✅ Using standard standard tools (Prisma, Postgres, Next.js).
- **Separation of Concerns**: ✅ Server/Client boundaries explicit, DB client isolated.

## Project Structure

### Documentation (this feature)
```text
specs/001-project-db-setup/
├── spec.md
├── plan.md
├── data-model.md
└── quickstart.md
```

### Affected Files
- `src/app/` — App Router foundation.
- `src/components/` — Shared UI components.
- `src/lib/db/` — Database client and utilities.
- `src/lib/env/` — Environment validation.
- `src/lib/` — Shared server-side utilities.
- `src/types/` — Shared TypeScript types where needed.
- `prisma/schema.prisma` — Database models.
- `prisma/migrations/` — Database migrations.
- `.env.example` — Required environment variables.
- `README.md` — Setup and developer instructions.

## Key Decisions

- **Architecture:** Single Next.js application using App Router and `src/` organization; separate Python AI-agent service will be introduced in Phase 5.
- **Language:** TypeScript with strict type checking.
- **UI:** Tailwind CSS v4, shadcn/ui, and accessible design primitives.
- **Database:** Neon PostgreSQL with Prisma ORM and version-controlled migrations.
- **Schema:** Users, Articles, Categories, Tags, Submissions, AI Jobs, Notifications, and Analytics with normalized relationships, appropriate indexes, and referential integrity.
- **Roles:** Admin and Client enums; enforcement deferred to Phase 3.
- **Article lifecycle:** Draft, Pending Review, Revisions Requested, Approved, Rejected, and Published; support Unpublished/Archived where necessary.
- **Ownership:** Explicit author and client associations, distinguishing platform-owned and client-submitted articles.
- **Database connections:** Reusable server-only Prisma client with development-safe initialization.
- **Validation:** Zod for server-side environment validation; never expose secrets.

## Phase 0: Outline & Research

*Note: All major technological choices have been pre-specified by the constitution and technical constraints. No major unknowns remain requiring external research agents.*
- **Decision**: Next.js App Router with Prisma.
- **Rationale**: Best-in-class full-stack setup aligning with React ecosystem.
- **Decision**: PostgreSQL on Neon.
- **Rationale**: Serverless scalability, perfect synergy with Prisma ORM.

## Phase 1: Design & Contracts

See `data-model.md` for schema details and `quickstart.md` for developer initialization.
