import { format } from "date-fns";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";
import axios from "axios";
import { toast } from "sonner";

const SubmitForm = async (data: appointmentFormType) => {
  const [hours, minutes] = data.start_time.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);

  const AppointSubmitData = {
    patient_name: data.patient_name,
    patient_phone: data.patient_phone,
    doctor_name: data.doctor_name,
    duration: data.duration,
    date: format(data.date, "yyyy-MM-dd"),
    start_time: format(date, "hh:mm"),
    reason: data.reason,
  };
  console.log(AppointSubmitData);
  try {
    const response = await axios.post("/api/appointments", AppointSubmitData);

    toast.success("Appointment recorded successfully", response.data.id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Status:", error.response?.status);
      console.log("Server response:", error.response?.data);

      toast.error(error.response?.data?.message || "Something went wrong");
    } else {
      console.error(error);
      toast.error("Unexpected error occurred");
    }
  }
};
export { SubmitForm };
