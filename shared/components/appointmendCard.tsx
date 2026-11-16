import { Button } from "@/shared/components/ui/button"
import { Trash, Check } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import { Label } from "./ui/label"
import { appointment } from "../constants/types/appointmentType"
import { updateStatus } from "@/features/(public)/appointments/services/updateStatus"

const AppointmentCard = ({ id, doctor_name, patient_name, date, start_time, status }: appointment) => {
    return (
        <>
            <tr className="max-w-full flex items-center gap-6">
                <td className="w-full flex flex-col justify-evenly items-center">
                    <div>
                        {date}
                    </div>
                </td>
                <td className="w-full flex justify-evenly items-center text-lg font-semibold">
                    {patient_name}
                </td>
                <td className="w-full flex justify-evenly items-center">
                    {doctor_name}
                </td>
                <td className="w-full flex justify-evenly items-center">
                    {start_time}
                </td>
                <td className="w-full flex justify-evenly items-center font-semibold">
                    <Label className={cn("px-2 py-1",
                        status == "booked" && "bg-blue-600/20 border border-blue-600/70 rounded-full text-blue-700",
                        status == "cancelled" && "bg-red-600/20 border border-red-600/70 rounded-full text-red-700",
                        status == "completed" && "bg-green-600/20 border border-green-600/70 rounded-full text-green-700",
                    )}>
                        {status}
                    </Label>
                </td>
                <td className="w-full justify-center items-center gap-2">
                    <div className={cn("hidden w-full justify-center items-center gap-2",
                        status == "booked" && "flex"
                    )}>
                        <Button onClick={() => updateStatus(id, "completed")} className="w-1/2 p-2 h-auto border rounded-md text-white bg-gray-800 hover:cursor-pointer hover:bg-gray-800/80"><Check /></Button>
                        <Button onClick={() => updateStatus(id, "cancelled")} className="w-1/2 p-2 h-auto border rounded-md bg-transparent text-red-700/50 hover:bg-red-700/50 hover:cursor-pointer hover:text-white"><Trash /></Button>
                    </div>
                </td>
            </tr>
        </>
    )
}

export { AppointmentCard }