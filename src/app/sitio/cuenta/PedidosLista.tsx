"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Package } from "lucide-react";

import type { Configuracion, Pedido } from "@/lib/supabase/types";
import { ESTADOS_PEDIDO } from "@/lib/supabase/types";
import { metaEstado } from "@/lib/pedidos";
import CopiarTexto from "./CopiarTexto";
import InformarPago from "./InformarPago";

type Filtro = "todos" | "porPagar" | "enProceso" | "completados";

const TABS: { valor: Filtro; label: string }[] = [
  { valor: "todos", label: "Todos" },
  { valor: "porPagar", label: "Por pagar" },
  { valor: "enProceso", label: "En proceso" },
  { valor: "completados", label: "Completados" },
];

function coincide(estado: string, filtro: Filtro): boolean {
  switch (filtro) {
    case "porPagar":
      return estado === "cotizado";
    case "enProceso":
      return ["pendiente", "pago_informado", "pagado"].includes(estado);
    case "completados":
      return estado === "completado";
    default:
      return true;
  }
}

export default function PedidosLista({
  pedidos,
  comprobanteUrls,
  configuracion,
  usuarioId,
}: {
  pedidos: Pedido[];
  comprobanteUrls: Record<string, string>;
  configuracion: Configuracion | null;
  usuarioId: string;
}) {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-10">
        <Package className="w-9 h-9 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground mb-4">
          Todavía no solicitaste ningún producto bajo pedido.
        </p>
        <Link
          href="/sitio/productos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const filtrados = pedidos.filter((p) => coincide(p.estado, filtro));

  return (
    <div>
      {/* Leyenda del flujo */}
      <div className="mb-5 rounded-xl bg-muted/50 px-4 py-3">
        <p className="text-xs font-semibold text-foreground mb-2">
          ¿Cómo funciona tu pedido?
        </p>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs">
          {ESTADOS_PEDIDO.filter((e) => e.valor !== "rechazado").map(
            (e, i, arr) => (
              <span key={e.valor} className="flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded-full font-medium ${metaEstado(e.valor).badge}`}
                >
                  {e.label}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground">→</span>
                )}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Tabs de filtro */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TABS.map((t) => {
          const n = pedidos.filter((p) => coincide(p.estado, t.valor)).length;
          return (
            <button
              key={t.valor}
              type="button"
              onClick={() => setFiltro(t.valor)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filtro === t.valor
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              {t.label}
              <span
                className={`ml-1.5 ${filtro === t.valor ? "text-white/80" : "text-muted-foreground"}`}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {filtrados.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">
          No tenés pedidos en este filtro.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtrados.map((p) => {
            const meta = metaEstado(p.estado);
            const comprobanteUrl = comprobanteUrls[p.id];
            return (
              <li key={p.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">
                      {p.producto_nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cantidad: {p.cantidad} ·{" "}
                      {new Date(p.created_at).toLocaleDateString("es-PY")}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>

                {p.comentario && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {p.comentario}
                  </p>
                )}

                {(p.direccion_entrega || p.telefono) && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Entrega: {p.direccion_entrega}
                    {p.direccion_entrega && p.telefono ? " · " : ""}
                    {p.telefono ? `Tel: ${p.telefono}` : ""}
                  </p>
                )}

                {/* Estimado de referencia mientras todavía no hay cotización */}
                {p.precio_cotizado == null && p.precio_unitario != null && (
                  <p className="text-sm mt-2 text-muted-foreground">
                    Precio estimado: ${p.precio_unitario} × {p.cantidad} ={" "}
                    <span className="font-semibold text-foreground">
                      ${Math.round(p.precio_unitario * p.cantidad * 100) / 100}
                    </span>{" "}
                    <span className="text-xs">(a confirmar)</span>
                  </p>
                )}

                {p.precio_cotizado != null && (
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">
                      {p.estado === "pagado" || p.estado === "completado"
                        ? "Total pagado: "
                        : "Precio cotizado (total): "}
                    </span>
                    <span className="font-bold text-foreground">
                      ${p.precio_cotizado}
                    </span>
                  </p>
                )}

                {p.notas_admin && (
                  <p className="text-sm text-foreground bg-muted rounded-lg px-3 py-2 mt-2">
                    {p.notas_admin}
                  </p>
                )}

                {/* Checkout: pagar por transferencia cuando está cotizado */}
                {p.estado === "cotizado" && (
                  <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      Pagá por transferencia bancaria
                    </p>
                    {configuracion?.numero_cuenta || configuracion?.banco ? (
                      <dl className="text-sm space-y-1 mb-3">
                        {configuracion?.banco && (
                          <div className="flex gap-2">
                            <dt className="text-muted-foreground w-28 shrink-0">
                              Banco
                            </dt>
                            <dd className="font-medium text-foreground">
                              {configuracion.banco}
                            </dd>
                          </div>
                        )}
                        {configuracion?.titular && (
                          <div className="flex gap-2">
                            <dt className="text-muted-foreground w-28 shrink-0">
                              Titular
                            </dt>
                            <dd className="font-medium text-foreground">
                              {configuracion.titular}
                            </dd>
                          </div>
                        )}
                        {configuracion?.numero_cuenta && (
                          <div className="flex gap-2 items-center">
                            <dt className="text-muted-foreground w-28 shrink-0">
                              N° de cuenta
                            </dt>
                            <dd className="font-medium text-foreground flex items-center gap-2">
                              {configuracion.numero_cuenta}
                              <CopiarTexto
                                valor={configuracion.numero_cuenta}
                                etiqueta="número de cuenta"
                              />
                            </dd>
                          </div>
                        )}
                        {configuracion?.documento && (
                          <div className="flex gap-2">
                            <dt className="text-muted-foreground w-28 shrink-0">
                              CI / RUC
                            </dt>
                            <dd className="font-medium text-foreground">
                              {configuracion.documento}
                            </dd>
                          </div>
                        )}
                        {configuracion?.alias && (
                          <div className="flex gap-2 items-center">
                            <dt className="text-muted-foreground w-28 shrink-0">
                              Alias
                            </dt>
                            <dd className="font-medium text-foreground flex items-center gap-2">
                              {configuracion.alias}
                              <CopiarTexto
                                valor={configuracion.alias}
                                etiqueta="alias"
                              />
                            </dd>
                          </div>
                        )}
                      </dl>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-3">
                        Estamos cargando los datos de pago. Escribinos para
                        coordinar la transferencia.
                      </p>
                    )}
                    {configuracion?.instrucciones && (
                      <p className="text-xs text-muted-foreground mb-3">
                        {configuracion.instrucciones}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mb-1">
                      Ya transferiste? Subí tu comprobante:
                    </p>
                    <InformarPago pedidoId={p.id} usuarioId={usuarioId} />
                  </div>
                )}

                {p.estado === "pago_informado" && (
                  <p className="mt-3 text-sm bg-accent/10 text-accent-hover rounded-lg px-3 py-2">
                    Recibimos tu comprobante. Estamos verificando el pago.
                  </p>
                )}

                {p.estado === "pagado" && (
                  <p className="mt-3 text-sm bg-success/10 text-success rounded-lg px-3 py-2 font-medium">
                    ¡Pago confirmado! Estamos gestionando tu pedido.
                  </p>
                )}

                {p.estado === "rechazado" && (
                  <p className="mt-3 text-sm bg-danger/10 text-danger rounded-lg px-3 py-2">
                    Tu pedido fue rechazado.
                    {p.notas_admin ? "" : " Escribinos para más información."}
                  </p>
                )}

                {comprobanteUrl && (
                  <a
                    href={comprobanteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    Ver mi comprobante
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
