import { Header } from "@/shared/components/header";
import Logo from "@/shared/components/logoSVG";
import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";
import { ResponsiveHeader } from "@/shared/components/responsive/resposiveHeader";
import { AuthControls } from "@/features/(public)/auth/authControls";

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="w-full">
        <header className="w-full h-20 px-6 flex justify-between items-center">
          <Logo className="w-25" />
          <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-5">
            <div className="hidden w-64 items-center justify-between gap-2 rounded-full border border-slate-200 px-3 lg:flex">
              <Input type="text" className="w-full border-0 px-2" placeholder="Search" />
              <Search className="size-4 shrink-0 text-slate-500" />
            </div>
            <AuthControls />
          </div>
        </header>
        {children}
      </section>
      <ResponsiveHeader />
    </>
  );
}
