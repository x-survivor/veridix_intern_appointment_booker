import axios from "axios";

export default async function getAllData(pageNumber?: number | 1) {
  try {
    const response = await axios.get("/api/appointments", {
      params: {
        page: pageNumber
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({ status: error.response?.status });
    }
  }
}
