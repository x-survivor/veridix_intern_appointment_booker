import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/shared/lib/auth/session";

export const runtime = "nodejs";

export function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully.",
  });

  clearSessionCookie(response);
  return response;
}
