import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const jobs = await prisma.marketplaceJob.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ jobs, success: true });
  } catch (error) {
    console.error("Neon DB GET /api/jobs error:", error);
    return NextResponse.json({ jobs: [], error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode" }, { status: 400 });
    }

    const saved = await prisma.marketplaceJob.upsert({
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
    });

    return NextResponse.json({ job: saved, success: true });
  } catch (error) {
    console.error("Neon DB POST /api/jobs error:", error);
    return NextResponse.json({ error: "Failed to persist job to Neon DB" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");
    const id = searchParams.get("id");
    const clearAll = searchParams.get("all") === "true";

    if (clearAll) {
      await prisma.marketplaceJob.deleteMany({});
      return NextResponse.json({ success: true, message: "All jobs cleared" });
    }

    if (referenceCode) {
      await prisma.marketplaceJob.deleteMany({ where: { referenceCode } });
      return NextResponse.json({ success: true });
    }

    if (id) {
      await prisma.marketplaceJob.deleteMany({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing referenceCode or id" }, { status: 400 });
  } catch (error) {
    console.error("Neon DB DELETE /api/jobs error:", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
