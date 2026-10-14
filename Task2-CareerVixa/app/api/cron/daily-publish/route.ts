import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publishAIArticle } from "@/lib/articles/publish";
import { hasPublishedToday } from "@/lib/automation/lock";
import { generateCareerArticle } from "@/lib/ai/generate-article";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  return handleCronExecution(request);
}

export async function POST(request: NextRequest) {
  return handleCronExecution(request);
}

async function handleCronExecution(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isForce = searchParams.get("force") === "true";
  const cronKey = searchParams.get("key");

  // Verify authorization:
  // 1. Vercel Cron header: Authorization: Bearer <CRON_SECRET>
  // 2. Secret query param (?key=careervixa-cron or process.env.CRON_SECRET)
  // 3. Or in development mode
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET;

  const isVercelCron =
    Boolean(expectedSecret && authHeader === `Bearer ${expectedSecret}`);
  const isKeyAuthorized =
    Boolean(cronKey && (cronKey === expectedSecret || cronKey === "careervixa-cron"));
  const isLocalDev = process.env.NODE_ENV === "development";

  // If CRON_SECRET is defined, enforce either the Vercel cron header or the key
  if (expectedSecret && !isVercelCron && !isKeyAuthorized && !isLocalDev) {
    return NextResponse.json(
      { error: "Unauthorized. Provide valid Bearer token or ?key=" },
      { status: 401 }
    );
  }

  try {
    // 1. Check automation config
    let config = await prisma.aIConfiguration.findFirst();
    if (!config) {
      config = await prisma.aIConfiguration.create({ data: { enabled: false } });
    }

    if (!config.enabled && !isForce) {
      return NextResponse.json({
        status: "skipped",
        reason: "Autonomous publishing is disabled in Admin Settings (/admin/ai/automation). Toggle it on or use ?force=true to test.",
      });
    }

    // 2. Check daily lock (unless forced)
    const timezone = config.timezone || "Asia/Karachi";
    if (!isForce) {
      const alreadyPublished = await hasPublishedToday(timezone);
      if (alreadyPublished) {
        return NextResponse.json({
          status: "skipped",
          reason: `An article has already been published today in timezone ${timezone}. Use ?force=true to test override.`,
        });
      }
    }

    // 3. Determine topic from preferences or default
    const topic =
      config.topicPreferences?.trim() ||
      "Navigating Career Trajectories, Compensation Benchmarks, and Strategic Workplace Skills in 2025";

    // 4. Research and generate the article
    const rawArticle = await generateCareerArticle({ topic });

    // 5. Find an Admin user for author attribution
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!admin) {
      throw new Error("No Admin user found in database to assign as author.");
    }

    // 6. Validate, attach stock photo, and publish
    const published = await publishAIArticle(rawArticle, admin.id, isForce);

    return NextResponse.json({
      status: "published",
      success: true,
      article: {
        id: published.id,
        title: published.title,
        slug: published.slug,
        url: `/articles/${published.slug}`,
      },
    });
  } catch (err: any) {
    console.error("Cron execution error:", err);
    await prisma.aIExecutionLog.create({
      data: {
        status: "FAILURE",
        errorLogs: err.message || "Unknown cron error",
      },
    }).catch(() => {});

    return NextResponse.json(
      {
        status: "error",
        error: err.message || "Failed to execute daily article generation.",
      },
      { status: 500 }
    );
  }
}
