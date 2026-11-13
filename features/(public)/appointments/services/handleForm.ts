import { format } from "date-fns";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

const SubmitForm = (data: appointmentFormType) => {
  const [hours, minutes] = data.start_time.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  const id = crypto.randomUUID();
  const AppointSubmitData = {
    id: id,
    patient_name: data.patient_name,
    patient_phone: data.patient_phone,
    doctor_name: data.doctor_name,
    duration: data.duration,
    date: format(data.date, "PPP"),
    start_time: format(date, "hh:mm a"),
    reason: data.reason,
    status: "booked",
    created_at: new Date().toString(),
  };

  console.log(AppointSubmitData);
};
export { SubmitForm };
