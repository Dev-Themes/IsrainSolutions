import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getArticles(params: {
  search?: string;
  status?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const {
    search,
    status,
    categoryId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const skip = (page - 1) * limit;

  const where: Prisma.ArticleWhereInput = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { summary: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(status && { status: status as any }),
    ...(categoryId && { categoryId }),
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return {
    articles,
    total,
    pages: Math.ceil(total / limit),
  };
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      author: { select: { name: true, image: true } },
    },
  });
}
