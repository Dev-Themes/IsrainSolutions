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
    const referenceCode = searchParams.get("referenceCode");

    if (referenceCode) {
      const messages = await withDbTimeout(
        prisma.jobChatMessage.findMany({
          where: { referenceCode },
          orderBy: { createdAt: "asc" },
        }),
        5000
      );
      return NextResponse.json({ messages, success: true });
    }

    // If no referenceCode provided, return recent messages across all jobs & contracts
    const messages = await withDbTimeout(
      prisma.jobChatMessage.findMany({
        orderBy: { createdAt: "asc" },
        take: 500,
      }),
      5000
    );

    return NextResponse.json({ messages, success: true });
  } catch (error) {
    console.warn("Neon DB GET /api/messages notice:", (error as Error)?.message || error);
    return NextResponse.json({ messages: [], error: "Failed to fetch messages" }, { status: 200 });
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

    const created = await withDbTimeout(
      prisma.jobChatMessage.create({
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
      }),
      5000
    );

    // If an existing counter offer was accepted, update it and synchronize agreed price to Neon DB
    if (body.acceptedCounterMessageId && body.agreedPrice) {
      await withDbTimeout(
        prisma.jobChatMessage.update({
          where: { id: body.acceptedCounterMessageId },
          data: { status: "ACCEPTED" },
        }),
        5000
      );

      await withDbTimeout(
        prisma.marketplaceJob.updateMany({
          where: { referenceCode: body.referenceCode },
          data: { finalCost: body.agreedPrice },
        }),
        5000
      );

      await withDbTimeout(
        prisma.contract.updateMany({
          where: { referenceCode: body.referenceCode },
          data: { agreedPrice: body.agreedPrice },
        }),
        5000
      );
    }

    return NextResponse.json({ message: created, success: true });
  } catch (error) {
    console.warn("Neon DB POST /api/messages notice:", (error as Error)?.message || error);
    return NextResponse.json({ error: "Failed to create message", success: false }, { status: 200 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { messageId, status, referenceCode, agreedPrice } = body;

    if (!messageId || !status) {
      return NextResponse.json({ error: "Missing messageId or status" }, { status: 400 });
    }

    const updated = await withDbTimeout(
      prisma.jobChatMessage.update({
        where: { id: messageId },
        data: { status },
      }),
      5000
    );

    if (status === "ACCEPTED" && referenceCode && agreedPrice) {
      await withDbTimeout(
        prisma.marketplaceJob.updateMany({
          where: { referenceCode },
          data: { finalCost: agreedPrice },
        }),
        5000
      );

      await withDbTimeout(
        prisma.contract.updateMany({
          where: { referenceCode },
          data: { agreedPrice },
        }),
        5000
      );
    }

    return NextResponse.json({ message: updated, success: true });
  } catch (error) {
    console.warn("Neon DB PATCH /api/messages notice:", (error as Error)?.message || error);
    return NextResponse.json({ error: "Failed to update message", success: false }, { status: 200 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceCode = searchParams.get("referenceCode");
    if (!referenceCode) {
      return NextResponse.json({ error: "Missing referenceCode parameter" }, { status: 400 });
    }
    await withDbTimeout(
      prisma.jobChatMessage.deleteMany({
        where: { referenceCode },
      }),
      5000
    );
    return NextResponse.json({ success: true, message: "Messages deleted" });
  } catch (error) {
    console.warn("Neon DB DELETE /api/messages notice:", (error as Error)?.message || error);
    return NextResponse.json({ error: "Failed to delete messages" }, { status: 500 });
  }
}
