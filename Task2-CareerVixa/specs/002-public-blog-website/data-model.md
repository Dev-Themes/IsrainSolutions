# Data Model & Queries: CareerVixa Public Blog Website

This document outlines the Prisma models and the specific database queries required for the public-facing CareerVixa blog. The underlying database schema was established in Phase 1 (Spec 001).

## Entities Utilized

### 1. Article
The primary content entity.
- **Fields**: `id`, `title`, `slug`, `content` (HTML), `coverImage`, `status`, `publishedAt`, `readingTime`
- **Relationships**: Author (User), Category, Tags
- **Constraints**: Only articles with `status = 'PUBLISHED'` must be exposed on public pages.

### 2. User (Author)
Provides authorship information.
- **Fields**: `id`, `name`, `image` (avatar)
- **Exposure**: Only basic profile details (name, image) are exposed publicly. Sensitive info (email, role) must be excluded.

### 3. Category
Organizes articles into broad career topics.
- **Fields**: `id`, `name`, `slug`, `description`

### 4. Tag
Organizes articles into specific keywords.
- **Fields**: `id`, `name`, `slug`

## Required Data Access Queries

All queries must enforce the `status = 'PUBLISHED'` rule and order results by `publishedAt DESC` unless stated otherwise.

1. **`getFeaturedArticles(limit)`**:
   - Returns a subset of published articles for the homepage hero section.
   - Includes author, category, and tags.

2. **`getLatestArticles(limit, page)`**:
   - Returns the most recent published articles, supporting pagination.
   - Includes author, category, and tags.

3. **`getArticleBySlug(slug)`**:
   - Returns a single published article matching the slug.
   - Must include complete relationships: Author, Category, Tags.
   - Used for the article detail page (`/blog/[slug]`).

4. **`getArticlesByCategory(categorySlug, page)`**:
   - Returns paginated published articles belonging to a specific category.

5. **`getArticlesByTag(tagSlug, page)`**:
   - Returns paginated published articles tagged with a specific tag.

6. **`searchArticles(query, page)`**:
   - Performs a text search on `title` or `content` for the given query.
   - Returns paginated published articles.

7. **`getRelatedArticles(articleId, categoryId, tagIds, limit)`**:
   - Recommends other published articles sharing the same category or tags.
   - Excludes the current `articleId`.

8. **`getAllPublishedSlugs()`**:
   - Returns only the `slug` and `publishedAt` fields for all published articles.
   - Used for generating the `sitemap.xml` and static paths.

## Validation Rules

- All queries must handle missing/null relationships gracefully (e.g., an article without a cover image should not crash the page).
- Queries should strictly select only the fields needed for the UI to minimize payload size and avoid exposing sensitive data (e.g., Author emails).
