"use server";

import { db } from "@/db";
import { articles, categories, tags, articleTags } from "@/db/schema";
import { eq, desc, ilike, and, inArray } from "drizzle-orm";

export async function getPublishedArticles({
  page = 1,
  limit = 10,
  categoryId,
  tagId,
  searchQuery,
}: {
  page?: number;
  limit?: number;
  categoryId?: string;
  tagId?: string;
  searchQuery?: string;
} = {}) {
  const offset = (page - 1) * limit;
  
  const queryArgs: any = {
    where: eq(articles.status, "PUBLISHED"),
    orderBy: [desc(articles.publishedAt)],
    limit,
    offset,
    with: {
      category: true,
      author: true,
      tags: {
        with: { tag: true },
      },
    },
  };

  const conditions = [eq(articles.status, "PUBLISHED")];
  
  if (searchQuery) {
    conditions.push(ilike(articles.title, `%${searchQuery}%`));
  }
  if (categoryId) {
    conditions.push(eq(articles.categoryId, categoryId));
  }
  
  if (tagId) {
    const matchingTagRows = await db.select({ articleId: articleTags.articleId })
      .from(articleTags)
      .where(eq(articleTags.tagId, tagId));
    
    const matchingArticleIds = matchingTagRows.map(r => r.articleId);

    if (matchingArticleIds.length === 0) {
      return [];
    }
    
    conditions.push(inArray(articles.id, matchingArticleIds));
  }

  queryArgs.where = and(...conditions);
  
  return db.query.articles.findMany(queryArgs) as Promise<any[]>;
}

export async function getArticleBySlug(slug: string) {
  return db.query.articles.findFirst({
    where: and(eq(articles.slug, slug), eq(articles.status, "PUBLISHED")),
    with: {
      category: true,
      tags: {
        with: { tag: true }
      }
    }
  });
}

export async function getCategories() {
  return db.query.categories.findMany({
    orderBy: categories.name,
  });
}

export async function getTags() {
  return db.query.tags.findMany({
    orderBy: tags.name,
  });
}

export async function getRelatedArticles(articleId: string, limit: number = 3) {
  return db.query.articles.findMany({
    where: and(eq(articles.status, "PUBLISHED")),
    orderBy: [desc(articles.publishedAt)],
    limit,
    with: {
      category: true,
      tags: {
        with: { tag: true }
      }
    }
  });
}
