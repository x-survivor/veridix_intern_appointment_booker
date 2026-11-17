import { Button } from "@/shared/components/ui/button"
import { Trash, Check } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Label } from "./ui/label"
import { appointment } from "../constants/types/appointmentType"
import { updateStatus } from "@/features/(public)/appointments/services/updateStatus"

const AppointmentCard = ({ data, refetch }: { data: appointment, refetch: () => Promise<void> }) => {
    return (
        <>
            <tr className="max-w-full flex items-center">
                <td className="w-full flex justify-start items-start text-lg font-semibold">
                    {data.patient_name}
                </td>
                <td className="w-full flex flex-col justify-evenly align-text-start">
                    <div>
                        {data.date}
                    </div>
                </td>
                <td className="w-full flex justify-evenly items-center">
                    {data.start_time}
                </td>
                <td className="w-full flex justify-evenly items-center">
                    {data.doctor_name}
                </td>
                <td className="w-full justify-evenly items-center gap-2">
                    <div className={cn("hidden w-full justify-center items-center gap-2",
                        data.status == "booked" && "flex"
                    )}>
                        <Button
                            onClick={() => {
                                updateStatus(data.id, "completed", refetch);
                            }}
                            className="w-1/2 p-2 h-auto border rounded-md text-muted-foreground bg-muted hover:cursor-pointer hover:bg-accent">
                            <Check />
                        </Button>
                        <Button
                            onClick={() => {
                                updateStatus(data.id, "cancelled", refetch)
                            }}
                            className="w-1/2 p-2 h-auto border rounded-md bg-transparent text-destructive  hover:cursor-pointer hover:text-white hover:bg-muted">
                            <Trash />
                        </Button>
                    </div>
                </td>
                <td className="w-full flex justify-evenly items-center font-semibold">
                    <Label className={cn("px-2 py-1",
                        data.status == "booked" && "bg-status-booked rounded-full text-success-foreground",
                        data.status == "cancelled" && "bg-status-cancelled rounded-full text-destructive-foreground",
                        data.status == "completed" && "bg-status-completed rounded-full text-success-foreground",
                    )}>
                        {data.status}
                    </Label>
                </td>
                
            </tr>
        </>
    )
}

export { AppointmentCard }