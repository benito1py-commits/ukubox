import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import ProductoForm from "../ProductoForm";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: producto } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (!producto) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a productos
      </Link>
      <h1 className="text-2xl font-black text-foreground mb-6">
        Editar producto
      </h1>
      <ProductoForm producto={producto} />
    </div>
  );
}
