
import { cn } from "@/shared/lib/utils"
import { Dispatch, SetStateAction } from "react";
import { Plus, RefreshCw, ChevronRight, ChevronLeft } from "lucide-react";

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
    { filter, setFilter, setDialogTrigger, filteredData, loading, error, refetch, pages, currentPage }:
        { filter: filter, filteredData: appointment[], loading: boolean, error: { message: string }, setDialogTrigger: Dispatch<SetStateAction<boolean>>, setFilter: Dispatch<SetStateAction<filter>>, refetch: (page?: number) => Promise<void>, pages: number, currentPage: number }
) => {
    const visiblePages = 5;
    const startPage = Math.max(
        1,
        Math.min(currentPage - 2, pages - visiblePages + 1)
    );
    const endPage = Math.min(pages, startPage + visiblePages - 1);
    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );
    return (
        <div className="hidden lg:flex flex-col gap-2 px-4 rounded-md shadow-sm bg-sidebar 2xl:mt-5">
            <table className="w-full">
                <thead className="sticky top-0 bg-sidebar">
                    <tr>
                        <td className="flex justify-between py-4">
                            <section className="flex items-center gap-3 font-bold lg:text-xl text-nowrap">
                                <h1>Appointments Table</h1>
                                <Button
                                    onClick={() => refetch()}
                                    variant={"ghost"}
                                    className={"hover:bg-sidebar hover:cursor-pointer shadow-sm p-1 aspect-square rounded-full hover:shadow-md"}>
                                    <RefreshCw />
                                </Button>
                            </section>
                            <section className="flex w-1/2 justify-end gap-2">
                                <Button onClick={() => setFilter(InitalFilter)} variant="destructive" className={cn("hidden rounded-md", filter !== InitalFilter && "flex")}>Reset All</Button>
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
                                className="w-4 2xl:w-6 aspect-square flex justify-center items-center rounded-full font-bold"
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
                            Action
                        </td>
                        <td className="w-full flex justify-evenly items-center">
                            Status
                        </td>
                    </tr>
                </thead>

                <tbody className="w-full h-[40vh] 2xl:h-[50vh] flex flex-col overflow-auto scrollbar-thin scrollbar-track-sidebar scrollbar-thumb-foreground">
                    {/* Loading and Error States */}
                    {loading ? (
                        <tr className="w-full h-full flex justify-center items-center">
                            <td>
                                <Spinner className="w-15 h-15" />
                            </td>
                        </tr>
                    )
                        : error.message ? (
                            <tr className="w-full h-30 flex justify-center items-center">
                                <td>
                                    {error.message ? error.message : "Something Went Wrong"}
                                </td>
                            </tr>
                        ) :
                            (
                                filteredData.length > 0 && filteredData?.map((data) => (
                                    <tr key={data.id} className="border-b border-b-foreground/10 flex">
                                        <AppointmentCard data={data} refetch={refetch} />
                                    </tr>
                                )
                                )
                            )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="w-full flex justify-center items-center gap-2 p-4 flex-wrap">
                            <Button onClick={() => refetch(currentPage - 1)} variant={'ghost'} className={"aspect-square p-1 border border-foreground rounded-md hover:bg-background cursor-pointer"}><ChevronLeft /></Button>
                            <div className="flex justify-center items-center gap-2">
                                {startPage > 1 && (
                                    <>
                                        <Button
                                            onClick={() => refetch(1)}
                                            variant="ghost"
                                            className={cn(
                                                "aspect-square p-1 border border-foreground rounded-md hover:bg-background cursor-pointer",
                                                currentPage === 1 &&
                                                "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                            )}>
                                            1
                                        </Button>
                                        {startPage > 2 && <span>...</span>}
                                    </>
                                )}

                                {pageNumbers.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={() => refetch(page)}
                                        variant="ghost"
                                        className={cn(
                                            "aspect-square p-1 border border-foreground rounded-md hover:bg-background cursor-pointer",
                                            currentPage === page &&
                                            "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                        )}
                                    >
                                        {page}
                                    </Button>
                                ))}

                                {endPage < pages && (
                                    <>
                                        {endPage < pages - 1 && <span>...</span>}
                                        <Button
                                            onClick={() => refetch(pages)}
                                            variant="ghost"
                                            className={cn(
                                                "aspect-square p-1 border border-foreground rounded-md hover:bg-background cursor-pointer",
                                                currentPage === pages &&
                                                "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                            )}
                                        >
                                            {pages}
                                        </Button>
                                    </>
                                )}
                            </div>
                            <Button onClick={() => refetch(currentPage + 1)} variant={'ghost'} className={"aspect-square p-1 border border-foreground rounded-md hover:bg-background cursor-pointer"}><ChevronRight /></Button>
                        </td>
                    </tr>
                </tfoot>

            </table>
        </div >
    )
}

export { DesktopView }