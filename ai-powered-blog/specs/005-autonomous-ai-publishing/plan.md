# Implementation Plan: CareerVixa Autonomous AI Research & Daily Publishing

## Technical Context

- **Frontend**: Existing Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui.
- **AI Agent**: Python with OpenAI Agents SDK.
- **Model**: Configurable compatible Gemini/OpenAI model.
- **Web Research**: Supported live web-search tool or a secure search provider adapter.
- **Validation**: Pydantic, Zod, HTML sanitization, and server-side content checks.
- **Database**: Neon PostgreSQL + Prisma.
- **Scheduling**: Inngest timezone-aware daily cron and durable background execution.
- **Default Timezone**: Asia/Karachi.
- **Publishing**: Automatic after mandatory validation; no Admin approval.
- **Email**: Reuse existing notification infrastructure for Admin failure alerts.
- **Security**: Protected service APIs, rate limits, logging, and idempotency.

## Constitution Check

- **Spec-Driven Development (SDD)**: Yes, following Spec 005.
- **Clean, Modular, Reusable Code**: Yes, Python agent is separated from Next.js CMS.
- **Modern Web Best Practices**: Yes.
- **Simplicity over Overengineering**: Reusing existing CMS and auth; using Inngest for simple scheduled retries.
- **Separation of Concerns**: Python AI agent strictly isolated from CMS validation and DB inserts.

## Architecture

1. **Scheduler (Inngest)** triggers one daily generation job.
2. **Next.js Backend** checks automation status and daily publication quota.
3. **Python AI Agent** selects a relevant, nonduplicate career topic.
4. **Python AI Agent** performs live web research using reliable sources.
5. **Python AI Agent** generates structured article content with citations.
6. **Next.js Validation Pipeline** checks niche relevance, article structure, HTML safety, source validity, duplicates, and SEO.
7. If validation fails, retry generation within configured limits.
8. If validation succeeds, publish automatically through the existing CMS service.
9. Update public pages, search results, category listings, and sitemap.
10. Record sources, validation outcomes, job details, and publication timestamp in DB.

## Database Extensions

Extend existing `schema.prisma`:
- Add `AIConfiguration` model (schedule time, timezone, automation enabled, topics).
- Add `AIExecutionLog` model (timestamp, status, validation details, error logs, article ID).
- Add fields to `Article` (isAIGenerated, aiSourceReferences).

## Admin Interface

- `/admin/ai/automation` — Daily schedule and settings.
- `/admin/ai/history` — Execution history and errors.
- `/admin/ai/generate` — Manual AI generation.
- `/admin/articles` — Existing CMS for published AI articles.

## Verification & Testing

Test daily publishing, research, citations, niche relevance, formatting, prohibited content, duplicates, provider errors, retries, timezones, ADMIN permissions, and Client publication restrictions. Run Python tests, TypeScript checks, linting, and build.
