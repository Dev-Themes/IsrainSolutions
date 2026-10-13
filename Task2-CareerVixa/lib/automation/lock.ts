import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

/**
 * Generates a unique execution key for the current calendar day in the specified timezone.
 * Format: "AI-PUB-YYYY-MM-DD"
 */
export function getDailyExecutionKey(timezone: string = "Asia/Karachi"): string {
  const dateStr = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
  return `AI-PUB-${dateStr}`;
}

/**
 * Checks if a successful publication has already occurred for the given day.
 */
export async function hasPublishedToday(timezone: string = "Asia/Karachi"): Promise<boolean> {
  const dateStr = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
  
  // We check AIExecutionLog for a SUCCESS status on this date.
  // Since timestamp is UTC, we query for logs that occurred on this local calendar day.
  const startOfDay = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(startOfDay);
  endOfDay.setHours(23, 59, 59, 999);

  const successfulRuns = await prisma.aIExecutionLog.count({
    where: {
      status: "SUCCESS",
      timestamp: {
        gte: startOfDay,
        lte: endOfDay
      }
    }
  });

  return successfulRuns > 0;
}
