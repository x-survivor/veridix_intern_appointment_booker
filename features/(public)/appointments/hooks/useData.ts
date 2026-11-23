"use client";

import { appointment } from "@/shared/constants/types/appointmentType";
import { useState, useEffect, useCallback } from "react";
import getAllData from "../services/getAllData";
import type { filter } from "@/shared/constants/types/filterType";

export default function useData(filter?: filter) {
  const [fetchedData, setFetchedData] = useState<appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{message: string}>({message:""});
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { filterByDoctor, filterByStatus, filterByDate } = filter ?? {};

  const [statistics, setStatistics] = useState({
    total: 0,
    booked: 0,
    cancelled: 0,
    completed: 0,
  });

  const refetch = useCallback(
    async (pageNumber: number = 1) => {
      setLoading(true);
      setError({message:""});

      try {
        const data = await getAllData(pageNumber, {
          filterByDoctor: filterByDoctor ?? "",
          filterByStatus: filterByStatus ?? "",
          filterByDate: filterByDate ?? "",
        });

        const { rows, pagination, total, booked, cancelled, completed } = data;
        console.log(data);
        setCurrentPage(pagination.page);
        setPages(pagination.totalPages);
        setFetchedData(rows);
        setStatistics({ total, booked, cancelled, completed });

        if (rows.length === 0) {
          setError({ message: "No Data Found" });
        }
      } catch (error) {
        console.error("Failed to fetch appointments", error);
        setError({message:""});
      } finally {
        setLoading(false);
      }
    },
    [filter],
  );

  useEffect(() => {
    const fetchData = async () => {
      refetch();
    };
    fetchData();
  }, [
    refetch,
    filter?.filterByDoctor,
    filter?.filterByStatus,
    filter?.filterByDate,
  ]);

  return {
    filteredData: fetchedData,
    loading,
    error,
    refetch,
    pages,
    statistics,
    currentPage,
  };
}
