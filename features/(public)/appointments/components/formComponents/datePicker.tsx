import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { pastDateCheck } from "@/shared/utils/pastDateCheck";

const DatePicker = ({ trigger, setTrigger, date, setDate }: { trigger: boolean, setTrigger: (arg0: boolean) => void, date: Date | undefined, setDate: (arg0: Date) => void }) => {
    return (
        <Popover open={trigger} onOpenChange={setTrigger}>
            <PopoverTrigger render={
                <Button
                    variant={"outline"}
                    data-empty={!date}
                    className="justify-center text-left font-normal data-[empty=true]:text-muted-foreground border border-black/30 rounded-md"
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon data-icon="inline-end" />
                </Button>
            }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        if (!date || !pastDateCheck(date)) return;
                        setDate(date);
                        setTrigger(false);
                    }}
                    defaultMonth={date}
                />
            </PopoverContent>
        </Popover>
    )
}
export { DatePicker }