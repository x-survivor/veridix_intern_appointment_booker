import axios from "axios";
import { toast } from "sonner";

const updateStatus = async (
  id: string,
  status: "cancelled" | "completed",
  refetch: () => Promise<void>,
) => {
  if (!status) {
    return;
  }
  try {
    const response = await axios.patch(`api/appointments/${id}`, {
      status: status,
    });
    const data = response.data;
    if (response.status == 404 || response.status == 500) {
      toast.error(data.message);
      return;
    }
    toast.success(`Status Update to ${status}`);
    refetch();
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

export { updateStatus };
