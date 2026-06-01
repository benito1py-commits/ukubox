"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function cerrarSesion() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/sitio/acceder");
}

type ActionResult = { ok: true } | { ok: false; error: string };

// El usuario informa el pago de un pedido cotizado adjuntando su comprobante.
// La imagen ya fue subida al bucket privado 'comprobantes' desde el cliente;
// acá sólo registramos la ruta y avanzamos el estado (el trigger lo controla).
export async function informarPago(
  pedidoId: string,
  comprobantePath: string,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Tenés que iniciar sesión." };

  if (!comprobantePath) return { ok: false, error: "Falta el comprobante." };

  const { error } = await supabase
    .from("pedidos")
    .update({
      comprobante_path: comprobantePath,
      estado: "pago_informado",
    })
    .eq("id", pedidoId)
    .eq("usuario_id", user.id)
    .eq("estado", "cotizado");

  if (error) return { ok: false, error: error.message };

  revalidatePath("/sitio/cuenta");
  return { ok: true };
}

// El usuario edita su propio nombre. La policy `perfil_update_propio` lo permite
// y el trigger `proteger_role` solo bloquea cambios de rol, no de nombre.
export async function actualizarPerfil(
  nombre: string,
): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Tenés que iniciar sesión." };

  const limpio = nombre.trim();
  if (!limpio) return { ok: false, error: "El nombre no puede estar vacío." };

  const { error } = await supabase
    .from("profiles")
    .update({ nombre: limpio })
    .eq("id", user.id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/sitio/cuenta");
  revalidatePath("/sitio", "layout");
  return { ok: true };
}
