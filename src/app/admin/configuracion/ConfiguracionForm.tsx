"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

import type { Configuracion } from "@/lib/supabase/types";
import {
  guardarConfiguracion,
  type ConfiguracionFormData,
} from "./actions";

export default function ConfiguracionForm({
  configuracion,
}: {
  configuracion: Configuracion | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ConfiguracionFormData>({
    banco: configuracion?.banco ?? "",
    titular: configuracion?.titular ?? "",
    numero_cuenta: configuracion?.numero_cuenta ?? "",
    documento: configuracion?.documento ?? "",
    alias: configuracion?.alias ?? "",
    instrucciones: configuracion?.instrucciones ?? "",
  });
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof ConfiguracionFormData>(
    campo: K,
    valor: ConfiguracionFormData[K],
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setGuardado(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const res = await guardarConfiguracion(form);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setGuardado(true);
      router.refresh();
    } finally {
      setGuardando(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  const campos: {
    campo: keyof ConfiguracionFormData;
    label: string;
    placeholder: string;
  }[] = [
    { campo: "banco", label: "Banco / billetera", placeholder: "Ej: Banco Itaú" },
    { campo: "titular", label: "Titular de la cuenta", placeholder: "Nombre y apellido" },
    { campo: "numero_cuenta", label: "Número de cuenta", placeholder: "Ej: 1234567-8" },
    { campo: "documento", label: "CI / RUC del titular", placeholder: "Ej: 1.234.567" },
    { campo: "alias", label: "Alias (opcional)", placeholder: "Ej: ukuxbox.transferencias" },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {campos.map((c) => (
          <div key={c.campo}>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              {c.label}
            </label>
            <input
              type="text"
              value={form[c.campo]}
              onChange={(e) => update(c.campo, e.target.value)}
              placeholder={c.placeholder}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Instrucciones adicionales
        </label>
        <textarea
          value={form.instrucciones}
          onChange={(e) => update("instrucciones", e.target.value)}
          placeholder="Ej: enviá el comprobante con tu nombre como referencia."
          rows={3}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={guardando}
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-60"
      >
        {guardando ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : guardado ? (
          <Check className="w-4 h-4" />
        ) : null}
        {guardando ? "Guardando..." : guardado ? "Guardado" : "Guardar cambios"}
      </button>
    </form>
  );
}
