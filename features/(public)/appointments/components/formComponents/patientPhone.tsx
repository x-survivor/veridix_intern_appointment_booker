import { useState } from "react"
import { cn } from "@/shared/lib/utils"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { DatePicker } from "./datePicker"

import { useFormContext } from "react-hook-form";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

const PatientPhone = () => {
    const [trigger, setTrigger] = useState(false);

    const { register, formState } = useFormContext<appointmentFormType>();
    const error = formState.errors.patient_phone;
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <Label>Patient Contact</Label>
                    <Input
                        type="tel"
                        className={cn("rounded-md px-2 border border-black/30 placeholder:text-black/20",
                            error && "border-red-600"
                        )}
                        placeholder="+92 318 0000211"
                        minLength={10}
                        maxLength={13}
                        {...register("patient_phone", {
                            required: { value: true, message: "Fill in Phone Number" },
                            pattern: { value: /^\+?\d{10,13}$/, message: "Invalid Phone Number" }
                        })}
                    />
                    <Label className="text-red-600">{error && error.message}</Label>
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