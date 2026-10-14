"use server";

import { prisma } from "@/lib/prisma";
import { requireClientUser } from "@/lib/client/auth";
import { generateCareerArticle } from "@/lib/ai/generate-article";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface GenerateClientAIDraftInput {
  topic: string;
  keywords?: string[];
  instructions?: string;
  categoryId?: string;
}

export type GenerateClientAIDraftResult = {
  success: boolean;
  articleId?: string;
  title?: string;
  slug?: string;
  status?: ArticleStatus;
  error?: string;
};

export async function generateClientAIDraft(
  input: GenerateClientAIDraftInput
): Promise<GenerateClientAIDraftResult> {
  try {
    const session = await requireClientUser({ redirectOnFail: false });
    if (!session?.user?.id) {
      return {
        success: false,
        error: "Please sign in to generate AI career articles.",
      };
    }
    const userId = session.user.id;

    if (!input.topic || input.topic.trim().length < 5) {
      return {
        success: false,
        error: "Please provide a specific career topic (minimum 5 characters).",
      };
    }

    // Generate article using the unified engine (Tavily research + Gemini/OpenAI synthesis)
    const validated = await generateCareerArticle({
      topic: input.topic.trim(),
      keywords: input.keywords,
      instructions: input.instructions,
    });

    // Resolve category
    let categoryId = input.categoryId;
    if (!categoryId) {
      const defaultCategory = await prisma.category.findFirst({
        where: { name: { contains: "Career", mode: "insensitive" } },
      });
      categoryId = defaultCategory?.id;
    }

    // Ensure unique slug
    let uniqueSlug = validated.slug;
    const existingSlug = await prisma.article.findUnique({ where: { slug: uniqueSlug } });
    if (existingSlug) {
      uniqueSlug = `${uniqueSlug}-${Date.now().toString(36)}`;
    }

    // Connect tags if keywords provided
    const tagConnect =
      input.keywords?.map((keyword) => ({
        where: { name: keyword.trim() },
        create: {
          name: keyword.trim(),
          slug: keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        },
      })) || [];

    // Save strictly as private DRAFT. NEVER publish automatically.
    const article = await prisma.article.create({
      data: {
        title: validated.title,
        slug: uniqueSlug,
        summary: validated.summary,
        content: validated.content,
        metaTitle: validated.metaTitle,
        metaDescription: validated.metaDescription,
        status: ArticleStatus.DRAFT, // Strictly DRAFT!
        contentOrigin: "AI",
        isAIGenerated: true,
        aiSourceReferences: JSON.stringify(validated.sources || []),
        authorId: userId,
        categoryId: categoryId || null,
        tags: {
          connectOrCreate: tagConnect,
        },
      },
    });

    revalidatePath("/dashboard/articles");
    revalidatePath("/dashboard");

    return {
      success: true,
      articleId: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
    };
  } catch (error: any) {
    console.error("Error generating client AI draft:", error);
    return {
      success: false,
      error:
        error?.message ||
        "Failed to generate AI draft. Please try a different career topic or try again in a few moments.",
    };
  }
}
