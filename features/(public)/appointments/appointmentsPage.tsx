"use client";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";

import { Toaster } from "@/shared/components/ui/sonner";
import { ApplicationForm } from "./components/appointmentForm";
import { AppointmentCard } from "@/shared/components/appointmendCard";
import { Filter, Plus } from "lucide-react";
import { doctors } from "@/shared/constants/datasets/doctors";

import { StatisticsCard } from "@/shared/components/statisticsCard";
import getAllData from "./services/getAllData";
import { appointment } from "@/shared/constants/types/appointmentType";


const status = [
    {
        value: "booked",
        label: "Booked"
    },
    {
        value: "canceled",
        label: "Cancelled"
    },
    {
        value: "completed",
        label: "Completed"
    },

]

const AppointmentPage = () => {
    const [dialogTrigger, setDialogTrigger] = useState(false);
    const [filter, setFilter] = useState<string>("");
    const [filteredData, setFilteredData] = useState<appointment[]>([]);
    const [fetchedData, setFetchedData] = useState<appointment[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllData();
                console.log(data?.rows)
                setFetchedData(data?.rows ?? []);
            } catch (error) {
                console.error("Failed to fetch appointments", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            if (filter == "") {
                setFilteredData(fetchedData);
                return;
            }
            const filteredArray = fetchedData.filter((item) => (
                item.doctor_name == filter || item.status == filter
            ))
            setFilteredData(filteredArray);
        }
        filterData();
    }, [filter, fetchedData])

    return (
        <section className="px-10 py-5 flex flex-col gap-2">
            <Toaster richColors />
            <div className="flex gap-2">
                <StatisticsCard title="Total" count={9} />
                <StatisticsCard title="Cancelled" count={2} />
                <StatisticsCard title="Completed" count={3} />
            </div>
            <div className="w-full flex justify-end items-center gap-2">
                <div className="grow">
                    <h1 className="font-bold text-2xl">Appointments Table</h1>
                </div>
                <Select value={filter} onValueChange={(value) => setFilter(value ?? "")}>
                    <SelectTrigger className={`grow lg:w-50 border border-black/30 px-2 rounded-md`}>
                        <Filter /> <SelectValue placeholder={"Filter"} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <h6 className="text-sm font-semibold text-black/50 px-2 py-2 border-b">By Doctor Name</h6>
                            {doctors && doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    {doctor.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectGroup>
                            <h6 className="text-sm font-semibold text-black/50 px-2 py-2 border-b">By Status</h6>
                            {status.map((item) => (
                                <SelectItem key={item.value} value={item.label}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button onClick={() => setFilter("")} variant="destructive" className="rounded-md">Reset</Button>
                <Button
                    variant="ghost"
                    onClick={() => setDialogTrigger(true)}
                    className="rounded-md bg-gray-800 text-white hover:bg-black/30 hover:cursor-pointer"
                >
                    <Plus /> Appointment
                </Button>
            </div>
            <ApplicationForm
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
            />
            <Suspense fallback={<p>Loading...</p>}>
                {
                    filteredData.length > 0 && filteredData?.map(({ id, doctor_name, patient_name, date, start_time, status }) => (
                        <AppointmentCard key={id} doctor_name={doctor_name} patient_name={patient_name} date={date} time={start_time} status={status} />
                    ))
                }
            </Suspense>
        </section>
    );
};

export default AppointmentPage;