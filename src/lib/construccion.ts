import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/** Lee el flag global de "sitio en construcción" (legible incluso por anónimos). */
export async function sitioEnConstruccion(): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase.rpc("sitio_en_construccion");
  // Ante la duda (error/null), asumimos en construcción para no exponer el sitio.
  return data !== false;
}

/**
 * Gating para páginas públicas: si el sitio está en construcción y el visitante
 * no es admin, lo manda a la landing de construcción (`/`). Los admins pueden
 * previsualizar el sitio normalmente. Las rutas de login (`/sitio/acceder`, etc.)
 * NO deben llamar a esto, para que el admin siempre pueda iniciar sesión.
 */
export async function redirigirSiEnConstruccion(): Promise<void> {
  const supabase = await createClient();

  const { data: enConstruccion } = await supabase.rpc("sitio_en_construccion");
  if (enConstruccion === false) return;

  // Permitir preview a los admins logueados.
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: perfil } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (perfil?.role === "admin") return;
    }
  } catch {
    // Sin sesión válida: tratamos como visitante común.
  }

  redirect("/");
}
