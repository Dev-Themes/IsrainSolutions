import { getClientArticleById } from "@/lib/actions/client-articles";
import { getCareerCategories } from "@/lib/categories";
import ArticleForm from "@/components/client/ArticleForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Article Draft | CareerVixa",
  description: "Refine and update your career article draft.",
};

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;

  let article;
  try {
    article = await getClientArticleById(id);
  } catch (error) {
    notFound();
  }

  if (!article) {
    notFound();
  }

  const categories = await getCareerCategories();

  return (
    <div className="space-y-6">
      <ArticleForm initialArticle={article} categories={categories} />
    </div>
  );
}
