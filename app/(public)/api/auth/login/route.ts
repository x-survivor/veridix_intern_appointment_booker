import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";
import { loginSchema } from "@/shared/schemas/authSchema";
import { verifyPassword } from "@/shared/lib/auth/password";
import {
  assertAuthConfiguration,
  attachSessionCookie,
  type SessionUser,
} from "@/shared/lib/auth/session";

export const runtime = "nodejs";

interface UserRow extends RowDataPacket {
  id: number | string;
  name: string;
  email: string;
  password_hash: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        message: validation.error.issues[0]?.message ?? "Invalid login details",
      },
      { status: 400 },
    );
  }

  try {
    assertAuthConfiguration();

    const { email, password } = validation.data;
    const [rows] = await db.execute<UserRow[]>(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email],
    );

    const account = rows[0];
    const passwordMatches = account
      ? await verifyPassword(password, account.password_hash)
      : false;

    if (!account || !passwordMatches) {
      return NextResponse.json(
        { success: false, message: "Email or password is incorrect." },
        { status: 401 },
      );
    }

    const user: SessionUser = {
      id: String(account.id),
      name: account.name,
      email: account.email,
    };

    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully.",
      user,
    });

    attachSessionCookie(response, user);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to sign in. Check the server configuration and try again." },
      { status: 500 },
    );
  }
}
