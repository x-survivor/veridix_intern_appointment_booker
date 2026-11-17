import { cn } from "@/shared/lib/utils"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { useFormContext } from "react-hook-form";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

const PatientName = () => {

    const { register, formState } = useFormContext<appointmentFormType>();
    const error = formState.errors.patient_name;

    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Patient Name</Label>
            <Input
                type="text"
                className={cn("rounded-xl px-2 border border-black/30 placeholder:text-black/20",
                    error && "border-red-600"
                )}
                placeholder="Bilal"
                // required
                {...register("patient_name", {
                    required: { value: true, message: "Patient name is required" }
                })}
            />
            <Label className="text-red-600">{error && error?.message}</Label>
        </div>
    )
}
export { PatientName }