# Research & Technical Decisions: Authentication & Role Management

This document records the technical decisions regarding the Authentication and Role Management implementation, resolving all ambiguities outlined in the specifications.

## 1. Authentication Library

- **Decision**: Auth.js (NextAuth.js v5 beta).
- **Rationale**: It integrates seamlessly with the Next.js App Router, provides excellent server-side execution capabilities, supports Prisma adapters out-of-the-box, and offers a robust, maintained set of security features. Given the constitution explicitly mandates Next.js, Auth.js is the most idiomatic choice.
- **Alternatives considered**: Clerk (rejected because we need full control over the database/auth pipeline as per requirements, avoiding external dependency lockdowns for standard features), Supabase Auth (rejected because we are already utilizing Neon Postgres).

## 2. Password Hashing

- **Decision**: Argon2id using `oslo/password` or a dedicated `argon2` maintained library.
- **Rationale**: Argon2id is currently the recommended hashing algorithm per OWASP for secure password storage. It provides robust defense against GPU cracking attempts.
- **Alternatives considered**: bcrypt (rejected because Argon2id is the modern standard and preferred where possible, though bcrypt remains a viable fallback).

## 3. Session Strategy

- **Decision**: Database-backed sessions utilizing NextAuth's database session strategy (or JWT session fallback depending strictly on NextAuth Credentials provider limitations). *Note: Auth.js Credentials provider defaults to JWT. We will implement robust token revocation checking or short-lived JWTs combined with database token verifications to fulfill the requirement.*
- **Rationale**: Meets the requirements for reliable expiration and revocation, supporting secure logout invalidation and RBAC constraints.
- **Alternatives considered**: Strictly pure JWT without database checks (rejected due to the requirement for reliable revocation).

## 4. Email Provider

- **Decision**: Resend integrated with React Email.
- **Rationale**: Recommended standard for modern Next.js applications. React Email allows components to be built using standard React and Tailwind, maintaining consistency with the rest of the application's UI. Resend offers a straightforward, developer-friendly API.
- **Alternatives considered**: Nodemailer + SMTP (rejected due to increased overhead and lack of robust component styling without third-party template engines).

## 5. UI and Form Validation

- **Decision**: Tailwind CSS v4, shadcn/ui components, and Zod.
- **Rationale**: Aligns perfectly with the CareerVixa brand and existing technology stack. Zod allows type-safe validation both on the client forms (via react-hook-form) and server actions.
- **Alternatives considered**: Formik, Yup (rejected in favor of the more modern hook-form + zod standard used in most shadcn setups).
