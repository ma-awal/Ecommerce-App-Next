// Ei function protita matching request-er age run hoy - login check
// eikhanei kore fela hoy, tai kono protected page/API individually
// check korte hoy na.

import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

// Ei path gulo login chara o accessible thakte hobe (login form nijei,
// ar logout - session na thakleo cookie clear korte deya nirapod)
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login", "/api/admin/logout"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value;
  const isValid = await verifySessionToken(token);

  if (pathname === "/admin/login" && isValid) {
    return NextResponse.redirect(new URL("/admin/orders", request.url));
  }

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  if (!isValid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};