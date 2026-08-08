import Link from "next/link";
import { ChevronRight, Wrench } from "lucide-react";

import Paginacion from "@/components/Paginacion";
import { createClient } from "@/lib/supabase/server";
import { metaEstadoSolicitud, metaUrgencia } from "@/lib/solicitudes-repuesto";
import { ESTADOS_SOLICITUD } from "@/lib/supabase/types";

export const metadata = {
  title: "Solicitudes de repuesto - UKUXBOX",
};

const POR_PAGINA = 20;

export default async function AdminSolicitudesRepuestoPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; pagina?: string }>;
}) {
  const { estado, pagina } = await searchParams;
  const supabase = await createClient();

  const estadoValido = ESTADOS_SOLICITUD.some((e) => e.valor === estado);
  const paginaActual = Math.max(1, Number(pagina) || 1);
  const desde = (paginaActual - 1) * POR_PAGINA;

  let query = supabase
    .from("solicitudes_repuesto")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(desde, desde + POR_PAGINA - 1);

  if (estado && estadoValido) query = query.eq("estado", estado);

  const { data: solicitudes, count } = await query;

  const total = count ?? 0;
  const totalPaginas = Math.max(1, Math.ceil(total / POR_PAGINA));

  // Conserva el filtro de estado al cambiar de página.
  const hrefPagina = (n: number) => {
    const params = new URLSearchParams();
    if (estado && estadoValido) params.set("estado", estado);
    if (n > 1) params.set("pagina", String(n));
    const qs = params.toString();
    return qs ? `/admin/solicitudes-repuesto?${qs}` : "/admin/solicitudes-repuesto";
  };

  const hrefEstado = (valor?: string) =>
    valor
      ? `/admin/solicitudes-repuesto?estado=${valor}`
      : "/admin/solicitudes-repuesto";

  const chip = (seleccionado: boolean) =>
    `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
      seleccionado
        ? "bg-primary text-white"
        : "bg-white border border-border text-foreground hover:border-primary"
    }`;

  return (
    <div>
      <h1 className="text-2xl font-black text-foreground mb-4">
        Solicitudes de repuesto
      </h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href={hrefEstado()}
          className={chip(!estado || !estadoValido)}
        >
          Todas
        </Link>
        {ESTADOS_SOLICITUD.map((e) => (
          <Link
            key={e.valor}
            href={hrefEstado(e.valor)}
            className={chip(estado === e.valor)}
          >
            {e.label}
          </Link>
        ))}
      </div>

      {!solicitudes || solicitudes.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {estado && estadoValido
              ? "No hay solicitudes con este estado."
              : "Todavía no hay solicitudes de repuesto."}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {solicitudes.map((s) => {
              const meta = metaEstadoSolicitud(s.estado);
              const urgencia = metaUrgencia(s.urgencia);
              return (
                <Link
                  key={s.id}
                  href={`/admin/solicitudes-repuesto/${s.id}`}
                  className="flex items-center gap-4 bg-white border border-border rounded-2xl p-4 sm:p-5 hover:border-primary transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {s.numero_orden}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}
                      >
                        {meta.label}
                      </span>
                      {s.urgencia === "urgente" && (
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${urgencia.badge}`}
                        >
                          {urgencia.label}
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-foreground mt-1.5 truncate">
                      {s.descripcion}
                      {s.cantidad > 1 && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          × {s.cantidad}
                        </span>
                      )}
                    </p>

                    <p className="text-sm text-muted-foreground truncate">
                      {[s.marca, s.modelo, s.anio].filter(Boolean).join(" · ")}
                      {s.oem && ` · OEM ${s.oem}`}
                    </p>

                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {s.cliente} · {s.telefono} ·{" "}
                      {new Date(s.created_at).toLocaleString("es-PY")}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 shrink-0 text-muted-foreground" />
                </Link>
              );
            })}
          </div>

          <Paginacion
            pagina={paginaActual}
            totalPaginas={totalPaginas}
            total={total}
            hrefPagina={hrefPagina}
          />
        </>
      )}
    </div>
  );
}
