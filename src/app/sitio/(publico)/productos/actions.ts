"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type CrearPedidoData = {
  producto_id: string;
  cantidad: number;
  comentario: string;
  direccion: string;
  telefono: string;
};

type PedidoResult = { ok: true } | { ok: false; error: string };

export async function crearPedido(
  data: CrearPedidoData,
): Promise<PedidoResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Tenés que iniciar sesión." };

  const cantidad = Number.isFinite(data.cantidad) ? Math.trunc(data.cantidad) : 1;
  if (cantidad < 1) return { ok: false, error: "La cantidad debe ser al menos 1." };

  const direccion = data.direccion.trim();
  const telefono = data.telefono.trim();
  if (!direccion) return { ok: false, error: "Ingresá la dirección de entrega." };
  if (!telefono) return { ok: false, error: "Ingresá un teléfono de contacto." };

  // El precio y el estado los resuelve la DB (SECURITY DEFINER) a partir del
  // producto: si tiene precio, el pedido queda pagable de inmediato.
  const { error } = await supabase.rpc("crear_pedido", {
    p_producto_id: data.producto_id,
    p_cantidad: cantidad,
    p_comentario: data.comentario.trim() || "",
    p_direccion: direccion,
    p_telefono: telefono,
  });

  if (error) {
    const msg = /no disponible/i.test(error.message)
      ? "Este producto no está disponible bajo pedido."
      : error.message;
    return { ok: false, error: msg };
  }

  revalidatePath("/sitio/cuenta");
  return { ok: true };
}
