"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { LogOut } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/casillero/consultar-guia": "Consultar Guía",
  "/admin/casillero/pre-alertas": "Pre Alertas",
  "/admin/casillero/recepcion": "Recepción de paquetes",
  "/admin/casillero/digitacion": "Digitación de paquetes",
  "/admin/casillero/clientes": "Clientes",
  "/admin/casillero/clientes/nuevo": "Nuevo Cliente",
  "/admin/casillero/clientes-nn": "Clientes NN",
};

export function AdminHeader() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const currentPage = breadcrumbMap[pathname] || "Admin";

  return (
    <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          {pathname !== "/admin" && (
            <>
              <span>/</span>
              <span>Casillero</span>
              <span>/</span>
              <span className="text-foreground font-medium">{currentPage}</span>
            </>
          )}
        </div>
        <h1 className="text-xl font-bold mt-1">{currentPage}</h1>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-danger transition-colors"
      >
        <LogOut size={16} />
        Salir
      </button>
    </header>
  );
}
