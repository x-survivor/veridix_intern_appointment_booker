
import { z } from "zod";

const isValidDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .trim()
    .min(1, "Patient name is required")
    .max(100, "Patient name cannot exceed 100 characters"),

  patient_phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,13}$/, "Invalid phone number"),

  doctor_name: z
    .string()
    .trim()
    .min(1, "Doctor name is required")
    .max(100, "Doctor name cannot exceed 100 characters"),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine(isValidDate, "Invalid calendar date"),

  start_time: z
    .string()
    .regex(
      /^(?:[01]\d|2[0-3]):[0-5]\d$/,
      "Invalid time format"
    ),

  duration: z
    .number()
    .int("Duration must be an integer")
    .positive("Duration must be greater than zero"),

  reason: z
    .string()
    .trim()
    .max(2000, "Reason cannot exceed 2000 characters")
    .optional(),
}).strict();

export type AppointmentInput = z.infer<typeof appointmentSchema>;
