"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { informarPago } from "./actions";

export default function InformarPago({
  pedidoId,
  usuarioId,
}: {
  pedidoId: string;
  usuarioId: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  const handleArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setProcesando(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      // Carpeta = uid del usuario (requerido por las policies de Storage)
      const path = `${usuarioId}/${pedidoId}-${crypto.randomUUID()}.${ext}`;

      const { error: upError } = await supabase.storage
        .from("comprobantes")
        .upload(path, file, { upsert: false });

      if (upError) {
        setError("No se pudo subir el comprobante: " + upError.message);
        return;
      }

      const res = await informarPago(pedidoId, path);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    } catch {
      setError("Ocurrió un error al subir el comprobante.");
    } finally {
      setProcesando(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-3">
      {error && <p className="text-xs text-danger mb-2">{error}</p>}
      <label className="cursor-pointer inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors">
        {procesando ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Upload className="w-4 h-4" />
        )}
        {procesando ? "Subiendo..." : "Subir comprobante"}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleArchivo}
          disabled={procesando}
          className="hidden"
        />
      </label>
    </div>
  );
}
