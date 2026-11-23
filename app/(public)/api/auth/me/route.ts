import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/shared/lib/auth/authGuard";

export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const auth = await requireAuthenticatedUser(request);
  if (!auth.ok) return auth.response;
  return NextResponse.json({ success: true, user: auth.user });
}
