"use client";

import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";

import { Toaster } from "@/shared/components/ui/sonner";
import { ApplicationForm } from "./components/appointmentForm";
import { AppointmentCard } from "./components/appointmendCard";
import { Filter, Plus } from "lucide-react";
import { doctors } from "@/shared/constants/datasets/doctors";

import { mockAppointments } from "@/shared/constants/datasets/mockAppointmentData";

const AppointmentPage = () => {
    const [dialogTrigger, setDialogTrigger] = useState(false);
    const [filter, setFilter] = useState<string>("");

    return (
        <section className="px-10 py-5 flex flex-col gap-2">
            <Toaster richColors />
            <div className="w-full flex justify-end items-center gap-2">
                <Select value={filter} onValueChange={(value) => setFilter(value ?? "")}>
                    <SelectTrigger className={`w-1/3 lg:w-50 border border-black/30 px-2 rounded-md`}>
                        <Filter /> <SelectValue placeholder={"Filter"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {doctors && doctors.map((doctor) => (
                                    <SelectItem key={doctor.name} value={doctor.name}>
                                        {doctor.name}
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
            {
                mockAppointments ? mockAppointments?.map(({ id, doctor_name, patient_name, date, time, status }) => (
                    <AppointmentCard key={id} doctor_name={doctor_name} patient_name={patient_name} date={date} time={time} status={status} />
                )) : <p>Loading...</p>
            }
        </section>
    );
};

export default AppointmentPage;