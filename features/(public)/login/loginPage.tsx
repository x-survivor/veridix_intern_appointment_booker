"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { AuthShell } from "@/features/(public)/auth/authShell";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message ?? "Unable to sign in. Check your details and try again.");
        return;
      }

      router.replace("/appointments");
      router.refresh();
    } catch {
      setError("The server could not be reached. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Welcome back
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-slate-900">
          Sign in to your account
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter your email and password to access your Clinio workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">Email address</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@clinic.com"
              required
              maxLength={254}
              className="h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-4 shadow-none placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/15"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700">Password</Label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              maxLength={128}
              className="h-12 rounded-xl border border-slate-200 bg-white pl-10 pr-4 shadow-none placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/15"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl bg-blue-700 text-sm font-semibold normal-case tracking-normal text-white shadow-sm hover:bg-blue-800"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
          {!isSubmitting && <ArrowRight className="ml-2 size-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-700 hover:text-blue-800 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
