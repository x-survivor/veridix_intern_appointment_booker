import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "clinio_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionPayload = SessionUser & {
  expiresAt: number;
};

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("AUTH_SECRET must be configured with at least 32 bytes.");
  }

  return secret;
}

export function assertAuthConfiguration(): void {
  getAuthSecret();
}

export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getAuthSecret())
    .update(encodedPayload)
    .digest("base64url");

  return encodedPayload + "." + signature;
}

export function readSessionToken(token?: string): SessionUser | null {
  if (!token) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return null;
  }

  const [encodedPayload, suppliedSignature] = parts;
  const expectedSignature = createHmac("sha256", getAuthSecret())
    .update(encodedPayload)
    .digest();
  const actualSignature = Buffer.from(suppliedSignature, "base64url");

  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    if (
      typeof payload.id !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export function getRequestUser(request: NextRequest): SessionUser | null {
  return readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function attachSessionCookie(
  response: NextResponse,
  user: SessionUser,
): void {
  response.cookies.set(SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
