import { NextResponse } from "next/server";
import { briefFormSchema } from "@/lib/validators";
import { sendBriefNotification } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = briefFormSchema.parse(body);

    // Bot detection check (honeypot)
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true, message: "Brief received" });
    }

    if (validatedData.humanAnswer.trim() !== "11") {
      return NextResponse.json(
        { error: "Invalid human verification answer. 4 + 7 = 11" },
        { status: 400 }
      );
    }

    const emailResult = await sendBriefNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: "Your brief has been submitted successfully.",
      delivered: emailResult.success,
    });
  } catch (error: unknown) {
    console.error("[API CONTACT ERROR]:", error);
    return NextResponse.json(
      { error: "Failed to process brief submission" },
      { status: 400 }
    );
  }
}
