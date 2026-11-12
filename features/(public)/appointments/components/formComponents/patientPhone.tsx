import { useState } from "react"
import { useForm } from "react-hook-form"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { DatePicker } from "./datePicker"

import { useAppointmentForm } from "../../hooks/appointmentFormHook"
import { validatePhoneNumber } from "@/shared/utils/validatePhoneNumber"

const PatientPhone = () => {
    const { setFormValues } = useAppointmentForm();
    const [trigger, setTrigger] = useState(false);
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <Label>Patient Contact</Label>
                    <Input
                        type="tel"
                        className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                        placeholder="+92 318 0000211"
                        minLength={10}
                        maxLength={13}
                        required
                        onBlur={e => validatePhoneNumber(e.target.value) && setFormValues(prev => (
                            {
                                ...prev,
                                patient_phone: e.target.value
                            }
                        ))}
                    />
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <Label>Appointment Date</Label>
                    <DatePicker
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </div>
            </div>
        </div>
    )
}

export { PatientPhone }