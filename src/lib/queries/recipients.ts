import { createClient } from "@/lib/supabase/server";

export async function getUserRecipients() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("recipients")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("full_name");

  return data || [];
}
