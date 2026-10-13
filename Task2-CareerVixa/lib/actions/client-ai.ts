"use server";

import { exec } from "child_process";
import { promisify } from "util";
import { prisma } from "@/lib/prisma";
import { requireClientUser } from "@/lib/client/auth";
import { validateArticleContent } from "@/lib/validation/content";
import { ArticleStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

const execAsync = promisify(exec);

interface GenerateClientAIDraftInput {
  topic: string;
  keywords?: string[];
  instructions?: string;
  categoryId?: string;
}

export async function generateClientAIDraft(input: GenerateClientAIDraftInput) {
  const session = await requireClientUser({ redirectOnFail: false });
  const userId = session.user.id;

  if (!input.topic || input.topic.trim().length < 5) {
    throw new Error("Please provide a specific career topic (minimum 5 characters).");
  }

  // Construct topic with optional keywords and instructions to guide the research agent
  let fullPrompt = input.topic.trim();
  if (input.keywords && input.keywords.length > 0) {
    fullPrompt += ` (Focus areas: ${input.keywords.join(", ")})`;
  }
  if (input.instructions && input.instructions.trim().length > 0) {
    fullPrompt += ` - ${input.instructions.trim()}`;
  }

  const sanitizedTopic = fullPrompt.replace(/"/g, '\\"');
  const pythonCmd = process.platform === "win32"
    ? `venv\\Scripts\\python agent/main.py --topic "${sanitizedTopic}"`
    : `venv/bin/python agent/main.py --topic "${sanitizedTopic}"`;

  try {
    const { stdout, stderr } = await execAsync(pythonCmd, { timeout: 60000 });
    if (stderr) {
      console.warn("Client AI Generator Stderr:", stderr);
    }

    const rawArticle = JSON.parse(stdout);
    const validated = validateArticleContent(rawArticle);

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
    const tagConnect = input.keywords?.map((keyword) => ({
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
    throw new Error(error.message || "Failed to generate AI draft. Please try a different career topic.");
  }
}
