# Data Model: CareerVixa Client Publishing Portal

**Feature**: Spec 006 — CareerVixa Client Dashboard & Guest Publishing Portal  
**Date**: 2026-10-11  
**Status**: Completed  

---

## 1. Entity Definitions & Schema Extensions

### Extended `ArticleStatus` Enum
```prisma
enum ArticleStatus {
  DRAFT
  PENDING_REVIEW       // Contributor submitted for review; locked from client editing
  CHANGES_REQUESTED    // Admin requested revisions; client can edit & resubmit
  REJECTED             // Submission declined
  APPROVED             // Approved by Admin; staged for publication
  PUBLISHED            // Live on public website
  UNPUBLISHED          // Hidden from public website
  ARCHIVED             // Deprecated
}
```

### New Model: `ContributorProfile`
Captures guest author information associated 1-to-1 with a `User`.

```prisma
model ContributorProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fullName        String
  organization    String?
  country         String
  phoneNumber     String?
  bio             String?  @db.Text
  websiteUrl      String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Extended Model: `Article`
Additions to support guest contributor submissions, promotional provenance, and editorial workflow:

```prisma
// Fields added to Article:
model Article {
  // ... existing fields (id, title, slug, summary, content, status, etc.)
  
  // Submission & Contributor Metadata:
  originalSourceUrl   String?          @db.Text // URL if previously published elsewhere
  promotionalUrl      String?          @db.Text // Required for promotional submissions
  contentOrigin       String           @default("MANUAL") // "MANUAL" or "AI"
  submittedAt         DateTime?
  rightsDeclared      Boolean          @default(false)
  termsAcceptedAt     DateTime?
  reviewNotes         String?          @db.Text // Editor feedback for revisions/rejection
}
```

### User Model Relation Update
```prisma
model User {
  // ... existing fields
  contributorProfile ContributorProfile?
}
```

---

## 2. Validation Rules & Zod Schemas

### Contributor Profile Schema (`ContributorProfileSchema`)
```typescript
export const ContributorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  organization: z.string().max(100).optional().nullable(),
  country: z.string().min(2, "Country is required").max(100),
  phoneNumber: z.string().max(30).optional().nullable(),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional().nullable(),
  websiteUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
});
```

### Client Draft Save Schema (`ClientDraftSchema`)
Allows saving work-in-progress without strict validation of all publication fields:
```typescript
export const ClientDraftSchema = z.object({
  title: z.string().min(1, "Title is required").max(150),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/),
  summary: z.string().max(300).optional().nullable(),
  content: z.string().min(1, "Content cannot be empty"),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().url().optional().nullable().or(z.literal("")),
  originalSourceUrl: z.string().url().optional().nullable().or(z.literal("")),
  promotionalUrl: z.string().url().optional().nullable().or(z.literal("")),
});
```

### Final Submission Schema (`ClientSubmissionSchema`)
Strict validation required to transition an article from `DRAFT` or `CHANGES_REQUESTED` to `PENDING_REVIEW`:
```typescript
export const ClientSubmissionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(120),
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  summary: z.string().min(50, "Excerpt must be at least 50 characters").max(300),
  content: z.string().min(300, "Article content must be at least 300 words"),
  categoryId: z.string().min(1, "Career category is required"),
  tags: z.array(z.string()).min(1, "At least one relevant tag is required"),
  promotionalUrl: z.string().url("Valid promotional or website URL is required"),
  originalSourceUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  rightsDeclared: z.literal(true, {
    errorMap: () => ({ message: "You must declare ownership and publication rights" }),
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept CareerVixa publishing terms" }),
  }),
});
```

---

## 3. State Transition Matrix & Permissions

| Current Status | Allowed Next Status | Trigger / Action | Who Can Perform |
| :--- | :--- | :--- | :--- |
| **DRAFT** | `PENDING_REVIEW` | Submit for Review | Client (Author) |
| **DRAFT** | *(Deleted)* | Delete Draft | Client (Author) |
| **PENDING_REVIEW** | `DRAFT` | Withdraw Submission | Client (Author) |
| **PENDING_REVIEW** | `CHANGES_REQUESTED` | Request Changes | Admin (Spec 007) |
| **PENDING_REVIEW** | `REJECTED` | Reject Submission | Admin (Spec 007) |
| **PENDING_REVIEW** | `APPROVED` | Approve Submission | Admin (Spec 007) |
| **CHANGES_REQUESTED**| `PENDING_REVIEW` | Resubmit for Review | Client (Author) |
| **APPROVED** | `PUBLISHED` | Publish to Blog | Admin (Spec 007) |
| **PUBLISHED** | `UNPUBLISHED` | Unpublish | Admin |
