import { useFormContext, Controller } from "react-hook-form";
import { format } from "date-fns";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";

import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils"

import { appointmentFormType } from "@/shared/constants/types/appointmentFormType";

const DatePicker = ({ trigger, setTrigger }: { trigger: boolean, setTrigger: (arg0: boolean) => void }) => {

    const { control } = useFormContext<appointmentFormType>();

    return (
        <Controller
            name="date"
            control={control}
            rules={{ required: { value: true, message: "Pick a Date" } }}
            render={({ field, fieldState }) => (
                <>
                    <Popover open={trigger} onOpenChange={setTrigger}>
                        <PopoverTrigger render={
                            <Button
                                variant={"outline"}
                                data-empty={!field.value}
                                className={cn("justify-center text-left font-normal data-[empty=true]:text-muted-foreground border border-black/30 rounded-xl",
                                    fieldState.error && "border-red-600"
                                )}
                            >
                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                <ChevronDownIcon data-icon="inline-end" />
                            </Button>
                        }
                        />
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={field.onChange}
                                defaultMonth={field.value ? new Date(field.value) : undefined}
                                disabled={{
                                    before: new Date(new Date().setHours(0, 0, 0, 0))
                                }}
                            />
                        </PopoverContent>
                    </Popover>
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
    )
}
export { DatePicker }