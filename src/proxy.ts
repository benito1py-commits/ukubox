import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Solo intervenimos las rutas nuevas de Supabase; no tocamos /api/helga ni el
  // resto del sitio (que usa la auth de Helga).
  matcher: ["/admin/:path*", "/sitio/cuenta/:path*"],
};
