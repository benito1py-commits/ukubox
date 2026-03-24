"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const tabs = [
  { href: "/dashboard/paquetes", label: "Mis Paquetes" },
  { href: "/dashboard/historial", label: "Historial" },
  { href: "/dashboard/pre-alerta", label: "Pre-Alerta" },
  { href: "/dashboard/perfil", label: "Mi Perfil" },
];

export function DashboardTabs() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-wrap gap-0 border border-border rounded-lg overflow-hidden w-fit">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
            pathname === tab.href
              ? "bg-primary text-white"
              : "bg-white text-foreground hover:bg-primary-light"
          }`}
        >
          {tab.label}
        </Link>
      ))}
      <button
        onClick={logout}
        className="px-5 py-2.5 text-sm font-medium bg-white text-foreground hover:bg-danger/5 hover:text-danger transition-colors"
      >
        Salir
      </button>
    </div>
  );
}
