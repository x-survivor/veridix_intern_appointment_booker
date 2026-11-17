import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { ChevronDownIcon, X, CalendarDays } from "lucide-react"
import { format } from "date-fns";
import { filter } from "../constants/types/filterType";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/shared/lib/utils";

const DatePicker = ({ filter, setFilter }: { filter: string, setFilter: Dispatch<SetStateAction<filter>> }) => {
    const [trigger, setTrigger] = useState(false);
    return (
        <Popover open={trigger} onOpenChange={setTrigger}>
            <span onClick={() => setFilter(prev => ({ ...prev, filterByDate: "" }))}
                className={cn("hidden justify-center items-center hover:text-destructive hover:cursor-pointer text-foreground",
                    filter && "flex"
                )}>
                <X />
            </span>
            <PopoverTrigger render={
                <Button
                    variant={"outline"}
                    data-empty={!filter}
                    className="justify-center text-left font-normal data-[empty=true]:text-muted-foreground border border-black/30 rounded-md"

                >
                    <CalendarDays/>
                    {filter ? (filter) : <span>Filter By Date</span>}
                    <ChevronDownIcon data-icon="inline-end" />
                </Button>
            }
            />
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={filter ? new Date(filter) : undefined}
                    onSelect={
                        (value) => {
                            if (value == undefined) { return };
                            setFilter(
                                (prev) => (
                                    { ...prev, filterByDate: format(value.toDateString(), "MMMM do, yyyy") }
                                ))
                            setTrigger(false);
                        }}
                />
            </PopoverContent>
        </Popover>
    )
}

export { DatePicker }