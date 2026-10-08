import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  categoryId: z.string().uuid("Invalid category ID"),
  status: z.enum(["DRAFT", "PUBLISHED", "REJECTED", "PENDING"]).default("DRAFT"),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  description: z.string().optional(),
});

export const tagSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
});
