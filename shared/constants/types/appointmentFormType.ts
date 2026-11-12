import { appointment } from "./appointmentType";

type appointmentFormType = Omit<appointment, "id" | "status" | "created_at">;

export type { appointmentFormType }
