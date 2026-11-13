import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PanelLeftOpen } from 'lucide-react';

const Header = () => {
    return (
        <>
            <section className="w-full shadow-xs flex justify-between items-center px-2">
                <div className="grow">
                    <Button
                        variant="ghost"
                        className="text-black hover:cursor-pointer hover:bg-transparent"
                    >
                        <PanelLeftOpen />
                    </Button>
                </div>
                <div className="grow flex py-2 justify-end-safe">
                    <Button variant="ghost">Home</Button>
                    <Button variant="ghost">Appointment</Button>
                    <Input
                        className="w-50 px-2 hidden lg:block"
                        placeholder="Search"
                    />
                </div>
            </section>
        </>
    )
}

export { Header }