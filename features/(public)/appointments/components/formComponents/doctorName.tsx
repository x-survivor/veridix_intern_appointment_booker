import { Controller, useFormContext } from "react-hook-form";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { doctors } from "@/shared/constants/datasets/doctors";
import { cn } from "@/shared/lib/utils";

const DoctorName = () => {

    const { control } = useFormContext<appointmentFormType>();

    return (
        <Controller
            name="doctor_name"
            control={control}
            rules={{ required: { value: true, message: "Doctor Name is required" } }}
            render={({ field, fieldState }) => (
                <div className="flex flex-col justify-center items-start gap-2">
                    <Label>Doctor</Label>
                    <Select
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            onBlur={field.onBlur}
                            className={cn("w-full border border-black/30 p-2 rounded-xl",
                                fieldState.error ? "border-red-600" : "border-black/30"
                            )}>
                            <SelectValue placeholder="Doctor Name" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                doctors && doctors.map((value) => {
                                    return (
                                        <SelectItem key={value.name} value={value.name}>{value.name}</SelectItem>
                                    )
                                })
                            }
                        </SelectContent>
                    </Select>
                    {fieldState.error && (
                        <Label className="text-red-600">
                            {fieldState.error.message}
                        </Label>
                    )}
                </div>
            )}
        />
    )
}

export { DoctorName }