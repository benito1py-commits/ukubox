"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

import {
  COMBUSTIBLES,
  POSICIONES_PIEZA,
  TRANSMISIONES,
  URGENCIAS_SOLICITUD,
} from "@/lib/supabase/types";
import {
  crearSolicitudRepuesto,
  type SolicitudRepuestoFormData,
} from "./actions";

const VACIO: SolicitudRepuestoFormData = {
  cliente: "",
  telefono: "",
  vin: "",
  marca: "",
  modelo: "",
  anio: "",
  transmision: "",
  combustible: "",
  cilindrada: "",
  potencia: "",
  descripcion: "",
  oem: "",
  cantidad: "1",
  posicion: "No aplica",
  urgencia: "normal",
  muestra_fisica: true,
  notas: "",
  empresa: "",
};

const inputClass =
  "w-full px-4 py-2.5 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

const monoClass = `${inputClass} font-mono uppercase tracking-wider`;

function Campo({
  label,
  opcional,
  requerido,
  span2,
  children,
}: {
  label: string;
  opcional?: string;
  requerido?: boolean;
  span2?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${span2 ? "sm:col-span-2" : ""}`}>
      <label className="text-xs font-semibold text-foreground">
        {label}
        {requerido && <span className="text-primary"> *</span>}
        {opcional && (
          <span className="font-normal text-muted-foreground"> {opcional}</span>
        )}
      </label>
      {children}
    </div>
  );
}

function Tarjeta({
  indice,
  titulo,
  hint,
  children,
}: {
  indice: string;
  titulo: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 sm:p-7">
      <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-foreground">
        <span className="font-mono text-xs font-semibold text-primary border border-primary/40 rounded px-1.5 py-0.5">
          {indice}
        </span>
        {titulo}
      </h2>
      <p className="text-sm text-muted-foreground mt-1.5 mb-6">{hint}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

// Fila del ticket de confirmación: los campos vacíos se marcan explícitamente.
function FilaTicket({ label, valor }: { label: string; valor: string }) {
  const vacio = !valor.trim();
  return (
    <>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd
        className={
          vacio
            ? "text-sm italic text-muted-foreground"
            : "text-sm font-mono text-foreground break-words"
        }
      >
        {vacio ? "— no especificado" : valor}
      </dd>
    </>
  );
}

export default function SolicitudRepuestoForm() {
  const [form, setForm] = useState<SolicitudRepuestoFormData>(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<{
    numeroOrden: string;
    datos: SolicitudRepuestoFormData;
  } | null>(null);

  const update = <K extends keyof SolicitudRepuestoFormData>(
    campo: K,
    valor: SolicitudRepuestoFormData[K],
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      const res = await crearSolicitudRepuesto(form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setResultado({ numeroOrden: res.numeroOrden, datos: form });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setEnviando(false);
    }
  };

  if (resultado) {
    const d = resultado.datos;
    const urgenciaLabel =
      URGENCIAS_SOLICITUD.find((u) => u.valor === d.urgencia)?.label ?? "";

    return (
      <div className="border border-dashed border-muted-foreground rounded-2xl p-6 sm:p-8 bg-muted/30">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-success border border-success rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Orden generada — pendiente de consulta al proveedor
        </div>

        <h2 className="text-base font-bold uppercase tracking-widest text-foreground mt-4">
          Resumen de orden
        </h2>
        <p className="font-mono text-sm font-semibold text-primary mt-1 mb-6">
          {resultado.numeroOrden}
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-x-4 gap-y-2.5">
          <FilaTicket label="Cliente" valor={d.cliente} />
          <FilaTicket label="Teléfono" valor={d.telefono} />
          <FilaTicket label="VIN" valor={d.vin.toUpperCase()} />
          <FilaTicket
            label="Vehículo"
            valor={[d.marca, d.modelo, d.anio].filter(Boolean).join(" · ")}
          />
          <FilaTicket
            label="Motor"
            valor={[d.combustible, d.cilindrada, d.potencia]
              .filter(Boolean)
              .join(" · ")}
          />
          <FilaTicket label="Transmisión" valor={d.transmision} />
          <FilaTicket label="Pieza" valor={d.descripcion} />
          <FilaTicket label="Código OEM" valor={d.oem.toUpperCase()} />
          <FilaTicket label="Cantidad" valor={d.cantidad} />
          <FilaTicket label="Lado / posición" valor={d.posicion} />
          <FilaTicket label="Urgencia" valor={urgenciaLabel} />
          <FilaTicket
            label="Muestra física"
            valor={
              d.muestra_fisica
                ? "Sí, disponible para comparar"
                : "No disponible"
            }
          />
          <FilaTicket label="Notas" valor={d.notas} />
        </dl>

        <p className="text-sm text-muted-foreground mt-6">
          Nos vamos a contactar al {d.telefono} con la disponibilidad y el precio.
          Guardá el número de orden para hacer el seguimiento.
        </p>

        <button
          type="button"
          onClick={() => {
            setResultado(null);
            setForm(VACIO);
          }}
          className="mt-5 inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-colors"
        >
          Hacer otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot: invisible para las personas, irresistible para los bots. */}
      <input
        type="text"
        name="empresa"
        value={form.empresa}
        onChange={(e) => update("empresa", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <Tarjeta
        indice="01"
        titulo="Datos del cliente"
        hint="Quién solicita el repuesto y cómo contactarlo con la respuesta de disponibilidad."
      >
        <Campo label="Nombre / Taller" requerido>
          <input
            type="text"
            value={form.cliente}
            onChange={(e) => update("cliente", e.target.value)}
            className={inputClass}
            required
          />
        </Campo>
        <Campo label="Teléfono / WhatsApp" requerido>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            className={inputClass}
            required
          />
        </Campo>
      </Tarjeta>

      <Tarjeta
        indice="02"
        titulo="Datos del vehículo"
        hint="El VIN es lo que evita pedir el repuesto equivocado: define versión exacta, mercado de origen y equipamiento de fábrica."
      >
        <Campo
          label="Número de VIN (Chasis)"
          opcional="— 17 caracteres si es posterior a 1981"
          requerido
          span2
        >
          <input
            type="text"
            value={form.vin}
            onChange={(e) => update("vin", e.target.value.toUpperCase())}
            maxLength={17}
            placeholder="Ej: 9BWZZZ377VT004251"
            className={monoClass}
            required
          />
        </Campo>
        <Campo label="Marca" requerido>
          <input
            type="text"
            value={form.marca}
            onChange={(e) => update("marca", e.target.value)}
            className={inputClass}
            required
          />
        </Campo>
        <Campo label="Modelo" requerido>
          <input
            type="text"
            value={form.modelo}
            onChange={(e) => update("modelo", e.target.value)}
            className={inputClass}
            required
          />
        </Campo>
        <Campo
          label="Año de fabricación"
          opcional="(no el de matriculación)"
          requerido
        >
          <input
            type="number"
            min={1960}
            max={new Date().getFullYear() + 1}
            value={form.anio}
            onChange={(e) => update("anio", e.target.value)}
            className={inputClass}
            required
          />
        </Campo>
        <Campo label="Transmisión">
          <select
            value={form.transmision}
            onChange={(e) => update("transmision", e.target.value)}
            className={inputClass}
          >
            <option value="">Sin especificar</option>
            {TRANSMISIONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Combustible">
          <select
            value={form.combustible}
            onChange={(e) => update("combustible", e.target.value)}
            className={inputClass}
          >
            <option value="">Sin especificar</option>
            {COMBUSTIBLES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Cilindrada">
          <input
            type="text"
            value={form.cilindrada}
            onChange={(e) => update("cilindrada", e.target.value)}
            placeholder="Ej: 1.6L / 1598cc"
            className={inputClass}
          />
        </Campo>
        <Campo
          label="Potencia"
          opcional="(opcional, si hay más de una versión de motor)"
          span2
        >
          <input
            type="text"
            value={form.potencia}
            onChange={(e) => update("potencia", e.target.value)}
            placeholder="Ej: 120cv / 88kW"
            className={inputClass}
          />
        </Campo>
      </Tarjeta>

      <Tarjeta
        indice="03"
        titulo="Datos de la pieza"
        hint="El código OEM es la referencia que el proveedor cruza contra su stock. Si dudás del código, la muestra física es la forma más confiable de confirmarlo."
      >
        <Campo label="Descripción de la pieza" requerido span2>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => update("descripcion", e.target.value)}
            placeholder="Ej: Amortiguador delantero"
            className={inputClass}
            required
          />
        </Campo>
        <Campo label="Número de parte (OEM)" opcional="— si lo tenés">
          <input
            type="text"
            value={form.oem}
            onChange={(e) => update("oem", e.target.value.toUpperCase())}
            placeholder="Ej: 4B0413031T"
            className={monoClass}
          />
        </Campo>
        <Campo label="Cantidad">
          <input
            type="number"
            min={1}
            value={form.cantidad}
            onChange={(e) => update("cantidad", e.target.value)}
            className={inputClass}
          />
        </Campo>
        <Campo label="Lado / posición">
          <select
            value={form.posicion}
            onChange={(e) => update("posicion", e.target.value)}
            className={inputClass}
          >
            {POSICIONES_PIEZA.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Urgencia">
          <select
            value={form.urgencia}
            onChange={(e) => update("urgencia", e.target.value)}
            className={inputClass}
          >
            {URGENCIAS_SOLICITUD.map((u) => (
              <option key={u.valor} value={u.valor}>
                {u.label}
              </option>
            ))}
          </select>
        </Campo>
        <Campo label="Muestra física disponible para comparar" span2>
          <div className="flex flex-wrap gap-2.5">
            {[
              { valor: true, label: "Sí, la tengo" },
              { valor: false, label: "No la tengo" },
            ].map((op) => (
              <label
                key={op.label}
                className={`flex-1 min-w-[140px] text-center text-sm px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                  form.muestra_fisica === op.valor
                    ? "border-primary bg-primary/5 text-primary font-semibold"
                    : "border-border text-foreground hover:border-primary/50"
                }`}
              >
                <input
                  type="radio"
                  name="muestra"
                  className="sr-only"
                  checked={form.muestra_fisica === op.valor}
                  onChange={() => update("muestra_fisica", op.valor)}
                />
                {op.label}
              </label>
            ))}
          </div>
        </Campo>
        <Campo
          label="Notas adicionales"
          opcional="(color, ubicación exacta, repuesto alternativo aceptado, etc.)"
          span2
        >
          <textarea
            value={form.notas}
            onChange={(e) => update("notas", e.target.value)}
            rows={3}
            placeholder="Ej: acepto repuesto alternativo si el original tarda más de 5 días"
            className={inputClass}
          />
        </Campo>
      </Tarjeta>

      {error && (
        <p className="text-sm text-danger bg-danger/5 border border-danger/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-60"
        >
          {enviando ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {enviando ? "Enviando..." : "Generar orden"}
        </button>
        <button
          type="button"
          onClick={() => {
            setForm(VACIO);
            setError("");
          }}
          disabled={enviando}
          className="inline-flex items-center gap-2 bg-white border border-border hover:border-primary text-foreground text-sm font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Limpiar formulario
        </button>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Check className="w-4 h-4 shrink-0 text-success mt-px" />
        No hace falta tener cuenta. Al enviar generamos un número de orden y te
        contactamos con la disponibilidad y el precio.
      </p>
    </form>
  );
}
