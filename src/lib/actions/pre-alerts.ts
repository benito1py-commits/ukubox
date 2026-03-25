"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPreAlert(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const tracking = formData.get("tracking") as string;
  const storeId = formData.get("store_id") as string;
  const storeName = formData.get("store_name") as string;
  const description = formData.get("description") as string;
  const declaredValue = parseFloat(formData.get("declared_value") as string) || 0;

  if (!tracking) return { error: "El tracking es obligatorio" };

  const { error } = await supabase.from("pre_alerts").insert({
    user_id: user.id,
    tracking,
    store_id: storeId || null,
    store_name: storeName || null,
    description,
    declared_value: declaredValue,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/pre-alerta");
  return { success: true };
}

export async function cancelPreAlert(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const { error } = await supabase
    .from("pre_alerts")
    .update({ status: "cancelled" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/pre-alerta");
  return { success: true };
}
