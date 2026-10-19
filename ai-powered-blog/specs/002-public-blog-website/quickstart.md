# Quickstart Validation Guide: CareerVixa Public Blog

This guide provides scenarios to validate the implementation of the CareerVixa public blog website.

## Prerequisites

1. Next.js app is running locally: `npm run dev`
2. Database is connected and seeded with sample published and unpublished articles.
3. Access to a web browser and browser developer tools.

## Validation Scenarios

### Scenario 1: Homepage & Content Discovery
**Goal**: Verify the homepage loads, displays articles correctly, and shows the Guest Publishing CTA.
1. Navigate to `http://localhost:3000/`.
2. **Verify**: The hero section displays featured articles.
3. **Verify**: A "Latest Articles" section displays recent content.
4. **Verify**: The "Want to Publish Your Article on CareerVixa?" CTA is visible and clickable.
5. **Verify**: If the database has no published articles, a professional empty state is shown, and no errors occur.

### Scenario 2: Article Consumption & Security
**Goal**: Verify article pages render correctly, XSS is prevented, and unpublished articles are hidden.
1. Navigate to a published article's URL (e.g., `http://localhost:3000/blog/my-first-post`).
2. **Verify**: The article title, author, date, reading time, and formatted HTML content render correctly.
3. **Verify**: (Security Check) Ensure any sample article with `<script>alert('xss')</script>` in its HTML content does NOT execute the alert.
4. Navigate to an unpublished/draft article's URL (e.g., `http://localhost:3000/blog/draft-post`).
5. **Verify**: A 404 page is returned. The draft content is completely inaccessible.

### Scenario 3: Search & Taxonomy Filtering
**Goal**: Verify searching, category, and tag filtering works with pagination and empty states.
1. Navigate to `http://localhost:3000/search?q=career`.
2. **Verify**: Articles containing "career" in title/content are listed.
3. Navigate to `http://localhost:3000/search?q=thiswillnevermatchanything`.
4. **Verify**: A helpful empty state message is shown without breaking the layout.
5. Navigate to `http://localhost:3000/categories/technology`.
6. **Verify**: Only published articles in the "Technology" category are displayed.

### Scenario 4: SEO and Metadata
**Goal**: Verify critical SEO assets are generated accurately.
1. Right-click on an article page and select "View Page Source" or inspect the `<head>`.
2. **Verify**: `<title>`, `<meta name="description">`, and Open Graph (`og:title`, `og:image`) tags are present and match the article data.
3. Navigate to `http://localhost:3000/sitemap.xml`.
4. **Verify**: Only published article URLs are present. Draft/unpublished URLs are excluded.
5. Navigate to `http://localhost:3000/robots.txt`.
6. **Verify**: Standard crawler directives are present and point to the `sitemap.xml`.

### Scenario 5: Static Pages
**Goal**: Verify standard static/informational pages render correctly.
1. Navigate to `http://localhost:3000/about`, `/contact`, `/privacy`, and `/terms`.
2. **Verify**: Each page renders its content within the site's standard layout (header/footer present).
