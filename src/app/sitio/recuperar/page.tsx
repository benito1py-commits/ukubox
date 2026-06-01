"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function RecuperarPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/sitio/restablecer` },
      );
      if (resetError) {
        setError("No se pudo enviar el correo. Revisá la dirección.");
        return;
      }
      setEnviado(true);
    } catch {
      setError("Error de conexión. Intentá más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
            <Mail className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Revisá tu correo
          </h1>
          <p className="text-muted-foreground mb-6">
            Si <strong>{email}</strong> tiene una cuenta, te enviamos un enlace
            para restablecer tu contraseña.
          </p>
          <Link
            href="/sitio/acceder"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Volver a Acceder
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Recuperar contraseña
            </h1>
            <p className="text-muted-foreground mt-2">
              Te enviamos un enlace para crear una nueva contraseña.
            </p>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/sitio/acceder"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Acceder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
