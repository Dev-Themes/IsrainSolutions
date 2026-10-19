<!--
Sync Impact Report:
- Version change: 0.1.0-template -> 1.0.0
- Modified principles:
  - Added "Spec-Driven Development (SDD)"
  - Added "Clean, Modular, Reusable Code"
  - Added "Modern Web Best Practices"
  - Added "Simplicity over Overengineering"
  - Added "Separation of Concerns"
- Added sections:
  - Technical Constraints
  - Core Business Rules
  - Security & Quality
  - Definition of Done
- Removed sections: N/A (Replaced template placeholders)
- Templates requiring updates: N/A (Checked plan-template.md, tasks-template.md; generic and compliant)
- Follow-up TODOs: None
-->
# AI-Powered Blogging & Guest Publishing Platform Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
Every feature must have an approved specification in `specs/` before implementation.

### II. Clean, Modular, Reusable Code
Write clean, readable, modular, reusable, and maintainable code. Prefer simplicity over unnecessary complexity.

### III. Modern Web Best Practices
Follow Next.js App Router, TypeScript, SEO, accessibility, security, and performance best practices.

### IV. Simplicity over Overengineering
Prefer established libraries over custom implementations. Avoid unnecessary dependencies and overengineering.

### V. Separation of Concerns
Keep frontend, backend, database, authentication, and AI-agent responsibilities clearly separated.

## Technical Constraints

- **Frontend/Backend:** Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui.
- **Database:** PostgreSQL (Neon) with Prisma ORM.
- **Authentication:** Auth.js with secure role-based access (Admin/Client).
- **AI:** Python OpenAI Agents SDK with configurable LLM providers.
- **Editor:** Tiptap with sanitized HTML support.
- **Automation:** Vercel Cron + Inngest.
- **Email:** Resend + React Email.
- **Analytics:** PostHog + article view/click tracking.
- **Validation:** Zod.
- **Storage/Deployment:** Vercel Blob + Vercel.
- **Architecture:** Use Server Components by default, Server Actions for mutations, and Route Handlers when appropriate.
- **Secrets:** Store secrets in environment variables. Never expose credentials or AI API keys to clients.

## Core Business Rules

- Admins have full blog CRUD, AI generation, review, publishing, and automation controls.
- Scheduled AI agents generate niche-specific articles based on configured schedules.
- Clients must authenticate before creating or managing articles.
- Clients may generate drafts using AI or write articles manually.
- Every client submission requires an original article or website URL and must remain unpublished until admin approval.
- Only admins can approve, reject, request revisions, and publish client submissions.
- Notify admins on submission and clients on approval, rejection, or publication.
- Clients can access and view analytics for their own articles only.
- Enforce SEO standards, niche relevance, content safety, HTML sanitization, and API rate limits.
- Track publishing status, authorship, timestamps, and approval history.

## Security & Quality

- Enforce authentication, authorization, and ownership checks server-side.
- Validate all user input using Zod.
- Protect AI endpoints, scheduled jobs, and administrative operations.
- Prevent duplicate publishing, unsafe HTML, unauthorized access, and AI API abuse.
- Implement structured error handling, logging, and retry mechanisms.
- Ensure responsive layouts, accessibility, fast page loading, and SEO-friendly public pages.

## Definition of Done

- Implementation matches approved specifications and acceptance criteria.
- Authentication, authorization, CRUD, AI workflows, approvals, emails, and analytics work correctly.
- Critical workflows and edge cases have passing tests.
- No TypeScript, linting, build, or critical security errors.
- Database migrations and environment configuration are documented.
- Changes are reviewed against specifications before completion.
- No feature is considered complete without successful verification.

## Governance

Amendments require documentation, approval, and consultation during spec creation, implementation, and review. The constitution supersedes all other practices. All PRs and reviews must verify compliance.

**Version**: 1.0.0 | **Ratified**: 2026-10-10 | **Last Amended**: 2026-10-10
