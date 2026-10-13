import { z } from "zod";

export const ClientDraftSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(150, "Title cannot exceed 150 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  summary: z.string().max(300, "Excerpt cannot exceed 300 characters").optional().nullable(),
  content: z.string().min(1, "Content cannot be empty"),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  originalSourceUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  promotionalUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
});

export const ClientSubmissionSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  promotionalUrl: z.string().url("A valid promotional or website URL is required (e.g. https://yourbusiness.com)"),
  originalSourceUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  rightsDeclared: z.literal(true, {
    message: "You must declare ownership and publication rights",
  }),
  termsAccepted: z.literal(true, {
    message: "You must accept CareerVixa publishing terms",
  }),
});

export type ClientDraftInput = z.infer<typeof ClientDraftSchema>;
export type ClientSubmissionInput = z.infer<typeof ClientSubmissionSchema>;
