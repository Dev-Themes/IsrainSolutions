# AI-Powered Blogging Platform

A secure, scalable foundation built with Next.js App Router, TypeScript, Tailwind CSS v4, and Neon PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Access to a PostgreSQL instance (e.g., Neon or local)

## Local Setup & Installation

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy the example environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   ```

3. **Database Initialization & Migrations:**
   Push the schema to your database and generate the Prisma Client:
   ```bash
   npx prisma migrate dev --name init
   ```
   *(Note: This creates all tables: Users, Articles, Categories, Tags, Submissions, AIJobs, Notifications, Analytics).*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to view the application.

## Development Commands

- `npm run dev`: Start the local Next.js development server.
- `npm run build`: Build the application for production.
- `npm run lint`: Run ESLint to analyze code quality.
- `npm run test`: Execute the test suite using Vitest.
- `npx prisma studio`: Open a visual editor for your database locally.
