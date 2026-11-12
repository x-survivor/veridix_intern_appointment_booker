
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useAppointmentForm } from "../../hooks/appointmentFormHook"

const Reason = () => {
    const { setFormValues } = useAppointmentForm();
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Reason</Label>
            <Input
                type="text"
                className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                placeholder="Reason"
                onChange={e => setFormValues(prev => ({
                    ...prev,
                    reason: e.target.value
                }))}
            />
        </div>
    )
}

export { Reason }