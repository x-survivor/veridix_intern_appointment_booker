import { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import { convertTime } from "../utils/convertTimeIntoMs";

const isOverlapping = async (
  startTime: number,
  endTime: number,
  doctor_name: string,
  date: string,
  connection: PoolConnection,
) => {
  const [rows] = await connection.execute<RowDataPacket[]>(
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
};

export default isOverlapping;
