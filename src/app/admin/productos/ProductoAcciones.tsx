"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";

import { toggleActivo, borrarProducto } from "./actions";

export default function ProductoAcciones({
  id,
  activo,
}: {
  id: string;
  activo: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmando, setConfirmando] = useState(false);

  const handleToggle = () => {
    startTransition(async () => {
      await toggleActivo(id, !activo);
      router.refresh();
    });
  };

  const handleBorrar = () => {
    if (!confirmando) {
      setConfirmando(true);
      return;
    }
    startTransition(async () => {
      await borrarProducto(id);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={handleToggle}
        disabled={pending}
        title={activo ? "Desactivar" : "Activar"}
        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        {activo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
      <button
        type="button"
        onClick={handleBorrar}
        disabled={pending}
        title={confirmando ? "Confirmar borrado" : "Borrar"}
        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
          confirmando
            ? "bg-danger/10 text-danger"
            : "hover:bg-muted text-muted-foreground hover:text-danger"
        }`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
