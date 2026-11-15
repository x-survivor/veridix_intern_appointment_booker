"use client";
import { Suspense, useState } from "react";
import { cn } from "@/shared/lib/utils"

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";

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
    const {filteredData} = useData(filter);

    return (
        <section className="px-5 xl:px-30 py-5 flex flex-col gap-2">
            <Toaster richColors />
            <div className="flex gap-2">
                <StatisticsCard title="Total" count={9} />
                <StatisticsCard title="Cancelled" count={2} />
                <StatisticsCard title="Completed" count={3} />
            </div>
            <div className="w-full flex flex-col-reverse md:flex-row justify-end items-center gap-2">
                <div className="grow">
                    <h1 className="font-bold lg:text-xl w-1/6 text-nowrap">Appointments Table</h1>
                </div>
                <Button onClick={() => setFilter("")} variant="destructive" className={cn("hidden rounded-md w-full md:w-1/12", filter !== "" && "flex" )}>Reset</Button>
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
            />
            <header className="hidden lg:flex flex-col gap-2">
                <Card className="shadow-transparent rounded-md py-4">
                    <CardContent className="flex gap-6 justify-evenly font-bold">
                        <div className="w-full flex justify-evenly items-center text-black/50">
                            Appointment Date
                        </div>
                        <div className="w-full flex justify-evenly items-center text-black/50">
                            Patient Name
                        </div>
                        <div className="w-full flex justify-evenly items-center text-black/50">
                            Doctor Name
                        </div>
                        <div className="w-full flex justify-evenly items-center text-black/50">
                            Start Time
                        </div>
                        <div className="w-full flex justify-evenly items-center text-black/50">
                            Status
                        </div>
                        <div className="w-full flex justify-center items-center text-black/50">
                            Update
                        </div>
                    </CardContent>
                </Card>
                <Suspense fallback={<p>Loading...</p>}>
                    {
                        filteredData.length > 0 && filteredData?.map((data) => (
                            <div key={data.id}>
                                <AppointmentCard {...data} />
                            </div>
                        ))
                    }
                </Suspense>
            </header>
            <header className="flex lg:hidden flex-col gap-2">

                <Suspense fallback={<p>Loading...</p>}>
                    {
                        filteredData.length > 0 && filteredData?.map((data) => (
                            <section key={data.id}>
                                <ResponsiveAppointmentCard {...data} />
                            </section >
                        ))
                    }
                </Suspense >
            </header >
        </section>
    );
};

export default AppointmentPage;