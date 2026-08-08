"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Check, Loader2, Trash2 } from "lucide-react";

import {
  ESTADOS_SOLICITUD,
  type EstadoSolicitud,
  type SolicitudRepuesto,
} from "@/lib/supabase/types";
import {
  actualizarSolicitud,
  borrarSolicitud,
  type GestionSolicitudData,
} from "../actions";

export default function SolicitudGestion({
  solicitud,
}: {
  solicitud: SolicitudRepuesto;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmando, setConfirmando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<GestionSolicitudData>({
    estado: solicitud.estado as EstadoSolicitud,
    notas_admin: solicitud.notas_admin ?? "",
  });

  const update = <K extends keyof GestionSolicitudData>(
    campo: K,
    valor: GestionSolicitudData[K],
  ) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setGuardado(false);
  };

  const handleGuardar = () => {
    setError("");
    startTransition(async () => {
      const res = await actualizarSolicitud(solicitud.id, form);
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
      const res = await borrarSolicitud(solicitud.id);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push("/admin/solicitudes-repuesto");
      router.refresh();
    });
  };

  const inputClass =
    "w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  return (
    <div className="bg-white border border-border rounded-2xl p-5 sm:p-6">
      <h2 className="text-sm font-bold uppercase tracking-widest text-foreground mb-4">
        Gestión interna
      </h2>

      {error && <p className="text-xs text-danger mb-3">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 items-start">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">
            Estado
          </label>
          <select
            value={form.estado}
            onChange={(e) => update("estado", e.target.value as EstadoSolicitud)}
            className={inputClass}
          >
            {ESTADOS_SOLICITUD.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">
            Notas internas
          </label>
          <textarea
            value={form.notas_admin}
            onChange={(e) => update("notas_admin", e.target.value)}
            placeholder="Ej: consultado al proveedor el 12/08, entrega estimada 15 días..."
            rows={3}
            className={inputClass}
          />
          <p className="text-xs text-muted-foreground">
            Sólo las ve el equipo. El cliente no tiene acceso a esta solicitud.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
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
          title={confirmando ? "Confirmar borrado" : "Borrar solicitud"}
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
