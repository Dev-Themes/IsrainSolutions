# Quickstart & Validation Guide: CareerVixa Client Publishing Portal

**Feature**: Spec 006 — CareerVixa Client Dashboard & Guest Publishing Portal  
**Branch**: `006-client-publishing-portal`  
**Date**: 2026-10-11  

---

## 1. Prerequisites & Environment Setup

Ensure the database schema has been synchronized with the new `ContributorProfile` model and `ArticleStatus` enum values:

```bash
# Push schema changes to Neon PostgreSQL
npx prisma db push

# Regenerate Prisma Client
npx prisma generate
```

Ensure environment variables are configured in `.env.local`:
- `DATABASE_URL`: Active Neon PostgreSQL connection
- `AUTH_SECRET`: NextAuth session secret
- `GEMINI_API_KEY`: Google Gemini API key for AI generation
- `TAVILY_API_KEY`: Tavily API key for live web research

Start the Next.js development server:
```bash
npm run dev
```

---

## 2. Platform Accounts

| Role | Email | Password |
|---|---|---|
| **Platform Administrator** | `devthemes4@gmail.com` | *(Your admin credentials)* |
| **New Guest Contributor** | *(Any registered email via `/signup`)* | *(Chosen contributor password)* |

---

## 3. End-to-End Validation Scenarios

### Scenario 1: Onboarding, Login & Dashboard Metrics (US1)
1. Visit `http://localhost:3000/publish`.
2. Click "Get Started" or "Publish as Guest".
3. Sign in using the Client credentials.
4. Verify redirection to `http://localhost:3000/dashboard`.
5. Verify the overview cards render real-time counts:
   - Draft Articles: Count of `DRAFT` articles owned by the contributor.
   - Pending Review: Count of `PENDING_REVIEW` articles.
   - Published: Count of `PUBLISHED` articles.
   - Changes Requested: Count of `CHANGES_REQUESTED` articles.
6. Verify access control: Attempting to navigate to `http://localhost:3000/admin` is blocked with an HTTP 403 or redirect.

### Scenario 2: Contributor Profile Management (US2)
1. Navigate to `http://localhost:3000/dashboard/settings`.
2. Update Full Name, Country, Organization, Phone Number, Bio, and Website URL.
3. Click "Save Profile".
4. Refresh the page and confirm all fields are preserved from `ContributorProfile`.

### Scenario 3: Manual Article Creation & Draft Saving (US2)
1. Navigate to `http://localhost:3000/dashboard/articles/new`.
2. Enter Title: `"10 High-Income Tech Skills to Master in 2027"`.
3. Choose Category: `"Career Development"`.
4. Enter Body Content using Tiptap editor with headings, bullet points, and links.
5. Click "Save Draft".
6. Navigate to `http://localhost:3000/dashboard/articles`.
7. Confirm the draft appears in the list with badge `Draft` and origin `Manual`.

### Scenario 4: AI-Assisted Article Generation (US4)
1. Navigate to `http://localhost:3000/dashboard/ai/generate`.
2. Enter Topic: `"How to Transition into AI Engineering Without a CS Degree"`.
3. Enter Keywords: `machine learning, career switch, portfolio projects`.
4. Click "Generate Draft".
5. Wait ~15-25 seconds for Tavily research and Gemini drafting to complete.
6. Verify redirection to the editor (`/dashboard/articles/[id]/edit`) with generated title, structured body, and verified citations.
7. Verify article badge is `Draft` and origin is `AI`.
8. Verify that the daily platform-owned automation lock was **NOT** consumed.

### Scenario 5: Article Preview & Mandatory Review Submission (US3)
1. Open the created draft in `/dashboard/articles/[id]/edit`.
2. Click "Preview" to open `/dashboard/articles/[id]/preview`.
3. Verify formatting, rendered typography, and outbound links (with `rel="sponsored nofollow"`).
4. Click "Submit for Review".
5. In the submission modal, provide:
   - Promotional Website URL (e.g., `https://example.com/bootcamp`).
   - Original Source URL (optional).
   - Check the box declaring ownership & publication rights.
   - Check the box accepting CareerVixa's publishing terms.
6. Click "Confirm Submission".
7. Verify status updates to `Pending Review`.
8. Visit the public blog (`http://localhost:3000/articles`) in an incognito window:
   - **CONFIRM**: The article does NOT appear anywhere on the public blog (0% auto-publish verified).
9. Return to the dashboard: Verify the article cannot be edited or deleted while in `Pending Review`.

### Scenario 6: Revisions & Editorial Loop (US5)
1. In the database or admin console, simulate an admin requesting revisions by updating status to `CHANGES_REQUESTED` with `reviewNotes: "Please add more details regarding portfolio project examples."`.
2. As the client, refresh `/dashboard/articles`.
3. Observe the `Changes Requested` badge and editor notes callout.
4. Click "Edit Article", expand the portfolio section, and click "Resubmit for Review".
5. Confirm status transitions back to `Pending Review`.

---

## 4. Automated Verification Commands

Run the full project build and type checks to guarantee zero regressions:

```bash
npm run build
```

Expected result: All 27+ routes compile cleanly with 0 TypeScript or build errors.
