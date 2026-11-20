import db from "@/shared/lib/database/db";
import { RowDataPacket } from "mysql2";
import { convertTime } from "../utils/convertTimeIntoMs";

const isOverlapping = async (
  startTime: number,
  endTime: number,
  doctor_name: string,
  date: string,
) => {
  try {
    const [rows] = await db.execute<RowDataPacket[]>(
      "SELECT start_time, duration FROM appointments WHERE doctor_name=? AND date=? AND status='booked'",
      [doctor_name, date],
    );
    const hasOverlap = rows.some((appointment) => {
      const period = convertTime(
        date,
        appointment.start_time,
        appointment.duration,
      );

      return startTime < period.endTime && endTime > period.startTime;
    });

    if (hasOverlap) {
      return {
        status: true,
        message: "Doctor already has an appointment during this time.",
      };
    }

    return null;
  } catch (error) {
    return {
      message: error,
    };
  }
};

export default isOverlapping;
