import { createClient } from "@/lib/supabase/server";

// Map DB status to display status
const statusMap: Record<string, string> = {
  received: "En Miami",
  digitized: "En Miami",
  in_transit: "En Tránsito",
  customs: "En Aduana",
  ready: "Listo para Retiro",
  delivered: "Entregado",
};

export async function getUserPackages(excludeDelivered = false) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("packages")
    .select("*, stores(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (excludeDelivered) {
    query = query.neq("status", "delivered");
  } else {
    query = query.eq("status", "delivered");
  }

  const { data } = await query;

  return (data || []).map((pkg) => ({
    id: pkg.id,
    tracking: pkg.tracking,
    descripcion: pkg.description || "",
    tienda: pkg.stores?.name || "Desconocida",
    peso: Number(pkg.weight),
    pesoUnit: pkg.weight_unit as "lbs" | "kg",
    precio: Number(pkg.shipping_cost),
    estado: statusMap[pkg.status] || pkg.status,
    fechaIngreso: new Date(pkg.received_at || pkg.created_at).toLocaleDateString(
      "es-PY"
    ),
    fechaEntrega: pkg.delivered_at
      ? new Date(pkg.delivered_at).toLocaleDateString("es-PY")
      : undefined,
  }));
}

export async function getPackageStats() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { enMiami: 0, enTransito: 0, enAduana: 0, listos: 0 };

  const { data } = await supabase
    .from("packages")
    .select("status")
    .eq("user_id", user.id)
    .neq("status", "delivered");

  const counts = {
    enMiami: 0,
    enTransito: 0,
    enAduana: 0,
    listos: 0,
  };

  (data || []).forEach((pkg) => {
    switch (pkg.status) {
      case "received":
      case "digitized":
        counts.enMiami++;
        break;
      case "in_transit":
        counts.enTransito++;
        break;
      case "customs":
        counts.enAduana++;
        break;
      case "ready":
        counts.listos++;
        break;
    }
  });

  return counts;
}

export async function lookupPackageByTracking(tracking: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("packages")
    .select("tracking, status, received_at, delivered_at")
    .eq("tracking", tracking)
    .limit(1)
    .single();

  if (!data) return null;

  return {
    tracking: data.tracking,
    estado: statusMap[data.status] || data.status,
    fechaIngreso: data.received_at
      ? new Date(data.received_at).toLocaleDateString("es-PY")
      : null,
    fechaEntrega: data.delivered_at
      ? new Date(data.delivered_at).toLocaleDateString("es-PY")
      : null,
  };
}
