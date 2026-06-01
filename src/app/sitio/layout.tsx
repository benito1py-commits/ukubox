import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Sesión Supabase (resiliente: si falla, tratamos como no logueado).
  let usuario: { nombre: string | null; esAdmin: boolean } | null = null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: perfil } = await supabase
        .from("profiles")
        .select("nombre, role")
        .eq("id", user.id)
        .single();

      usuario = {
        nombre: perfil?.nombre ?? user.email ?? null,
        esAdmin: perfil?.role === "admin",
      };
    }
  } catch {
    usuario = null;
  }

  return (
    <>
      <Header usuario={usuario} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
