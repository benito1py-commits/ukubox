"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import type { Categoria, Producto } from "@/lib/supabase/types";
import {
  crearProducto,
  actualizarProducto,
  type ProductoFormData,
} from "./actions";

export default function ProductoForm({
  producto,
  categorias,
}: {
  producto?: Producto;
  categorias: Categoria[];
}) {
  const router = useRouter();
  const esEdicion = Boolean(producto);

  const [form, setForm] = useState<ProductoFormData>({
    nombre: producto?.nombre ?? "",
    descripcion: producto?.descripcion ?? "",
    precio: producto?.precio != null ? String(producto.precio) : "",
    categoria_id: producto?.categoria_id ?? "",
    imagen_url: producto?.imagen_url ?? "",
    activo: producto?.activo ?? true,
    bajo_pedido: producto?.bajo_pedido ?? false,
  });
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof ProductoFormData>(
    campo: K,
    valor: ProductoFormData[K],
  ) => setForm((f) => ({ ...f, [campo]: valor }));

  const handleArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setSubiendo(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upError } = await supabase.storage
        .from("productos")
        .upload(path, file, { upsert: false });

      if (upError) {
        setError("No se pudo subir la imagen: " + upError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("productos").getPublicUrl(path);

      update("imagen_url", publicUrl);
    } catch {
      setError("Error al subir la imagen.");
    } finally {
      setSubiendo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    try {
      const res = esEdicion
        ? await actualizarProducto(producto!.id, form)
        : await crearProducto(form);

      if (!res.ok) {
        setError(res.error);
        return;
      }

      router.push("/admin/productos");
      router.refresh();
    } finally {
      setGuardando(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Nombre *
        </label>
        <input
          type="text"
          required
          value={form.nombre}
          onChange={(e) => update("nombre", e.target.value)}
          placeholder="Nombre del producto"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Descripción
        </label>
        <textarea
          value={form.descripcion}
          onChange={(e) => update("descripcion", e.target.value)}
          placeholder="Descripción del producto"
          rows={4}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Precio (USD)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.precio}
            onChange={(e) => update("precio", e.target.value)}
            placeholder="0.00"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Categoría
          </label>
          <select
            value={form.categoria_id}
            onChange={(e) => update("categoria_id", e.target.value)}
            className={inputClass}
          >
            <option value="">Sin categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {categorias.length === 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              No hay categorías.{" "}
              <a href="/admin/categorias" className="text-primary hover:underline">
                Crear una
              </a>
              .
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Imagen
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24 rounded-xl border border-border bg-muted overflow-hidden shrink-0 flex items-center justify-center">
            {form.imagen_url ? (
              <Image
                src={form.imagen_url}
                alt="Vista previa"
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <ImagePlus className="w-7 h-7 text-muted-foreground" />
            )}
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 bg-muted hover:bg-border text-foreground font-medium py-2.5 px-4 rounded-xl transition-colors">
            {subiendo ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImagePlus className="w-4 h-4" />
            )}
            {subiendo ? "Subiendo..." : "Subir imagen"}
            <input
              type="file"
              accept="image/*"
              onChange={handleArchivo}
              disabled={subiendo}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.activo}
          onChange={(e) => update("activo", e.target.checked)}
          className="w-4 h-4 accent-primary"
        />
        <span className="text-sm font-medium text-foreground">
          Producto activo (visible en el catálogo público)
        </span>
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={form.bajo_pedido}
          onChange={(e) => update("bajo_pedido", e.target.checked)}
          className="w-4 h-4 accent-primary mt-0.5"
        />
        <span className="text-sm font-medium text-foreground">
          Bajo pedido
          <span className="block text-xs font-normal text-muted-foreground">
            Los usuarios pueden solicitarlo desde el catálogo. Se muestra el
            botón &quot;Solicitar bajo pedido&quot; en lugar de la compra directa.
          </span>
        </span>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={guardando || subiendo}
          className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {guardando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/productos")}
          className="bg-muted hover:bg-border text-foreground font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
