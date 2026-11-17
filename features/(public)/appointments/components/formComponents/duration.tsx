import { cn } from "@/shared/lib/utils"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useFormContext, Controller } from "react-hook-form";
import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";
import { TimePicker } from "@/shared/components/reui/time-picker";


const Duration = () => {
    const { register, formState, control } = useFormContext<appointmentFormType>();
    const error = formState.errors.duration;
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <Label>Duration</Label>
                    <Input
                        type="number"
                        className={cn("rounded-xl px-2 border border-black/30 placeholder:text-black/20",
                            error && "border-red-600"
                        )}
                        placeholder="Duration"
                        min={15}
                        step={15}
                        {...register("duration", {
                            valueAsNumber: true,
                            required: { value: true, message: "Fill in Duration" }
                        })}
                    />
                    <Label className="text-red-600">{error && error?.message}</Label>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <Label>Appointment Time</Label>
                    <Controller
                        name="start_time"
                        control={control}
                        rules={{ required: { value: true, message: "Pick Start Time" } }}
                        render={({ field, fieldState }) => (
                            <>
                                <TimePicker
                                    id="appointment-time"
                                    hourCycle={12}
                                    minuteStep={15}
                                    min="09:00"
                                    max="17:00"
                                    onValueChange={field.onChange}
                                    className={cn("border border-black/30 rounded-xl",
                                        fieldState.error && "border-red-600"
                                    )}
                                />
                                {
                                    fieldState.error && (
                                        <Label className="text-red-600">
                                            {fieldState.error.message}
                                        </Label>
                                    )
                                }
                            </>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export { Duration }