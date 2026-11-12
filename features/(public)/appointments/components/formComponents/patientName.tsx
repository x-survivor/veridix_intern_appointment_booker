import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { useAppointmentForm } from "@/features/(public)/appointments/hooks/appointmentFormHook";

const PatientName = () => {

    const { formValues, setFormValues } = useAppointmentForm();
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Patient Name</Label>
            <Input
                type="text"
                className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                value={formValues.patient_name}
                placeholder="Bilal"
                required
                onChange={(e) =>
                    setFormValues(prev => ({
                        ...prev,
                        patient_name: e.target.value,
                    }))
                }
            />
        </div>
    )
}
export { PatientName }