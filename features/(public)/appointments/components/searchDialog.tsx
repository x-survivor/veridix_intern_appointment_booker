import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";

const SearchDialog = ({ searchDialogTrigger, setSearchDialogTrigger }: { searchDialogTrigger: boolean, setSearchDialogTrigger: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <>
            <Dialog open={searchDialogTrigger} onOpenChange={() => { setSearchDialogTrigger(false) }}>
                <DialogContent className="rounded-md h-2/3">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="w-[calc(100%-50px)] flex justify-between items-center lg:border border-foreground rounded-full px-2 gap-2">
                                <Input type="text" className="block lg:w-[90%] border-0 px-2 placeholder:text-xs placeholder:text-black/30" placeholder="Search by Patient Name or Doctor Name" />
                                <div className="flex justify-end lg:justify-center items-center w-full lg:w-[10%]">
                                    <Search />
                                </div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                </DialogContent>
            </Dialog>
        </>
    )
}

export { SearchDialog }