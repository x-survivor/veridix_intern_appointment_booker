import { NextRequest, NextResponse as res } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";
import { calculateAvailableSlots } from "@/shared/utils/calculateAvailableSlots";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const doctor_name = searchParams.get("doctor_name");
  const date = searchParams.get("date");
  const connection = await db.getConnection();

  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM appointments WHERE doctor_name=? AND date=?",
      [doctor_name, date],
    );
    const slots = calculateAvailableSlots(date as string, rows);
    return res.json(slots);
  } catch (error) {
    console.log("error:", error);
    return res.json(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
