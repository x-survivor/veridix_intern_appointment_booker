import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";
import { getRequestSession, type SessionUser } from "@/shared/lib/auth/session";

export type PublicUser = Pick<SessionUser, "id" | "name" | "email">;
type UserRow = RowDataPacket & { id: number | string; name: string; email: string; token_version: number | string };
export type AuthenticatedRequest =
  | { ok: true; user: PublicUser; session: SessionUser }
  | { ok: false; response: NextResponse };

function unauthorized(): AuthenticatedRequest {
  return { ok: false, response: NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 }) };
}

/** Verify the signed cookie and its revocation version against the users table. */
export async function requireAuthenticatedUser(request: NextRequest): Promise<AuthenticatedRequest> {
  const session = getRequestSession(request);
  if (!session) return unauthorized();
  try {
    const [rows] = await db.execute<UserRow[]>(
      "SELECT id, name, email, token_version FROM users WHERE id = ? LIMIT 1", [session.id],
    );
    const account = rows[0];
    if (!account || Number(account.token_version) !== session.tokenVersion) return unauthorized();
    return {
      ok: true, session,
      user: { id: String(account.id), name: account.name, email: account.email },
    };
  } catch (error) {
    console.error("Authentication lookup failed:", error);
    return { ok: false, response: NextResponse.json({ success: false, message: "Unable to verify authentication." }, { status: 503 }) };
  }
}
