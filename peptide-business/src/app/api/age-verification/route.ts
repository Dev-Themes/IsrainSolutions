import { NextRequest, NextResponse } from "next/server";
import {
  AGE_COOKIE_NAME,
  AGE_COOKIE_MAX_AGE,
  createAgeVerificationToken,
  sanitizeReturnUrl,
} from "@/lib/age-verification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, returnUrl } = body;

    const safeUrl = sanitizeReturnUrl(returnUrl);

    if (action === "confirm") {
      const token = await createAgeVerificationToken();
      const response = NextResponse.json({
        success: true,
        redirectUrl: safeUrl,
      });

      response.cookies.set({
        name: AGE_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: AGE_COOKIE_MAX_AGE,
      });

      return response;
    }

    if (action === "deny" || action === "reset") {
      const response = NextResponse.json({
        success: true,
        status: action === "deny" ? "denied" : "reset",
      });

      response.cookies.set({
        name: AGE_COOKIE_NAME,
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return response;
    }

    return NextResponse.json(
      { error: "Invalid action parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing age verification request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
