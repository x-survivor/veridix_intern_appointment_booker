import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/shared/components/ui/select";
import { Filter, X } from "lucide-react";
import { cn } from "@/shared/lib/utils"
import type { Dispatch, SetStateAction } from "react";
import type { filter } from "@/shared/constants/types/filterType";

const FilterSelection = ({ filter, setFilter, data, title }: { filter: string, setFilter: Dispatch<SetStateAction<filter>>, data: Array<{ name: string, label?: string, speciality?: string }>, title: string }) => {
    const titleFilter = "filterBy" + title.match(/\w+/)?.[0];
    return (
        <Select value={filter} onValueChange={(value) => setFilter(prev => ({ ...prev, [titleFilter]: value }))}>
            <span onClick={() => setFilter(prev => ({ ...prev, [titleFilter]: "" }))}
                className={cn("hidden justify-center items-center hover:text-destructive hover:cursor-pointer text-foreground",
                    filter && "flex"
                )}>
                <X />
            </span>
            <SelectTrigger className={`w-1/3 border border-black/30 px-2 rounded-md`}>
                <Filter /> <SelectValue placeholder={`Filter by: ${title}`} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {data && data.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export { FilterSelection }