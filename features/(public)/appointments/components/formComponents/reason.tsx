
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { useFormContext } from "react-hook-form";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

const Reason = () => {
    const { register } = useFormContext<appointmentFormType>();
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Reason</Label>
            <Input
                type="text"
                className="rounded-xl px-2 border border-black/30 placeholder:text-black/20"
                placeholder="Reason"
                {...register("reason")}
            />
        </div>
    )
}

export { Reason }