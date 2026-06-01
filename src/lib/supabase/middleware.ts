import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "./types";

/**
 * Refresca la sesión de Supabase y protege las rutas privadas.
 *
 * - Mantiene las cookies de sesión sincronizadas (token refresh).
 * - `/admin/**` requiere sesión + rol 'admin'.
 * - `/sitio/cuenta/**` requiere sesión.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: usar getUser() (valida el token contra Supabase), no getSession().
  // Resiliente: si el refresh token quedó inválido, getUser puede lanzar; lo
  // tratamos como "sin sesión" en vez de romper la request con un 500.
  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  const { pathname } = request.nextUrl;
  const esRutaAdmin = pathname.startsWith("/admin");
  const esRutaCuenta = pathname.startsWith("/sitio/cuenta");

  if ((esRutaAdmin || esRutaCuenta) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/sitio/acceder";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (esRutaAdmin && user) {
    const { data: perfil } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (perfil?.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/sitio/cuenta";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
