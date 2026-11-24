import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import { useSearch } from "./hooks/search";
import { Spinner } from "@/shared/components/ui/spinner";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { updateStatus } from "../appointments/services/updateStatus";

const SearchDialog = ({ searchDialogTrigger, setSearchDialogTrigger }: { searchDialogTrigger: boolean, setSearchDialogTrigger: Dispatch<SetStateAction<boolean>> }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { loading, error, searchResult, refetch } = useSearch(searchQuery);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <>
            <Dialog open={searchDialogTrigger} onOpenChange={() => { setSearchDialogTrigger(false) }}>
                <DialogContent className="rounded-md h-[90vh] bg-background">
                    <DialogHeader className="w-[calc(100%-100px)] h-1/6">
                        <DialogTitle className="flex justify-between items-center lg:border border-foreground rounded-full px-2 gap-2">
                            <Input onChange={(e) => handleSearch(e.target.value)} type="text" className="block lg:w-[90%] border-0 px-2 placeholder:text-xs placeholder:text-black/30" placeholder="Search by Patient Name or Doctor Name" />
                            <div className="flex justify-end lg:justify-center items-center w-full lg:w-[10%]">
                                <Search />
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 h-full p-2 overflow-auto scrollbar-thin scrollbar-thumb-foreground no-scrollbar-arrows">
                        {
                            loading ? <Spinner /> : error ? (error instanceof Error ? error.message : String(error)) : searchResult && searchResult.map((data) => (
                                <section key={data.id}>
                                    <Card className="rounded-md w-full bg-sidebar">
                                        <CardContent className="w-full flex flex-col gap-4">
                                            <article className="flex justify-between">
                                                <div>
                                                    <h6 className="text-xs text-foreground/50">Patient Name</h6>
                                                    <Label className="text-2xl font-bold">{data.patient_name}</Label>
                                                </div>
                                                <div>
                                                    <Label className={cn(
                                                        "px-2 py-0.5 rounded-full",
                                                        data.status == "booked" && "bg-status-booked text-background border border-blue-600/50",
                                                        data.status == "cancelled" && "bg-status-cancelled text-background border border-red-600/50",
                                                        data.status == "completed" && "bg-status-completed text-background border border-green-600/50",
                                                    )}>
                                                        {data.status}
                                                    </Label>
                                                </div>
                                            </article>
                                            <hr />
                                            <article className="flex justify-between items-center">
                                                <div>
                                                    <h6 className="text-xs text-foreground/50">Doctor Name</h6>
                                                    <Label className="text-md font-medium">{data.doctor_name}</Label>
                                                </div>
                                                <div>
                                                    <h6 className="text-xs text-foreground/50 flex justify-end items-center">Date & Time</h6>
                                                    <Label className="flex justify-end items-center">
                                                        {data.date}
                                                    </Label>
                                                    <Label className="flex justify-end items-center">
                                                        {data.start_time}
                                                    </Label>
                                                </div>
                                            </article>
                                            <article className={cn("hidden gap-2",
                                                data.status == "booked" && "flex"
                                            )}>
                                                <Button onClick={() => updateStatus(data.id, "cancelled", refetch)} className={"grow w-1/2 bg-background hover:bg-background/90 cursor-pointer text-foreground rounded-md"}>Cancel</Button>
                                                <Button onClick={() => updateStatus(data.id, "completed", refetch)} className={"grow w-1/2 bg-success hover:bg-success/90 cursor-pointer rounded-md"}>Complete</Button>
                                            </article>
                                        </CardContent>
                                    </Card>
                                </section >
                            ))
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export { SearchDialog }