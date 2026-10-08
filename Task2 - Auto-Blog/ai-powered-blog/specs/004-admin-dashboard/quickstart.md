# Quickstart Validation Guide

This guide describes how to validate the Admin Dashboard functionality once implemented.

## Prerequisites

- Application running locally (`npm run dev`)
- PostgreSQL database running and seeded with an `ADMIN` user.
- Authentication environment variables configured (Better Auth).

## Validation Scenarios

### Scenario 1: Authorization Boundary Check
1. Open an incognito window and navigate to `http://localhost:3000/admin`.
2. **Expected**: You should be redirected to the login page or receive a 403/404 response.
3. Login as a `CLIENT` user and navigate to `http://localhost:3000/admin`.
4. **Expected**: You should receive a Forbidden (403) response and cannot access the dashboard.

### Scenario 2: Dashboard Overview Access
1. Login as an `ADMIN` user.
2. Navigate to `http://localhost:3000/admin`.
3. **Expected**: You should see the dashboard overview layout with navigation links to Articles, Categories, Tags, and Users.

### Scenario 3: Article Draft Creation
1. Navigate to `http://localhost:3000/admin/articles/new`.
2. Fill in the title, content, and select a category.
3. Click "Save Draft".
4. **Expected**: The article is saved, you are redirected back to the articles list, and the new article appears with a `DRAFT` status.

### Scenario 4: Article Publication
1. Navigate to the edit page of the previously created draft.
2. Change the status to `PUBLISHED` (or click "Publish").
3. **Expected**: The article is updated in the database, appears in the admin list as `PUBLISHED`, and is now visible on the public website.

### Scenario 5: Taxonomy Protection
1. Navigate to `http://localhost:3000/admin/categories`.
2. Attempt to delete a category that has articles assigned to it.
3. **Expected**: The deletion is prevented by the server, and a safe error message or a prompt to reassign articles is displayed.
