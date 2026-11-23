"use client";
import Link from "next/link";
import { CalendarDays, Home } from "lucide-react";

const ResponsiveHeader = () => (
  <nav aria-label="Mobile navigation" className="fixed bottom-0 z-30 flex h-16 w-full items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
    <Link href="/appointments" className="flex flex-col items-center gap-1 text-xs font-medium text-slate-600">
      <Home className="size-5" />Home
    </Link>
    <Link href="/appointments" className="flex flex-col items-center gap-1 text-xs font-medium text-blue-700">
      <CalendarDays className="size-5" />Appointments
    </Link>
  </nav>
);
export { ResponsiveHeader };
