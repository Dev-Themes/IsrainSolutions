import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export default async function AIAutomationPage() {
  await requireAdmin();

  let config = await prisma.aIConfiguration.findFirst();
  if (!config) {
    config = await prisma.aIConfiguration.create({ data: { enabled: false } });
  }

  async function updateConfig(formData: FormData) {
    "use server";
    await requireAdmin();
    const enabled = formData.get("enabled") === "on";
    const topicPreferences = formData.get("topicPreferences") as string;

    const conf = await prisma.aIConfiguration.findFirst();
    if (conf) {
      await prisma.aIConfiguration.update({
        where: { id: conf.id },
        data: { enabled, topicPreferences }
      });
    }
    revalidatePath("/admin/ai/automation");
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Automation Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure the daily autonomous publishing agent.
        </p>
      </div>

      <div className="bg-card text-card-foreground p-6 rounded-xl border border-border shadow-xs">
        <form action={updateConfig} className="space-y-5">
          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              id="enabled" 
              name="enabled" 
              defaultChecked={config.enabled}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="enabled" className="text-sm font-bold text-foreground leading-none cursor-pointer">
              Enable Daily Autonomous Publishing
            </label>
          </div>
          <p className="text-xs text-muted-foreground ml-7">
            When enabled, the AI will research and publish one article every day at {config.scheduleTime} ({config.timezone}).
          </p>

          <div className="pt-2">
            <label htmlFor="topicPreferences" className="block text-xs font-semibold text-foreground mb-1.5">
              Topic Preferences &amp; Instructions (Optional)
            </label>
            <textarea
              id="topicPreferences"
              name="topicPreferences"
              defaultValue={config.topicPreferences || ""}
              rows={4}
              className="w-full rounded-lg border border-input bg-background text-foreground p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="e.g. Focus on executive leadership transitions, executive compensation models, and remote engineering trends..."
            />
          </div>

          <button 
            type="submit" 
            className="inline-flex justify-center rounded-lg bg-primary hover:opacity-90 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all shadow-xs cursor-pointer"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
