import { inngest } from "./client";
import { prisma } from "@/lib/prisma";
import { publishAIArticle } from "@/lib/articles/publish";
import {
  acquireDailyLock,
  completeDailyLock,
  releaseDailyLock,
  hasPublishedToday,
} from "@/lib/automation/lock";
import { generateCareerArticle } from "@/lib/ai/generate-article";
import { formatInTimeZone } from "date-fns-tz";

export const dailyAIPublisher = inngest.createFunction(
  {
    id: "daily-ai-publisher",
    retries: 3, // Bounded retries as per requirements
  },
  { cron: "TZ=Asia/Karachi 0 9 * * *" }, // 9:00 AM Karachi time
  async ({ step }) => {
    // 1. Check if automation is enabled in Admin settings
    const config = await step.run("check-config", async () => {
      let conf = await prisma.aIConfiguration.findFirst();
      if (!conf) {
        conf = await prisma.aIConfiguration.create({ data: { enabled: false } });
      }
      return conf;
    });

    if (!config.enabled) {
      return { status: "skipped", reason: "Automation disabled by Admin in /admin/ai/automation" };
    }

    const timezone = config.timezone || "Asia/Karachi";
    const currentYear = formatInTimeZone(new Date(), timezone, "yyyy");

    // 2. Atomic Database Idempotency Lock Check
    const lockResult = await step.run("acquire-daily-lock", async () => {
      return await acquireDailyLock(timezone, 3);
    });

    if (!lockResult.acquired) {
      return { status: "skipped", reason: lockResult.reason };
    }

    try {
      // 3. Research and generate the daily article dynamically
      const rawArticle = await step.run("generate-ai-article", async () => {
        const topic =
          config.topicPreferences?.trim() ||
          `Navigating Career Trajectories, Compensation Benchmarks, and Strategic Workplace Skills in ${currentYear}`;

        return await generateCareerArticle({
          topic,
          timezone,
        });
      });

      // 4. Validate and Publish under verified Admin author
      const published = await step.run("validate-and-publish", async () => {
        const admin = await prisma.user.findFirst({
          where: { role: "ADMIN" },
          orderBy: { createdAt: "asc" },
        });

        if (!admin) {
          throw new Error("No Admin user found to assign as author");
        }

        return await publishAIArticle(rawArticle, admin.id);
      });

      // 5. Complete atomic lock
      await step.run("complete-lock", async () => {
        await completeDailyLock(lockResult.lockKey, published.id);
      });

      return { status: "published", articleId: published.id };
    } catch (err: any) {
      await step.run("release-lock-on-failure", async () => {
        await releaseDailyLock(lockResult.lockKey, err?.message);
      });
      throw err;
    }
  }
);
