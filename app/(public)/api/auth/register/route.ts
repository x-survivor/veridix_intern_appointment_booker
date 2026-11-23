import { NextRequest, NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import db from "@/shared/lib/database/db";
import { registrationSchema } from "@/shared/schemas/authSchema";
import { hashPassword } from "@/shared/lib/auth/password";
import {
  assertAuthConfiguration,
  attachSessionCookie,
  type SessionUser,
} from "@/shared/lib/auth/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const validation = registrationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        message: validation.error.issues[0]?.message ?? "Invalid registration details",
      },
      { status: 400 },
    );
  }

  try {
    assertAuthConfiguration();

    const { name, email, password } = validation.data;
    const passwordHash = await hashPassword(password);
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash],
    );

    const user: SessionUser = {
      id: String(result.insertId),
      name,
      email,
    };

    const response = NextResponse.json(
      { success: true, message: "Account created successfully.", user },
      { status: 201 },
    );

    attachSessionCookie(response, user);
    return response;
  } catch (error) {
    if ((error as { code?: string })?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 },
      );
    }

    console.error("Registration failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to create the account. Check the server configuration and try again." },
      { status: 500 },
    );
  }
}
