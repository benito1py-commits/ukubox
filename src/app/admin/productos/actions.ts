"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type ProductoFormData = {
  nombre: string;
  descripcion: string;
  precio: string;
  categoria_id: string;
  imagen_url: string;
  activo: boolean;
  bajo_pedido: boolean;
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

// Resuelve categoria_id → { categoria_id, categoria (nombre denormalizado) }.
async function resolverCategoria(
  supabase: Awaited<ReturnType<typeof createClient>>,
  categoriaId: string,
): Promise<{ categoria_id: string | null; categoria: string | null }> {
  if (!categoriaId) return { categoria_id: null, categoria: null };
  const { data: cat } = await supabase
    .from("categorias")
    .select("nombre")
    .eq("id", categoriaId)
    .single();
  if (!cat) return { categoria_id: null, categoria: null };
  return { categoria_id: categoriaId, categoria: cat.nombre };
}

export async function crearProducto(
  data: ProductoFormData,
): Promise<ActionResult> {
  const { supabase, user, autorizado } = await requireAdmin();
  if (!autorizado) return { ok: false, error: "No autorizado" };

  const cat = await resolverCategoria(supabase, data.categoria_id);

  const { error } = await supabase.from("productos").insert({
    nombre: data.nombre,
    descripcion: data.descripcion || null,
    precio: parsePrecio(data.precio),
    categoria: cat.categoria,
    categoria_id: cat.categoria_id,
    imagen_url: data.imagen_url || null,
    activo: data.activo,
    bajo_pedido: data.bajo_pedido,
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

  const cat = await resolverCategoria(supabase, data.categoria_id);

  const { error } = await supabase
    .from("productos")
    .update({
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      precio: parsePrecio(data.precio),
      categoria: cat.categoria,
      categoria_id: cat.categoria_id,
      imagen_url: data.imagen_url || null,
      activo: data.activo,
      bajo_pedido: data.bajo_pedido,
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
