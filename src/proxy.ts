import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Cubrimos todo el sitio público y el admin para refrescar/persistir la sesión
  // de Supabase ANTES del render (así el Header muestra el estado real y los
  // Server Components leen una sesión válida). updateSession sólo redirige en
  // /admin y /sitio/cuenta; en el resto sólo sincroniza cookies. No tocamos
  // /api/helga ni la auth de Helga.
  matcher: ["/admin/:path*", "/sitio/:path*"],
};
