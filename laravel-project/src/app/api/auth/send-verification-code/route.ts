import { NextRequest, NextResponse } from "next/server";
import { validateEmailDomain, generateOtp, sendEmailCode } from "@/lib/email-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, purpose = "REGISTRATION" } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    // 1. Verify that email domain actually exists in cloud and has active MX servers
    const validation = await validateEmailDomain(email);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || "Email domain is invalid or cannot receive messages.",
        },
        { status: 422 }
      );
    }

    // 2. Generate secure 6-digit OTP
    const code = generateOtp(email, purpose);

    // 3. Dispatch email via real SMTP or transport
    const dispatchResult = await sendEmailCode(email, code, purpose);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${email}.`,
      mxHost: validation.mxHost,
      isLiveDelivery: dispatchResult.isLiveDelivery,
      // In dev mode when SMTP is not configured, previewCode enables testing without live inbox
      previewCode: dispatchResult.previewCode,
    });
  } catch (err: unknown) {
    console.error("send-verification-code error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error during email dispatch." },
      { status: 500 }
    );
  }
}
