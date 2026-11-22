import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper to prevent database timeouts from locking server routes
async function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("DB_TIMEOUT")), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const city = searchParams.get("city");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (country) where.country = country;
    if (city) where.city = city;
    if (status) where.status = status;

    const jobs = await withDbTimeout(
      prisma.marketplaceJob.findMany({
        where,
        orderBy: { createdAt: "desc" },
      }),
      5000
    );

    return NextResponse.json({ jobs, success: true });
  } catch (error) {
    console.warn("Neon DB GET /api/jobs notice:", (error as Error)?.message || error);
    return NextResponse.json({ jobs: [], success: false, fallback: true });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode" }, { status: 400 });
    }

    const saved = await withDbTimeout(
      prisma.marketplaceJob.upsert({
        where: { referenceCode: body.referenceCode },
        update: {
        service: body.service || "General Trade Service",
        title: body.title || "Home Service Request",
        description: body.description || "",
        location: body.location || "London, UK",
        city: body.city || "London",
        country: body.country || "UK",
        urgency: body.urgency || "Standard",
        datePosted: body.datePosted || "Just now",
        status: body.status || "QUOTING",
        homeownerId: body.homeownerId,
        homeownerName: body.homeownerName || "Homeowner",
        homeownerPhone: body.homeownerPhone || "+44 20 7946 0812",
        homeownerEmail: body.homeownerEmail,
        proposals: body.proposals || [],
        finalCost: body.finalCost,
        completedDate: body.completedDate,
        reviewLeft: body.reviewLeft,
      },
      create: {
        id: body.id || `job_${Date.now()}`,
        referenceCode: body.referenceCode,
        service: body.service || "General Trade Service",
        title: body.title || "Home Service Request",
        description: body.description || "",
        location: body.location || "London, UK",
        city: body.city || "London",
        country: body.country || "UK",
        urgency: body.urgency || "Standard",
        datePosted: body.datePosted || "Just now",
        status: body.status || "QUOTING",
        homeownerId: body.homeownerId,
        homeownerName: body.homeownerName || "Homeowner",
        homeownerPhone: body.homeownerPhone || "+44 20 7946 0812",
        homeownerEmail: body.homeownerEmail,
        proposals: body.proposals || [],
        finalCost: body.finalCost,
        completedDate: body.completedDate,
        reviewLeft: body.reviewLeft,
      },
    }),
    6000
  );

    return NextResponse.json({ job: saved, success: true });
  } catch (error) {
    console.warn("Neon DB POST /api/jobs notice:", (error as Error)?.message || error);
    return NextResponse.json({ success: false, message: "Local copy preserved" }, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");
    const id = searchParams.get("id");
    const clearAll = searchParams.get("all") === "true";

    if (clearAll) {
      await withDbTimeout(prisma.marketplaceJob.deleteMany({}), 5000);
      return NextResponse.json({ success: true, message: "All jobs cleared" });
    }

    if (referenceCode) {
      await withDbTimeout(prisma.marketplaceJob.deleteMany({ where: { referenceCode } }), 5000);
      return NextResponse.json({ success: true });
    }

    if (id) {
      await withDbTimeout(prisma.marketplaceJob.deleteMany({ where: { id } }), 5000);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing referenceCode or id" }, { status: 400 });
  } catch (error) {
    console.error("Neon DB DELETE /api/jobs error:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
