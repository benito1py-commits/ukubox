import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AdminShell from "./AdminShell";

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
    .select("role")
    .eq("id", user.id)
    .single();

  if (perfil?.role !== "admin") {
    redirect("/sitio/cuenta");
  }

  return <AdminShell>{children}</AdminShell>;
}
