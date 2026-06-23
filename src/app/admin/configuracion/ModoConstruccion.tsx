"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cambiarModoConstruccion } from "./actions";

export default function ModoConstruccion({
  enConstruccion,
}: {
  enConstruccion: boolean;
}) {
  const router = useRouter();
  const [activo, setActivo] = useState(enConstruccion);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const toggle = () => {
    const nuevo = !activo;
    setError("");
    setActivo(nuevo); // optimista
    startTransition(async () => {
      const res = await cambiarModoConstruccion(nuevo);
      if (!res.ok) {
        setActivo(!nuevo); // revertir
        setError(res.error);
        return;
      }
      router.refresh();
    });
  };

  const visible = !activo;

  return (
    <div className="max-w-2xl rounded-2xl border border-border bg-white p-5 mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${
              visible ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            }`}
          >
            {visible ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="font-bold text-foreground">
              {visible ? "Sitio publicado" : "Sitio en construcción"}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {visible
                ? "El sitio es visible para todos los visitantes."
                : "Los visitantes ven la pantalla de construcción. Vos (admin) podés previsualizarlo."}
            </p>
            {error && <p className="text-xs text-danger mt-1">{error}</p>}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={visible}
          aria-label="Publicar sitio"
          onClick={toggle}
          disabled={pending}
          className={`relative shrink-0 inline-flex h-7 w-12 items-center rounded-full transition-colors disabled:opacity-60 ${
            visible ? "bg-success" : "bg-muted-foreground/40"
          }`}
        >
          <span
            className={`inline-flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              visible ? "translate-x-6" : "translate-x-1"
            }`}
          >
            {pending && (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
