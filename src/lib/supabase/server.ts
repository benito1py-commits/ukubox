import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "./types";

/**
 * Cliente de Supabase para Server Components, Route Handlers y Server Actions.
 * En Next.js 16 `cookies()` es async, por eso se hace `await`.
 *
 * Nota: en Server Components la escritura de cookies puede fallar (son de solo
 * lectura). El bloque try/catch lo absorbe; el refresco de sesión real ocurre en
 * el middleware (ver src/lib/supabase/middleware.ts).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Llamado desde un Server Component: ignorar. El middleware refresca.
          }
        },
      },
    },
  );
}
