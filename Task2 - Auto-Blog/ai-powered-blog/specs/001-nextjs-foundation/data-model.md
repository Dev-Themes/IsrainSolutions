# Phase 1: Data Model

## Overview
This specification focuses on the Next.js foundation, Drizzle ORM configuration, and Better Auth initialization. As per the feature specification, full business entities (Articles, CMS schemas) are deferred to future specifications. The only tables required are those mandatory for the Better Auth foundation.

## Entities

### `users`
Represents the authenticated users (clients and admins) in the Better Auth system.
- `id` (text, primary key)
- `name` (text, not null)
- `email` (text, not null, unique)
- `emailVerified` (boolean, not null, default false)
- `image` (text)
- `createdAt` (timestamp, not null)
- `updatedAt` (timestamp, not null)
- `role` (text) - Custom field to support future `ADMIN` and `CLIENT` separation.

### `sessions`
Represents active authentication sessions.
- `id` (text, primary key)
- `userId` (text, not null, references `users.id`)
- `token` (text, not null, unique)
- `expiresAt` (timestamp, not null)
- `ipAddress` (text)
- `userAgent` (text)
- `createdAt` (timestamp, not null)
- `updatedAt` (timestamp, not null)

### `accounts`
Represents linked OAuth accounts (if applicable in the future).
- `id` (text, primary key)
- `userId` (text, not null, references `users.id`)
- `accountId` (text, not null)
- `providerId` (text, not null)
- `accessToken` (text)
- `refreshToken` (text)
- `accessTokenExpiresAt` (timestamp)
- `refreshTokenExpiresAt` (timestamp)
- `scope` (text)
- `password` (text)
- `createdAt` (timestamp, not null)
- `updatedAt` (timestamp, not null)

### `verifications`
Represents Better Auth verifications (e.g., email verification).
- `id` (text, primary key)
- `identifier` (text, not null)
- `value` (text, not null)
- `expiresAt` (timestamp, not null)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Relationships

- `users` 1:N `sessions`
- `users` 1:N `accounts`

## Validation Rules (Zod)

- Application logic will enforce Zod schemas for environment variables at startup (`DATABASE_URL`, `BETTER_AUTH_SECRET`, etc.).
- The database schema boundaries will use `drizzle-zod` or equivalent for type-safe insertions/selections in the future.
