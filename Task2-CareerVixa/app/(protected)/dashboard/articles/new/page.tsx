import { getCareerCategories } from "@/lib/categories";
import ArticleForm from "@/components/client/ArticleForm";

export const metadata = {
  title: "Write New Article | CareerVixa",
  description: "Create and draft a career-related guest article for CareerVixa.",
};

export default async function NewArticlePage() {
  const categories = await getCareerCategories();

  return (
    <div className="space-y-6">
      <ArticleForm categories={categories} initialArticle={null} />
    </div>
  );
}
