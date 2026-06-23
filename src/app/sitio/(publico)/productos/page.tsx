import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Producto } from "@/lib/supabase/types";
import SolicitarBajoPedido from "./SolicitarBajoPedido";

export const metadata: Metadata = {
  title: "Productos - UKUXBOX",
  description:
    "Explorá los productos que podés importar con UKUXBOX desde Estados Unidos y el mundo.",
};

function ProductoCard({
  producto,
  logueado,
}: {
  producto: Producto;
  logueado: boolean;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <Link href={`/sitio/productos/${producto.id}`} className="flex flex-col">
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
          {producto.bajo_pedido && (
            <span className="absolute top-2 left-2 text-xs font-semibold bg-accent text-primary px-2.5 py-1 rounded-full shadow-sm">
              Bajo pedido
            </span>
          )}
        </div>
        <div className="px-4 pt-4">
          {producto.categoria && (
            <span className="text-xs font-medium text-primary mb-1 block">
              {producto.categoria}
            </span>
          )}
          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {producto.nombre}
          </h3>
          {producto.descripcion && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {producto.descripcion}
            </p>
          )}
          {producto.precio != null && (
            <span className="text-lg font-black text-foreground">
              ${producto.precio}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 mt-auto">
        {producto.bajo_pedido ? (
          <SolicitarBajoPedido
            productoId={producto.id}
            precio={producto.precio}
            logueado={logueado}
          />
        ) : (
          <Link
            href={`/sitio/productos/${producto.id}`}
            className="inline-flex items-center justify-center w-full bg-muted hover:bg-border text-foreground text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
          >
            Ver detalle
          </Link>
        )}
      </div>
    </div>
  );
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false });

  if (cat) query = query.eq("categoria_id", cat);

  const [{ data: productos }, { data: categorias }] = await Promise.all([
    query,
    supabase.from("categorias").select("*").order("nombre"),
  ]);

  // Página pública: sólo necesitamos saber si hay sesión para mostrar el botón
  // de pedido. getUser() puede fallar (sin sesión / token vencido sin refrescar);
  // si falla, tratamos al visitante como no logueado en vez de romper el render.
  let logueado = false;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    logueado = Boolean(user);
  } catch {
    logueado = false;
  }

  const hayProductos = productos && productos.length > 0;
  const hayCategorias = categorias && categorias.length > 0;

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
        {hayCategorias && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/sitio/productos"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !cat
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              Todos
            </Link>
            {categorias.map((c) => (
              <Link
                key={c.id}
                href={`/sitio/productos?cat=${c.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === c.id
                    ? "bg-primary text-white"
                    : "bg-white border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c.nombre}
              </Link>
            ))}
          </div>
        )}

        {hayProductos ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productos.map((p) => (
              <ProductoCard key={p.id} producto={p} logueado={logueado} />
            ))}
          </div>
        ) : cat ? (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              No hay productos en esta categoría
            </h2>
            <Link
              href="/sitio/productos"
              className="text-primary font-semibold hover:underline"
            >
              Ver todos los productos
            </Link>
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
