# Data Model: Authentication & Authorization

This feature extends the existing Better Auth schema created in Spec 001.

## Entities

### `user`
Represents an authenticated individual in the system.

**New Fields:**
- `role`: Enum/String representing authorization level (`"CLIENT" | "ADMIN"`). Default: `"CLIENT"`.

## Validation Rules

- `role` must be validated via Zod schemas when created or updated.
- Authentication endpoints (login, register) must validate `email` and `password` according to secure rules (e.g., min length, formats).

## Relationships
- A `user` has many `session` records.
- (Future specifications will link `user.id` to `articles.authorId` and submissions.)
