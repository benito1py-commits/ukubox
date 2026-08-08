import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { metaEstadoSolicitud, metaUrgencia } from "@/lib/solicitudes-repuesto";
import SolicitudGestion from "./SolicitudGestion";

export const metadata = {
  title: "Solicitud de repuesto - UKUXBOX",
};

/** Normaliza un teléfono paraguayo a formato internacional para wa.me. */
function linkWhatsApp(telefono: string): string | null {
  const digitos = telefono.replace(/\D/g, "");
  if (!digitos) return null;
  if (digitos.startsWith("595")) return `https://wa.me/${digitos}`;
  if (digitos.startsWith("0")) return `https://wa.me/595${digitos.slice(1)}`;
  return `https://wa.me/${digitos}`;
}

function Dato({ label, valor }: { label: string; valor?: string | null }) {
  const vacio = !valor || !String(valor).trim();
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd
        className={
          vacio
            ? "text-sm italic text-muted-foreground mt-0.5"
            : "text-sm text-foreground mt-0.5 break-words"
        }
      >
        {vacio ? "— no especificado" : valor}
      </dd>
    </div>
  );
}

function Tarjeta({
  indice,
  titulo,
  children,
}: {
  indice: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
      <h2 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest text-foreground mb-5">
        <span className="font-mono text-xs font-semibold text-primary border border-primary/40 rounded px-1.5 py-0.5">
          {indice}
        </span>
        {titulo}
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {children}
      </dl>
    </div>
  );
}

export default async function SolicitudRepuestoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: solicitud } = await supabase
    .from("solicitudes_repuesto")
    .select("*")
    .eq("id", id)
    .single();

  if (!solicitud) notFound();

  // No hay FK a profiles: si la solicitud vino de un usuario logueado,
  // resolvemos el perfil aparte (mismo join manual que hace /admin/pedidos).
  let perfil: { nombre: string | null; email: string | null } | null = null;
  if (solicitud.usuario_id) {
    const { data } = await supabase
      .from("profiles")
      .select("nombre, email")
      .eq("id", solicitud.usuario_id)
      .single();
    perfil = data;
  }

  const meta = metaEstadoSolicitud(solicitud.estado);
  const urgencia = metaUrgencia(solicitud.urgencia);
  const whatsapp = linkWhatsApp(solicitud.telefono);

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/solicitudes-repuesto"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a repuestos
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-1">
        <h1 className="text-2xl font-black text-foreground font-mono">
          {solicitud.numero_orden}
        </h1>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${meta.badge}`}
        >
          {meta.label}
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${urgencia.badge}`}
        >
          {urgencia.label}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Recibida el {new Date(solicitud.created_at).toLocaleString("es-PY")}
        {perfil
          ? ` · enviada desde la cuenta de ${perfil.nombre || perfil.email}`
          : " · enviada sin cuenta"}
      </p>

      <div className="space-y-4">
        <Tarjeta indice="01" titulo="Datos del cliente">
          <Dato label="Nombre / Taller" valor={solicitud.cliente} />
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Teléfono / WhatsApp
            </dt>
            <dd className="text-sm text-foreground mt-0.5 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${solicitud.telefono}`}
                className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                {solicitud.telefono}
              </a>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-success hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              )}
            </dd>
          </div>
        </Tarjeta>

        <Tarjeta indice="02" titulo="Datos del vehículo">
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Número de VIN (Chasis)
            </dt>
            <dd className="text-base font-mono tracking-wider text-foreground mt-0.5 break-all">
              {solicitud.vin}
            </dd>
          </div>
          <Dato label="Marca" valor={solicitud.marca} />
          <Dato label="Modelo" valor={solicitud.modelo} />
          <Dato label="Año de fabricación" valor={String(solicitud.anio)} />
          <Dato label="Transmisión" valor={solicitud.transmision} />
          <Dato label="Combustible" valor={solicitud.combustible} />
          <Dato label="Cilindrada" valor={solicitud.cilindrada} />
          <Dato label="Potencia" valor={solicitud.potencia} />
        </Tarjeta>

        <Tarjeta indice="03" titulo="Datos de la pieza">
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Descripción de la pieza
            </dt>
            <dd className="text-base font-semibold text-foreground mt-0.5">
              {solicitud.descripcion}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Número de parte (OEM)
            </dt>
            <dd
              className={
                solicitud.oem
                  ? "text-sm font-mono tracking-wider text-foreground mt-0.5 break-all"
                  : "text-sm italic text-muted-foreground mt-0.5"
              }
            >
              {solicitud.oem ?? "— no especificado"}
            </dd>
          </div>
          <Dato label="Cantidad" valor={String(solicitud.cantidad)} />
          <Dato label="Lado / posición" valor={solicitud.posicion} />
          <Dato label="Urgencia" valor={urgencia.label} />
          <Dato
            label="Muestra física para comparar"
            valor={
              solicitud.muestra_fisica
                ? "Sí, disponible para comparar"
                : "No disponible"
            }
          />
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Notas del cliente
            </dt>
            <dd
              className={
                solicitud.notas
                  ? "text-sm text-foreground mt-0.5 whitespace-pre-wrap"
                  : "text-sm italic text-muted-foreground mt-0.5"
              }
            >
              {solicitud.notas ?? "— no especificado"}
            </dd>
          </div>
        </Tarjeta>

        <SolicitudGestion solicitud={solicitud} />
      </div>
    </div>
  );
}
