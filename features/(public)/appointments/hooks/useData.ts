"use client";

import { appointment } from "@/shared/constants/types/appointmentType";
import { useState, useEffect, useMemo, useCallback } from "react";
import getAllData from "../services/getAllData";
import { toast } from "sonner";

export default function useData(filter?: string) {
  const [fetchedData, setFetchedData] = useState<appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllData();
      if (data.rows <= 0) {
        setError("No Data Found");
      }
      setFetchedData(data.rows);
      toast.info("function is called");
    } catch (error) {
      console.error("Failed to fetch appointments", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      refetch();
    };
    fetchData();
  }, [refetch]);

  const filteredData = useMemo(() => {
    if (filter == "") {
      return fetchedData;
    }
    const filteredArray = fetchedData.filter(
      (item) => item.doctor_name == filter || item.status == filter,
    );
    return filteredArray;
  }, [filter, fetchedData]);

  return { filteredData, loading, error, refetch };
}
