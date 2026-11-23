import { PoolConnection } from "mysql2/promise";
import { appointment } from "../constants/types/appointmentType";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { createHash } from "node:crypto";
import isOverlapping from "./isOverlapping";
import { convertTime } from "../utils/convertTimeIntoMs";

const Insert = async (data: appointment, connection: PoolConnection) => {
  const {
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
  } = data;
  let lockAcquired = false;

  const lockName = `appt:${createHash("sha256")
    .update(`${doctor_name.trim().toLowerCase()}|${date}`)
    .digest("hex")
    .slice(0, 59)}`;

  try {
    const [lockRows] = await connection.query<RowDataPacket[]>(
      "SELECT GET_LOCK(?, 5) AS acquired",
      [lockName],
    );
    if (lockRows[0]?.acquired !== 1) {
      return {
        success: false,
        message: "Booking is busy. Please try again.",
        status: 503,
      };
    }
    lockAcquired = true;

    const { startTime, endTime } = convertTime(date, start_time, duration);
    const appointmentOverlap = await isOverlapping(
      startTime,
      endTime,
      doctor_name,
      date,
      connection,
    );

    if (appointmentOverlap?.status) {
      return {
        success: false,
        message: appointmentOverlap.message,
        status: 409,
      };
    }

    const [result] = await connection.execute<ResultSetHeader>(
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
      return {
        success: false,
        message: "Failed to create Appointment",
        status: 500,
      };
    }

    return {
      success: true,
      message: "Appointment created successfully",
      status: 201,
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ER_DUP_ENTRY"
    ) {
      return {
        success: false,
        message: `${doctor_name} has appointment at ${start_time} on ${date}.`,
        status: 409,
      };
    }
  } finally {
    if (lockAcquired) {
      try {
        await connection.query("SELECT RELEASE_LOCK(?)", [lockName]);
      } catch (error) {
        console.error("Failed to release appointment lock:", error);
      }
    }
  }
};

export { Insert };
