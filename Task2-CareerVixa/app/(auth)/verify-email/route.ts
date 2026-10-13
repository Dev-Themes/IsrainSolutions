import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=MissingToken", request.url));
  }

  try {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return NextResponse.redirect(new URL("/login?error=InvalidToken", request.url));
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.redirect(new URL("/login?error=ExpiredToken", request.url));
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.identifier },
    });

    if (!existingUser) {
      return NextResponse.redirect(new URL("/login?error=EmailDoesNotExist", request.url));
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.identifier, // in case they were changing email
      },
    });

    await prisma.verificationToken.delete({
      where: { token: existingToken.token },
    });

    return NextResponse.redirect(new URL("/login?verified=1", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/login?error=VerificationFailed", request.url));
  }
}
