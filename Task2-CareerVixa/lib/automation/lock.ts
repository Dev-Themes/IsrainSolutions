import { prisma } from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

/**
 * Generates an atomic, unique calendar-day execution key for the specified timezone.
 * Format: "AI-PUB-YYYY-MM-DD-Timezone"
 */
export function getDailyExecutionKey(timezone: string = "Asia/Karachi"): string {
  const dateStr = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
  return `AI-PUB-${dateStr}-${timezone.replace(/\//g, "_")}`;
}

/**
 * Atomically acquires the daily publishing lock for the current local calendar day.
 * Backed by a unique database primary key constraint in `AIPublishingLock`
 * to guarantee zero duplicate publications across concurrent requests or retries.
 */
export async function acquireDailyLock(
  timezone: string = "Asia/Karachi",
  maxRetries: number = 3
): Promise<{ acquired: boolean; reason?: string; lockKey: string }> {
  const lockKey = getDailyExecutionKey(timezone);

  try {
    // 1. Check if a lock record already exists
    const existingLock = await prisma.aIPublishingLock.findUnique({
      where: { dayKey: lockKey },
    });

    if (existingLock) {
      // If already published today, strictly disallow duplicate generation
      if (existingLock.status === "COMPLETED") {
        return {
          acquired: false,
          reason: `An article has already been published today (${lockKey}). Daily quota fulfilled.`,
          lockKey,
        };
      }

      // If currently locked by another worker, check if it is stale (> 8 minutes old)
      if (existingLock.status === "LOCKED") {
        const lockAgeMs = Date.now() - new Date(existingLock.updatedAt).getTime();
        const isStale = lockAgeMs > 8 * 60 * 1000;

        if (!isStale) {
          return {
            acquired: false,
            reason: `Article generation is currently in-progress by another worker (${lockKey}).`,
            lockKey,
          };
        }

        // Stale lock takeover (previous serverless worker crashed/timed out)
        if (existingLock.attempts >= maxRetries) {
          return {
            acquired: false,
            reason: `Maximum daily retry attempts (${maxRetries}) exhausted for ${lockKey}.`,
            lockKey,
          };
        }

        await prisma.aIPublishingLock.update({
          where: { dayKey: lockKey },
          data: {
            status: "LOCKED",
            attempts: { increment: 1 },
            errorLogs: `Stale lock recovered after ${Math.round(lockAgeMs / 1000)}s`,
          },
        });

        return { acquired: true, lockKey };
      }

      // If previous attempt failed, check retry limit
      if (existingLock.status === "FAILED") {
        if (existingLock.attempts >= maxRetries) {
          return {
            acquired: false,
            reason: `Maximum daily retry limit (${maxRetries}) reached for today (${lockKey}).`,
            lockKey,
          };
        }

        // Transition back to LOCKED for retry
        await prisma.aIPublishingLock.update({
          where: { dayKey: lockKey },
          data: {
            status: "LOCKED",
            attempts: { increment: 1 },
          },
        });

        return { acquired: true, lockKey };
      }
    }

    // 2. Attempt atomic creation of the lock
    await prisma.aIPublishingLock.create({
      data: {
        dayKey: lockKey,
        status: "LOCKED",
        attempts: 1,
      },
    });

    return { acquired: true, lockKey };
  } catch (err: any) {
    // Unique constraint violation (Prisma P2002) means a concurrent worker created the lock first
    if (err.code === "P2002") {
      return {
        acquired: false,
        reason: `Concurrent trigger race caught: Lock already claimed for ${lockKey}.`,
        lockKey,
      };
    }
    throw err;
  }
}

/**
 * Marks the daily publishing lock as successfully COMPLETED with the associated article ID.
 */
export async function completeDailyLock(lockKey: string, articleId: string): Promise<void> {
  await prisma.aIPublishingLock.update({
    where: { dayKey: lockKey },
    data: {
      status: "COMPLETED",
      articleId,
      errorLogs: null,
    },
  });
}

/**
 * Releases the daily lock on failure so subsequent bounded retries can attempt again.
 */
export async function releaseDailyLock(lockKey: string, error?: string): Promise<void> {
  try {
    await prisma.aIPublishingLock.update({
      where: { dayKey: lockKey },
      data: {
        status: "FAILED",
        errorLogs: error ? error.slice(0, 2000) : "Unknown execution failure",
      },
    });
  } catch (err) {
    console.error("Failed to release daily lock:", err);
  }
}

/**
 * Checks if a successful publication has already occurred for the given local calendar day.
 * Checks both the atomic AIPublishingLock table and AIExecutionLog table for dual-layer assurance.
 */
export async function hasPublishedToday(timezone: string = "Asia/Karachi"): Promise<boolean> {
  const lockKey = getDailyExecutionKey(timezone);

  // Check 1: Atomic lock table
  const lock = await prisma.aIPublishingLock.findUnique({
    where: { dayKey: lockKey },
  });
  if (lock && lock.status === "COMPLETED") {
    return true;
  }

  // Check 2: Successful execution logs on local calendar day
  const dateStr = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
  const startOfDay = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  const successfulRuns = await prisma.aIExecutionLog.count({
    where: {
      status: "SUCCESS",
      timestamp: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return successfulRuns > 0;
}
