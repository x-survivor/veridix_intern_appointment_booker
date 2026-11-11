import { toast } from "sonner";
const pastDateCheck = (date: Date | undefined) => {
  const currentDate = new Date();
  if (!date) {
    return false;
  }
  if (date < currentDate) {
    toast.error("Appointment cannot be booked in past", {
      position: "top-right",
    });
    return false;
  }
  return true;
};
export { pastDateCheck };
