# Data Model: Project Setup & Database Foundation

This document outlines the Prisma schema design supporting the AI-Powered Blogging Platform.

## Entities & Enums

### Enums
- `Role`: `ADMIN`, `CLIENT`
- `ArticleStatus`: `DRAFT`, `PENDING_REVIEW`, `REVISIONS_REQUESTED`, `APPROVED`, `REJECTED`, `PUBLISHED`, `ARCHIVED`
- `AIJobStatus`: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`

### Models

**User**
- `id`: String (UUID, primary key)
- `email`: String (Unique)
- `name`: String?
- `role`: `Role` (Default: `CLIENT`)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Relations*: authoredArticles, notifications, submissions, clientsArticles

**Article**
- `id`: String (UUID, primary key)
- `title`: String
- `slug`: String (Unique index)
- `html`: String?
- `status`: `ArticleStatus` (Default: `DRAFT`)
- `authorId`: String? (Reference to User.id)
- `clientId`: String? (Reference to User.id for guest submissions)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- *Relations*: category, tags, analytics, submissions

**Category**
- `id`: String (UUID, primary key)
- `name`: String
- `slug`: String (Unique)
- *Relations*: articles (1:N)

**Tag**
- `id`: String (UUID, primary key)
- `name`: String
- `slug`: String (Unique)
- *Relations*: articles (M:N implicit via Prisma)

**Submission**
- `id`: String (UUID, primary key)
- `url`: String?
- `clientId`: String (Reference to User.id)
- `articleId`: String? (Reference to Article.id - optional until created/linked)
- `createdAt`: DateTime
- `updatedAt`: DateTime

**AIJob**
- `id`: String (UUID, primary key)
- `prompt`: String
- `result`: String?
- `error`: String?
- `status`: `AIJobStatus` (Default: `PENDING`)
- `scheduledFor`: DateTime?
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Notification**
- `id`: String (UUID, primary key)
- `userId`: String (Reference to User.id)
- `type`: String
- `message`: String
- `read`: Boolean (Default: false)
- `createdAt`: DateTime

**Analytics**
- `id`: String (UUID, primary key)
- `articleId`: String (Reference to Article.id)
- `views`: Int (Default: 0)
- `clicks`: Int (Default: 0)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Validation Rules
- `Article.slug` must be unique to enforce SEO requirements.
- Missing configuration variables throw validation errors securely on server startup via Zod.

## Constraints & Referential Integrity
- If an Article is deleted, its related Analytics are cascaded.
- If a User is deleted, their Authored Articles should be preserved or explicitly reassigned (Restricted).
- All timestamps store UTC.
