"use client";

import type { ReactNode } from "react";
import { ShieldCheck, Stethoscope } from "lucide-react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#0F2A43] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="pointer-events-none absolute -right-36 -top-32 size-[34rem] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-16 -top-12 size-[25rem] rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-48 -left-40 size-[34rem] rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/15">
              <Stethoscope className="size-6" />
            </div>
            <span className="font-heading text-2xl font-semibold tracking-wide">Clinio</span>
          </div>

          <div className="relative z-10 max-w-xl py-16">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200">
              Healthcare operations platform
            </p>
            <h1 className="font-heading text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              Better care starts with
              <span className="mt-2 block text-blue-200">a better workflow.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-8 text-slate-300">
              Keep appointments organized, coordinate patient visits, and give your team
              a calmer way to manage the day.
            </p>
            <div className="mt-12 flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="size-5 text-emerald-300" />
              Secure access to your workspace
            </div>
          </div>

          <p className="relative z-10 text-xs tracking-wide text-slate-400">
            CLINIO · APPOINTMENT MANAGEMENT
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:mb-12">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-900/15">
                <Stethoscope className="size-5" />
              </div>
              <span className="font-heading text-2xl font-semibold tracking-tight text-[#0F2A43]">
                Clinio
              </span>
            </div>
            {children}
            <p className="mt-12 text-center text-xs leading-6 text-slate-400">
              © {new Date().getFullYear()} Clinio. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
