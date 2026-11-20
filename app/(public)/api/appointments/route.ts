import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";
import { appointmentSchema } from "@/shared/schemas/appointmentSchema";
import { convertTime } from "@/shared/utils/convertTimeIntoMs";
import isOverlapping from "@/shared/services/isOverlapping";
import { ResultSetHeader } from "mysql2";

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM appointments");
    return res.json({ success: true, rows });
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = appointmentSchema.safeParse(body);
  const id = crypto.randomUUID();
  const status = "booked";
  const created_at = new Date().toISOString();
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

    const {
      patient_name,
      patient_phone,
      doctor_name,
      date,
      start_time,
      duration,
      reason,
    } = validation.data;
    const { startTime, endTime } = convertTime(date, start_time, duration);
    const OverlapCheck = await isOverlapping(
      startTime,
      endTime,
      doctor_name,
      date,
    );

    if (OverlapCheck?.status) {
      return res.json(OverlapCheck, { status: 409 });
    }

    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO appointments (id, patient_name, patient_phone, doctor_name, start_time, reason, status, created_at, duration, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        patient_name,
        patient_phone,
        doctor_name,
        start_time,
        reason,
        status,
        created_at,
        duration,
        date,
      ].map((value) => value ?? null),
    );
    if (result.affectedRows === 0) {
      return res.json(
        {
          success: false,
          message: "Failed to create Appointment",
        },
        {
          status: 500,
        },
      );
    }

    return res.json(
      {
        success: true,
        message: "Appointment created successfully",
        id: id,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      return res.json(
        {
          message: `${body.doctor_name} has appointment at ${body.start_time} on ${body.date}.`,
        },
        { status: 409 },
      );
    }
    return res.json({ message: "Database error", error }, { status: 500 });
  }
}
