# Phase 1: Quickstart & Validation

This guide explains how to validate the Next.js foundation implemented in Spec 001.

## Prerequisites

- Node.js (v18+)
- pnpm / npm / yarn / bun
- A provisioned Neon PostgreSQL database
- API keys for OpenAI, Resend, and Inngest (can be dummy values for startup validation)

## Setup Commands

1. **Clone and Install**
   ```bash
   pnpm install
   ```

2. **Configure Environment**
   Create a `.env.local` file in the project root:
   ```env
   DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
   BETTER_AUTH_SECRET="super-secret-string"
   OPENAI_API_KEY="sk-..."
   RESEND_API_KEY="re_..."
   INNGEST_EVENT_KEY="local"
   INNGEST_SIGNING_KEY="local"
   BLOB_READ_WRITE_TOKEN="vercel_blob_..."
   SENTRY_DSN="https://..."
   ```

3. **Initialize Database**
   ```bash
   # Push schema to Neon PostgreSQL
   pnpm db:push
   # Or run migrations
   pnpm db:migrate
   ```

## Validation Scenarios

### Scenario 1: Environment Validation & Startup
**Command**:
```bash
pnpm run dev
```
**Expected Outcome**: The server starts successfully on `localhost:3000`. No runtime errors are thrown.
**Failure Outcome**: If `.env.local` is missing `DATABASE_URL` or `BETTER_AUTH_SECRET`, the Zod environment validation will crash the app immediately with a clear error message in the console.

### Scenario 2: Global Responsive Layout
**Action**:
1. Open `http://localhost:3000`
2. Open Browser DevTools and test multiple responsive viewpoints (320px, 375px, 640px, 768px, 1024px, 1280px, 1440px).
**Expected Outcome**: All content stays within a defined central `max-width` container. There is no horizontal scrolling, no elements overlapping improperly, and no content clipping.

### Scenario 3: Not Found Handling
**Action**:
Navigate to a random nonexistent route (e.g., `http://localhost:3000/does-not-exist`).
**Expected Outcome**: The application returns a global gracefully-styled 404/Not Found page, matching the application's overall design constraints.

### Scenario 4: Code Quality & Build checks
**Command**:
```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```
**Expected Outcome**: ESLint returns 0 errors. TypeScript compilation succeeds. The Next.js production build completes successfully and produces an optimized output.
