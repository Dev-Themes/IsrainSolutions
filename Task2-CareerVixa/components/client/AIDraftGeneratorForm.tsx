"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { generateClientAIDraft } from "@/lib/actions/client-ai";
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Globe, Search, BookOpen, ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface AIDraftGeneratorFormProps {
  categories: Category[];
}

export default function AIDraftGeneratorForm({ categories }: AIDraftGeneratorFormProps) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setErrorMessage("Please provide a career or professional growth topic.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setCurrentStep("Researching authoritative sources across the web...");

    const stepTimer = setTimeout(() => {
      setCurrentStep("Structuring article outline, verified citations, and takeaways...");
    }, 8000);

    const stepTimer2 = setTimeout(() => {
      setCurrentStep("Synthesizing draft and saving to your private workspace...");
    }, 18000);

    try {
      const parsedKeywords = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const result = await generateClientAIDraft({
        topic: topic.trim(),
        keywords: parsedKeywords,
        instructions: instructions.trim() || undefined,
        categoryId: categoryId || undefined,
      });

      clearTimeout(stepTimer);
      clearTimeout(stepTimer2);

      // Successfully generated. Redirect to the editor so the contributor can review and refine!
      router.push(`/dashboard/articles/${result.articleId}/edit`);
    } catch (err: any) {
      clearTimeout(stepTimer);
      clearTimeout(stepTimer2);
      setErrorMessage(err.message || "Failed to generate AI draft. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {errorMessage && (
        <div className="flex items-start gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-4 text-sm text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isGenerating ? (
        <div className="rounded-2xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] p-8 sm:p-12 text-center shadow-lg space-y-6 animate-pulse">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E2F5ED] dark:bg-[#21473F] text-[#087B61] dark:text-[#65DEAE]">
            <Sparkles className="h-8 w-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Researching &amp; Writing Your Draft</h2>
            <p className="text-sm text-slate-700 dark:text-[#B5D8CC]">{currentStep}</p>
          </div>

          <div className="max-w-md mx-auto space-y-3 pt-2 text-left">
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-[#B5D8CC]">
              <Search className="h-4 w-4 text-[#087B61] dark:text-[#65DEAE] shrink-0" />
              <span>Querying Tavily for verified career research &amp; industry data</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-[#B5D8CC]">
              <Globe className="h-4 w-4 text-[#087B61] dark:text-[#65DEAE] shrink-0" />
              <span>Checking niche compliance &amp; citation standards</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-[#B5D8CC]">
              <BookOpen className="h-4 w-4 text-[#087B61] dark:text-[#65DEAE] shrink-0" />
              <span>Saving strictly as a private draft for your editorial review</span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#153630] p-6 sm:p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Career Topic or Title Idea <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How to Transition into AI Engineering Without a CS Degree"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <p className="mt-1 text-[11px] text-slate-700 dark:text-[#B5D8CC]">
              Must be related to careers, job searching, interviews, resumes, or professional workplace skills.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Target Keywords &amp; Focus Areas <span className="text-xs font-normal text-slate-700 dark:text-[#B5D8CC]">(Comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. portfolio projects, machine learning, career switch"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Career Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-950 dark:text-[#F0FCF7] mb-1">
              Optional Style or Outline Instructions
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Emphasize actionable advice for junior engineers and include concrete portfolio project suggestions."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#C6E2D6] dark:border-[#355A50] bg-white dark:bg-[#091A19] text-slate-950 dark:text-[#F0FCF7] placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          <div className="rounded-xl border border-[#C6E2D6] dark:border-[#355A50] bg-[#E2F5ED]/50 dark:bg-[#21473F]/40 p-3.5 text-xs text-slate-700 dark:text-[#B5D8CC] space-y-1">
            <p className="font-semibold text-slate-950 dark:text-white">Zero Auto-Publish Guarantee:</p>
            <p>
              AI-generated articles deposit directly into your private drafts. They are <strong>never</strong> published automatically and do not consume platform daily quotas. You will have full ability to edit and review before submitting.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-semibold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate AI Draft Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
