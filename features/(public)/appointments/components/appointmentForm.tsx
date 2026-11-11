import { FormEvent, useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogContent
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

import { TimePicker } from "@/shared/components/reui/time-picker";
import { PatientName } from "./formComponents/patientName";
import { DatePicker } from "./formComponents/datePicker";
import { validatePhoneNumber } from "@/shared/utils/validatePhoneNumber";

const ApplicationForm = ({ selectedDate, setSelectedDate, dialogTrigger, setDialogTrigger }: { selectedDate: Date | undefined, setSelectedDate: (date: Date | undefined) => void, dialogTrigger: boolean, setDialogTrigger: (value: boolean) => void }) => {
    const [trigger, setTrigger] = useState(false);
    
    //Form Handling States
    const [patientName, setPatientName] = useState<string>("");
    const [patientPhone, setPatientPhone] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);

    //Form Handling Function
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }
    return (
        <>
            <Dialog open={dialogTrigger} onOpenChange={() => setDialogTrigger(false)}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Appointment Form</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <PatientName setPatientName={setPatientName} />
                        <div className="flex flex-col justify-center items-start gap-2">
                            <div className="w-full flex justify-between gap-2">
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Patient Contact</Label>
                                    <Input
                                        type="tel"
                                        name="patient_phone"
                                        className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                                        placeholder="+92 318 0000211"
                                        required
                                        onChange={e => validatePhoneNumber(e.target.value) && setPatientPhone(e.target.value)}
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Appointment Date</Label>
                                    <DatePicker
                                        trigger={trigger}
                                        setTrigger={setTrigger}
                                        date={selectedDate}
                                        setDate={setSelectedDate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <div className="w-full flex justify-between gap-2">
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Duration</Label>
                                    <Input
                                        type="number"
                                        className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                                        placeholder="Patient Phone"
                                        min={15}
                                        step={15}
                                        required
                                        onChange={e => setDuration(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Appointment Time</Label>
                                    <TimePicker
                                        id="appointment-time"
                                        minuteStep={15}
                                        min="09:00"
                                        max="17:00"
                                        className="border border-black/30 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <Label>Reason</Label>
                            <Input
                                type="text"
                                className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                                placeholder="Reason"
                                onChange={e => setReason(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <Button className={`w-full rounded-md bg-black/95 hover:bg-black/90 cursor-pointer`} type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { ApplicationForm }