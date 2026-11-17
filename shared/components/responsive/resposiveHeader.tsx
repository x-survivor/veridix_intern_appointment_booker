"use client";
import { Home, ClipboardList } from "lucide-react"

const ResponsiveHeader = () => {
    return (
        <section className="fixed bottom-0 h-20 w-full bg-foreground flex md:hidden justify-center items-center">
            <article className="text-background w-1/2 flex justify-center items-center">
                <Home />
            </article>
            <article className="text-background w-1/2 flex justify-center items-center">
                <ClipboardList />
            </article>
        </section>
    )
}

export { ResponsiveHeader }