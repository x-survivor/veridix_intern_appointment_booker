import { useContext } from "react";
import { AppointmentFormContext } from "./formContext";
export function useAppointmentForm() {
  const context = useContext(AppointmentFormContext);

  if (!context) {
    throw new Error(
      "useAppointmentForm must be used within AppointmentFormProvider",
    );
  }

  return context;
}
