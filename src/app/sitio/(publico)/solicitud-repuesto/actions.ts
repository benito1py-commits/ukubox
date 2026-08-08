"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type SolicitudRepuestoFormData = {
  // 01 Cliente
  cliente: string;
  telefono: string;
  // 02 Vehículo
  vin: string;
  marca: string;
  modelo: string;
  anio: string;
  transmision: string;
  combustible: string;
  cilindrada: string;
  potencia: string;
  // 03 Pieza
  descripcion: string;
  oem: string;
  cantidad: string;
  posicion: string;
  urgencia: string;
  muestra_fisica: boolean;
  notas: string;
  // Honeypot: los bots completan todos los campos, las personas no ven este.
  empresa: string;
};

export type SolicitudRepuestoResult =
  | { ok: true; numeroOrden: string }
  | { ok: false; error: string };

// El VIN estándar no usa I, O ni Q (se confunden con 1 y 0).
const VIN_VALIDO = /^[A-HJ-NPR-Z0-9]+$/;

export async function crearSolicitudRepuesto(
  data: SolicitudRepuestoFormData,
): Promise<SolicitudRepuestoResult> {
  // Honeypot: fingimos éxito para no darle señal al bot, sin escribir nada.
  if (data.empresa.trim()) return { ok: true, numeroOrden: "" };

  const cliente = data.cliente.trim();
  const telefono = data.telefono.trim();
  const vin = data.vin.trim().toUpperCase();
  const marca = data.marca.trim();
  const modelo = data.modelo.trim();
  const descripcion = data.descripcion.trim();

  if (!cliente) return { ok: false, error: "Ingresá tu nombre o el del taller." };
  if (!telefono) return { ok: false, error: "Ingresá un teléfono de contacto." };
  if (!vin) return { ok: false, error: "Ingresá el número de VIN (chasis)." };
  if (!marca) return { ok: false, error: "Ingresá la marca del vehículo." };
  if (!modelo) return { ok: false, error: "Ingresá el modelo del vehículo." };
  if (!descripcion)
    return { ok: false, error: "Describí la pieza que necesitás." };

  const anio = Number(data.anio);
  const anioMax = new Date().getFullYear() + 1;
  if (!Number.isInteger(anio) || anio < 1960 || anio > anioMax) {
    return {
      ok: false,
      error: `El año de fabricación debe estar entre 1960 y ${anioMax}.`,
    };
  }

  if (!VIN_VALIDO.test(vin)) {
    return {
      ok: false,
      error: "El VIN sólo admite letras y números, sin las letras I, O ni Q.",
    };
  }
  if (anio >= 1981 && vin.length !== 17) {
    return {
      ok: false,
      error: `Para un vehículo de ${anio} el VIN debe tener 17 caracteres (ingresaste ${vin.length}).`,
    };
  }

  const cantidadNum = Number(data.cantidad);
  const cantidad =
    Number.isFinite(cantidadNum) && cantidadNum >= 1
      ? Math.trunc(cantidadNum)
      : 1;

  const supabase = await createClient();

  // La validación real vive en la RPC (security definer): es la única frontera
  // en la que se puede confiar, porque el formulario es público.
  const { data: numeroOrden, error } = await supabase.rpc(
    "crear_solicitud_repuesto",
    {
      p_cliente: cliente,
      p_telefono: telefono,
      p_vin: vin,
      p_marca: marca,
      p_modelo: modelo,
      p_anio: anio,
      p_transmision: data.transmision.trim() || null,
      p_combustible: data.combustible.trim() || null,
      p_cilindrada: data.cilindrada.trim() || null,
      p_potencia: data.potencia.trim() || null,
      p_descripcion: descripcion,
      p_oem: data.oem.trim().toUpperCase() || null,
      p_cantidad: cantidad,
      p_posicion: data.posicion.trim() || null,
      p_urgencia: data.urgencia,
      p_muestra_fisica: data.muestra_fisica,
      p_notas: data.notas.trim() || null,
    },
  );

  if (error || !numeroOrden) {
    // Los `raise exception` de la RPC ya vienen redactados para el usuario.
    return {
      ok: false,
      error:
        error?.message ||
        "No pudimos registrar la solicitud. Intentá de nuevo en unos minutos.",
    };
  }

  revalidatePath("/admin/solicitudes-repuesto");
  return { ok: true, numeroOrden };
}
