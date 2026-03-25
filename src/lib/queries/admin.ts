import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single();

  if (!admin) redirect("/admin/login");

  return { user, admin };
}

export async function getAdminStats() {
  const supabase = await createClient();

  const [
    { count: totalClients },
    { count: totalPackages },
    { count: pendingPackages },
    { count: activePreAlerts },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase
      .from("packages")
      .select("*", { count: "exact", head: true })
      .in("status", ["received", "digitized"]),
    supabase
      .from("pre_alerts")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  return {
    totalClients: totalClients || 0,
    totalPackages: totalPackages || 0,
    pendingPackages: pendingPackages || 0,
    activePreAlerts: activePreAlerts || 0,
  };
}

export async function searchPackages(params: {
  tracking?: string;
  reference?: string;
  mawb?: string;
  hawb?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  country?: string;
  userId?: string;
  page?: number;
  perPage?: number;
}) {
  const supabase = await createClient();
  const page = params.page || 1;
  const perPage = params.perPage || 20;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("packages")
    .select("*, users(full_name, casillero_code), stores(name)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.tracking) query = query.ilike("tracking", `%${params.tracking}%`);
  if (params.reference)
    query = query.ilike("reference", `%${params.reference}%`);
  if (params.mawb) query = query.ilike("mawb", `%${params.mawb}%`);
  if (params.hawb) query = query.ilike("hawb", `%${params.hawb}%`);
  if (params.status) query = query.eq("status", params.status);
  if (params.dateFrom) query = query.gte("created_at", params.dateFrom);
  if (params.dateTo) query = query.lte("created_at", params.dateTo);
  if (params.userId) query = query.eq("user_id", params.userId);

  const { data, count } = await query;

  return { packages: data || [], total: count || 0, page, perPage };
}

export async function searchClients(search?: string, page = 1, perPage = 20) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("users")
    .select("*, offices(name)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.or(
      `full_name.ilike.%${search}%,casillero_code.ilike.%${search}%,cedula.ilike.%${search}%`
    );
  }

  const { data, count } = await query;
  return { clients: data || [], total: count || 0, page, perPage };
}

export async function searchPreAlerts(params: {
  tracking?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  perPage?: number;
}) {
  const supabase = await createClient();
  const page = params.page || 1;
  const perPage = params.perPage || 20;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("pre_alerts")
    .select("*, users(full_name, casillero_code), stores(name)", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.tracking)
    query = query.ilike("tracking", `%${params.tracking}%`);
  if (params.status) query = query.eq("status", params.status);
  if (params.dateFrom) query = query.gte("created_at", params.dateFrom);
  if (params.dateTo) query = query.lte("created_at", params.dateTo);

  const { data, count } = await query;
  return { preAlerts: data || [], total: count || 0, page, perPage };
}

export async function getReceptionPackages(page = 1, perPage = 20) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from("packages")
    .select("*, users(full_name, casillero_code)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return { packages: data || [], total: count || 0, page, perPage };
}

export async function getUndigitizedPackages(page = 1, perPage = 20) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count } = await supabase
    .from("packages")
    .select("*, users(full_name, casillero_code)", { count: "exact" })
    .eq("is_digitized", false)
    .order("created_at", { ascending: false })
    .range(from, to);

  return { packages: data || [], total: count || 0, page, perPage };
}
