import { cn } from "@/shared/lib/utils";
import { Dispatch, SetStateAction } from "react";

import { Plus, Menu, X } from "lucide-react";

import { Button } from "../ui/button";

import { FilterSelection } from "@/features/(public)/appointments/components/filterSelection";
import { DatePicker } from "../datePicker";
import { InitalFilter } from "@/shared/constants/datasets/initialFilter";

import { doctors } from "@/shared/constants/datasets/doctors";
import { status } from "@/shared/constants/datasets/status";
import { filter } from "@/shared/constants/types/filterType";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const ResponsiveFilterMenu = (
    { filter, setFilter, dialogTrigger, setDialogTrigger, setAppointmentTrigger }:
        { filter: filter, setFilter: Dispatch<SetStateAction<filter>>, dialogTrigger: boolean, setDialogTrigger: Dispatch<SetStateAction<boolean>>, setAppointmentTrigger: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <>
            <Popover open={dialogTrigger} onOpenChange={setDialogTrigger}>
                <PopoverTrigger nativeButton={false} render={
                    <div
                        className="w-10 aspect-square md:hidden fixed right-[10%] bottom-[10%] bg-accent ring-sidebar rounded-full flex justify-center items-center text-background">
                        <Button
                            className={"w-full hover:bg-transparent flex justify-center items-center"}
                            onClick={() => setDialogTrigger(!dialogTrigger)}
                        >
                            {
                                !dialogTrigger ? <Menu /> : <X />
                            }
                        </Button>
                    </div>
                } />
                <PopoverContent className="rounded-2xl bg-background text-foreground">
                    <Button
                        onClick={() => setAppointmentTrigger(true)}
                        className="md:hidden bg-accent ring-sidebar rounded-md flex justify-center items-center text-background">
                        <Plus className="scale-150" /> Appointment
                    </Button>
                    <div
                        className="md:hidden bg-background ring-sidebar rounded-md flex justify-end items-center text-background">
                        <Button onClick={() => setFilter(InitalFilter)} variant="destructive" className={cn("flex rounded-md", filter === InitalFilter && "hidden")}>Reset All</Button>
                    </div>
                    <div
                        className="md:hidden bg-sidebar ring-sidebar rounded-md flex justify-end items-center text-foreground">
                        <FilterSelection filter={filter?.filterByDoctor} setFilter={setFilter} data={doctors} title="Doctor Name" />
                    </div>
                    <div
                        className="md:hidden bg-sidebar ring-sidebar rounded-md flex justify-end items-center text-foreground">
                        <FilterSelection filter={filter?.filterByStatus} setFilter={setFilter} data={status} title="Status" />
                    </div>
                    <div
                        className="md:hidden bg-sidebar ring-sidebar rounded-md flex justify-end items-center text-foreground">
                        <DatePicker filter={filter?.filterByDate} setFilter={setFilter} />
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}

export { ResponsiveFilterMenu }