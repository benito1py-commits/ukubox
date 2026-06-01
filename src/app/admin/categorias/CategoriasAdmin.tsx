"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";

import type { Categoria } from "@/lib/supabase/types";
import {
  crearCategoria,
  renombrarCategoria,
  borrarCategoria,
} from "./actions";

type CategoriaConConteo = Categoria & { conteo: number };

export default function CategoriasAdmin({
  categorias,
}: {
  categorias: CategoriaConConteo[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [nuevo, setNuevo] = useState("");
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [editValor, setEditValor] = useState("");
  const [confirmarId, setConfirmarId] = useState<string | null>(null);

  const inputClass =
    "px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await crearCategoria(nuevo);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setNuevo("");
      router.refresh();
    });
  };

  const handleRenombrar = (id: string) => {
    setError("");
    startTransition(async () => {
      const res = await renombrarCategoria(id, editValor);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setEditandoId(null);
      router.refresh();
    });
  };

  const handleBorrar = (id: string) => {
    if (confirmarId !== id) {
      setConfirmarId(id);
      return;
    }
    startTransition(async () => {
      await borrarCategoria(id);
      setConfirmarId(null);
      router.refresh();
    });
  };

  return (
    <div className="max-w-xl">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleCrear} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nueva categoría (ej: Electrónica)"
          className={`flex-1 ${inputClass}`}
        />
        <button
          type="submit"
          disabled={pending || !nuevo.trim()}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-60"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </form>

      {categorias.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Todavía no hay categorías. Agregá la primera arriba.
        </p>
      ) : (
        <ul className="bg-white border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {categorias.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-3 px-4 py-3"
            >
              {editandoId === c.id ? (
                <>
                  <input
                    type="text"
                    value={editValor}
                    onChange={(e) => setEditValor(e.target.value)}
                    className={`flex-1 ${inputClass}`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleRenombrar(c.id)}
                    disabled={pending}
                    className="p-2 rounded-lg text-success hover:bg-success/10 transition-colors"
                    title="Guardar"
                  >
                    {pending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditandoId(null)}
                    className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                    title="Cancelar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-medium text-foreground">
                    {c.nombre}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.conteo} {c.conteo === 1 ? "producto" : "productos"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditandoId(c.id);
                      setEditValor(c.nombre);
                      setConfirmarId(null);
                    }}
                    className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    title="Renombrar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBorrar(c.id)}
                    disabled={pending}
                    className={`p-2 rounded-lg transition-colors ${
                      confirmarId === c.id
                        ? "bg-danger/10 text-danger"
                        : "text-muted-foreground hover:bg-muted hover:text-danger"
                    }`}
                    title={confirmarId === c.id ? "Confirmar borrado" : "Borrar"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
