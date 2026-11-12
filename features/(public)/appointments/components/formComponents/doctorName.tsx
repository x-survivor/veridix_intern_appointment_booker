import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";
import { doctors } from "@/shared/constants/datasets/doctors";
import { useAppointmentForm } from "../../hooks/appointmentFormHook"

const DoctorName = () => {
    const {formValues, setFormValues} = useAppointmentForm();
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Doctor</Label>
            <Select
                value={formValues.doctor_name}
                onValueChange={value => setFormValues(prev => ({
                    ...prev,
                    doctor_name: value ?? ""
                }))}>
                <SelectTrigger className="w-full border border-black/30 p-2 rounded-md">
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
        </div>
    )
}

export {DoctorName}