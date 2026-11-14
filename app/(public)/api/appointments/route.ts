import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";
import { appointmentSchema } from "@/shared/schemas/appointmentSchema";

export async function GET(req: NextRequest) {
  try {
    const [rows] = await db.execute("SELECT * FROM appointments");

    console.log("Database connected:", rows);

    return res.json({ success: true, rows });
  } catch (error) {
    console.error("Database connection failed:", error);
    return res.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = appointmentSchema.safeParse(body);
    const id = crypto.randomUUID();
    const status = "booked";
    const created_at = new Date().toISOString();

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
    await db.execute(
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

    return res.json(
      {
        success: true,
        message: "Appointment created successfully",
        id: id,
      },
      { status: 201 },
    );
  } catch (error) {
    return res.json({ message: "Database error", error }, { status: 500 });
  }
}
