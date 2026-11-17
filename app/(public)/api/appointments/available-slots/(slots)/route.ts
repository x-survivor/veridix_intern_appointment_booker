import { NextRequest, NextResponse as res } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const doctor_name = searchParams.get("doctor_name");
  const date = searchParams.get("date");
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT doctor_name, patient_name, start_time, duration FROM appointments WHERE doctor_name=? AND date=?",
      [doctor_name, date],
    );
    if (rows.length > 0) {
      return res.json(rows);
    } else {
      return res.json({ message: "failed to find query" }, { status: 404 });
    }
  } catch (error) {
    console.log("error:", error);
  }
}
