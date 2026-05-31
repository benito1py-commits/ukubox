import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, LogOut, ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { cerrarSesion } from "../sitio/cuenta/actions";

export const metadata = {
  title: "Administración - UKUXBOX",
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sitio/acceder?next=/admin");
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("role, nombre")
    .eq("id", user.id)
    .single();

  if (perfil?.role !== "admin") {
    redirect("/sitio/cuenta");
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-border flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <span className="text-lg font-black text-primary">UKUXBOX</span>
          <p className="text-xs text-muted-foreground mt-0.5">Administración</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-muted font-medium transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/productos"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-muted font-medium transition-colors"
          >
            <Package className="w-5 h-5" />
            Productos
          </Link>
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link
            href="/sitio"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al sitio
          </Link>
          <form action={cerrarSesion}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}
