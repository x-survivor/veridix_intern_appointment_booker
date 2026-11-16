import axios from "axios";
import { toast } from "sonner";

const updateStatus = async (id: string, status: "cancelled" | "completed") => {
  if (!status) {
    return;
  }
  try {
    const response = await axios.patch(`api/appointments/${id}`, {
      status: status,
    });
    console.log(response.data);
    toast.success(`Status Update to ${status}`);
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

export { updateStatus }
