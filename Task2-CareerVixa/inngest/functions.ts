import { inngest } from "./client";
import { prisma } from "@/lib/prisma";
import { publishAIArticle } from "@/lib/articles/publish";
import { hasPublishedToday } from "@/lib/automation/lock";
import { generateCareerArticle } from "@/lib/ai/generate-article";

export const dailyAIPublisher = inngest.createFunction(
  { 
    id: "daily-ai-publisher",
    retries: 3 // Bounded retries as per requirements
  },
  { cron: "TZ=Asia/Karachi 0 9 * * *" }, // 9:00 AM Karachi time
  async ({ step }) => {
    // 1. Check if automation is enabled
    const config = await step.run("check-config", async () => {
      let conf = await prisma.aIConfiguration.findFirst();
      if (!conf) {
        conf = await prisma.aIConfiguration.create({ data: { enabled: false } });
      }
      return conf;
    });

    if (!config.enabled) {
      return { status: "skipped", reason: "Automation disabled by Admin" };
    }

    // 2. Check daily lock
    const alreadyPublished = await step.run("check-lock", async () => {
      return await hasPublishedToday(config.timezone);
    });

    if (alreadyPublished) {
      return { status: "skipped", reason: "Already published today" };
    }

    // 3. Research and generate the daily article
    const rawArticle = await step.run("generate-ai-article", async () => {
      return await generateCareerArticle({
        topic: "Navigating Career Trajectories, Compensation Benchmarks, and Strategic Workplace Skills in 2025",
      });
    });

    // 4. Validate and Publish using Next.js logic
    const published = await step.run("validate-and-publish", async () => {
      // Find an admin user to assign as author
      const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
      if (!admin) throw new Error("No Admin user found to assign author to");

      return await publishAIArticle(rawArticle, admin.id);
    });

    return { status: "published", articleId: published.id };
  }
);
