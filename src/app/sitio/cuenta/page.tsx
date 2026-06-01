import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Loader,
  Package,
  ShoppingBag,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { cerrarSesion } from "./actions";
import PerfilEditor from "./PerfilEditor";
import PedidosLista from "./PedidosLista";

export const metadata = {
  title: "Mi cuenta - UKUXBOX",
};

export const dynamic = "force-dynamic";

function iniciales(nombre: string): string {
  return nombre
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function CuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sitio/acceder");
  }

  const [{ data: perfil }, { data: pedidos }, { data: configuracion }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("nombre, email, role, created_at")
        .eq("id", user.id)
        .single(),
      supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("configuracion").select("*").eq("id", true).single(),
    ]);

  const esAdmin = perfil?.role === "admin";
  const nombre = perfil?.nombre || user.email || "Mi cuenta";
  const listaPedidos = pedidos ?? [];

  // Resumen
  const total = listaPedidos.length;
  const porPagar = listaPedidos.filter((p) => p.estado === "cotizado").length;
  const enProceso = listaPedidos.filter((p) =>
    ["pendiente", "pago_informado", "pagado"].includes(p.estado),
  ).length;
  const completados = listaPedidos.filter(
    (p) => p.estado === "completado",
  ).length;

  const stats = [
    { label: "Pedidos", valor: total, icon: Package, color: "text-primary" },
    { label: "Por pagar", valor: porPagar, icon: CreditCard, color: "text-warning" },
    { label: "En proceso", valor: enProceso, icon: Loader, color: "text-primary" },
    { label: "Completados", valor: completados, icon: CheckCircle2, color: "text-success" },
  ];

  // URLs firmadas para que el cliente vea su propio comprobante (bucket privado).
  const comprobanteUrls: Record<string, string> = {};
  await Promise.all(
    listaPedidos
      .filter((p) => p.comprobante_path)
      .map(async (p) => {
        const { data } = await supabase.storage
          .from("comprobantes")
          .createSignedUrl(p.comprobante_path!, 60 * 60);
        if (data?.signedUrl) comprobanteUrls[p.id] = data.signedUrl;
      }),
  );

  const miembroDesde = perfil?.created_at
    ? new Date(perfil.created_at).toLocaleDateString("es-PY", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-[80vh] px-4 py-10 bg-muted/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Columna izquierda: perfil + acciones */}
        <aside className="bg-white rounded-2xl shadow-lg border border-border p-6 md:sticky md:top-20">
          <div className="flex flex-col items-center text-center mb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl text-xl font-black mb-3">
              {iniciales(nombre) || <ShoppingBag className="w-7 h-7" />}
            </div>
            <h1 className="text-lg font-bold text-foreground break-words">
              {nombre}
            </h1>
            <p className="text-muted-foreground text-sm break-all">
              {perfil?.email || user.email}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  esAdmin
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {esAdmin ? "Administrador" : "Cliente"}
              </span>
            </div>
            {miembroDesde && (
              <p className="text-xs text-muted-foreground mt-2">
                Miembro desde {miembroDesde}
              </p>
            )}
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <PerfilEditor nombreInicial={perfil?.nombre ?? ""} />

            {esAdmin && (
              <Link
                href="/admin"
                className="w-full flex items-center gap-3 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                Panel de administración
              </Link>
            )}

            <form action={cerrarSesion}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 text-muted-foreground hover:text-danger hover:bg-danger/5 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </aside>

        {/* Columna derecha: resumen + pedidos */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-border p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <span className="text-2xl font-black text-foreground">
                  {s.valor}
                </span>
              </div>
            ))}
          </div>

          {/* Banner acción requerida */}
          {porPagar > 0 && (
            <div className="rounded-2xl border border-warning/30 bg-warning/10 px-5 py-4 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-warning shrink-0" />
              <p className="text-sm text-foreground">
                Tenés{" "}
                <strong>
                  {porPagar} {porPagar === 1 ? "pedido" : "pedidos"}
                </strong>{" "}
                esperando pago. Usá el filtro <strong>“Por pagar”</strong> para
                completar la transferencia.
              </p>
            </div>
          )}

          {/* Pedidos */}
          <div className="bg-white rounded-2xl shadow-lg border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Mis pedidos</h2>
            </div>

            <PedidosLista
              pedidos={listaPedidos}
              comprobanteUrls={comprobanteUrls}
              configuracion={configuracion ?? null}
              usuarioId={user.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
