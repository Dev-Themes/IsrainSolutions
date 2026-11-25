import { NextResponse } from "next/server";
import { getMetricsProvider } from "@/lib/metrics/provider";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL or domain is required" },
        { status: 400 }
      );
    }

    // Clean & normalize URL
    let cleanUrl = url.trim().toLowerCase();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    const provider = getMetricsProvider();
    const metrics = await provider.getMetrics(cleanUrl);

    if (!metrics) {
      return NextResponse.json(
        {
          error: "API key not configured. Request free manual metrics via WhatsApp.",
          providerConfigured: false,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, metrics });
  } catch (err: unknown) {
    console.error("[METRICS API ERROR]", err);
    return NextResponse.json(
      { error: "Failed to evaluate domain metrics" },
      { status: 500 }
    );
  }
}
