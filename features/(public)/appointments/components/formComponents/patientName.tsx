import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"

const PatientName = ({ setPatientName }: { setPatientName: (arg0: string) => void }) => {
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Label>Patient Name</Label>
            <Input
                type="text"
                className="rounded-md px-2 border border-black/30 placeholder:text-black/20"
                placeholder="Bilal"
                required
                onChange={e => setPatientName(e.target.value)}
            />
        </div>
    )
}
export { PatientName }