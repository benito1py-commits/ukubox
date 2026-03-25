import { createClient } from "@/lib/supabase/server";

export async function getStores() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("stores")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  return data || [];
}
