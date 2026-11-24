"use client";
import { useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";

import { Toaster } from "@/shared/components/ui/sonner";
import { ApplicationForm } from "./components/appointmentForm";

import { StatisticsCard } from "@/shared/components/statisticsCard";
import { ResponsiveAppointmentCard } from "@/shared/components/responsive/responsiveAppointmentCard";
import useData from "./hooks/useData";
import type { filter } from "@/shared/constants/types/filterType";
import { InitalFilter } from "@/shared/constants/datasets/initialFilter";
import { ResponsiveFilterMenu } from "@/shared/components/responsive/responsiveFilterMenu";
import { DesktopView } from "./components/desktopTableView";

const AppointmentPage = () => {
    const [dialogTrigger, setDialogTrigger] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
    const [filter, setFilter] = useState<filter>(InitalFilter);
    const { filteredData, loading, error, refetch, pages, statistics, currentPage } = useData(filter);
    return (
        <section className="w-full px-10 flex flex-col gap-2 mb-25 lg:mb-0">
            <Toaster />
            <div className="flex flex-col lg:flex-row gap-2">
                <StatisticsCard title="Total" count={statistics.total} />
                <StatisticsCard title="Booked" count={statistics.booked} />
                <StatisticsCard title="Cancelled" count={statistics.cancelled} />
                <StatisticsCard title="Completed" count={statistics.completed} />
            </div>
            <ApplicationForm
                dialogTrigger={dialogTrigger}
                setDialogTrigger={setDialogTrigger}
                refetch={refetch}
            />

            {/* Desktop Table View for Appointment Data */}
            <DesktopView
                filter={filter}
                setFilter={setFilter}
                setDialogTrigger={setDialogTrigger}
                filteredData={filteredData}
                loading={loading}
                error={error}
                refetch={refetch}
                pages={pages}
                currentPage={currentPage}
            />

            {/* Responsive Card View for Appointment Data */}
            <div className="flex lg:hidden flex-col gap-2 mt-10">
                {loading ?
                    (

                        <section className="w-full h-30 flex justify-center items-center">
                            <Spinner className="w-10 h-10" />
                        </section>
                    ) : error ? (
                        <section>
                            {error ? error.message : "Something Went Wrong"}
                        </section>
                    ) : (
                        filteredData.length > 0 && filteredData?.map((data) => (
                            <section key={data.id}>
                                <ResponsiveAppointmentCard data={data} refetch={refetch} />
                            </section >
                        ))
                    )

                }
            </div>
            <ResponsiveFilterMenu
                filter={filter}
                dialogTrigger={filterDialog}
                setFilter={setFilter}
                setDialogTrigger={setFilterDialog}
                setAppointmentTrigger={setDialogTrigger} />
        </section>
    );
};

export default AppointmentPage;