# Quickstart: Project Setup & Database Foundation

This guide explains how to initialize and validate the foundational setup for this feature locally.

## Prerequisites
- Node.js (v18+)
- Package Manager (npm, yarn, or pnpm)
- Access to a PostgreSQL Database (e.g., Neon or local pg)

## 1. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and configure your local settings. You MUST provide:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   ```

## 2. Dependencies and Initial Setup

Run the following command to install required packages:
```bash
npm install
```

## 3. Database Initialization

Execute Prisma migrations to generate the schema safely:
```bash
npx prisma migrate dev --name init
```
This command automatically applies the schema to your target database and generates the local Prisma Client.

## 4. Run the Application

Start the local Next.js development server:
```bash
npm run dev
```

## 5. Verification Steps

- ✅ Open `http://localhost:3000` to verify the Next.js server runs without errors.
- ✅ Run `npx prisma studio` to view your local database schema and verify the models (User, Article, Category, etc.) exist.
- ✅ Empty a required variable from `.env.local` and restart the server to ensure Zod validation explicitly traps the missing variable without leaking secrets.
