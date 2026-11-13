import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { CalendarX, CalendarCheck } from "lucide-react"

const AppointmentCard = ({ doctor_name, patient_name, date, time, status }: { doctor_name: string, patient_name: string, date: string, time: string, status: string }) => {
    return (
        <>
            <Card className="rounded-md py-4">
                <CardContent className="flex flex-wrap md:flex-nowrap items-center gap-6">
                    <div className="w-full flex justify-evenly items-center">
                        {date}
                    </div>
                    <div className="w-full flex justify-evenly items-center text-lg font-semibold">
                        {patient_name}
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        {doctor_name}
                    </div>
                    <div className="w-full flex justify-evenly items-center">
                        {time}
                    </div>
                    <div className="w-full flex justify-evenly items-center font-semibold">
                        {status}
                    </div>
                    <div className="w-full flex justify-center items-center gap-2">
                        <Button className="h-auto aspect-square p-2 border border-red-700/50 rounded-md bg-transparent text-red-700/50 hover:bg-red-700/50 hover:cursor-pointer hover:text-white"><CalendarX /></Button>
                        <Button className="h-auto aspect-square p-2 border border-green-700/50 rounded-md bg-transparent text-green-700/50 hover:bg-green-700/50 hover:cursor-pointer hover:text-white"><CalendarCheck /></Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export { AppointmentCard }