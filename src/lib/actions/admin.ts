"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createPackage(formData: FormData) {
  const supabase = await createClient();

  const tracking = formData.get("tracking") as string;
  const hawb = formData.get("hawb") as string;
  const mawb = formData.get("mawb") as string;
  const userId = formData.get("user_id") as string;
  const description = formData.get("description") as string;

  if (!tracking) return { error: "El tracking es obligatorio" };

  // Check if tracking matches a pre-alert
  let hasPreAlert = false;
  if (tracking) {
    const { data: preAlert } = await supabase
      .from("pre_alerts")
      .select("id")
      .eq("tracking", tracking)
      .eq("status", "active")
      .limit(1)
      .single();

    if (preAlert) {
      hasPreAlert = true;
      await supabase
        .from("pre_alerts")
        .update({ status: "matched" })
        .eq("id", preAlert.id);
    }
  }

  const { error } = await supabase.from("packages").insert({
    tracking,
    hawb: hawb || null,
    mawb: mawb || null,
    user_id: userId || null,
    description: description || null,
    has_pre_alert: hasPreAlert,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/casillero/recepcion");
  return { success: true };
}

export async function digitizePackage(id: string, formData: FormData) {
  const supabase = await createClient();

  const weight = parseFloat(formData.get("weight") as string) || 0;
  const weightUnit = formData.get("weight_unit") as string;
  const length = parseFloat(formData.get("length") as string) || null;
  const width = parseFloat(formData.get("width") as string) || null;
  const height = parseFloat(formData.get("height") as string) || null;
  const description = formData.get("description") as string;
  const declaredValue =
    parseFloat(formData.get("declared_value") as string) || 0;
  const userId = formData.get("user_id") as string;

  const { error } = await supabase
    .from("packages")
    .update({
      weight,
      weight_unit: weightUnit || "lbs",
      length,
      width,
      height,
      description: description || null,
      declared_value: declaredValue,
      user_id: userId || null,
      is_digitized: true,
      status: "digitized",
    })
    .eq("id", id);

  if (error) return { error: error.message };

  // Log status change
  await supabase.from("package_status_log").insert({
    package_id: id,
    old_status: "received",
    new_status: "digitized",
    notes: "Paquete digitado",
  });

  revalidatePath("/admin/casillero/digitacion");
  return { success: true };
}

export async function createClient_action(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const cedula = formData.get("cedula") as string;
  const accountType = formData.get("account_type") as string;
  const officeId = formData.get("office_id") as string;
  const password = formData.get("password") as string;

  if (!email || !fullName || !password)
    return { error: "Email, nombre y contraseña son obligatorios" };

  // Create auth user
  const { data: authData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    // Fallback: use signUp if admin API not available
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({ email, password });
    if (signUpError) return { error: signUpError.message };
    if (!signUpData.user) return { error: "No se pudo crear el usuario" };

    const code = `UKU#${String(Math.floor(10000 + Math.random() * 90000))}`;

    const { error: profileError } = await supabase.from("users").insert({
      id: signUpData.user.id,
      casillero_code: code,
      full_name: fullName,
      phone: phone || null,
      cedula: cedula || null,
      account_type: accountType || "personal",
      office_id: officeId || null,
    });

    if (profileError) return { error: profileError.message };

    // Create US address
    await supabase.from("us_addresses").insert({
      user_id: signUpData.user.id,
      name: fullName,
      address1: "6758 N.W. 72 AV",
      address2: `Suite ${code}`,
      city: "Miami",
      state: "FL",
      zipcode: "33166-3049",
    });

    revalidatePath("/admin/casillero/clientes");
    return { success: true };
  }

  if (!authData.user) return { error: "No se pudo crear el usuario" };

  const code = `UKU#${String(Math.floor(10000 + Math.random() * 90000))}`;

  const { error: profileError } = await supabase.from("users").insert({
    id: authData.user.id,
    casillero_code: code,
    full_name: fullName,
    phone: phone || null,
    cedula: cedula || null,
    account_type: accountType || "personal",
    office_id: officeId || null,
  });

  if (profileError) return { error: profileError.message };

  await supabase.from("us_addresses").insert({
    user_id: authData.user.id,
    name: fullName,
    address1: "6758 N.W. 72 AV",
    address2: `Suite ${code}`,
    city: "Miami",
    state: "FL",
    zipcode: "33166-3049",
  });

  revalidatePath("/admin/casillero/clientes");
  return { success: true };
}
