import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";
import { FormEvent,  } from "react";


const SubmitForm = (
  e: FormEvent<HTMLFormElement>,
  formValues: appointmentFormType,
) => {
  e.preventDefault();

  const id = crypto.randomUUID();
  const AppointSubmitData = ({
    id: id,
    patient_name: formValues.patient_name,
    patient_phone: formValues.patient_phone,
    doctor_name: formValues.doctor_name,
    duration: formValues.duration,
    date: formValues.date,
    start_time: formValues.start_time,
    reason: formValues.reason,
    status: "booked",
    created_at: new Date().toString(),
  });

 console.log(AppointSubmitData);
};
export { SubmitForm };
