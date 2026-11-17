"use client";

import { appointment } from "@/shared/constants/types/appointmentType";
import { useState, useEffect, useMemo, useCallback } from "react";
import getAllData from "../services/getAllData";
import type { filter } from "@/shared/constants/types/filterType";
import { InitalFilter } from "@/shared/constants/datasets/initialFilter";

export default function useData(filter?: filter) {
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
    if (filter == InitalFilter || filter == undefined) {
      return fetchedData;
    }
    const filteredArray = fetchedData.filter(
      (item) =>
        (!filter.filterByDoctor ||
          item.doctor_name === filter.filterByDoctor) &&
        (!filter.filterByStatus || item.status === filter.filterByStatus) &&
        (!filter.filterByDate || item.date === filter.filterByDate),
    );
    return filteredArray;
  }, [filter, fetchedData]);

  return { filteredData, loading, error, refetch };
}
