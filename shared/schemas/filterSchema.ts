import { z } from "zod";
import { format, isValid, parse } from "date-fns";

const isValidDate = (value: string) => {
  const date = parse(value, "MMMM do, yyyy", new Date());

  return isValid(date) && format(date, "MMMM do, yyyy") === value;
};

const filterSchema = z.object({
  doctor: z
    .string()
    .trim()
    .min(1, "Doctor name is required")
    .max(100, "Doctor name cannot exceed 100 characters")
    .regex(
      /^(?:Dr\.\s*)?[A-Za-z\s]+$/,
      "Doctor name can only include alphabets, 'Dr.' and spaces",
    )
    .optional(),

  date: z.string().refine(isValidDate, "Invalid date").optional(),

  status: z
    .enum(["booked", "cancelled", "completed"], {
      message: "Invalid status",
    })
    .optional(),
});

export {filterSchema}
