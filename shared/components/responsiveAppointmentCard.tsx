import { appointment } from "../constants/types/appointmentType";
import { Card, CardContent } from "@/shared/components/ui/card"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { cn } from "../lib/utils"
import { updateStatus } from "@/features/(public)/appointments/services/updateStatus";


const ResponsiveAppointmentCard = ({id, doctor_name, patient_name, date, start_time, status}: appointment) => {
    return (

        <Card className="rounded-md w-full">
            <CardContent className="w-full flex flex-col gap-4">
                <article className="flex justify-between">
                    <div>
                        <h6 className="text-xs text-black/50">Patient Name</h6>
                        <Label className="text-2xl font-bold">{patient_name}</Label>
                    </div>
                    <div>
                        <Label className={cn(
                            "px-2 py-0.5 rounded-full",
                            status == "booked" && "bg-blue-600/30 text-blue-700 border border-blue-600/50",
                            status == "cancelled" && "bg-red-600/30 text-red-700 border border-red-600/50",
                            status == "completed" && "bg-green-600/30 text-green-700 border border-green-600/50",
                        )}>
                            {status}
                        </Label>
                    </div>
                </article>
                <hr />
                <article className="flex justify-between items-center">
                    <div>
                        <h6 className="text-xs text-black/50">Doctor Name</h6>
                        <Label className="text-md font-medium">{doctor_name}</Label>
                    </div>
                    <div>
                        <h6 className="text-xs text-black/50 flex justify-end items-center">Date & Time</h6>
                        <Label className="flex justify-end items-center">
                            {date}
                        </Label>
                        <Label className="flex justify-end items-center">
                            {start_time}
                        </Label>
                    </div>
                </article>
                <article className={cn("hidden gap-2",
                    status == "booked" && "flex"
                )}>
                    <Button onClick={()=>updateStatus(id, "cancelled")} className={"grow w-1/2 bg-gray-200 text-gray-800 rounded-md"}>Cancel</Button>
                    <Button onClick={()=>updateStatus(id, "completed")} className={"grow w-1/2 bg-gray-800 rounded-md"}>Complete</Button>
                </article>
            </CardContent>
        </Card>

    )
}

export { ResponsiveAppointmentCard };