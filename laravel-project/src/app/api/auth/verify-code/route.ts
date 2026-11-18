import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/email-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code, purpose = "REGISTRATION" } = body;

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Email and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const verification = verifyOtp(email, code, purpose);
    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // Success token for completing registration / password reset
    const token = `vtok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return NextResponse.json({
      success: true,
      message: "Email address successfully verified.",
      token,
    });
  } catch (err: unknown) {
    console.error("verify-code error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error during code verification." },
      { status: 500 }
    );
  }
}
