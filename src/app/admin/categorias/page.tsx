import { Tags } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import CategoriasAdmin from "./CategoriasAdmin";

export const metadata = {
  title: "Categorías - UKUXBOX",
};

export default async function AdminCategoriasPage() {
  const supabase = await createClient();

  const [{ data: categorias }, { data: productos }] = await Promise.all([
    supabase.from("categorias").select("*").order("nombre"),
    supabase.from("productos").select("categoria_id"),
  ]);

  const conteoPorCategoria = new Map<string, number>();
  for (const p of productos ?? []) {
    if (p.categoria_id) {
      conteoPorCategoria.set(
        p.categoria_id,
        (conteoPorCategoria.get(p.categoria_id) ?? 0) + 1,
      );
    }
  }

  const categoriasConConteo = (categorias ?? []).map((c) => ({
    ...c,
    conteo: conteoPorCategoria.get(c.id) ?? 0,
  }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Tags className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-black text-foreground">Categorías</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 max-w-xl">
        Organizá tus productos en categorías. Aparecen como filtros en el
        catálogo público y se asignan al crear o editar un producto.
      </p>

      <CategoriasAdmin categorias={categoriasConConteo} />
    </div>
  );
}
