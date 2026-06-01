"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopiarTexto({
  valor,
  etiqueta,
}: {
  valor: string;
  etiqueta?: string;
}) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
      // Sin acceso al portapapeles: no hacemos nada.
    }
  };

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar ${etiqueta ?? valor}`}
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
    >
      {copiado ? (
        <>
          <Check className="w-3.5 h-3.5" /> Copiado
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" /> Copiar
        </>
      )}
    </button>
  );
}
