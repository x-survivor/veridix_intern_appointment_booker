import axios from "axios";

export default async function getSearchData(value: string) {
  try {
    const response = await axios.get("/api/appointments/search", {
      params: {
        value: value
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