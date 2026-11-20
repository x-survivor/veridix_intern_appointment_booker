import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";
import { Filter, X } from "lucide-react";
import { cn } from "@/shared/lib/utils"
import type { Dispatch, SetStateAction } from "react";
import type { filter } from "@/shared/constants/types/filterType";

const FilterSelection = ({ filter, setFilter, data, title }: { filter: string, setFilter: Dispatch<SetStateAction<filter>>, data: Array<{ name: string, label?: string, speciality?: string }>, title: string }) => {
    const titleFilter = "filterBy" + title.match(/\w+/)?.[0];
    return (
        <Select value={filter} onValueChange={(value) => setFilter(prev => ({ ...prev, [titleFilter]: value }))}>
            <div className="border border-black/30 px-2 w-47 lg:w-1/3 rounded-md flex justify-center items-center gap-2">

                <span onClick={() => setFilter(prev => ({ ...prev, [titleFilter]: "" }))}
                    className={cn("hidden justify-center items-center hover:text-destructive hover:cursor-pointer text-foreground",
                        filter && "flex"
                    )}>
                    <X className="w-4" />
                </span>
                <SelectTrigger className={`w-full flex justify-center items-center`}>
                    <Filter /> <SelectValue className="text-xs" placeholder={`FILTER BY ${title.toUpperCase()}`} />
                </SelectTrigger>
            </div>
            <SelectContent className="rounded-md sticky top-0">
                <SelectGroup>
                    {data && data.map((item) => (
                        <SelectItem className="rounded-md" key={item.name} value={item.name}>
                            {item.label ? item.label : item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export { FilterSelection }