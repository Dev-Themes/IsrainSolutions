import { z } from "zod";

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  dek: z.string().optional().default(""),
  description: z.string().optional().default(""),
  category: z.string().default("Career Development"),
  tags: z.array(z.string()).default([]),
  author: z.string().default("CareerVixa"),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  heroImage: z.object({
    src: z.string(),
    alt: z.string().default(""),
    credit: z.string().default("CareerVixa"),
  }).default({
    src: "/images/articles/placeholder.jpg",
    alt: "Article Image",
    credit: "CareerVixa",
  }),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).optional().default([]),
  takeaways: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  guestAuthorName: z.string().nullable().optional(),
  guestAuthorBio: z.string().nullable().optional(),
  guestAuthorUrl: z.string().nullable().optional(),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export type Article = ArticleFrontmatter & {
  content: string;
  readTime: number; // calculated from content
  isDbArticle?: boolean;
  promotionalUrl?: string | null;
  originalSourceUrl?: string | null;
  viewsCount?: number;
  clicksCount?: number;
  guestAuthorName?: string | null;
  guestAuthorBio?: string | null;
  guestAuthorUrl?: string | null;
};
