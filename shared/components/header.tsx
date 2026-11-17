"use client";
import { useState } from "react";
import { Button } from "./ui/button"
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { House, ClipboardList } from "lucide-react";
import { cn } from "../lib/utils"
import Logo from "./logoSVG";

const Header = () => {
    const [isExtended, setIsExptended] = useState(true);
    return (
        <>
            <section className={cn("w-1/6 h-screen shadow-xs hidden lg:flex flex-col justify-between items-center px-4 py-2 bg-sidebar text-sidebar-foreground transition-[width] duration-500 ease-in-out overflow-hidden",
                !isExtended && "w-20"
            )}>
                <div className={cn("w-full flex justify-between p-4 items-center",
                    !isExtended && "justify-center"
                )}>
                    <Logo className="w-15"/>
                    <span
                        className="hover:cursor-pointer hover:bg-transparent"
                        onClick={() => setIsExptended(!isExtended)}
                    >
                        {
                            isExtended ? <PanelLeftClose className="w-5 h-auto" /> : <PanelLeftOpen className="w-5 h-auto" />
                        }
                    </span>
                </div>
                <div className="grow flex flex-col py-2 justify-start items-start">
                    <Button variant="ghost" className="hover:cursor-pointer hover:bg-transparent flex gap-3">
                        <House />
                        <span className={cn("hidden",
                            isExtended && "flex opacity-100 transition-all transition-discrete duration-700 starting:opacity-0 delay-50"
                        )}>
                            Home
                        </span>
                    </Button>
                    <Button variant="ghost" className="hover:cursor-pointer hover:bg-transparent flex gap-3">
                        <ClipboardList />
                        <span className={cn("hidden",
                            isExtended && "flex opacity-100 transition-all transition-discrete duration-700 starting:opacity-0 delay-50"
                        )}>
                            Appointments
                        </span>
                    </Button>
                </div>
            </section>
        </>
    )
}

export { Header }