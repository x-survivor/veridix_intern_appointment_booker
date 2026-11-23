import { NextRequest, NextResponse as res } from "next/server";
import { RowDataPacket } from "mysql2";
import db from "@/shared/lib/database/db";
import { calculateAvailableSlots } from "@/shared/utils/calculateAvailableSlots";
import { filterSchema } from "@/shared/schemas/filterSchema";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const validation = filterSchema.safeParse({
    doctor: searchParams.get("doctor_name"),
    date: searchParams.get("date"),
  });
  if (!validation.success) {
    return res.json(
      {
        success: false,
        message: validation.error.issues
          .map((issue) => issue.message)
          .join(", "),
      },
      {
        status: 400,
      },
    );
  }
  const doctor_name = validation.data.doctor;
  const date = validation.data.date;
  const connection = await db.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM appointments WHERE doctor_name=? AND date=?",
      [doctor_name, date],
    );
    const slots = calculateAvailableSlots(date as string, rows);
    return res.json(slots);
  } catch (error) {
    console.log("error:", error);
    return res.json(
      { message: "Failed to retrieve available slots" },
      { status: 500 },
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
