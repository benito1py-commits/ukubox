"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createRecipient(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const fullName = formData.get("full_name") as string;
  const cedula = formData.get("cedula") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const country = (formData.get("country") as string) || "Paraguay";

  if (!fullName) return { error: "El nombre es obligatorio" };

  const { error } = await supabase.from("recipients").insert({
    user_id: user.id,
    full_name: fullName,
    cedula: cedula || null,
    phone: phone || null,
    address: address || null,
    city: city || null,
    country,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/destinatarios");
  return { success: true };
}

export async function updateRecipient(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const { error } = await supabase
    .from("recipients")
    .update({
      full_name: formData.get("full_name") as string,
      cedula: (formData.get("cedula") as string) || null,
      phone: (formData.get("phone") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      country: (formData.get("country") as string) || "Paraguay",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/destinatarios");
  return { success: true };
}

export async function deleteRecipient(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const { error } = await supabase
    .from("recipients")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/destinatarios");
  return { success: true };
}
