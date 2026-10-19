# Technical Research & Architecture Decisions: CareerVixa Client Publishing Portal

**Feature**: Spec 006 — CareerVixa Client Dashboard & Guest Publishing Portal  
**Date**: 2026-10-11  
**Status**: Completed  

---

## 1. Contributor Profile Architecture

### Context
External guest contributors submit articles under the `CLIENT` role. They need to provide contributor information (Full Name, Country, Organization/Company, Phone, Bio, Website URL) that persists across multiple articles.

### Decision
Extend the Prisma schema with a dedicated `ContributorProfile` model linked 1-to-1 with `User` (`userId String @unique`).

### Rationale
- Decouples core NextAuth credentials (`User`) from public and editorial contributor metadata.
- Pre-fills contributor details across multiple submissions without requiring re-entry.
- Allows contributors to update their organization or website centrally without modifying existing published/archived records.

### Alternatives Considered
- *Inlining in User*: Pollutes the base Auth.js User model with contributor-specific marketing and contact fields.
- *Duplicating on each Article*: Violates normalization and leads to conflicting author bios across an author's articles.

---

## 2. Article Lifecycle & Submission State Machine

### Context
CareerVixa currently supports `DRAFT`, `PUBLISHED`, `UNPUBLISHED`, and `ARCHIVED` in `ArticleStatus`. Guest contributors must submit drafts for mandatory review, receive revision requests, and have their articles approved before publication. Client articles must **never** publish automatically.

### Decision
Extend the `ArticleStatus` enum in Prisma with:
- `PENDING_REVIEW` — Submitted by contributor; locked from client editing.
- `CHANGES_REQUESTED` — Reviewed by administrator; editable by contributor for revisions.
- `REJECTED` — Declined submission; read-only.
- `APPROVED` — Approved by administrator (staged for manual publication in Spec 007).

Add submission metadata to `Article`:
- `originalSourceUrl String?`
- `promotionalUrl String?`
- `contentOrigin String @default("MANUAL")` (MANUAL vs. AI)
- `submittedAt DateTime?`
- `rightsDeclared Boolean @default(false)`
- `termsAcceptedAt DateTime?`
- `reviewNotes String?` (Feedback from editor)

### State Transitions

```
[DRAFT] --------------(Client submits)-------------> [PENDING_REVIEW]
   ^                                                        |
   |-----(Admin requests changes)--- [CHANGES_REQUESTED] <---|
   |                                                        |
   |                                                        |----(Admin rejects)----> [REJECTED]
   |                                                        |
   |                                                        |----(Admin approves)---> [APPROVED]
   |                                                                                       |
   |                                                                                       v
   |<-------------------------------------------------------------------------------- [PUBLISHED]
```

### Rationale
Single-table architecture ensures referential integrity with Categories, Tags, and Author relations. Server Actions enforce valid transitions.

---

## 3. Editor Reuse & HTML Sanitization

### Context
Contributors write articles with headings, lists, links, and bold/italic formatting. Content must be safe from script injection (XSS).

### Decision
Reuse `@/components/editor/TiptapEditor.tsx` in the client portal. Sanitize all HTML on the server using `DOMPurify` (via `jsdom` in `lib/validation/content.ts`).

### Link Rules for Guest Content
All outbound promotional and external links in guest articles are automatically formatted with `rel="sponsored nofollow"` attributes to safeguard SEO domain authority and comply with search guidelines.

---

## 4. Client AI Generation Architecture & Quota Isolation

### Context
Contributors may generate AI-assisted drafts by providing career topics, keywords, and instructions.

### Decision
Reuse `agent/main.py` invoked through a dedicated Server Action (`generateClientAIDraft`).
1. Validates that the topic aligns with CareerVixa's career/jobs niche.
2. Runs live web research via Tavily and generation via Gemini/OpenAI.
3. Automatically sets `contentOrigin: "AI"`.
4. Saves the article strictly with `status: "DRAFT"`.
5. Bypasses and never touches `lib/automation/lock.ts` or Inngest scheduled publishing queues.

---

## 5. Security & Ownership Enforcement

### Context
Contributors must only be able to view, edit, or delete their own articles and drafts.

### Decision
- Create `requireClientUser()` in `@/lib/client/auth.ts` ensuring active session and `role === "CLIENT"`.
- Create `verifyArticleOwnership(articleId, session.user.id)` which queries `prisma.article.findFirst({ where: { id: articleId, authorId: session.user.id } })`.
- Strictly enforce that articles with status `PENDING_REVIEW` or `PUBLISHED` cannot be edited or deleted by clients.
