import { NextRequest, NextResponse } from "next/server";
import db from "@/shared/lib/database/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const value = searchParams.get("value");
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM appointments WHERE doctor_name = ? OR patient_name = ?`,
      [value, value],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No Data Found",
          value,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { success: true, Message: "Data", rows },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Malformed JSON in request body" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Database error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
