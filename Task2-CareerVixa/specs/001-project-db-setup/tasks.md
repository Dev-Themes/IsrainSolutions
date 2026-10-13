# Tasks: Project Setup & Database Foundation

**Input**: Design documents from `/specs/001-project-db-setup/`

**Prerequisites**: plan.md, spec.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Inspect existing repository dependencies and verify `.specify/memory/constitution.md` alignment
- [x] T002 Initialize Next.js App Router project with TypeScript strict mode in `src/`
- [x] T003 Configure Tailwind CSS v4 and integrate shadcn/ui in `src/app/` and `src/components/`
- [x] T004 Implement environment validation with Zod in `src/lib/env.ts` and document in `.env.example`
- [x] T005 Update `.gitignore` to securely exclude `.env` and `.env.local` files
- [x] T006 Configure ESLint, Prettier, and essential error boundaries in `src/app/`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Configure Prisma ORM and setup connection string configuration in `prisma/schema.prisma`
- [x] T008 [P] Implement `Role`, `ArticleStatus`, and `AIJobStatus` enums in `prisma/schema.prisma`
- [x] T009 [P] Implement `User`, `Article`, `Category`, `Tag`, `Submission`, `AIJob`, `Notification`, and `Analytics` models in `prisma/schema.prisma`
- [x] T010 Validate Prisma schema, generate the client, and create initial migration `npx prisma migrate dev --name init`
- [x] T011 Create a reusable server-only database client in `src/lib/db.ts`

## Phase 3: User Story 1 - Developer Setup & Configuration (Priority: P1)

**Goal**: A developer can clone, configure, and run the project locally. Missing configuration produces clear errors without exposing secrets.

**Independent Test**: A team member can follow the project's README, copy the environment variable example file, run the application locally, and view the starter page without any runtime crashes.

- [x] T012 [US1] Write automated tests for environment validation in `tests/env.test.ts`
- [x] T013 [US1] Update `README.md` with local setup, installation, and Next.js development server commands

## Phase 4: User Story 2 - Database Initialization & Migrations (Priority: P1)

**Goal**: Prisma connects successfully to the Neon PostgreSQL database, and the initial migration is successfully applied to establish the schema.

**Independent Test**: A developer can run the schema migration command and successfully provision the schema on a fresh database instance, resulting in generated schema types.

- [x] T014 [US2] Update `README.md` with database initialization and Prisma migration instructions
- [x] T015 [US2] Write automated tests for database connection utility in `tests/db.test.ts`

## Phase 5: User Story 3 - Schema Representation & Extensibility (Priority: P1)

**Goal**: The database schema accurately represents future roles and models with proper constraints and relationships.

**Independent Test**: The database correctly enforces constraints (e.g., unique slugs) and validates relationships (e.g., Article authorship) at the database layer.

- [x] T016 [US3] Write tests verifying schema constraints and referential integrity (e.g., unique slugs) using a test database in `tests/schema.test.ts`

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T017 Run all linting, type-checking, and build commands (`npm run build`); fix any failures across the project
- [x] T018 Review implementation against Spec 001 and project constitution checklist

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1)**: Can start after Foundational (Phase 2)
- **User Story 3 (P1)**: Can start after Foundational (Phase 2)

### Within Each User Story

- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel

### Incremental Delivery

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete User Stories 1-3
4. **STOP and VALIDATE**: Test User Stories independently
5. Complete Phase N: Polish
