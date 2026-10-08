# Data Model

## Schema Extensions & Entities

The Admin Dashboard relies on existing or extended Drizzle ORM schemas.

### 1. `users` (Existing, Extended for Role)
- **Fields**: `id`, `name`, `email`, `role` (enum: 'CLIENT', 'ADMIN'), `createdAt`, `updatedAt`
- **Validation**: Role must be valid. Only ADMIN can access the dashboard.

### 2. `articles`
- **Fields**: 
  - `id` (uuid)
  - `title` (string)
  - `slug` (string, unique)
  - `excerpt` (text, optional)
  - `content` (text)
  - `status` (enum: 'DRAFT', 'PUBLISHED')
  - `authorId` (fk -> users.id)
  - `categoryId` (fk -> categories.id)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)
  - `publishedAt` (timestamp, optional)
- **Relationships**: Belongs to `users` (author) and `categories`. Has many `articleTags`.
- **Validation**: `title`, `slug`, `content` are required. Slug must be unique. Status transitions allowed: DRAFT <-> PUBLISHED.

### 3. `categories`
- **Fields**:
  - `id` (uuid)
  - `name` (string)
  - `slug` (string, unique)
  - `description` (text, optional)
- **Relationships**: Has many `articles`.
- **Validation**: Prevent deletion if referenced by existing articles (restrict/reassign).

### 4. `tags`
- **Fields**:
  - `id` (uuid)
  - `name` (string)
  - `slug` (string, unique)
- **Relationships**: Has many `articleTags`.

### 5. `articleTags` (Join Table)
- **Fields**: `articleId`, `tagId`
- **Relationships**: Links `articles` and `tags`.

## Validation Rules
- All mutations (Create, Update, Delete) are validated using Zod schemas on the server before database execution.
- Destructive actions require explicit confirmation from the client-side UI and are validated securely on the server.
