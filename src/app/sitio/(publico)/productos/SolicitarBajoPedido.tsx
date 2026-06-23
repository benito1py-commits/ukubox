"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";

import { crearPedido } from "./actions";

export default function SolicitarBajoPedido({
  productoId,
  precio,
  logueado,
}: {
  productoId: string;
  precio: number | null;
  logueado: boolean;
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");

  const total =
    precio != null ? Math.round(precio * Math.max(cantidad, 1) * 100) / 100 : null;

  if (!logueado) {
    return (
      <Link
        href={`/sitio/acceder?next=${encodeURIComponent("/sitio/productos")}`}
        className="mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        Comprar
      </Link>
    );
  }

  if (listo) {
    return (
      <div className="mt-auto flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 bg-success/10 text-success text-sm font-semibold py-2.5 px-4 rounded-xl">
          <Check className="w-4 h-4" />
          ¡Pedido confirmado!
        </div>
        <Link
          href="/sitio/cuenta"
          className="text-sm font-semibold text-primary hover:underline text-center"
        >
          Pagar por transferencia →
        </Link>
      </div>
    );
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="mt-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        Comprar
      </button>
    );
  }

  const handleEnviar = async () => {
    setError("");
    setEnviando(true);
    try {
      const res = await crearPedido({
        producto_id: productoId,
        cantidad,
        comentario,
        direccion,
        telefono,
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setListo(true);
      router.refresh();
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div className="mt-auto space-y-2 pt-2 border-t border-border">
      {error && <p className="text-xs text-danger">{error}</p>}
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-muted-foreground">
          Cantidad
        </label>
        <input
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-20 px-2 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
      <input
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        placeholder="Dirección de entrega"
        className={inputClass}
      />
      <input
        type="tel"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono de contacto"
        className={inputClass}
      />
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Detalles (color, talle, link de referencia...)"
        rows={2}
        className={inputClass}
      />
      {total != null && (
        <div className="flex items-center justify-between text-sm pt-1">
          <span className="text-muted-foreground">Total</span>
          <span className="font-bold text-foreground">${total}</span>
        </div>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleEnviar}
          disabled={enviando}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {enviando ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ShoppingBag className="w-4 h-4" />
          )}
          {enviando ? "Confirmando..." : "Confirmar pedido"}
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          disabled={enviando}
          className="bg-muted hover:bg-border text-foreground text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
