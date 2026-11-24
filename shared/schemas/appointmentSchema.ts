
import { z } from "zod";
import { parse, isValid, format } from "date-fns";

const isValidDate = (value: string) => {
  const date = parse(value, "MMMM do, yyyy", new Date());

  return (
    isValid(date) &&
    format(date, "MMMM do, yyyy") === value
  );
};

export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .trim()
    .min(1, "Patient name is required")
    .max(100, "Patient name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s']+$/, "Patient Name can only include Alphabet and Space"),

  patient_phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,13}$/, "Invalid phone number"),

  doctor_name: z
    .string()
    .trim()
    .min(1, "Doctor name is required")
    .max(100, "Doctor name cannot exceed 100 characters")
    .regex(/^(?:Dr\. )?[A-Za-z]+(?: [A-Za-z]+)*$/, "Doctor Name can only include Alphabet, 'Dr. ', and Space"),

  date: z
  .string()
  .refine(isValidDate, "Invalid date"),

  start_time: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2]):[0-5]\d\s(AM|PM)$/,
      "Invalid time format"
    ),

  duration: z
    .number()
    .int("Duration must be an integer")
    .max(120, "Appointment duration cannot be more than 2 hours")
    .positive("Duration must be greater than zero"),

  reason: z
    .string()
    .trim()
    .max(2000, "Reason cannot exceed 2000 characters")
    .optional(),
}).strict();

export type AppointmentInput = z.infer<typeof appointmentSchema>;
