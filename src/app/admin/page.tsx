import Link from "next/link";
import { Package, Eye, EyeOff } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { count: total } = await supabase
    .from("productos")
    .select("*", { count: "exact", head: true });

  const { count: activos } = await supabase
    .from("productos")
    .select("*", { count: "exact", head: true })
    .eq("activo", true);

  const inactivos = (total ?? 0) - (activos ?? 0);

  const cards = [
    { label: "Productos totales", valor: total ?? 0, icon: Package },
    { label: "Activos", valor: activos ?? 0, icon: Eye },
    { label: "Inactivos", valor: inactivos, icon: EyeOff },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div
            key={c.label}
            className="bg-white border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-3xl font-black text-foreground">
              {c.valor}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-5 rounded-xl transition-colors"
      >
        <Package className="w-5 h-5" />
        Gestionar productos
      </Link>
    </div>
  );
}
