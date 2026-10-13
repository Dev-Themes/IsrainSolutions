import { inngest } from "./client";
import { prisma } from "@/lib/prisma";
import { publishAIArticle } from "@/lib/articles/publish";
import { hasPublishedToday } from "@/lib/automation/lock";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

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

    // 3. Call the Python AI Agent to research and generate
    // Note: In production on Vercel, Python scripts might be hosted as separate API routes.
    // For this monorepo, we execute it locally assuming python is available.
    // We would pass topics/existing here.
    const rawArticle = await step.run("run-python-agent", async () => {
      // Execute the Python script locally to get the article
      // We use python module path or standard command assuming python is in PATH or venv
      try {
        // Run the agent. We explicitly use the venv python to ensure dependencies are found.
        const pythonCmd = process.platform === "win32" ? "venv\\Scripts\\python agent/main.py" : "venv/bin/python agent/main.py";
        const { stdout, stderr } = await execAsync(pythonCmd);
        if (stderr) {
          console.warn("Python Agent Stderr:", stderr);
        }
        
        // The python script outputs JSON, so we parse it
        return JSON.parse(stdout);
      } catch (error) {
        console.error("Failed to run python agent:", error);
        throw new Error("AI Agent execution failed");
      }
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
