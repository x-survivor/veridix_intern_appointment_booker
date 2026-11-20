import { parse, isValid } from "date-fns";
export const convertTime = (date: string, time: string, duration: number) => {
  const combinedDate = parse(`${date}T${time}`, "PPP'T'hh:mm a", new Date());

  if (!isValid(combinedDate)) {
    throw new Error(`Invalid date or time format: "${date}" at "${time}"`);
  }
  const startTime = combinedDate.getTime();
  const endTime = startTime + duration * 60 * 1000;

  return {
    startTime,
    endTime,
  };
};
