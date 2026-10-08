import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // We only protect /admin for now, except /admin/login
  const isProtectedAdmin = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isProtectedDashboard = pathname.startsWith("/dashboard");

  if (!isProtectedAdmin && !isProtectedDashboard) {
    return NextResponse.next();
  }

  try {
    const sessionResponse = await fetch(new URL("/api/auth/get-session", request.url).toString(), {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const data = await sessionResponse.json().catch(() => null);
    const session = data?.session;
    const user = data?.user;

    if (!session || !user) {
      const loginUrl = isProtectedAdmin ? "/admin/login" : "/login";
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }

    if (isProtectedAdmin && user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  } catch (error) {
    console.error("Middleware session fetch error:", error);
    const loginUrl = isProtectedAdmin ? "/admin/login" : "/login";
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
