import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JobContract } from "@/lib/contract-store";

export async function GET() {
  try {
    const contracts = await prisma.contract.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contracts, source: "neon-db" });
  } catch (error) {
    console.error("Neon DB GET /api/contracts error:", error);
    return NextResponse.json({ contracts: [], source: "fallback-error" });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as JobContract;
    if (!body || !body.referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode" }, { status: 400 });
    }

    const saved = await prisma.contract.upsert({
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
    });

    return NextResponse.json({ contract: saved, success: true });
  } catch (error) {
    console.error("Neon DB POST /api/contracts error:", error);
    return NextResponse.json({ error: "Failed to save contract to Neon DB" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");
    const id = searchParams.get("id");
    const clearAll = searchParams.get("all") === "true";

    if (clearAll) {
      await prisma.contract.deleteMany({});
      return NextResponse.json({ success: true, message: "All contracts deleted" });
    }

    if (referenceCode) {
      await prisma.contract.deleteMany({ where: { referenceCode } });
      return NextResponse.json({ success: true });
    }

    if (id) {
      await prisma.contract.deleteMany({ where: { id } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing referenceCode or id" }, { status: 400 });
  } catch (error) {
    console.error("Neon DB DELETE /api/contracts error:", error);
    return NextResponse.json({ error: "Failed to delete contract" }, { status: 500 });
  }
}
