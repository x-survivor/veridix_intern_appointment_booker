import { NextRequest, NextResponse } from "next/server";
import { getRequestUser } from "@/shared/lib/auth/session";

export const runtime = "nodejs";

export function GET(request: NextRequest) {
  try {
    const user = getRequestUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Not authenticated." },
        { status: 401 },
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Session lookup failed:", error);
    return NextResponse.json(
      { success: false, message: "Unable to verify the session." },
      { status: 500 },
    );
  }
}
