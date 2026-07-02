"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, LoaderCircle } from "lucide-react";

/** Traduce el error de Helga a un mensaje legible para el usuario. */
function mensajeError(data: {
  error?: string;
  error_description?: string;
  message?: string;
} | null): string {
  switch (data?.error) {
    case "invalid_grant":
      return "Email o contraseña incorrectos.";
    case "invalid_client":
      return "Error de configuración del sistema. Contactá al soporte.";
    case "invalid_request":
      return "Faltan datos para iniciar sesión.";
  }
  // Fallback: usá lo que mande Helga, o un genérico.
  return (
    data?.error_description ||
    data?.message ||
    "No se pudo iniciar sesión. Verificá tus datos."
  );
}

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/cliente/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/cliente");
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => null);
      setError(mensajeError(data));
    } catch {
      setError("No se pudo conectar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">Email</span>
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 focus-within:border-primary">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="email"
            placeholder="tu@email.com"
            className="w-full bg-transparent py-2.5 outline-none"
          />
        </div>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-foreground">Contraseña</span>
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 focus-within:border-primary">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="••••••"
            className="w-full bg-transparent py-2.5 outline-none"
          />
        </div>
      </label>

      {error && (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
      >
        {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {loading ? "Ingresando…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
