import { NextRequest, NextResponse as res } from "next/server";
import db from "@/shared/lib/database/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import * as z from "zod";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT * FROM appointments WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      return res.json(
        {
          success: false,
          message: "Appointment not found",
        },
        {
          status: 404,
        },
      );
    }
    return res.json(
      {
        success: true,
        data: rows[0],
      },
      { status: 200 },
    );
  } catch (error) {
    return error as Error;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { status } = z
      .object({
        status: z.enum(["completed", "cancelled"], {
          message: "Invalid Status Type",
        }),
      })
      .strict()
      .parse(await req.json());

    const { id } = await params;

    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT status FROM appointments WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.json(
        { success: false, message: "Appointment not found" },
        { status: 404 },
      );
    }

    if (rows[0].status !== "booked") {
      return res.json(
        {
          success: false,
          message: "Only booked appointments can be updated",
        },
        { status: 409 },
      );
    }

    const [result] = await db.execute<ResultSetHeader>(
      "UPDATE appointments SET status = ? WHERE id = ? AND status = 'booked'",
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.json(
        {
          success: false,
          message: "Appointment status was modified by another request",
        },
        { status: 409 },
      );
    }

    return res.json(
      {
        success: true,
        message: `Appointment ${status} successfully`,
        id,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error("PATCH Appointment Error:", error);

    return res.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
