import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { cerrarSesion } from "./actions";

export const metadata = {
  title: "Mi cuenta - UKUXBOX",
};

export const dynamic = "force-dynamic";

export default async function CuentaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sitio/acceder");
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("nombre, email, role")
    .eq("id", user.id)
    .single();

  const esAdmin = perfil?.role === "admin";

  return (
    <div className="min-h-[80vh] px-4 py-12 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl">
              <UserIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {perfil?.nombre || "Mi cuenta"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {perfil?.email || user.email}
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-6">
            {esAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                Ir al panel de administración
              </Link>
            )}

            <form action={cerrarSesion}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 bg-muted hover:bg-border text-foreground font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
