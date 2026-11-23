import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/shared/lib/auth/session";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isProtectedPage = pathname === "/appointments" || pathname.startsWith("/appointments/");

  // Proxy performs a fast signature check; the server layout and every data
  // endpoint also validate the session version against MySQL.
  if (isProtectedPage && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = { matcher: ["/appointments/:path*"] };
