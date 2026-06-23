import Link from "next/link";
import { FileText, ShoppingBag } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { metaEstado } from "@/lib/pedidos";
import { ESTADOS_PEDIDO } from "@/lib/supabase/types";
import PedidoGestion from "./PedidoGestion";

export const metadata = {
  title: "Pedidos - UKUXBOX",
};

export default async function AdminPedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("pedidos")
    .select("*")
    .order("created_at", { ascending: false });

  const estadoValido = ESTADOS_PEDIDO.some((e) => e.valor === estado);
  if (estado && estadoValido) query = query.eq("estado", estado);

  const { data: pedidos } = await query;

  // Datos del solicitante (el admin puede leer todos los perfiles vía RLS)
  const ids = [...new Set((pedidos ?? []).map((p) => p.usuario_id))];
  const { data: perfiles } = ids.length
    ? await supabase.from("profiles").select("id, nombre, email").in("id", ids)
    : { data: [] };

  const perfilPorId = new Map(
    (perfiles ?? []).map((p) => [p.id, p]),
  );

  // URLs firmadas para los comprobantes (bucket privado)
  const comprobanteUrls = new Map<string, string>();
  await Promise.all(
    (pedidos ?? [])
      .filter((p) => p.comprobante_path)
      .map(async (p) => {
        const { data } = await supabase.storage
          .from("comprobantes")
          .createSignedUrl(p.comprobante_path!, 60 * 60);
        if (data?.signedUrl) comprobanteUrls.set(p.id, data.signedUrl);
      }),
  );

  return (
    <div>
      <h1 className="text-2xl font-black text-foreground mb-4">Pedidos</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/pedidos"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !estado || !estadoValido
              ? "bg-primary text-white"
              : "bg-white border border-border text-foreground hover:border-primary"
          }`}
        >
          Todos
        </Link>
        {ESTADOS_PEDIDO.map((e) => (
          <Link
            key={e.valor}
            href={`/admin/pedidos?estado=${e.valor}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              estado === e.valor
                ? "bg-primary text-white"
                : "bg-white border border-border text-foreground hover:border-primary"
            }`}
          >
            {e.label}
          </Link>
        ))}
      </div>

      {!pedidos || pedidos.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <ShoppingBag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Todavía no hay pedidos bajo pedido.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((p) => {
            const meta = metaEstado(p.estado);
            const perfil = perfilPorId.get(p.usuario_id);
            return (
              <div
                key={p.id}
                className="bg-white border border-border rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-foreground">
                      {p.producto_nombre}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        × {p.cantidad}
                      </span>
                      {p.precio_unitario != null && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          · precio de lista ${p.precio_unitario} c/u
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {perfil?.nombre || "Usuario"} ·{" "}
                      {perfil?.email || p.usuario_id} ·{" "}
                      {new Date(p.created_at).toLocaleString("es-PY")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>

                {(p.direccion_entrega || p.telefono) && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-medium text-foreground">
                      Entrega:{" "}
                    </span>
                    {p.direccion_entrega}
                    {p.direccion_entrega && p.telefono ? " · " : ""}
                    {p.telefono && <span>Tel: {p.telefono}</span>}
                  </p>
                )}

                {p.comentario && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="font-medium text-foreground">
                      Comentario del cliente:{" "}
                    </span>
                    {p.comentario}
                  </p>
                )}

                {comprobanteUrls.has(p.id) && (
                  <a
                    href={comprobanteUrls.get(p.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    Ver comprobante de transferencia
                  </a>
                )}

                <PedidoGestion pedido={p} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
