"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ProductoFormData = {
  nombre: string;
  descripcion: string;
  precio: string;
  categoria: string;
  imagen_url: string;
  activo: boolean;
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

function parsePrecio(precio: string): number | null {
  if (!precio.trim()) return null;
  const n = Number(precio);
  return Number.isFinite(n) ? n : null;
}

export async function crearProducto(
  data: ProductoFormData,
): Promise<ActionResult> {
  const { supabase, user, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase.from("productos").insert({
    nombre: data.nombre,
    descripcion: data.descripcion || null,
    precio: parsePrecio(data.precio),
    categoria: data.categoria || null,
    imagen_url: data.imagen_url || null,
    activo: data.activo,
    creado_por: user!.id,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath("/sitio/productos");
  return { ok: true };
}

export async function actualizarProducto(
  id: string,
  data: ProductoFormData,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase
    .from("productos")
    .update({
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      precio: parsePrecio(data.precio),
      categoria: data.categoria || null,
      imagen_url: data.imagen_url || null,
      activo: data.activo,
    })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath("/sitio/productos");
  return { ok: true };
}

export async function toggleActivo(
  id: string,
  activo: boolean,
): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase
    .from("productos")
    .update({ activo })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath("/sitio/productos");
  return { ok: true };
}

export async function borrarProducto(id: string): Promise<ActionResult> {
  const { supabase, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const { error } = await supabase.from("productos").delete().eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/productos");
  revalidatePath("/sitio/productos");
  return { ok: true };
}
