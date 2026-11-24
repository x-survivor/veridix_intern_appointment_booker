"use client"
import { Header } from "@/shared/components/header";
import Logo from "@/shared/components/logoSVG";
import { Search } from "lucide-react"
import { ResponsiveHeader } from "@/shared/components/responsive/resposiveHeader";
import { useState } from "react";
import { SearchDialog } from "@/features/(public)/search/searchDialog";

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
    const [searchDialogTrigger, setSearchDialogTrigger] = useState(false);
    return (
        <>
            <Header />
            <section className="w-full">
                <header className="w-full h-20 px-6 flex justify-between items-center">
                    <Logo className="w-25" />
                    <div onClick={()=> setSearchDialogTrigger(true)} className="w-1/4 flex justify-between items-center lg:border border-foreground rounded-full p-2 gap-2 cursor-text">
                        <span className="hidden lg:block lg:w-[90%] border-0 px-2">Search</span>
                        <div className="flex justify-end lg:justify-center items-center w-full lg:w-[10%]">
                            <Search />
                        </div>
                    </div>
                </header>
                <div className="fixed flex justify-center items-center h-screen">
                    <SearchDialog searchDialogTrigger={searchDialogTrigger} setSearchDialogTrigger={setSearchDialogTrigger}/>
                </div>
                {children}
            </section>
            <ResponsiveHeader />
        </>
    )
} 