"use client"
import { Header } from "@/shared/components/header";
import Logo from "@/shared/components/logoSVG";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react"
import { ResponsiveHeader } from "@/shared/components/responsive/resposiveHeader";
import { useState } from "react";
import { SearchDialog } from "@/features/(public)/appointments/components/searchDialog";

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
    const [searchDialogTrigger, setSearchDialogTrigger] = useState(false);
    return (
        <>
            <Header />
            <section className="w-full">
                <header className="w-full h-20 px-6 flex justify-between items-center">
                    <Logo className="w-25" />
                    <div className="w-1/4 flex justify-between items-center lg:border border-foreground rounded-full px-2 gap-2">
                        <Input onClick={()=> setSearchDialogTrigger(true)} type="text" className="hidden lg:block lg:w-[90%] border-0 px-2" placeholder="Search" />
                        <div className="flex justify-end lg:justify-center items-center w-full lg:w-[10%]">
                            <Search />
                        </div>
                    </div>
                </header>
                <div className="absolute flex justify-center items-center h-screen">
                    <SearchDialog searchDialogTrigger={searchDialogTrigger} setSearchDialogTrigger={setSearchDialogTrigger}/>
                </div>
                {children}
            </section>
            <ResponsiveHeader />
        </>
    )
} 