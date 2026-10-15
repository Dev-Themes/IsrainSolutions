import { getCareerCategories } from "@/lib/categories";
import AIDraftGeneratorForm from "@/components/client/AIDraftGeneratorForm";

export const metadata = {
  title: "AI Draft Generator | CareerVixa",
  description: "Generate structured, researched career article drafts using CareerVixa AI.",
};

export default async function ClientAIGeneratePage() {
  const categories = await getCareerCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-950 dark:text-[#F8FAFC]">AI Article Generator</h1>
        <p className="text-sm text-slate-600 dark:text-[#CBD5E1] mt-1">
          Provide a career topic and focus areas. Our research agent will search verified sources and draft a structured article for your workspace.
        </p>
      </div>

      <AIDraftGeneratorForm categories={categories} />
    </div>
  );
}
