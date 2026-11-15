import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Trash, CalendarCheck } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Label } from "./ui/label"
import { appointment } from "../constants/types/appointmentType"

const AppointmentCard = ({ doctor_name, patient_name, date, start_time, status }:  appointment ) => {
    return (
        <>
            <Card className="rounded-md py-4">
                <CardContent className="max-w-full flex items-center gap-6">
                    <div className="w-full flex flex-col justify-evenly items-center">
                        <div>
                            {date}
                        </div>
                    </div>
                    <div className="w-full flex justify-evenly items-center text-lg font-semibold">
                        {patient_name}
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        {doctor_name}
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        {start_time}
                    </div>
                    <div className="w-full flex justify-evenly items-center font-semibold">
                        <Label className={cn("px-2 py-1",
                            status == "booked" && "bg-blue-600/20 border border-blue-600/70 rounded-full text-blue-700",
                            status == "cancelled" && "bg-red-600/20 border border-red-600/70 rounded-full text-red-700",
                            status == "completed" && "bg-green-600/20 border border-green-600/70 rounded-full text-green-700",
                        )}>
                            {status}
                        </Label>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <Button className="h-auto aspect-square p-2 border border-green-700/50 rounded-md bg-transparent text-green-700/50 hover:bg-green-700/50 hover:cursor-pointer hover:text-white"><CalendarCheck /></Button>
                        <Button className="h-auto aspect-square p-2 border border-red-700/50 rounded-md bg-transparent text-red-700/50 hover:bg-red-700/50 hover:cursor-pointer hover:text-white"><Trash /></Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export { AppointmentCard }