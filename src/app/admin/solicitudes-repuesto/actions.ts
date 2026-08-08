"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { ESTADOS_SOLICITUD, type EstadoSolicitud } from "@/lib/supabase/types";

export type GestionSolicitudData = {
  estado: EstadoSolicitud;
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

  return {
    supabase,
    user,
    autorizado: perfil?.role === "admin",
  };
}

export async function actualizarSolicitud(
  id: string,
  data: GestionSolicitudData,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  if (!ESTADOS_SOLICITUD.some((e) => e.valor === data.estado)) {
    return { ok: false, error: "Estado inválido" };
  }

  const { error } = await supabase
    .from("solicitudes_repuesto")
    .update({
      estado: data.estado,
      notas_admin: data.notas_admin.trim() || null,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/solicitudes-repuesto");
  revalidatePath(`/admin/solicitudes-repuesto/${id}`);
  return { ok: true };
}

export async function borrarSolicitud(id: string): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase
    .from("solicitudes_repuesto")
    .delete()
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/solicitudes-repuesto");
  return { ok: true };
}
