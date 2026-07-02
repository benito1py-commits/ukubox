"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function onLogout() {
    await fetch("/cliente/api/logout", { method: "POST" });
    router.push("/cliente/login");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
    >
      <LogOut className="h-4 w-4" />
      Cerrar sesión
    </button>
  );
}
