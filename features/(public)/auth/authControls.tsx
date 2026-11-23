"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type CurrentUser = { id: string; name: string; email: string };

export function AuthControls() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const result = await response.json().catch(() => null);
        if (!active) return;
        if (!response.ok || !result?.user) {
          router.replace("/login");
          router.refresh();
          return;
        }
        setUser(result.user as CurrentUser);
      } catch { if (active) setError("Could not verify your session."); }
    }
    void loadCurrentUser();
    return () => { active = false; };
  }, [router]);

  async function handleLogout() {
    setIsLoggingOut(true);
    setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST", headers: { "Content-Type": "application/json" } });
      const result = await response.json().catch(() => null);
      if (!response.ok) setError(result?.message ?? "Session revocation could not be confirmed.");
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to contact the server to sign out.");
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      {user && <div className="hidden min-w-0 items-center gap-2 sm:flex">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700"><UserRound className="size-4" /></span>
        <span className="max-w-36 truncate text-sm font-medium text-slate-700">{user.name}</span>
      </div>}
      <Button type="button" variant="outline" size="sm" disabled={isLoggingOut} onClick={handleLogout}
        className="h-9 rounded-lg border-slate-200 bg-white px-3 text-xs normal-case tracking-normal text-slate-700 hover:bg-slate-50">
        <LogOut className="mr-2 size-4" />{isLoggingOut ? "Signing out..." : "Sign out"}
      </Button>
      {error && <span role="status" className="sr-only">{error}</span>}
    </div>
  );
}
