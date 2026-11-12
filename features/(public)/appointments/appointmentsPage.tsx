"use client";

import { useState, Suspense } from "react";

import { Calendar } from "@/shared/components/ui/calendar";
import { Toaster } from "@/shared/components/ui/sonner";
import { pastDateCheck } from "@/shared/utils/pastDateCheck";
import { ApplicationForm } from "./components/appointmentForm";

const AppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [dialogTrigger, setDialogTrigger] = useState(false);
    const SelectedDate = selectedDate?.toDateString();

    return (
        <section className="px-10 py-5">
            <Toaster richColors />
            <p>{SelectedDate ?? "No date selected"}</p>
            <Suspense>
                <Calendar
                    mode="single"
                    onSelect={(date) => {
                        setSelectedDate(date);
                        if (!date || !pastDateCheck(date)) return;
                        setDialogTrigger(true)
                    }}
                    className="w-full lg:w-1/2 mt-5 rounded-2xl"
                />
            </Suspense>
            <ApplicationForm
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
            />
        </section>
    );
};

export default AppointmentPage;