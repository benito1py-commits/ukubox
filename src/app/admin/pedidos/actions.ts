"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { EstadoPedido } from "@/lib/supabase/types";

export type GestionPedidoData = {
  estado: EstadoPedido;
  precio_cotizado: string;
  notas_admin: string;
};

type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, autorizado: false as const };

  const { data: perfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { supabase, autorizado: perfil?.role === "admin" };
}

function parsePrecio(precio: string): number | null {
  if (!precio.trim()) return null;
  const n = Number(precio);
  return Number.isFinite(n) ? n : null;
}

export async function actualizarPedido(
  id: string,
  data: GestionPedidoData,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase
    .from("pedidos")
    .update({
      estado: data.estado,
      precio_cotizado: parsePrecio(data.precio_cotizado),
      notas_admin: data.notas_admin.trim() || null,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/pedidos");
  revalidatePath("/sitio/cuenta");
  return { ok: true };
}

export async function borrarPedido(id: string): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase.from("pedidos").delete().eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/pedidos");
  return { ok: true };
}
