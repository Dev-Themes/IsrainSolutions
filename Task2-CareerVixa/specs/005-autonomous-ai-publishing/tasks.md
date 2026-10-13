# Tasks — Spec 005: CareerVixa Autonomous AI Research & Daily Publishing

## Phase 1: Setup
- [x] T001 Inspect constitution, Specs 001–004, existing CMS, database, authentication, and publishing services in `prisma/schema.prisma`
- [x] T002 Verify OpenAI Agents SDK, model provider, live web-search, Inngest, and deployment compatibility in `package.json` and `agent/requirements.txt`

## Phase 2: Foundational
- [x] T003 Extend Prisma schema for daily automation, research sources, validation outcomes, and idempotent publishing in `prisma/schema.prisma`
- [x] T004 [P] Configure the Python AI agent using uv, provider credentials, Pydantic schemas, and secure service communication in `agent/main.py`

## Phase 3: Scheduled Daily AI Publishing [US1]
**Goal**: CareerVixa automatically researches, generates, and publishes one career-related article every day using an AI agent.
**Independent Test**: Can be fully tested by triggering the scheduled job manually and verifying exactly one article is researched, validated, and published.

- [x] T005 [US1] Implement niche-specific topic selection with duplicate-topic prevention in `agent/research/topic.py`
- [x] T006 [P] [US1] Implement mandatory live web research and reliable source collection in `agent/research/search.py`
- [x] T007 [US1] Implement CareerVixa's structured article generation template with SEO metadata and citations in `agent/generation/article.py`
- [x] T008 [US1] Implement source verification, claim-support checks, and rejection of fabricated references in `agent/validation/sources.py`
- [x] T009 [P] [US1] Implement HTML sanitization, layout validation, niche relevance checks, and prohibited-content filtering in `lib/validation/content.ts`
- [x] T010 [US1] Implement unique daily publication keys, execution locking, and duplicate prevention in `lib/automation/lock.ts`
- [x] T011 [US1] Implement the daily timezone-aware Inngest schedule and bounded retries in `inngest/functions.ts`
- [x] T012 [US1] Integrate automatic publishing with the existing secure CMS service after successful validation in `lib/articles/publish.ts`

## Phase 4: Admin Configuration & Management [US2]
**Goal**: An Admin configures the daily publishing schedule, enables/disables the automation, and views execution history.
**Independent Test**: Can be fully tested by an Admin altering the schedule/topics and verifying the changes apply.

- [x] T013 [US2] Build Admin settings UI for schedule, timezone, topics, and automation status in `app/(protected)/admin/ai/automation/page.tsx`
- [x] T014 [US2] Build execution history log view for validation outcomes and errors in `app/(protected)/admin/ai/history/page.tsx`
- [x] T015 [US2] Enforce platform ownership checks so Client submissions cannot be automatically published in `lib/articles/publish.ts`

## Phase 5: Admin Manual AI Generation [US3]
**Goal**: An Admin can manually trigger the AI to generate an additional article.
**Independent Test**: Admin clicks a "Generate Article" button in the CMS and an article is generated outside the daily quota.

- [x] T016 [US3] Implement Admin manual AI generation without affecting the daily scheduled quota in `app/(protected)/admin/ai/generate/page.tsx`

## Phase 6: Polish & Cross-Cutting Concerns
- [x] T017 Test daily scheduling, duplicate triggers, timezones, failed jobs, and recovery in `tests/automation.test.ts`
- [x] T018 Test verified sources, false claims, invalid references, niche relevance, article layout, and prohibited content in `tests/validation.test.ts`
- [x] T019 Test complete workflow: Research → Generate → Validate → Publish → Public Blog in `tests/e2e.test.ts`
- [x] T020 Verify ADMIN authentication, service security, and Client submission restrictions.
- [x] T021 Document AI configuration, research providers, daily automation, retries, and troubleshooting in `README.md`
- [x] T022 Run Python tests, TypeScript, linting, application tests, and production build.
- [x] T023 Review implementation against Spec 005, acceptance criteria, and CareerVixa's constitution.
