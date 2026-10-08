# Quickstart Validation: Authentication & Authorization

To validate that the authentication and authorization features are correctly implemented, follow these scenarios.

## Prerequisites
- The database is running and schema has been pushed (`npm run db:push`).
- The application is running (`npm run dev`).

## Scenario 1: Client Registration & Login
1. Navigate to `http://localhost:3000/register`.
2. Fill out the registration form with valid data and submit.
3. **Expected Outcome**: Account is created, user is logged in automatically, and redirected to the authenticated client area (e.g., dashboard or home).

## Scenario 2: Admin Authorization Guard
1. While logged in as the client from Scenario 1, attempt to navigate to a protected admin route (e.g., `http://localhost:3000/admin`).
2. **Expected Outcome**: Request is rejected (returns a 403 Forbidden or redirects to a safe generic page).

## Scenario 3: Admin Access
1. Using the database or a secure seeder script, upgrade your user account role to `ADMIN`.
2. Navigate to the protected admin route (`http://localhost:3000/admin`).
3. **Expected Outcome**: The page renders successfully, confirming RBAC server-side authorization allows the request.

## Scenario 4: Unauthenticated Access Prevention
1. Log out or open a private browsing window without a session.
2. Attempt to access a protected client route or admin route.
3. **Expected Outcome**: Request is rejected or redirected to the login page.
