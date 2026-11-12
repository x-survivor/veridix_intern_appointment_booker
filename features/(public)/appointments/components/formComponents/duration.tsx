import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useAppointmentForm } from "../../hooks/appointmentFormHook"
import { TimePicker } from "@/shared/components/reui/time-picker";


const Duration = () => {
    const {formValues, setFormValues} = useAppointmentForm();
    return (
        <div className="flex flex-col justify-center items-start gap-2">
                            <div className="w-full flex justify-between gap-2">
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Duration</Label>
                                    <Input
                                        type="number"
                                        className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                                        placeholder="Duration"
                                        min={15}
                                        step={15}
                                        required
                                        onChange={e => setFormValues(prev => ({
                                            ...prev,
                                            duration: e.target.valueAsNumber
                                        }))}
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-2">
                                    <Label>Appointment Time</Label>
                                    <TimePicker
                                        id="appointment-time"
                                        minuteStep={15}
                                        min="09:00"
                                        max="17:00"
                                        value={formValues.start_time}
                                        onValueChange={value => setFormValues(prev => ({
                                            ...prev,
                                            start_time: value ?? ""
                                        }))}
                                        required
                                        className="border border-black/30 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
    )
}

export {Duration}