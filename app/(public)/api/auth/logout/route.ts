import { NextRequest, NextResponse } from "next/server";
import db from "@/shared/lib/database/db";
import { clearSessionCookie, getRequestSession, hasValidOrigin } from "@/shared/lib/auth/session";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) return NextResponse.json({ success: false, message: "Invalid request origin" }, { status: 403 });
  const session = getRequestSession(request);
  const response = NextResponse.json({ success: true, message: "Signed out successfully." });

  try {
    if (session) {
      await db.execute(
        "UPDATE users SET token_version = token_version + 1 WHERE id = ? AND token_version = ?",
        [session.id, session.tokenVersion],
      );
    }
  } catch (error) {
    console.error("Session revocation failed:", error);
    clearSessionCookie(response);
    return NextResponse.json(
      { success: false, message: "The local session was cleared, but server-side revocation could not be confirmed." },
      { status: 503, headers: response.headers },
    );
  }
  clearSessionCookie(response);
  return response;
}
