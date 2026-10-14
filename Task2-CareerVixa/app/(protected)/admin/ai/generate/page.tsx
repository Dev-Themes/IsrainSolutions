import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { publishAIArticle } from "@/lib/articles/publish";
import { revalidatePath } from "next/cache";

import { generateCareerArticle } from "@/lib/ai/generate-article";

export default async function AIGeneratePage() {
  const session = await requireAdmin();

  async function handleManualGeneration(formData: FormData) {
    "use server";
    const session = await requireAdmin();
    const rawTopic = formData.get("topic") as string;
    const topic = rawTopic && rawTopic.trim().length >= 5
      ? rawTopic.trim()
      : "Executive Career Strategy and High-Impact Leadership Navigation in 2025";

    const rawArticle = await generateCareerArticle({ topic });

    // Publish using existing pipeline with ignoreLock = true (does not count toward daily cron quota)
    const published = await publishAIArticle(rawArticle, session.user?.id as string, true);

    revalidatePath("/admin/articles");
    revalidatePath("/admin/ai/history");
    revalidatePath("/");
    redirect(`/articles/${published.slug}`);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manual AI Generation</h1>
        <p className="text-muted-foreground mt-2">
          Generate a new article immediately. This does not affect your daily quota.
        </p>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs">
        <form action={handleManualGeneration} className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-xs font-semibold text-foreground mb-1.5">
              Specific Topic (Optional)
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              className="w-full rounded-lg border border-input bg-background text-foreground p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="e.g. Executive Salary Negotiation Scripts for Senior Leaders"
            />
            <p className="text-xs text-muted-foreground mt-2">
              If left blank, the autonomous AI will research and pick a trending executive career topic.
            </p>
          </div>

          <button 
            type="submit" 
            className="inline-flex justify-center rounded-lg bg-primary hover:opacity-90 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all shadow-xs cursor-pointer"
          >
            Generate & Publish Now
          </button>
        </form>
      </div>
    </div>
  );
}
