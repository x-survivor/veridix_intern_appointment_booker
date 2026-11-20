import { NextRequest, NextResponse as res } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";
import * as z from "zod";
import { calculateAvailableSlots } from "@/shared/utils/calculateAvailableSlots";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const doctor_name = searchParams.get("doctor_name");
  const date = searchParams.get("date");

  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM appointments WHERE doctor_name=? AND date=?",
      [doctor_name, date],
    );
    if (rows.length > 0) {
      const parsedDate = calculateAvailableSlots(date as string, rows[0]["start_time"], rows[0]["duration"]);
      return res.json(rows);
    } else {
      return res.json({ message: "failed to find query", date, doctor_name }, { status: 404 });
    }
  } catch (error) {
    console.log("error:", error);
    return res.json(error);
  }
}
