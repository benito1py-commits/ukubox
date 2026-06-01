import Image from "next/image";
import Link from "next/link";
import { Package, Plus } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import ProductoAcciones from "./ProductoAcciones";

export default async function AdminProductosPage() {
  const supabase = await createClient();

  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-foreground">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo producto
        </Link>
      </div>

      {!productos || productos.length === 0 ? (
        <div className="bg-white border border-border rounded-2xl p-12 text-center">
          <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Todavía no hay productos cargados.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="font-medium px-4 py-3">Producto</th>
                <th className="font-medium px-4 py-3">Categoría</th>
                <th className="font-medium px-4 py-3">Precio</th>
                <th className="font-medium px-4 py-3">Estado</th>
                <th className="font-medium px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-10 h-10 rounded-lg bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                        {p.imagen_url ? (
                          <Image
                            src={p.imagen_url}
                            alt={p.nombre}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <Package className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {p.nombre}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {p.categoria || "—"}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {p.precio != null ? `$${p.precio}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          p.activo
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                      {p.bajo_pedido && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/20 text-accent-hover">
                          Bajo pedido
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <ProductoAcciones id={p.id} activo={p.activo} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
