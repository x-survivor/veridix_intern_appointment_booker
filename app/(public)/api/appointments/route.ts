import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";
import { appointmentSchema } from "@/shared/schemas/appointmentSchema";
import { filterSchema } from "@/shared/schemas/filterSchema";
import { Insert } from "@/shared/services/insertData";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    //pagination
    const rawPage = Number(searchParams.get("page"));
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    //filteration
    const validation = filterSchema.safeParse({
      doctor: searchParams.get("doctor") || undefined,
      date: searchParams.get("date") || undefined,
      status: searchParams.get("status") || undefined,
    });

    if (!validation.success) {
      return res.json(
        {
          success: false,
          message: "Invalid filters",
          errors: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const { doctor, date, status } = validation.data;

    const conditions: string[] = [];
    const values: string[] = [];

    if (doctor) {
      conditions.push("doctor_name = ?");
      values.push(doctor);
    }
    if (status) {
      conditions.push("status = ?");
      values.push(status);
    }
    if (date) {
      conditions.push("date = ?");
      values.push(date);
    }

    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM appointments ${whereClause} ORDER BY created_at LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    const [count] = await db.execute<RowDataPacket[]>(
      `
        SELECT
    COUNT(*) AS total,
    COALESCE(SUM(status = 'booked'), 0) AS booked,
    COALESCE(SUM(status = 'cancelled'), 0) AS cancelled,
    COALESCE(SUM(status = 'completed'), 0) AS completed
        FROM appointments ${whereClause}
`,
      [...values],
    );

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
  const id = crypto.randomUUID();
  const status = "booked";
  const created_at = new Date().toISOString();
  const connection = await db.getConnection();

  try {
    const body = await req.json();
    if (!body) {
      return res.json(
        {
          success: false,
          message: "Invalid Request or Parameters are missing",
        },
        {
          status: 400,
        },
      );
    }
    const validation = appointmentSchema.safeParse(body);
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
    if (!result) {
      return res.json(
        {
          success: false,
          message: "Failed to Create Appointment, try again",
        },
        { status: 500 },
      );
    }

    return res.json(
      {
        success: result.success,
        message: result.message,
      },
      { status: result.status },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return res.json(
        { success: false, message: "Malformed JSON in request body" },
        { status: 400 },
      );
    }
    return res.json(
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
