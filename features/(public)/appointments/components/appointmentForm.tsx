import { useState } from "react";

import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

import { useAppSelector } from "@/shared/hooks/ReduxCustomHooks";
import { AppointmentFormContext } from "../hooks/formContext";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

import { PatientName } from "./formComponents/patientName";
import { PatientPhone } from "./formComponents/patientPhone";
import { Duration } from "./formComponents/duration";
import { DoctorName } from "./formComponents/doctorName";

import { SubmitForm } from "../services/handleForm";
import { Reason } from "./formComponents/reason";

const ApplicationForm = ({ dialogTrigger, setDialogTrigger }: { dialogTrigger: boolean, setDialogTrigger: (value: boolean) => void }) => {
    const initialValues = useAppSelector((state) => state.form);
    const [formValues, setFormValues] = useState<appointmentFormType>(initialValues);

    return (
        <AppointmentFormContext.Provider value={{ formValues, setFormValues }}>
            <Dialog open={dialogTrigger} onOpenChange={() => setDialogTrigger(false)}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Appointment Form</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => SubmitForm(e, formValues)} className="flex flex-col gap-5">
                        <PatientName />
                        <PatientPhone />
                        <Duration />
                        <DoctorName />
                        <Reason/>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <Button className={`w-full rounded-md bg-black/95 hover:bg-black/90 cursor-pointer`} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppointmentFormContext.Provider>
    )
}

export { ApplicationForm }