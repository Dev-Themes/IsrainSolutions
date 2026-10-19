# Implementation Plan: CareerVixa Public Blog Website

**Branch**: `002-public-blog-website` | **Date**: 2026-10-10 | **Spec**: [Spec 002](spec.md)

**Input**: Feature specification from `specs/002-public-blog-website/spec.md`

## Summary

Build CareerVixa, a modern, responsive, and SEO-optimized public-facing blogging platform using Next.js App Router. This phase focuses solely on content consumption: Homepage, Article details, Categories, Tags, Search, and Static pages, sourcing data from the existing Prisma database schema, and displaying only `PUBLISHED` content.

## Technical Context

**Language/Version**: TypeScript

**Primary Dependencies**: Next.js App Router, Tailwind CSS v4, shadcn/ui

**Storage**: PostgreSQL (Neon) with Prisma ORM

**Testing**: Standard Next.js / React testing (if applicable)

**Target Platform**: Web Browsers (Vercel deployment)

**Project Type**: Full-stack Web Application (Next.js)

**Performance Goals**: < 1.5s interactive load time, 95+ SEO/Accessibility scores

**Constraints**: Server Components by default, responsive design without layout breakages, no client-side API secrets

**Scale/Scope**: Support standard blog traffic with pagination and fast searching

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven Development**: Spec 002 is approved.
- [x] **Clean, Modular Code**: Using standard Next.js App Router structures and reusable UI components.
- [x] **Modern Web Best Practices**: Next.js App Router, TypeScript, SEO (metadata, canonicals, sitemap, JSON-LD), Tailwind v4, shadcn/ui.
- [x] **Simplicity**: Using standard Next.js Server Components and Prisma queries. No unnecessary state management or custom UI libraries.
- [x] **Separation of Concerns**: UI components separated from server-side data fetching. Public pages clearly separated from future admin/client portals.

## Project Structure

### Documentation (this feature)

```text
specs/002-public-blog-website/
├── plan.md              # This file
├── data-model.md        # Data models and Prisma queries required
├── quickstart.md        # Validation scenarios
└── tasks.md             # Tasks for implementation
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (public)/
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   ├── categories/
│   │   │   ├── [slug]/
│   │   ├── contact/
│   │   ├── privacy/
│   │   ├── search/
│   │   ├── tags/
│   │   │   ├── [slug]/
│   │   ├── terms/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── sitemap.ts
│   └── robots.txt
├── components/
│   ├── ui/              # shadcn UI components
│   └── shared/          # Reusable blog components (ArticleCard, Header, Footer, EmptyState)
└── lib/
    ├── prisma.ts        # Database client
    └── queries/         # Reusable data-access functions (articles, categories, tags)
```

**Structure Decision**: A standard Next.js App Router structure with a `(public)` route group to encapsulate all public-facing pages, keeping them separate from future `(admin)` or `(client)` route groups. Reusable UI components and server-side data queries are separated into `components/` and `lib/queries/` respectively.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
