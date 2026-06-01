"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";

import { ESTADOS_PEDIDO, type EstadoPedido, type Pedido } from "@/lib/supabase/types";
import { actualizarPedido, borrarPedido, type GestionPedidoData } from "./actions";

export default function PedidoGestion({ pedido }: { pedido: Pedido }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmando, setConfirmando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  // Precio sugerido = precio de lista del producto × cantidad (referencia).
  const sugerido =
    pedido.precio_unitario != null
      ? Math.round(pedido.precio_unitario * pedido.cantidad * 100) / 100
      : null;

  const [form, setForm] = useState<GestionPedidoData>({
    estado: pedido.estado as EstadoPedido,
    precio_cotizado:
      pedido.precio_cotizado != null
        ? String(pedido.precio_cotizado)
        : sugerido != null
          ? String(sugerido)
          : "",
    notas_admin: pedido.notas_admin ?? "",
  });

  const update = <K extends keyof GestionPedidoData>(
    campo: K,
    valor: GestionPedidoData[K],
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setGuardado(false);
  };

  const handleGuardar = () => {
    setError("");
    startTransition(async () => {
      const res = await actualizarPedido(pedido.id, form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setGuardado(true);
      router.refresh();
    });
  };

  const handleBorrar = () => {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    startTransition(async () => {
      await borrarPedido(pedido.id);
      router.refresh();
    });
  };

  const inputClass =
    "w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div className="mt-3 pt-3 border-t border-border grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-3 items-start">
      {error && (
        <p className="sm:col-span-2 text-xs text-danger">{error}</p>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">
          Estado
        </label>
        <select
          value={form.estado}
          onChange={(e) => update("estado", e.target.value as EstadoPedido)}
          className={inputClass}
        >
          {ESTADOS_PEDIDO.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">
          Precio cotizado total (USD)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={form.precio_cotizado}
          onChange={(e) => update("precio_cotizado", e.target.value)}
          placeholder="0.00"
          className={inputClass}
        />
        {sugerido != null && (
          <p className="text-xs text-muted-foreground">
            Precio de lista: ${pedido.precio_unitario} × {pedido.cantidad} ={" "}
            <button
              type="button"
              onClick={() => update("precio_cotizado", String(sugerido))}
              className="font-semibold text-primary hover:underline"
              title="Usar este valor"
            >
              ${sugerido}
            </button>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label className="text-xs font-medium text-muted-foreground">
          Notas para el cliente
        </label>
        <textarea
          value={form.notas_admin}
          onChange={(e) => update("notas_admin", e.target.value)}
          placeholder="Ej: disponible en 10 días, incluye envío..."
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleGuardar}
          disabled={pending}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : guardado ? (
            <Check className="w-4 h-4" />
          ) : null}
          {guardado ? "Guardado" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={handleBorrar}
          disabled={pending}
          title={confirmando ? "Confirmar borrado" : "Borrar pedido"}
          className={`inline-flex items-center gap-2 text-sm font-semibold py-2 px-3 rounded-lg transition-colors disabled:opacity-60 ${
            confirmando
              ? "bg-danger/10 text-danger"
              : "bg-muted hover:bg-border text-muted-foreground"
          }`}
        >
          <Trash2 className="w-4 h-4" />
          {confirmando ? "Confirmar" : "Borrar"}
        </button>
      </div>
    </div>
  );
}
