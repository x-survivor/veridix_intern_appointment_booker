import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";

export async function GET(
  _: null,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const rows = await db.execute("SELECT * FROM appointments WHERE id = ?", [id]);
  return res.json(rows[0]);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { status } = await req.json();
    const { id } = await params;
    await db.execute("UPDATE appointments SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    return res.json(
      {
        success: true,
        message: `Status is updated to ${status}`,
        id: id,
      },
      { status: 201 },
    );
  } catch (error) {
    return res.json({ message: "Database error", error }, { status: 500 });
  }
}
