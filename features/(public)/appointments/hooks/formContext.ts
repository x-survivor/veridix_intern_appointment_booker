import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";
import { createContext, Dispatch, SetStateAction } from "react";

const AppointmentFormContext = createContext<
  | {
      formValues: appointmentFormType;
      setFormValues: Dispatch<SetStateAction<appointmentFormType>>;
    }
  | undefined
>(undefined);

export { AppointmentFormContext };
