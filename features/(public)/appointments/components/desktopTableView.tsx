
import { cn } from "@/shared/lib/utils"
import { Dispatch, SetStateAction } from "react";
import { Plus, RefreshCw } from "lucide-react";

// Shadcn
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";

// Custom UI
import { DatePicker } from "@/shared/components/datePicker";
import { AppointmentCard } from "@/shared/components/appointmendCard";
import { FilterSelection } from "./filterSelection";

// Constant Data
import { doctors } from "@/shared/constants/datasets/doctors";
import { status } from "@/shared/constants/datasets/status";
import { InitalFilter } from "@/shared/constants/datasets/initialFilter";

// Types
import { filter } from "@/shared/constants/types/filterType";
import { appointment } from "@/shared/constants/types/appointmentType";

const DesktopView = (
    { filter, setFilter, setDialogTrigger, filteredData, loading, error, refetch }:
        { filter: filter, filteredData: appointment[], loading: boolean, error: unknown | null, setDialogTrigger: Dispatch<SetStateAction<boolean>>, setFilter: Dispatch<SetStateAction<filter>>, refetch: () => Promise<void> }
) => {
    return (
        <div className="hidden lg:flex flex-col gap-2 px-4 rounded-md shadow-sm bg-sidebar">
            <table className="w-full">
                <thead className="sticky top-0 bg-sidebar">
                    <tr>
                        <td className="flex justify-between py-4">
                            <section className="flex items-center gap-3 font-bold lg:text-xl text-nowrap">
                                <h1>Appointments Table</h1>
                                <Button
                                    onClick={refetch}
                                    variant={"ghost"}
                                    className={"hover:bg-sidebar hover:cursor-pointer shadow-sm p-1 aspect-square rounded-full hover:shadow-md"}>
                                    <RefreshCw />
                                </Button>
                            </section>
                            <section className="flex w-1/2 justify-end gap-2">
                                <Button onClick={() => setFilter(InitalFilter)} variant="destructive" className={cn("flex rounded-md", filter === InitalFilter && "hidden")}>Reset All</Button>
                                <FilterSelection filter={filter?.filterByDoctor} setFilter={setFilter} data={doctors} title="Doctor Name" />
                                <FilterSelection filter={filter?.filterByStatus} setFilter={setFilter} data={status} title="Status" />
                                <DatePicker filter={filter?.filterByDate} setFilter={setFilter} />
                                <Button
                                    onClick={() => setDialogTrigger(true)}
                                    className="rounded-md bg-accent text-accent-foreground hover:cursor-pointer hover:bg-accent/95"
                                >
                                    <Plus />Appointment
                                </Button>
                            </section>
                        </td>
                    </tr>
                    <tr className="flex gap-6 justify-evenly font-bold pb-2 bg-background">
                        <td>
                            <span
                                className="w-4 aspect-square flex justify-center items-center rounded-full font-bold"
                            >
                            </span>
                        </td>
                        <td className="w-full flex justify-start items-start">
                            Patient Name
                        </td>
                        <td className="w-full flex justify-start items-start">
                            Appointment Date
                        </td>
                        <td className="w-full flex justify-evenly items-center">
                            Start Time
                        </td>
                        <td className="w-full flex justify-evenly items-center">
                            Doctor Name
                        </td>
                        <td className="w-full flex justify-center items-center">
                            Change Status
                        </td>
                        <td className="w-full flex justify-evenly items-center">
                            Status
                        </td>
                    </tr>
                </thead>

                <tbody className="w-full h-[calc(45vh)] flex flex-col overflow-auto scrollbar-thin scrollbar-track-sidebar scrollbar-thumb-foreground">
                {/* Loading and Error States */}
                {loading ? (
                        <tr className="w-full h-full flex justify-center items-center">
                            <td>
                                <Spinner className="w-15 h-15" />
                            </td>
                        </tr>
                )
                    : error ? (
                            <tr className="w-full h-30 flex justify-center items-center">
                                <td>
                                    {error instanceof Error ? error.message : "Something Went Wrong"}
                                </td>
                            </tr>
                    ) :
                        (
                            filteredData.length > 0 && filteredData?.map((data) => (
                                <tr key={data.id} className="border-b border-b-gray-800/20 flex">
                                    <AppointmentCard data={data} refetch={refetch} />
                                </tr>
                            )
                            )
                        )
                }
                </tbody>
            </table>
        </div >
    )
}

export { DesktopView }