# Implementation Plan: CareerVixa Client Dashboard & Guest Publishing Portal

**Branch**: `006-client-publishing-portal` | **Date**: 2026-10-11 | **Spec**: [spec.md](file:///D:/Muhammad%20Shariq/Internship/Israin%20Solutions%20-%20Ongoing/ai-powered-blog/specs/006-client-publishing-portal/spec.md)

**Input**: Feature specification from `specs/006-client-publishing-portal/spec.md`

---

## Summary

Build a dedicated, secure Client Publishing Portal for CareerVixa focused on Career, Jobs & Professional Growth. Allow external guest contributors with the `CLIENT` role to:
1. Access a branded contributor dashboard with article metrics and publishing status tracking.
2. Manage contributor profile information (full name, country, company, phone, author bio, website) linked 1-to-1 with their account.
3. Create and format career articles manually using the Tiptap rich-text editor, or generate AI-assisted drafts via Tavily + Gemini/OpenAI research pipelines.
4. Save drafts privately with isolated client ownership (`authorId === session.user.id`).
5. Submit completed drafts with mandatory contributor, promotional, and originality metadata for Admin review.
6. Enforce that client articles **never** publish automatically (0% auto-publish; mandatory review gate transitions status to `PENDING_REVIEW`).
7. Restrict editing/deleting on `PENDING_REVIEW` and `PUBLISHED` articles, while allowing revisions on `CHANGES_REQUESTED`.

---

## Technical Context

**Language/Version**: TypeScript 5.x (Node.js 20+), Python 3.11 (AI agent virtual environment)

**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Lucide React, Tiptap Editor (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`), Zod, jsdom / DOMPurify (server-side HTML sanitization), Auth.js (NextAuth v5 beta), Prisma ORM (`@prisma/client`)

**Storage**: PostgreSQL (Neon Serverless) via Prisma; Vercel Blob for cover images and author avatars

**Testing**: End-to-end smoke tests, Playwright / curl / Node script validation, Next.js build compilation (`npm run build`)

**Target Platform**: Web (Vercel Serverless / Node.js runtime, responsive desktop & mobile browsers)

**Project Type**: Full-stack Web Application (Next.js App Router + Python AI agent)

**Performance Goals**: Dashboard page load < 1s; Draft auto-save/mutation < 500ms; Client AI draft generation completed in < 30s

**Constraints**:
- Absolute client data isolation: No contributor can view, edit, or delete another contributor's drafts or profile details.
- 0% auto-publish: Contributor submissions must transition strictly to `PENDING_REVIEW` and never directly to `PUBLISHED`.
- Separate AI quota: Client AI drafting must bypass `lib/automation/lock.ts` and never consume the autonomous daily publishing quota.
- Sanitize all client-submitted HTML on server; append `rel="sponsored nofollow"` to external links.

**Scale/Scope**: Contributor portal with 7 pages (`/dashboard`, `/dashboard/articles`, `/dashboard/articles/new`, `/dashboard/articles/[id]/edit`, `/dashboard/articles/[id]/preview`, `/dashboard/ai/generate`, `/dashboard/settings`), 5 Server Actions, 1 ContributorProfile Prisma model, 4 new `ArticleStatus` enum states.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Spec-Driven Development (SDD)**: Spec `006-client-publishing-portal` is approved and verified.
- [x] **II. Clean, Modular, Reusable Code**: Reuses existing Tiptap editor, Auth.js sessions, UI primitives (`Button`, `Card`, `Badge`, `Input`, `Textarea`), and Python AI runner without duplicating engines.
- [x] **III. Modern Web Best Practices**: App Router Server Components for data fetching; Server Actions with Zod validation for mutations; Tailwind CSS v4 responsive layouts.
- [x] **IV. Simplicity over Overengineering**: Uses single PostgreSQL database with relational `ContributorProfile` and status enum extensions instead of a separate client microservice.
- [x] **V. Separation of Concerns**: Clear split between presentation (`src/app/dashboard/*`, `src/components/client/*`), server actions (`src/lib/actions/client-*.ts`), auth guards (`src/lib/client/auth.ts`), and AI logic (`agent/main.py`).

**Result**: All gates PASS. No constitutional violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/006-client-publishing-portal/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 architectural decisions
├── data-model.md        # Phase 1 schema, Zod models & state transitions
├── contracts/           # Phase 1 interface contracts
│   └── client-portal.contract.json
├── quickstart.md        # Phase 1 validation & run guide
├── checklists/          # Requirements checklist
│   └── requirements.md
└── tasks.md             # Phase 2 actionable task checklist
```

### Source Code (repository root)

```text
prisma/
└── schema.prisma                               # Extended with ContributorProfile & ArticleStatus states

src/
├── app/
│   ├── (auth)/
│   │   └── publish/
│   │       └── page.tsx                        # Public /publish onboarding & login gateway
│   └── dashboard/
│       ├── layout.tsx                          # Protected Client layout with sidebar & navigation
│       ├── page.tsx                            # Overview dashboard with real-time statistics
│       ├── articles/
│       │   ├── page.tsx                        # Client articles listing with filters & pagination
│       │   ├── new/
│       │   │   └── page.tsx                    # Manual article creation view
│       │   └── [id]/
│       │       ├── edit/
│       │       │   └── page.tsx                # Edit draft / revised submission
│       │       └── preview/
│       │           └── page.tsx                # Private preview of article layout & links
│       ├── ai/
│       │   └── generate/
│       │       └── page.tsx                    # AI-assisted article drafting interface
│       └── settings/
│           └── page.tsx                        # Contributor profile management
├── components/
│   ├── client/
│   │   ├── ClientSidebar.tsx                   # Contributor navigation & active route styling
│   │   ├── ClientHeader.tsx                    # Contributor topbar with user profile & logout
│   │   ├── DashboardMetrics.tsx                # Metric cards (Drafts, Pending, Changes, Published)
│   │   ├── ArticleTable.tsx                    # Submission table with status badges & actions
│   │   ├── ArticleForm.tsx                     # Article editor form integrating Tiptap & metadata
│   │   ├── ContributorProfileForm.tsx          # Profile & business metadata editor
│   │   ├── SubmissionDialog.tsx                # Final submission confirmation & rights declaration
│   │   └── AIDraftGeneratorModal.tsx           # AI prompt form with live generation feedback
│   └── editor/
│       └── TiptapEditor.tsx                    # Existing reusable rich-text editor
└── lib/
    ├── actions/
    │   ├── client-articles.ts                  # Server Actions: saveDraft, submitForReview, deleteDraft
    │   ├── client-profile.ts                   # Server Actions: upsertContributorProfile, getContributorProfile
    │   └── client-ai.ts                        # Server Action: generateClientAIDraft
    ├── client/
    │   └── auth.ts                             # requireClientUser(), verifyArticleOwnership()
    └── validation/
        ├── client-article.ts                   # Zod schemas: ClientDraftSchema, ClientSubmissionSchema
        └── contributor-profile.ts              # Zod schema: ContributorProfileSchema
```

**Structure Decision**: Standard Next.js App Router layout with `src/app/dashboard` for the client workspace, keeping `/admin` strictly isolated. Shared UI components placed in `src/components/client/`. Mutations handled via modular Server Actions in `src/lib/actions/`.

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | N/A | Schema extensions and App Router routes follow standard Next.js conventions with zero unnecessary complexity. |
