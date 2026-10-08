"use server";

import { db } from "@/db";
import { categories, tags } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/guards";
import { categorySchema, tagSchema } from "@/lib/validations/admin";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createCategory(data: z.infer<typeof categorySchema>) {
  await requireAdmin();
  const validated = categorySchema.parse(data);
  await db.insert(categories).values(validated);
  revalidatePath("/admin/categories");
}

export async function createTag(data: z.infer<typeof tagSchema>) {
  await requireAdmin();
  const validated = tagSchema.parse(data);
  await db.insert(tags).values(validated);
  revalidatePath("/admin/tags");
}
