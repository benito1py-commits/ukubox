import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Producto } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Productos - UKUXBOX",
  description:
    "Explorá los productos que podés importar con UKUXBOX desde Estados Unidos y el mundo.",
};

function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative aspect-square bg-muted flex items-center justify-center">
        {producto.imagen_url ? (
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <Package className="w-10 h-10 text-muted-foreground" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {producto.categoria && (
          <span className="text-xs font-medium text-primary mb-1">
            {producto.categoria}
          </span>
        )}
        <h3 className="font-bold text-foreground mb-1">{producto.nombre}</h3>
        {producto.descripcion && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {producto.descripcion}
          </p>
        )}
        {producto.precio != null && (
          <span className="mt-auto text-lg font-black text-foreground">
            ${producto.precio}
          </span>
        )}
      </div>
    </div>
  );
}

export default async function ProductosPage() {
  const supabase = await createClient();
  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false });

  const hayProductos = productos && productos.length > 0;

  return (
    <div className="bg-gray-50/50">
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">
              Catálogo de productos
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Importá lo que
              <span className="text-accent"> necesites</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              Desde Estados Unidos y el mundo directo a tu puerta en Paraguay.
              Explorá nuestros productos.
            </p>
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {hayProductos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              Pronto cargaremos nuestro catálogo
            </h2>
            <p className="text-muted-foreground">
              Mientras tanto, podemos importar casi cualquier producto.
              Contactanos y te cotizamos.
            </p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-accent text-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-primary/70 mb-8">
            Podemos importar casi cualquier producto. Contactanos y te cotizamos
            sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://ukuxbox.helgasys.com/clients"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors"
            >
              Crear mi cuenta
            </a>
            <Link
              href="/sitio/servicios"
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-white/80 transition-colors border-2 border-primary"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
