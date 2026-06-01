"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function RestablecerPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);
  const [sesionValida, setSesionValida] = useState<boolean | null>(null);

  // El enlace del correo crea una sesión de recuperación (detectSessionInUrl).
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setSesionValida(Boolean(data.session));
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSesionValida(true);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) {
        setError("No se pudo actualizar la contraseña. El enlace pudo expirar.");
        return;
      }
      setListo(true);
      setTimeout(() => {
        router.push("/sitio/cuenta");
        router.refresh();
      }, 1500);
    } catch {
      setError("Error de conexión. Intentá más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Nueva contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Elegí una contraseña nueva para tu cuenta.
            </p>
          </div>

          {listo ? (
            <div className="bg-success/10 border border-success/20 text-success rounded-xl px-4 py-3 text-sm text-center">
              ¡Contraseña actualizada! Redirigiéndote a tu cuenta…
            </div>
          ) : sesionValida === false ? (
            <div className="text-center">
              <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
                El enlace es inválido o expiró. Pedí uno nuevo.
              </div>
              <Link
                href="/sitio/recuperar"
                className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Pedir nuevo enlace
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full pl-11 pr-12 py-3 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Guardando..." : "Guardar contraseña"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
