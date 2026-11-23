import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/shared/lib/auth/session";

const isProtectedPage = (pathname: string) => pathname === "/appointments" || pathname.startsWith("/appointments/");
const isAuthenticationPage = (pathname: string) => pathname === "/login" || pathname === "/register";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (isProtectedPage(pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthenticationPage(pathname) && session) return NextResponse.redirect(new URL("/appointments", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/appointments/:path*", "/login", "/register"] };
