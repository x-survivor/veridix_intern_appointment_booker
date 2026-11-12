export type appointment = {
    id: string,
    doctor_name: string,
    patient_name: string,
    patient_phone: string,
    date: string,
    start_time: string,
    duration: number,
    reason: string | null,
    status: "booked" | "completed" | "cancelled",
    created_at: string,
}