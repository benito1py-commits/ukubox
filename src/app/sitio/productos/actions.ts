"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type CrearPedidoData = {
  producto_id: string;
  cantidad: number;
  comentario: string;
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

  // Verificamos que el producto exista y esté disponible bajo pedido
  const { data: producto } = await supabase
    .from("productos")
    .select("id, nombre, precio, activo, bajo_pedido")
    .eq("id", data.producto_id)
    .single();

  if (!producto || !producto.activo || !producto.bajo_pedido) {
    return { ok: false, error: "Este producto no está disponible bajo pedido." };
  }

  const cantidad = Number.isFinite(data.cantidad) ? Math.trunc(data.cantidad) : 1;
  if (cantidad < 1) return { ok: false, error: "La cantidad debe ser al menos 1." };

  const { error } = await supabase.from("pedidos").insert({
    usuario_id: user.id,
    producto_id: producto.id,
    producto_nombre: producto.nombre,
    precio_unitario: producto.precio,
    cantidad,
    comentario: data.comentario.trim() || null,
    estado: "pendiente",
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/sitio/cuenta");
  return { ok: true };
}
