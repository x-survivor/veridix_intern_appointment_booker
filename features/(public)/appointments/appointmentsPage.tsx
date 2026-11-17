"use client";
import { useState } from "react";
import { cn } from "@/shared/lib/utils"

import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";

import { Toaster } from "@/shared/components/ui/sonner";
import { ApplicationForm } from "./components/appointmentForm";
import { AppointmentCard } from "@/shared/components/appointmendCard";
import { Plus, RefreshCw } from "lucide-react";

import { StatisticsCard } from "@/shared/components/statisticsCard";
import { ResponsiveAppointmentCard } from "@/shared/components/responsive/responsiveAppointmentCard";
import useData from "./hooks/useData";
import { FilterSelection } from "./components/filterSelection";
import { doctors } from "@/shared/constants/datasets/doctors";
import type { filter } from "@/shared/constants/types/filterType";
import { InitalFilter } from "@/shared/constants/datasets/initialFilter";
import { DatePicker } from "@/shared/components/datePicker";
import { ResponsiveHeader } from "@/shared/components/responsive/resposiveHeader";

const status = [
    {
        name: "booked",
        label: "Booked"
    },
    {
        name: "cancelled",
        label: "Cancelled"
    },
    {
        name: "completed",
        label: "Completed"
    },

]

const AppointmentPage = () => {
    const [dialogTrigger, setDialogTrigger] = useState(false);
    const [filter, setFilter] = useState<filter>(InitalFilter);
    const { filteredData, loading, error, refetch } = useData(filter);

    console.log(filter);

    const cancelledAppointments = filteredData.filter((data) => (
        data.status == "cancelled"
    )).length
    const completedAppointments = filteredData.filter((data) => (
        data.status == "completed"
    )).length

    return (
        <section className="w-full px-10 flex flex-col gap-2 overflow-auto">
            <Toaster richColors />
            <div className="flex flex-col lg:flex-row gap-2">
                <StatisticsCard title="Total" count={filteredData.length} />
                <StatisticsCard title="Cancelled" count={cancelledAppointments} />
                <StatisticsCard title="Completed" count={completedAppointments} />
            </div>
            <ApplicationForm
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
                refetch={refetch}
            />
            <div className="hidden lg:flex flex-col gap-2 px-4 rounded-md h-[calc(50vh+50px)] overflow-auto bg-sidebar scrollbar-thin scrollbar-track-sidebar scrollbar-thumb-foreground">
                <table className="w-full">
                    <thead className="sticky top-0 bg-sidebar">
                        <tr>
                            <td className="flex justify-between py-4">
                                <section className="flex items-center gap-3 font-bold lg:text-xl text-nowrap">
                                    <h1>Appointments Table</h1>
                                    <Button
                                        onClick={refetch}
                                        variant={"ghost"}
                                        className={"hover:bg-sidebar hover:cursor-pointer shadow-sm p-1 aspect-square rounded-full hover:shadow-md"}>
                                        <RefreshCw />
                                    </Button>
                                </section>
                                <section className="flex w-1/2 justify-end gap-2">
                                    <Button onClick={() => setFilter(InitalFilter)} variant="destructive" className={cn("flex rounded-md", filter === InitalFilter && "hidden")}>Reset All</Button>
                                    <FilterSelection filter={filter?.filterByDoctor} setFilter={setFilter} data={doctors} title="Doctor Name" />
                                    <FilterSelection filter={filter?.filterByStatus} setFilter={setFilter} data={status} title="Status" />
                                    <DatePicker filter={filter?.filterByDate} setFilter={setFilter} />
                                    <Button
                                        onClick={() => setDialogTrigger(true)}
                                        className="rounded-md bg-accent text-accent-foreground hover:cursor-pointer hover:bg-accent/95"
                                    >
                                        <Plus />Appointment
                                    </Button>
                                </section>
                            </td>
                        </tr>
                        <tr className="flex gap-6 justify-evenly font-bold border-b border-b-gray-800 mt-2 pb-2">
                            <td className="w-full flex justify-start items-start">
                                Patient Name
                            </td>
                            <td className="w-full flex justify-start items-start">
                                Appointment Date
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Start Time
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Doctor Name
                            </td>
                            <td className="w-full flex justify-center items-center">
                                Change Status
                            </td>
                            <td className="w-full flex justify-evenly items-center">
                                Status
                            </td>
                        </tr>
                    </thead>
                    {!loading ?
                        filteredData.length > 0 && filteredData?.map((data) => (
                            <tbody key={data.id} className="bg-background rounded-md">
                                <AppointmentCard data={data} refetch={refetch} />
                            </tbody>
                        )) : !error ? (
                            <tbody className="w-full h-80 flex justify-center items-center">
                                <tr className="w-full h-full flex justify-center items-center">
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
            </div>
            <div className="flex lg:hidden flex-col gap-2">
                {!loading ?
                    filteredData.length > 0 && filteredData?.map((data) => (
                        <section key={data.id}>
                            <ResponsiveAppointmentCard data={data} refetch={refetch} />
                        </section >
                    )) :
                    <section className="w-full h-30 flex justify-center items-center">
                        <Spinner className="w-10 h-10" />
                    </section>
                }
            </div>
            <Button
             onClick={()=>setDialogTrigger(!dialogTrigger)}
             className="md:hidden fixed right-[10%] bottom-[15%] bg-accent ring-sidebar rounded-md flex justify-center items-center text-background">
                <Plus className="scale-150" /> Appointment
            </Button>
        </section>
    );
};

export default AppointmentPage;