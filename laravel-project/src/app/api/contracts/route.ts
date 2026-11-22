import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JobContract } from "@/lib/contract-store";

// Helper to prevent database connection delays from freezing browser and server threads
async function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 5000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("DB_TIMEOUT")), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export async function GET() {
  try {
    const contracts = await withDbTimeout(
      prisma.contract.findMany({
        orderBy: { createdAt: "desc" },
      }),
      5000
    );

    return NextResponse.json({ contracts, source: "neon-db" });
  } catch (error) {
    console.warn("Neon DB GET /api/contracts notice:", (error as Error)?.message || error);
    return NextResponse.json({ contracts: [], source: "fallback-error" });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as JobContract;
    if (!body || !body.referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode" }, { status: 400 });
    }

    const saved = await withDbTimeout(
      prisma.contract.upsert({
        where: { referenceCode: body.referenceCode },
        update: {
        service: body.service,
        title: body.title,
        location: body.location,
        city: body.city,
        country: body.country,
        urgency: body.urgency,
        datePosted: body.datePosted,
        homeownerId: body.homeownerId,
        homeownerName: body.homeownerName,
        homeownerPhone: body.homeownerPhone,
        homeownerEmail: body.homeownerEmail,
        homeownerAddress: body.homeownerAddress,
        proId: body.proId,
        proSlug: body.proSlug,
        proName: body.proName,
        proPhone: body.proPhone,
        proEmail: body.proEmail,
        proLicense: body.proLicense,
        proInsurance: body.proInsurance,
        proCity: body.proCity,
        status: body.status,
        agreedPrice: body.agreedPrice,
        currency: body.currency,
        priceNumeric: body.priceNumeric,
        providedServices: body.providedServices || [],
        providedEquipments: body.providedEquipments || [],
        serviceDate: body.serviceDate,
        serviceTime: body.serviceTime,
        warrantyPeriod: body.warrantyPeriod,
        notes: body.notes,
        approvedByHomeownerAt: body.approvedByHomeownerAt,
        homeownerSignature: body.homeownerSignature,
        invoiceNumber: body.invoiceNumber,
        invoiceIssuedAt: body.invoiceIssuedAt,
        invoicePaidAt: body.invoicePaidAt,
        labourAmount: body.labourAmount,
        materialsAmount: body.materialsAmount,
        totalAmount: body.totalAmount,
        paymentMethod: body.paymentMethod,
      },
      create: {
        id: body.id,
        referenceCode: body.referenceCode,
        service: body.service,
        title: body.title,
        location: body.location,
        city: body.city,
        country: body.country || "UK",
        urgency: body.urgency || "Standard",
        datePosted: body.datePosted,
        homeownerId: body.homeownerId,
        homeownerName: body.homeownerName,
        homeownerPhone: body.homeownerPhone,
        homeownerEmail: body.homeownerEmail,
        homeownerAddress: body.homeownerAddress,
        proId: body.proId,
        proSlug: body.proSlug,
        proName: body.proName,
        proPhone: body.proPhone,
        proEmail: body.proEmail,
        proLicense: body.proLicense,
        proInsurance: body.proInsurance,
        proCity: body.proCity,
        status: body.status,
        agreedPrice: body.agreedPrice,
        currency: body.currency || "£",
        priceNumeric: body.priceNumeric || 145,
        providedServices: body.providedServices || [],
        providedEquipments: body.providedEquipments || [],
        serviceDate: body.serviceDate,
        serviceTime: body.serviceTime,
        warrantyPeriod: body.warrantyPeriod,
        notes: body.notes,
        approvedByHomeownerAt: body.approvedByHomeownerAt,
        homeownerSignature: body.homeownerSignature,
        invoiceNumber: body.invoiceNumber,
        invoiceIssuedAt: body.invoiceIssuedAt,
        invoicePaidAt: body.invoicePaidAt,
        labourAmount: body.labourAmount,
        materialsAmount: body.materialsAmount,
        totalAmount: body.totalAmount,
        paymentMethod: body.paymentMethod,
      },
    }),
    6000
  );

    return NextResponse.json({ contract: saved, success: true });
  } catch (error) {
    console.warn("Neon DB POST /api/contracts notice:", (error as Error)?.message || error);
    return NextResponse.json({ error: "Saved locally, cloud sync pending", success: false }, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");
    const id = searchParams.get("id");
    const clearAll = searchParams.get("all") === "true";

    if (clearAll) {
      await withDbTimeout(prisma.contract.deleteMany({}), 5000);
      return NextResponse.json({ success: true, message: "All contracts deleted" });
    }

    if (referenceCode) {
      await withDbTimeout(prisma.contract.deleteMany({ where: { referenceCode } }), 5000);
      return NextResponse.json({ success: true });
    }

    if (id) {
      await withDbTimeout(prisma.contract.deleteMany({ where: { id } }), 5000);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing referenceCode or id" }, { status: 400 });
  } catch (error) {
    console.error("Neon DB DELETE /api/contracts error:", error);
    return NextResponse.json({ error: "Failed to delete contract" }, { status: 500 });
  }
}
