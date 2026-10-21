import { NextRequest, NextResponse } from "next/server";
import { AGE_COOKIE_NAME, verifyAgeToken } from "@/lib/age-verification";

// Path exclusions from age gate
const PUBLIC_FILE_EXTENSIONS = [
  ".ico",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".css",
  ".js",
  ".txt",
  ".xml",
  ".woff",
  ".woff2",
];

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Allow Next.js internal files, build assets, and public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/age-verification") ||
    pathname.startsWith("/age-verification") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // 2. Allow static files with standard extensions
  const isPublicStatic = PUBLIC_FILE_EXTENSIONS.some((ext) =>
    pathname.toLowerCase().endsWith(ext)
  );
  if (isPublicStatic) {
    return NextResponse.next();
  }

  // 3. Inspect age-verification cookie
  const ageCookie = request.cookies.get(AGE_COOKIE_NAME)?.value;
  const isVerified = await verifyAgeToken(ageCookie);

  if (!isVerified) {
    // Preserve requested local route for safe redirect after confirmation
    const destination = pathname + search;
    const url = new URL("/age-verification", request.url);
    if (destination !== "/") {
      url.searchParams.set("returnUrl", destination);
    }
    return NextResponse.redirect(url);
  }

  // 4. Access confirmed: continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
