import { filter } from "@/shared/constants/types/filterType";
import axios from "axios";

export default async function getAllData(pageNumber?: number | 1, filter?: filter) {
  try {
    const response = await axios.get("/api/appointments", {
      params: {
        page: pageNumber,
        doctor: filter?.filterByDoctor,
        date: filter?.filterByDate,
        status: filter?.filterByStatus
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({ status: error.response?.status });
      throw error;
    }
  }
}
