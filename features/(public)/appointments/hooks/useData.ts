"use client";

import { appointment } from "@/shared/constants/types/appointmentType";
import { useState, useEffect, useMemo } from "react";
import getAllData from "../services/getAllData";

export default function useData(filter: string) {
  //   const [filteredData, setFilteredData] = useState<appointment[]>([]);
  const [fetchedData, setFetchedData] = useState<appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        console.log(data?.rows);
        setFetchedData(data?.rows ?? []);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     const filterData = () => {
  //       if (filter == "") {
  //         setFilteredData(fetchedData);
  //         return;
  //       }
  //       const filteredArray = fetchedData.filter(
  //         (item) => item.doctor_name == filter || item.status == filter,
  //       );
  //       setFilteredData(filteredArray);
  //     };
  //     filterData();
  //   }, [filter, fetchedData]);
  const filteredData = useMemo(() => {
    if(filter == ""){
        return fetchedData;
    }
    const filteredArray = fetchedData.filter(
      (item) => item.doctor_name == filter || item.status == filter,
    );
    return filteredArray;
  }, [filter, fetchedData]);

  return {filteredData};
}
