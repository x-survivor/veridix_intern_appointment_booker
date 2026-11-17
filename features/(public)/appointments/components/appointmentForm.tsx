import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form"

import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";

import { useAppSelector } from "@/shared/hooks/ReduxCustomHooks";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

import { PatientName } from "./formComponents/patientName";
import { PatientPhone } from "./formComponents/patientPhone";
import { Duration } from "./formComponents/duration";
import { DoctorName } from "./formComponents/doctorName";

import { SubmitForm } from "../services/handleForm";
import { Reason } from "./formComponents/reason";


const ApplicationForm = ({ dialogTrigger, setDialogTrigger, refetch }: { dialogTrigger: boolean, setDialogTrigger: (value: boolean) => void, refetch: () => Promise<void> }) => {
    const initialValues = useAppSelector((state) => state.form);
    const methods = useForm<appointmentFormType>({ defaultValues: initialValues });
    const submitting = methods.formState.isSubmitting;
    const submitted = methods.formState.isSubmitSuccessful;

    useEffect(() => {
        if (submitted) {
            setDialogTrigger(false);
            refetch();
        };
    }, [submitted, setDialogTrigger, refetch]);

    return (
        <FormProvider {...methods}>
            <Dialog open={dialogTrigger} onOpenChange={() => setDialogTrigger(false)}>
                <DialogContent className="rounded-2xl bg-background text-foreground">
                    <DialogHeader>
                        <DialogTitle>Appointment Form</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={methods.handleSubmit(SubmitForm)} className="flex flex-col gap-5">
                        <PatientName />
                        <PatientPhone />
                        <Duration />
                        <DoctorName />
                        <Reason />
                        <div className="flex flex-col justify-center items-start gap-2">
                            <Button disabled={submitting} className={`w-full rounded-md bg-accent hover:bg-accent/95 cursor-pointer`} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}

export { ApplicationForm }