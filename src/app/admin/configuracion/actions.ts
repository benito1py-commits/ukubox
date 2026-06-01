"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ConfiguracionFormData = {
  banco: string;
  titular: string;
  numero_cuenta: string;
  documento: string;
  alias: string;
  instrucciones: string;
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

export async function guardarConfiguracion(
  data: ConfiguracionFormData,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase
    .from("configuracion")
    .update({
      banco: data.banco.trim() || null,
      titular: data.titular.trim() || null,
      numero_cuenta: data.numero_cuenta.trim() || null,
      documento: data.documento.trim() || null,
      alias: data.alias.trim() || null,
      instrucciones: data.instrucciones.trim() || null,
    })
    .eq("id", true);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/configuracion");
  revalidatePath("/sitio/cuenta");
  return { ok: true };
}
