"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Complete todos los campos");
      return;
    }
    const success = login(email, password);
    if (success) {
      router.push("/dashboard/paquetes");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-muted">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
            <p className="text-white/70 mt-1 text-sm">
              Ingresá a tu casillero virtual
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-accent text-primary py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors text-lg"
            >
              Ingresar
            </button>
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
              <a href="#" className="text-primary hover:underline">
                Registrate
              </a>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Necesitás ayuda?{" "}
          <a href="https://wa.me/595986733000" className="text-primary hover:underline font-medium">
            Contactanos
          </a>
        </p>
      </div>
    </div>
  );
}
