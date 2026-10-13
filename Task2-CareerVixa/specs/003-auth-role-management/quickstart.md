# Quickstart & Validation Guide

This guide outlines runnable validation scenarios to prove the Authentication and Role Management feature works end-to-end.

## Prerequisites

1.  **Neon PostgreSQL**: A running instance with connection string in `.env`.
2.  **Prisma**: Run `npx prisma db push` or `npx prisma migrate dev` to ensure the schema is up-to-date.
3.  **Resend**: A valid Resend API key in `.env` (or mock setup for local dev).
4.  **Auth Secret**: A securely generated `AUTH_SECRET` in `.env`.

## Scenarios

### Scenario 1: Client Registration and Login

**Description**: Verify a new user can register, their role defaults to CLIENT, and they can log in.

**Steps**:
1.  Start the dev server: `npm run dev`
2.  Navigate to `/signup`.
3.  Fill out the registration form with valid credentials (e.g., `test@example.com`, `password123`).
4.  Submit the form. Observe a successful registration message or redirect.
5.  Check the database (`npx prisma studio`) to confirm the user exists and role is `CLIENT`.
6.  Navigate to `/login`.
7.  Authenticate with the new credentials.
8.  Verify successful redirection to `/dashboard`.

### Scenario 2: Route Protection and RBAC

**Description**: Verify that unauthenticated users cannot access protected routes, and CLIENT users cannot access ADMIN routes.

**Steps**:
1.  Open an incognito window.
2.  Attempt to navigate directly to `/dashboard`.
3.  **Expected Outcome**: Redirected to `/login`.
4.  Attempt to navigate directly to `/admin`.
5.  **Expected Outcome**: Redirected to `/login`.
6.  Log in with a `CLIENT` account.
7.  Attempt to navigate to `/admin`.
8.  **Expected Outcome**: Access denied (e.g., 403 Forbidden or redirect to a safe page).

### Scenario 3: Admin Access

**Description**: Verify that a user with the ADMIN role can access the admin dashboard.

**Steps**:
1.  Using `npx prisma studio`, manually change a test user's role from `CLIENT` to `ADMIN`.
2.  Log in with the modified user account.
3.  Navigate to `/admin`.
4.  **Expected Outcome**: Successfully loads the admin dashboard.
