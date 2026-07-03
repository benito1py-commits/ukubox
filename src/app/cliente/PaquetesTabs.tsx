"use client";

import { useEffect, useRef, useState } from "react";
import {
  Package,
  Inbox,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import type { Paquete, PaquetesPage } from "./_lib/helga";

/**
 * Historial de paquetes del casillero. La API de Helga no documenta los
 * nombres de campo, así que cada columna se resuelve probando una lista de
 * claves candidatas (la primera que exista gana). Ajustar acá si el nombre
 * real difiere una vez que veamos una respuesta en vivo.
 */
const CAMPOS: Record<string, string[]> = {
  estado: ["estado_actual", "estado", "estado_paquete", "situacion", "estatus"],
  destinatario: ["destinatario", "nombre_destinatario", "destinatario_nombre", "consignatario"],
  tracking: ["tracking", "tracking_number", "numero_tracking", "nro_tracking", "guia"],
  contenido: ["contenido", "descripcion", "descripcion_contenido", "detalle"],
  kgs: ["peso_kgs", "peso_kg", "kilos", "kg", "peso_kilos"],
  hawb: ["hawb", "numero_hawb", "nro_hawb", "hawb_number"],
  hawbAgrupa: ["hawb_agrupa", "hawb_agrupacion", "hawbagrupa", "hawb_agrupado"],
  referencia: ["referencia", "reference", "ref"],
  alto: ["alto", "altura", "height"],
  ancho: ["ancho", "width"],
  largo: ["largo", "longitud", "length"],
  volumen: ["volumen", "volume"],
  pies: ["pies_cubicos", "pies_cubico", "pies3", "cubic_feet", "ft3"],
};

// Campos que aparecen al expandir "Ver más" (etiqueta + clave + formato).
const DETALLE: { label: string; campo: keyof typeof CAMPOS; mono?: boolean }[] = [
  { label: "Destinatario", campo: "destinatario" },
  { label: "HAWB", campo: "hawb", mono: true },
  { label: "HAWB agrupa", campo: "hawbAgrupa", mono: true },
  { label: "Referencia", campo: "referencia" },
  { label: "Alto", campo: "alto" },
  { label: "Ancho", campo: "ancho" },
  { label: "Largo", campo: "largo" },
  { label: "Volumen", campo: "volumen" },
  { label: "Pies cúbicos", campo: "pies" },
];

/**
 * Devuelve el valor de la primera clave presente y no vacía. Si el valor es un
 * objeto (ej. destinatario), intenta un nombre legible antes de serializar.
 */
function valor(p: Paquete, claves: string[]): string | null {
  for (const clave of claves) {
    const v = p[clave];
    if (v === undefined || v === null || v === "") continue;
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      const nombre = o.nombre ?? o.nombres ?? o.nombre_completo ?? o.descripcion;
      return nombre ? String(nombre) : JSON.stringify(v);
    }
    return String(v);
  }
  return null;
}

export default function PaquetesTabs({ inicial }: { inicial: PaquetesPage }) {
  const [data, setData] = useState<PaquetesPage>(inicial);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const primeraVez = useRef(true);

  const filas = data.paquetes;

  /** Pide una página del historial a Helga (vía la API route). */
  async function cargar(page: number, q: string) {
    setCargando(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/cliente/api/paquetes?${params}`);
      if (res.ok) setData(await res.json());
    } catch {
      // errores de red: mantenemos la página anterior.
    } finally {
      setCargando(false);
    }
  }

  // Búsqueda contra el servidor (str_busqueda), con debounce. Vuelve a página 1.
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false;
      return; // los datos iniciales ya vienen del server render.
    }
    const t = setTimeout(() => cargar(1, busqueda), 350);
    return () => clearTimeout(t);
  }, [busqueda]);

  return (
    <section className="rounded-2xl border border-border bg-white shadow-sm">
      {/* Cabecera: título + buscador */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Package className="h-4 w-4" />
          Paquetes
        </div>
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar en el historial…"
            className="w-full rounded-lg border border-border bg-muted/40 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-white"
          />
        </div>
      </div>

      {/* Contenido: relativo para superponer el overlay de carga */}
      <div className="relative">
        {cargando && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {filas.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-12 text-center text-muted-foreground">
            <Inbox className="h-8 w-8 opacity-40" />
            <p className="text-sm">
              {busqueda
                ? "No hay paquetes que coincidan con la búsqueda."
                : "No tenés paquetes en tu casillero por ahora."}
            </p>
          </div>
        ) : (
          <>
            {/* Encabezado de columnas principales (solo en pantallas grandes) */}
            <div className="hidden grid-cols-[11rem_1fr_9rem_7rem_2rem] gap-3 border-b border-border px-4 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:grid">
              <span>Tracking</span>
              <span>Contenido</span>
              <span>Estado</span>
              <span className="text-right">Peso</span>
              <span />
            </div>

            <ul className="divide-y divide-border">
              {filas.map((p, i) => (
                <PaqueteFila key={i} p={p} />
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Paginación */}
      {data.total > 0 && (
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>
            Página {data.page} de {data.lastPage} · {data.total} paquete
            {data.total === 1 ? "" : "s"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => cargar(data.page - 1, busqueda)}
              disabled={cargando || data.page <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>
            <button
              type="button"
              onClick={() => cargar(data.page + 1, busqueda)}
              disabled={cargando || data.page >= data.lastPage}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 font-medium text-foreground transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function PaqueteFila({ p }: { p: Paquete }) {
  const [abierto, setAbierto] = useState(false);

  const tracking = valor(p, CAMPOS.tracking);
  const estado = valor(p, CAMPOS.estado);
  const contenido = valor(p, CAMPOS.contenido);
  const kgs = valor(p, CAMPOS.kgs);

  const peso = kgs ? `${kgs} kg` : "—";

  return (
    <li>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 text-left transition-colors hover:bg-muted/40 sm:grid-cols-[11rem_1fr_9rem_7rem_2rem]"
      >
        {/* Tracking */}
        <span className="truncate font-mono text-sm font-medium text-foreground">
          {tracking ?? "—"}
        </span>

        {/* Contenido (en móvil va debajo, ocupando el ancho) */}
        <span className="order-last col-span-2 truncate text-sm text-muted-foreground sm:order-none sm:col-span-1">
          {contenido ?? "—"}
        </span>

        {/* Estado */}
        <span className="justify-self-start">
          {estado ? (
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {estado}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </span>

        {/* Peso */}
        <span className="hidden text-right text-sm tabular-nums text-foreground sm:block">
          {peso}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`h-4 w-4 shrink-0 justify-self-end text-muted-foreground transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 bg-muted/30 px-4 pb-4 pt-3 sm:grid-cols-3 lg:grid-cols-4">
          {/* Peso también en el detalle para móvil */}
          <div className="sm:hidden">
            <dt className="text-xs text-muted-foreground">Peso</dt>
            <dd className="text-sm tabular-nums text-foreground">{peso}</dd>
          </div>
          {DETALLE.map((d) => {
            const v = valor(p, CAMPOS[d.campo]);
            return (
              <div key={d.label}>
                <dt className="text-xs text-muted-foreground">{d.label}</dt>
                <dd
                  className={`text-sm text-foreground ${d.mono ? "font-mono text-xs" : ""}`}
                >
                  {v ?? "—"}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
    </li>
  );
}
