import Link from "next/link";
import { Package, Eye, EyeOff, ShoppingBag } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: total },
    { count: activos },
    { count: pedidosPendientes },
  ] = await Promise.all([
    supabase.from("productos").select("*", { count: "exact", head: true }),
    supabase
      .from("productos")
      .select("*", { count: "exact", head: true })
      .eq("activo", true),
    supabase
      .from("pedidos")
      .select("*", { count: "exact", head: true })
      .eq("estado", "pendiente"),
  ]);

  const inactivos = (total ?? 0) - (activos ?? 0);

  const cards = [
    { label: "Productos totales", valor: total ?? 0, icon: Package },
    { label: "Activos", valor: activos ?? 0, icon: Eye },
    { label: "Inactivos", valor: inactivos, icon: EyeOff },
    {
      label: "Pedidos pendientes",
      valor: pedidosPendientes ?? 0,
      icon: ShoppingBag,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/productos"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-5 rounded-xl transition-colors"
        >
          <Package className="w-5 h-5" />
          Gestionar productos
        </Link>
        <Link
          href="/admin/pedidos"
          className="inline-flex items-center gap-2 bg-muted hover:bg-border text-foreground font-semibold py-3 px-5 rounded-xl transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          Ver pedidos
        </Link>
      </div>
    </div>
  );
}
