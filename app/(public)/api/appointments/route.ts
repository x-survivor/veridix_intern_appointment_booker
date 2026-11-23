import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";
import { appointmentSchema } from "@/shared/schemas/appointmentSchema";
import { Insert } from "@/shared/services/insertData";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const rawPage = Number(req.nextUrl.searchParams.get("page"));
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
      "SELECT * FROM appointments ORDER BY created_at LIMIT ? OFFSET ?",
      [limit, offset],
    );
    const [count] = await db.execute<RowDataPacket[]>(`
       SELECT
       COUNT(*) AS total,
        SUM(status = 'booked') AS booked,
        SUM(status = 'cancelled') AS cancelled,
        SUM(status = 'completed') AS completed
        FROM appointments
`);

    const { total, booked, cancelled, completed } = count[0];
    const totalPages = Math.ceil(total / limit);
    return res.json({
      success: true,
      rows,
      booked,
      cancelled,
      completed,
      total,
      pagination: {
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.json(
      { success: false, message: "Failed to Fetch Data" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = appointmentSchema.safeParse(body);
  const id = crypto.randomUUID();
  const status = "booked";
  const created_at = new Date().toISOString();
  const connection = await db.getConnection();

  try {
    if (!validation.success) {
      return res.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const result = await Insert(
      {
        id,
        patient_name: validation.data.patient_name,
        patient_phone: validation.data.patient_phone,
        doctor_name: validation.data.doctor_name,
        date: validation.data.date,
        start_time: validation.data.start_time,
        duration: validation.data.duration,
        reason: validation.data.reason,
        status,
        created_at,
      },
      connection,
    );

    return res.json(
      {
        success: result?.success,
        message: result?.message,
      },
      { status: result?.status },
    );
  } catch (error) {
    return res.json({ message: "Database error", error }, { status: 500 });
  } finally {
    connection.release();
  }
}
