import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /headless/i,
  /lighthouse/i,
  /bytespider/i,
  /googlebot/i,
  /bingbot/i,
  /yandex/i,
  /baiduspider/i,
];

export async function POST(req: NextRequest) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    const isBot = BOT_PATTERNS.some((pattern) => pattern.test(userAgent));

    if (isBot) {
      return NextResponse.json({ skipped: true, reason: "bot" });
    }

    const body = await req.json();
    const { slug, eventType, referrer } = body;

    if (!slug || (eventType !== "VIEW" && eventType !== "PROMO_CLICK")) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, status: true },
    });

    if (!article || article.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Article not eligible" }, { status: 404 });
    }

    // Atomic increment of metrics and event logging
    await Promise.all([
      prisma.article.update({
        where: { id: article.id },
        data: {
          viewsCount: eventType === "VIEW" ? { increment: 1 } : undefined,
          clicksCount: eventType === "PROMO_CLICK" ? { increment: 1 } : undefined,
        },
      }),
      prisma.articleAnalyticsEvent.create({
        data: {
          articleId: article.id,
          eventType,
          referrer: referrer ? String(referrer).slice(0, 500) : null,
          userAgent: userAgent.slice(0, 500),
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
