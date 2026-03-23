"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/layout/logo";

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
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-muted-foreground mt-2">
            Ingresá a tu casillero virtual
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-border rounded-xl p-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
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
              className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-primary">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
          >
            Ingresar
          </button>
          <p className="text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <a href="#" className="text-primary hover:underline">
              Registrate aquí
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
