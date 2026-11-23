import { NextRequest, NextResponse } from "next/server";
import db from "@/shared/lib/database/db";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const patientName = searchParams.get("patient_name");
  const doctorName = searchParams.get("doctor_name");
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT * FROM appointments WHERE doctor_name = ? OR patient_name = ?`,
      [doctorName, patientName],
    );

    return NextResponse.json(rows);
  } catch (error) {
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
