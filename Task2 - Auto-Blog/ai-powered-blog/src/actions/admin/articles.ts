"use server";

import { db } from "@/db";
import { articles } from "@/db/schema";
import { requireAdmin, getSession } from "@/lib/auth/guards";
import { articleSchema } from "@/lib/validations/admin";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createArticle(data: z.infer<typeof articleSchema>) {
  const session = await getSession();
  const isAdmin = await requireAdmin();
  
  if (!isAdmin || !session) {
    throw new Error("Unauthorized");
  }

  const validatedData = articleSchema.parse(data);

  const newArticle = await db.insert(articles).values({
    ...validatedData,
    excerpt: validatedData.excerpt || "",
    authorId: session.user.id,
    authorName: session.user.name,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  revalidatePath("/admin/articles");
  return newArticle[0];
}

export async function updateArticle(id: string, data: z.infer<typeof articleSchema>) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  const validatedData = articleSchema.parse(data);

  const updatedArticle = await db.update(articles)
    .set({
      ...validatedData,
      excerpt: validatedData.excerpt || "",
      updatedAt: new Date(),
      publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
    })
    .where(eq(articles.id, id))
    .returning();

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}/edit`);
  return updatedArticle[0];
}

export async function deleteArticle(id: string) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/admin/articles");
  return { success: true };
}
