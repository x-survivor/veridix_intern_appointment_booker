import { RowDataPacket } from "mysql2";
import { convertTime } from "./convertTimeIntoMs";

export const calculateAvailableSlots = (
  date: string,
  rows: RowDataPacket[],
) => {
  const existingTime = rows
    .filter((row) => row.status === "booked")
    .map((row) => convertTime(date, row.start_time, row.duration));

  const slots: string[] = [];

  const openingTime = convertTime(date, "09:00 AM", 30).startTime;
  const closingTime = convertTime(date, "05:00 PM", 0).startTime;

  const interval = 30 * 60 * 1000;
  const duration = 30 * 60 * 1000;

  for (
    let startTime = openingTime;
    startTime + duration <= closingTime;
    startTime += interval
  ) {
    const endTime = startTime + duration;

    const isBooked = existingTime.some(
      ({ startTime: existingStart, endTime: existingEnd }) =>
        startTime < existingEnd && endTime > existingStart,
    );

    if (!isBooked) {
      slots.push(
        new Date(startTime).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Karachi",
        }),
      );
    }
  }

  return slots;
};
