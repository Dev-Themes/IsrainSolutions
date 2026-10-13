import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
      select: { id: true, promotionalUrl: true, status: true },
    });

    if (!article || !article.promotionalUrl) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const userAgent = req.headers.get("user-agent") || "";
    const referrer = req.headers.get("referer") || "";

    // Record click asynchronously without blocking redirect
    prisma.article
      .update({
        where: { id: article.id },
        data: { clicksCount: { increment: 1 } },
      })
      .then(() =>
        prisma.articleAnalyticsEvent.create({
          data: {
            articleId: article.id,
            eventType: "PROMO_CLICK",
            referrer: referrer.slice(0, 500),
            userAgent: userAgent.slice(0, 500),
          },
        })
      )
      .catch((err) => console.error("Outbound click tracking error:", err));

    return NextResponse.redirect(article.promotionalUrl);
  } catch (error) {
    console.error("Outbound redirect error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
