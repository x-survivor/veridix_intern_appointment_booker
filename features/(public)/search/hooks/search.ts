import { appointment } from "@/shared/constants/types/appointmentType";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import getSearchData from "../services/getSearchData";

export const useSearch = (value: string) => {
  const [searchResult, setSearchResult] = useState<appointment[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  const refetch = useCallback(async () => {
    const cleanString = value.replace(/[\s\.]+/g, "").length;
    if(cleanString < 3 || cleanString == 0){
      return
    }
    setLoading(true);
    setError(null);
    try {
      const { rows, message, success } = await getSearchData(value);
      if (!success) {
        setError({message: message});
        return;
      }
      setSearchResult(rows);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSearchResult([]);
        setError(error.response?.data?.message);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
      setError(null);
    }
  }, [value]);

  useEffect(() => {
    const getData = () => {
      refetch();
    };
    getData();
  }, [value, refetch]);

  return { loading, error, searchResult, refetch };
};
