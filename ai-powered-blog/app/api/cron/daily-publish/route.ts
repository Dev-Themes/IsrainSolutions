import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publishAIArticle } from "@/lib/articles/publish";
import {
  acquireDailyLock,
  completeDailyLock,
  releaseDailyLock,
} from "@/lib/automation/lock";
import { generateCareerArticle } from "@/lib/ai/generate-article";
import { formatInTimeZone } from "date-fns-tz";

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
  const cronKey = searchParams.get("key");
  const authHeader = request.headers.get("authorization");
  const expectedSecret = process.env.CRON_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  // Strict Authorization Verification:
  // In production: Requires Bearer <CRON_SECRET> or secret query param. Predictable fallback keys are prohibited.
  // In development: Permits testing query keys for local verification.
  const isVercelBearer = Boolean(expectedSecret && authHeader === `Bearer ${expectedSecret}`);
  const isSecretKeyValid = Boolean(expectedSecret && cronKey === expectedSecret);
  const isDevAuthorized = !isProduction && (cronKey === "careervixa-cron" || process.env.NODE_ENV === "development");

  if (!isVercelBearer && !isSecretKeyValid && !isDevAuthorized) {
    return NextResponse.json(
      { error: "Unauthorized. Valid Bearer token or authenticated key required." },
      { status: 401 }
    );
  }

  // Force override safety: Prohibited in production unless explicitly authenticated with CRON_SECRET
  const isForceParam = searchParams.get("force") === "true";
  const isForce = isForceParam && (!isProduction || isVercelBearer || isSecretKeyValid);

  let lockKey: string | null = null;

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

    const timezone = config.timezone || "Asia/Karachi";
    const currentYear = formatInTimeZone(new Date(), timezone, "yyyy");

    // 2. Atomic Database-Backed Idempotency Lock
    if (!isForce) {
      const lockResult = await acquireDailyLock(timezone, 3);
      if (!lockResult.acquired) {
        return NextResponse.json({
          status: "skipped",
          reason: lockResult.reason,
        });
      }
      lockKey = lockResult.lockKey;
    }

    // 3. Determine topic dynamically (Never hardcoded to a legacy year!)
    const topic =
      config.topicPreferences?.trim() ||
      `Navigating Career Trajectories, Compensation Benchmarks, and Strategic Workplace Skills in ${currentYear}`;

    // 4. Research and generate the article
    const rawArticle = await generateCareerArticle({
      topic,
      timezone,
    });

    // 5. Author attribution under verified Platform Admin
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "asc" },
    });

    if (!admin) {
      throw new Error("No verified Admin user found in database to assign as author.");
    }

    // 6. Validate, attach topic-matched visual, and publish
    const published = await publishAIArticle(rawArticle, admin.id, isForce);

    // 7. Complete daily lock atomically
    if (lockKey) {
      await completeDailyLock(lockKey, published.id);
    }

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

    // Release lock on failure so a bounded retry can attempt
    if (lockKey) {
      await releaseDailyLock(lockKey, err.message);
    }

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
