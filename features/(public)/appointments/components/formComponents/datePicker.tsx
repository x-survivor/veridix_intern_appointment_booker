import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { pastDateCheck } from "@/shared/utils/pastDateCheck";
import { useAppointmentForm } from "../../hooks/appointmentFormHook";
import { useState } from "react";

const DatePicker = ({ trigger, setTrigger }: { trigger: boolean, setTrigger: (arg0: boolean) => void }) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const { formValues, setFormValues } = useAppointmentForm();
    return (
        <Popover open={trigger} onOpenChange={setTrigger}>
            <PopoverTrigger render={
                <Button
                    variant={"outline"}
                    data-empty={!formValues.date}
                    className="justify-center text-left font-normal data-[empty=true]:text-muted-foreground border border-black/30 rounded-md"
                >
                    {formValues.date ? formValues.date : <span>Pick a date</span>}
                    <ChevronDownIcon data-icon="inline-end" />
                </Button>
            }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(value) => {
                        if (!value || !pastDateCheck(value)) return;
                        setFormValues(prev => ({
                            ...prev,
                            date: value.toDateString()
                        }))
                        setDate(value)
                        setTrigger(false);
                    }}
                    defaultMonth={date}
                />
            </PopoverContent>
        </Popover>
    )
}
export { DatePicker }