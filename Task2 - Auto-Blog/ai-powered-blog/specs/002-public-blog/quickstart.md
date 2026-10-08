# Quickstart: Validation Guide for Spec 002

This guide outlines how to validate the Public Blog & Content feature once implemented.

## Prerequisites

1. The development server must be running (`pnpm dev`).
2. The database schema must be pushed (`pnpm db:push`).
3. Seed data script (e.g., `pnpm db:seed`) should be executed to insert dummy categories, tags, and articles (both `PUBLISHED` and `DRAFT`).

## Validation Scenarios

### Scenario 1: Verify Homepage
* **Action**: Navigate to `http://localhost:3000/`
* **Expected**: The homepage renders correctly, displaying featured and recent articles. Only `PUBLISHED` articles are visible.

### Scenario 2: Verify Blog Listing & Pagination
* **Action**: Navigate to `http://localhost:3000/blog` (or wherever the main listing is mounted).
* **Expected**: A paginated list of `PUBLISHED` articles is displayed. Clicking "Next Page" updates the list correctly.

### Scenario 3: Verify Search and Filtering
* **Action**: Use the search input to search for a keyword (e.g., "Resume").
* **Expected**: Only relevant `PUBLISHED` articles containing the keyword are returned.
* **Action**: Click on a category tag (e.g., "Remote Work").
* **Expected**: The list is filtered to only show articles belonging to that category.

### Scenario 4: Verify Article Reading & Sanitization
* **Action**: Click on an article title to view its full content.
* **Expected**: The URL slug matches the article. The content is rendered safely. If the seeded content contained malicious `<script>` tags, they should be stripped out. Related articles are displayed below the content.

### Scenario 5: Verify Non-Public Content is Hidden
* **Action**: Try to navigate directly to the URL slug of an article with the `DRAFT` status.
* **Expected**: The application returns a 404 Not Found page.

### Scenario 6: Verify Responsive Layout
* **Action**: Resize the browser down to 320px width on any page.
* **Expected**: No horizontal scrolling, no overlapping content, and navigation/cards stack gracefully.
