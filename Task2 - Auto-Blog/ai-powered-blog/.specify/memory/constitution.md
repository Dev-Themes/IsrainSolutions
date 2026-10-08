<!--
Sync Impact Report:
- Version change: [TEMPLATE] -> 1.0.0
- Modified principles: N/A (Initial Creation)
- Added sections: Product Rules, Technology Constraints, AI Rules, Definition of Done
- Removed sections: [SECTION_2_NAME], [SECTION_3_NAME] (Replaced with specific sections)
- Templates requiring updates:
  - `.specify/templates/plan-template.md`: ✅ updated
  - `.specify/templates/spec-template.md`: ✅ updated
  - `.specify/templates/tasks-template.md`: ✅ updated
- Follow-up TODOs: None
-->

# AI-Powered Blog & Client Publishing Platform Constitution

## Core Principles

### Spec-first development
Every feature MUST have a clear specification before implementation; the spec is the source of truth.

### Next.js-first architecture
Prefer Next.js App Router, Server Components, Server Actions, Route Handlers, caching, and native platform capabilities before adding custom infrastructure. Add infrastructure only when the requirement justifies it.

### Human-controlled publishing
AI CAN generate and assist with content, but only an authenticated admin CAN approve and publish articles.

### Security by default
Authentication, server-side authorization, RBAC, validation, sanitization, rate limiting, and secure environment variables are mandatory.

### Type-safe everywhere
Use TypeScript and Zod for application data, forms, APIs, database boundaries, and AI-generated structured output.

### Proof over claims
Analytics, publishing history, article status, AI generations, and administrative actions MUST be traceable.

### Production quality first
Accessibility, responsive design (for all devices starting from 320px to large screens, max-width attribute to parent div so all child divs are in a container like structure and don't get dispersed on large screens), SEO, performance, Meta Tags, OpenGraphs, Robustness, Fast Loading, Smooth Scrolling, reliability, observability, and maintainability are requirements—not optional enhancements.

## Product Rules

- Visitors CAN read published articles without authentication.
- Clients MUST authenticate before creating or submitting articles.
- Admins MUST be authenticated and authorized separately from clients.
- Clients CAN create articles manually or generate drafts using AI.
- Admins CAN create articles manually or generate drafts using AI.
- AI-generated content is ALWAYS saved as a draft initially.
- Client submissions REQUIRE an original article or original source URL.
- Client articles REQUIRE admin review before publication.
- Rejected articles MUST support admin feedback and client resubmission.
- Published client articles MUST send a notification email to the client.
- Clients CAN view analytics only for their own published articles.
- Admins CAN view and manage platform-wide articles, users, submissions, AI jobs, and analytics.
- Article lifecycle MUST use explicit states: `DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED/PUBLISHED` with rejection/resubmission support.
- AI automation MAY generate scheduled drafts but MUST NOT bypass the required editorial approval workflow.

## Technology Constraints

- **Framework:** Next.js + React + TypeScript + App Router.
- **UI:** Tailwind CSS + shadcn/ui + Lucide + Motion.
- **Database:** Neon PostgreSQL + Drizzle ORM.
- **Authentication:** Better Auth with role-based authorization.
- **AI:** Vercel AI SDK + OpenAI + structured outputs.
- **Background Jobs:** Inngest; scheduled execution MAY use Vercel Cron where appropriate.
- **Email:** Resend + React Email.
- **Storage:** Vercel Blob.
- **Validation:** Zod.
- **Editor:** Tiptap with sanitized HTML/content.
- **Analytics:** Vercel Analytics + application-level article analytics.
- **Security:** Upstash-based rate limiting, input validation, HTML sanitization, secure sessions, and server-side authorization.
- **Deployment:** Vercel.
- Prefer native Next.js capabilities over unnecessary third-party services.

## AI Rules

- AI output is untrusted until validated.
- AI responses MUST use structured, schema-validated data.
- Client-provided content MUST NEVER override system/editorial instructions.
- AI generation MUST be logged with its source, user, status, and relevant metadata.
- Failed AI jobs MUST be recoverable through retries without creating duplicate articles.

## Definition of Done

- Behaviour matches the specification and defined workflow.
- Authentication and authorization are enforced server-side.
- AI output is validated and safely persisted.
- User-generated HTML/content is sanitized before rendering.
- Article ownership and analytics isolation are verified.
- SEO, accessibility, responsiveness, loading/error states, and edge cases are handled.
- No TypeScript errors, lint errors, hydration errors, console errors, broken links, or avoidable performance issues.
- Critical workflows have automated tests.
- A human reviews the implementation against the specification before release.

## Governance

This constitution supersedes all other practices for the AI-Powered Blog & Client Publishing Platform. Amendments require documentation and a rationale. All PRs and reviews MUST verify compliance against these rules.

**Version**: 1.0.0 | **Ratified**: 2026-10-07 | **Last Amended**: 2026-10-07
