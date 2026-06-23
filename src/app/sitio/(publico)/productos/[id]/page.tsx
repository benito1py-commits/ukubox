import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import SolicitarBajoPedido from "../SolicitarBajoPedido";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: producto } = await supabase
    .from("productos")
    .select("nombre")
    .eq("id", id)
    .eq("activo", true)
    .single();

  return {
    title: producto ? `${producto.nombre} - UKUXBOX` : "Producto - UKUXBOX",
  };
}

export default async function ProductoDetallePage({ params }: Params) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: producto } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .eq("activo", true)
    .single();

  if (!producto) notFound();

  // Página pública: getUser() puede fallar sin sesión; tratamos como deslogueado.
  let logueado = false;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    logueado = Boolean(user);
  } catch {
    logueado = false;
  }

  return (
    <div className="bg-gray-50/50 min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <Link
          href="/sitio/productos"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-border rounded-2xl overflow-hidden">
          {/* Imagen */}
          <div className="relative aspect-square bg-muted flex items-center justify-center">
            {producto.imagen_url ? (
              <Image
                src={producto.imagen_url}
                alt={producto.nombre}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <Package className="w-16 h-16 text-muted-foreground" />
            )}
            {producto.bajo_pedido && (
              <span className="absolute top-3 left-3 text-xs font-semibold bg-accent text-primary px-3 py-1 rounded-full shadow-sm">
                Bajo pedido
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            {producto.categoria && (
              <span className="text-sm font-medium text-primary mb-2">
                {producto.categoria}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-black text-foreground mb-3">
              {producto.nombre}
            </h1>

            {producto.precio != null && (
              <span className="text-3xl font-black text-foreground mb-4">
                ${producto.precio}
              </span>
            )}

            {producto.descripcion && (
              <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                {producto.descripcion}
              </p>
            )}

            <div className="mt-auto">
              {producto.bajo_pedido ? (
                <div className="flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">
                    Este producto es <strong>bajo pedido</strong>: lo pedís,
                    indicás dónde recibirlo y lo pagás por transferencia.
                  </p>
                  <SolicitarBajoPedido
                    productoId={producto.id}
                    precio={producto.precio}
                    logueado={logueado}
                  />
                </div>
              ) : (
                <a
                  href="https://wa.me/595982278071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Consultar por este producto
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
