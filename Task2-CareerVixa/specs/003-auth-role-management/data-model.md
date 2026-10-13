# Data Model: Authentication & Role Management

## Entities

### User
Represents an authenticated user within the system, either a Client or an Admin.
- **Fields**:
  - `id` (String, primary key, UUID/CUID)
  - `name` (String, optional)
  - `email` (String, unique)
  - `emailVerified` (DateTime, optional)
  - `image` (String, optional)
  - `passwordHash` (String, optional) - Stores the Argon2id hash.
  - `role` (Enum `UserRole` [ADMIN, CLIENT], default: CLIENT)
  - `createdAt` (DateTime)
  - `updatedAt` (DateTime)
- **Relationships**:
  - `accounts`: One-to-Many with `Account`
  - `sessions`: One-to-Many with `Session`

### Account
Auth.js standard account model for tracking OAuth integrations (if added in the future).
- **Fields**: standard Auth.js fields (`id`, `userId`, `type`, `provider`, `providerAccountId`, `refresh_token`, `access_token`, `expires_at`, `token_type`, `scope`, `id_token`, `session_state`)
- **Relationships**:
  - `user`: Many-to-One with `User`

### Session
Auth.js standard session model for database-backed sessions.
- **Fields**:
  - `id` (String, primary key)
  - `sessionToken` (String, unique)
  - `userId` (String)
  - `expires` (DateTime)
- **Relationships**:
  - `user`: Many-to-One with `User`

### VerificationToken
Used for email verification and password resets.
- **Fields**:
  - `identifier` (String) - Typically the email address.
  - `token` (String, unique)
  - `expires` (DateTime)
- **Constraints**:
  - Unique compound index on `@@unique([identifier, token])`

## Validation Rules

- `email` must be a valid email format.
- `password` (before hashing) must meet strength requirements (e.g., minimum 8 characters).
- Public registration routes must strictly assign the `CLIENT` role. `ADMIN` roles must only be assigned via secure, internal processes or manual database updates.
