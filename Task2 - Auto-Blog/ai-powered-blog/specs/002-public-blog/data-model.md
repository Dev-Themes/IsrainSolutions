# Data Model: Public Blog & Content

This document outlines the schema requirements to support Spec 002. These will be implemented in `src/db/schema.ts` using Drizzle ORM.

## Entities

### `Category`
Categories are high-level taxonomies (e.g., "Career Development", "Job Search").
* `id`: uuid, primary key
* `name`: text, not null, unique
* `slug`: text, not null, unique
* `description`: text (optional)

### `Tag`
Tags are flexible keywords used to filter articles.
* `id`: uuid, primary key
* `name`: text, not null, unique
* `slug`: text, not null, unique

### `Article`
The core content entity.
* `id`: uuid, primary key
* `slug`: text, not null, unique
* `title`: text, not null
* `excerpt`: text, not null
* `content`: text, not null (HTML content)
* `status`: enum ('DRAFT', 'PUBLISHED', 'REJECTED', 'PENDING'), default 'DRAFT'
* `publishedAt`: timestamp (optional, set when published)
* `authorId`: text (references Better Auth User `id`)
* `authorName`: text, not null (cached or fetched dynamically, required for public display)
* `categoryId`: uuid, references `Category.id`
* `createdAt`: timestamp, default now
* `updatedAt`: timestamp, default now

### `ArticleTag` (Join Table)
Many-to-many relationship between Articles and Tags.
* `articleId`: uuid, references `Article.id`
* `tagId`: uuid, references `Tag.id`
* Primary key: `(articleId, tagId)`

## Queries

### Public Content
* All public queries MUST filter by `status = 'PUBLISHED'`.
* Pagination using `limit` and `offset`.
* Filtering by `categoryId` or `tagId`.
* Search using Postgres `ilike` on `title` or `excerpt`.

## Validation

* `slug` must be URL-safe (lowercase, alphanumeric, hyphens).
* `content` must be sanitized before being displayed, even if it is stored raw.
