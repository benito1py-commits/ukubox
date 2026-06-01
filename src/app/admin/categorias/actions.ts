"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

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

function revalidar() {
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/productos");
  revalidatePath("/sitio/productos");
}

export async function crearCategoria(nombre: string): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const limpio = nombre.trim();
  if (!limpio) return { ok: false, error: "El nombre no puede estar vacío." };

  const { error } = await supabase.from("categorias").insert({ nombre: limpio });
  if (error) return { ok: false, error: error.message };

  revalidar();
  return { ok: true };
}

export async function renombrarCategoria(
  id: string,
  nombre: string,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const limpio = nombre.trim();
  if (!limpio) return { ok: false, error: "El nombre no puede estar vacío." };

  const { error } = await supabase
    .from("categorias")
    .update({ nombre: limpio })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };

  // Sincronizamos el nombre denormalizado en los productos de esta categoría.
  await supabase
    .from("productos")
    .update({ categoria: limpio })
    .eq("categoria_id", id);

  revalidar();
  return { ok: true };
}

export async function borrarCategoria(id: string): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  // Limpiamos la categoría en los productos (el FK pone categoria_id en null al borrar).
  await supabase
    .from("productos")
    .update({ categoria: null })
    .eq("categoria_id", id);

  const { error } = await supabase.from("categorias").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  revalidar();
  return { ok: true };
}
