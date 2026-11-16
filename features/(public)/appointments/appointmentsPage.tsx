"use client";
import { Suspense, useState } from "react";
import { cn } from "@/shared/lib/utils"

import { Button } from "@/shared/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";
import { Spinner } from "@/shared/components/ui/spinner";

import { Toaster } from "@/shared/components/ui/sonner";
import { ApplicationForm } from "./components/appointmentForm";
import { AppointmentCard } from "@/shared/components/appointmendCard";
import { Filter, Plus } from "lucide-react";
import { doctors } from "@/shared/constants/datasets/doctors";

import { StatisticsCard } from "@/shared/components/statisticsCard";
import { ResponsiveAppointmentCard } from "@/shared/components/responsiveAppointmentCard";
import useData from "./hooks/useData";


const status = [
    {
        value: "booked",
        label: "Booked"
    },
    {
        value: "cancelled",
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
    const { filteredData, loading, error, refetch } = useData(filter);

    const cancelledAppointments = filteredData.filter((data) => (
        data.status == "cancelled"
    )).length
    const completedAppointments = filteredData.filter((data) => (
        data.status == "completed"
    )).length

    return (
        <section className="px-5 xl:px-30 py-5 flex flex-col gap-2">
            <Toaster richColors />
            <div className="flex flex-col lg:flex-row gap-2">
                <StatisticsCard title="Total" count={filteredData.length} />
                <StatisticsCard title="Cancelled" count={cancelledAppointments} />
                <StatisticsCard title="Completed" count={completedAppointments} />
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row justify-end items-center gap-2">
                <div className="grow">
                    <h1 className="font-bold lg:text-xl w-1/6 text-nowrap">Appointments Table</h1>
                </div>
                <Button onClick={() => setFilter("")} variant="destructive" className={cn("hidden rounded-md w-full md:w-1/12", filter !== "" && "flex")}>Reset</Button>
                <Select value={filter} onValueChange={(value) => setFilter(value ?? "")}>
                    <SelectTrigger className={`max-w-full w-full grow lg:w-1/6 border border-black/30 px-2 rounded-md`}>
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
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    variant="ghost"
                    onClick={() => setDialogTrigger(true)}
                    className="w-full md:w-1/4 rounded-md bg-gray-800 text-white hover:bg-black/30 hover:cursor-pointer"
                >
                    <Plus />Appointment
                </Button>
            </div>
            <ApplicationForm
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
                refetch={refetch}
            />
            <header className="hidden lg:flex flex-col gap-2">
                <table className="w-full">
                    <thead>
                        <tr className="flex gap-6 justify-evenly font-bold bg-gray-200 text-gray-800 rounded-md mt-5">
                            <td className="w-full flex justify-evenly items-center">
                                Appointment Date
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Patient Name
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Doctor Name
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Start Time
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Status
                            </td>
                            <td className="w-full flex justify-center items-center">
                                Update
                            </td>
                        </tr>
                    </thead>
                    {!loading ?
                        filteredData.length > 0 && filteredData?.map((data) => (
                            <tbody key={data.id}>
                                <AppointmentCard {...data} />
                            </tbody>
                        )) : !error ? (
                            <tbody className="w-full h-30 flex justify-center items-center">
                                <tr className="w-full h-30 flex justify-center items-center">
                                    <td>
                                        <Spinner className="w-15 h-15" />
                                    </td>
                                </tr>
                            </tbody>
                        ) :
                            <tbody className="w-full h-30 flex justify-center items-center">
                                <tr className="w-full h-30 flex justify-center items-center">
                                    <td>
                                        {error instanceof Error ? error.message : "Something Went Wrong"}
                                    </td>
                                </tr>
                            </tbody>
                    }
                </table>
            </header>
            <header className="flex lg:hidden flex-col gap-2">
                {!loading ?
                    filteredData.length > 0 && filteredData?.map((data) => (
                        <section key={data.id}>
                            <ResponsiveAppointmentCard {...data} />
                        </section >
                    )) :
                    <section className="w-full h-30 flex justify-center items-center">
                        <Spinner className="w-10 h-10" />
                    </section>
                }
            </header >
        </section>
    );
};

export default AppointmentPage;