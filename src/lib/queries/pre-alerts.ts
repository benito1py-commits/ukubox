import { createClient } from "@/lib/supabase/server";

export async function getUserPreAlerts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("pre_alerts")
    .select("*, stores(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []).map((pa) => ({
    id: pa.id,
    tracking: pa.tracking,
    tienda: pa.stores?.name || pa.store_name || "Desconocida",
    descripcion: pa.description || "",
    valor: Number(pa.declared_value),
    fecha: new Date(pa.created_at).toLocaleDateString("es-PY"),
    estado: pa.status,
  }));
}
