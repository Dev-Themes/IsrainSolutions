import { z } from "zod";

export const ClientDraftSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required").max(150, "Title cannot exceed 150 characters"),
  slug: z.string().optional().nullable(),
  summary: z.string().optional().nullable(),
  content: z.string().default(""),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional().nullable(),
  originalSourceUrl: z.string().optional().nullable(),
  promotionalUrl: z.string().optional().nullable(),
});

export const ClientSubmissionSchema = z.object({
  articleId: z.string().min(1, "Article ID is required"),
  promotionalUrl: z.string().min(1, "A valid promotional or website URL is required (e.g. https://yourbusiness.com)"),
  originalSourceUrl: z.string().optional().nullable(),
  rightsDeclared: z.literal(true, {
    message: "You must declare ownership and publication rights",
  }),
  termsAccepted: z.literal(true, {
    message: "You must accept CareerVixa publishing terms",
  }),
});

export type ClientDraftInput = z.infer<typeof ClientDraftSchema>;
export type ClientSubmissionInput = z.infer<typeof ClientSubmissionSchema>;
