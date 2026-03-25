"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Search,
  Bell,
  PackageOpen,
  FileText,
  Truck,
  Layers,
  CreditCard,
  Users,
  MapPin,
  Store,
  UserX,
  History,
  Receipt,
  Tag,
  Box,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";

const casilleroItems = [
  { href: "/admin/casillero/consultar-guia", label: "Consultar Guía", icon: Search },
  { href: "/admin/casillero/pre-alertas", label: "Pre Alertas", icon: Bell },
  { href: "/admin/casillero/recepcion", label: "Recepción de paquetes", icon: PackageOpen },
  { href: "/admin/casillero/digitacion", label: "Digitación de paquetes", icon: FileText },
  { href: "/admin/casillero/clientes", label: "Clientes", icon: Users },
  { href: "/admin/casillero/clientes-nn", label: "Clientes NN", icon: UserX },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-[#1e293b] text-white min-h-screen flex flex-col transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-black">
              <span className="text-accent">UKU</span>XBOX
            </span>
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
              Admin
            </span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {/* Dashboard */}
        <div className="px-3 mb-1">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              pathname === "/admin"
                ? "bg-white/15 text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} />
            {!collapsed && "Dashboard"}
          </Link>
        </div>

        {/* Casillero section */}
        {!collapsed && (
          <div className="px-6 py-2 mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
              Casillero
            </p>
          </div>
        )}

        <div className="px-3 space-y-0.5">
          {casilleroItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && (
          <p className="text-xs text-white/40 text-center">
            UKUXBOX Admin v1.0
          </p>
        )}
      </div>
    </aside>
  );
}
