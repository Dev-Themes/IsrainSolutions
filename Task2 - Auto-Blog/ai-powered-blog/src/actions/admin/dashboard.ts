"use server";

import { db } from "@/db";
import { articles, user, categories, tags } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/guards";
import { count } from "drizzle-orm";

export async function getDashboardStats() {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const [articlesCount, usersCount, categoriesCount, tagsCount] = await Promise.all([
    db.select({ value: count() }).from(articles),
    db.select({ value: count() }).from(user),
    db.select({ value: count() }).from(categories),
    db.select({ value: count() }).from(tags),
  ]);

  return {
    articles: articlesCount[0].value,
    users: usersCount[0].value,
    categories: categoriesCount[0].value,
    tags: tagsCount[0].value,
  };
}
