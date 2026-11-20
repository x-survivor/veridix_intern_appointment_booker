import { convertTime } from "./convertTimeIntoMs";

export const calculateAvailableSlots = (
  date: string,
  time: string,
  duration: number,
) => {
  const exitingStartTime = convertTime(date, time, duration).startTime;
  const exitingEndTime = convertTime(date, time, duration).endTime;
};
