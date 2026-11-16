import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");

    if (!referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode parameter" }, { status: 400 });
    }

    const messages = await prisma.jobChatMessage.findMany({
      where: { referenceCode },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ messages, success: true });
  } catch (error) {
    console.error("Neon DB GET /api/messages error:", error);
    return NextResponse.json({ messages: [], error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.referenceCode || !body.text || !body.senderRole || !body.senderName) {
      return NextResponse.json(
        { error: "Missing required fields (referenceCode, text, senderRole, senderName)" },
        { status: 400 }
      );
    }

    const created = await prisma.jobChatMessage.create({
      data: {
        referenceCode: body.referenceCode,
        senderRole: body.senderRole,
        senderName: body.senderName,
        text: body.text.trim(),
        timestamp:
          body.timestamp ||
          new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        isCounterOffer: Boolean(body.isCounterOffer),
        proposedPrice: body.proposedPrice || null,
        status: body.status || (body.isCounterOffer ? "PROPOSED" : null),
      },
    });

    // If an existing counter offer was accepted, update it and synchronize agreed price to Neon DB
    if (body.acceptedCounterMessageId && body.agreedPrice) {
      await prisma.jobChatMessage.update({
        where: { id: body.acceptedCounterMessageId },
        data: { status: "ACCEPTED" },
      });

      await prisma.marketplaceJob.updateMany({
        where: { referenceCode: body.referenceCode },
        data: { finalCost: body.agreedPrice },
      });

      await prisma.contract.updateMany({
        where: { referenceCode: body.referenceCode },
        data: { agreedPrice: body.agreedPrice },
      });
    }

    return NextResponse.json({ message: created, success: true });
  } catch (error) {
    console.error("Neon DB POST /api/messages error:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { messageId, status, referenceCode, agreedPrice } = body;

    if (!messageId || !status) {
      return NextResponse.json({ error: "Missing messageId or status" }, { status: 400 });
    }

    const updated = await prisma.jobChatMessage.update({
      where: { id: messageId },
      data: { status },
    });

    if (status === "ACCEPTED" && referenceCode && agreedPrice) {
      await prisma.marketplaceJob.updateMany({
        where: { referenceCode },
        data: { finalCost: agreedPrice },
      });

      await prisma.contract.updateMany({
        where: { referenceCode },
        data: { agreedPrice },
      });
    }

    return NextResponse.json({ message: updated, success: true });
  } catch (error) {
    console.error("Neon DB PATCH /api/messages error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
