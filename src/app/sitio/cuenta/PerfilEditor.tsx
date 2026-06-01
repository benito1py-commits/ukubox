"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Eye, EyeOff, KeyRound, Loader2, Pencil, X } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { actualizarPerfil } from "./actions";

type Panel = null | "nombre" | "password";

export default function PerfilEditor({
  nombreInicial,
}: {
  nombreInicial: string;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);

  const inputClass =
    "w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

  // --- Editar nombre ---
  const [nombre, setNombre] = useState(nombreInicial);
  const [guardandoNombre, setGuardandoNombre] = useState(false);
  const [errorNombre, setErrorNombre] = useState("");

  const guardarNombre = async () => {
    setErrorNombre("");
    setGuardandoNombre(true);
    try {
      const res = await actualizarPerfil(nombre);
      if (!res.ok) {
        setErrorNombre(res.error);
        return;
      }
      setPanel(null);
      router.refresh();
    } finally {
      setGuardandoNombre(false);
    }
  };

  // --- Cambiar contraseña ---
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [guardandoPass, setGuardandoPass] = useState(false);
  const [errorPass, setErrorPass] = useState("");
  const [passOk, setPassOk] = useState(false);

  const guardarPassword = async () => {
    setErrorPass("");
    if (password.length < 6) {
      setErrorPass("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setGuardandoPass(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErrorPass("No se pudo actualizar la contraseña.");
        return;
      }
      setPassOk(true);
      setPassword("");
      setTimeout(() => {
        setPassOk(false);
        setPanel(null);
      }, 1500);
    } finally {
      setGuardandoPass(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Editar nombre */}
      {panel === "nombre" ? (
        <div className="rounded-xl border border-border p-3">
          {errorNombre && (
            <p className="text-xs text-danger mb-2">{errorNombre}</p>
          )}
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={guardarNombre}
              disabled={guardandoNombre}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-60"
            >
              {guardandoNombre ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setPanel(null);
                setNombre(nombreInicial);
                setErrorNombre("");
              }}
              className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPanel("nombre")}
          className="w-full flex items-center gap-3 bg-muted hover:bg-border text-foreground font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
        >
          <Pencil className="w-4 h-4" />
          Editar perfil
        </button>
      )}

      {/* Cambiar contraseña */}
      {panel === "password" ? (
        <div className="rounded-xl border border-border p-3">
          {errorPass && <p className="text-xs text-danger mb-2">{errorPass}</p>}
          {passOk ? (
            <p className="text-sm text-success font-medium py-1 text-center">
              ¡Contraseña actualizada!
            </p>
          ) : (
            <>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className={`${inputClass} pr-10`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={guardarPassword}
                  disabled={guardandoPass}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 rounded-lg transition-colors disabled:opacity-60"
                >
                  {guardandoPass ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPanel(null);
                    setPassword("");
                    setErrorPass("");
                  }}
                  className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPanel("password")}
          className="w-full flex items-center gap-3 bg-muted hover:bg-border text-foreground font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
        >
          <KeyRound className="w-4 h-4" />
          Cambiar contraseña
        </button>
      )}
    </div>
  );
}
