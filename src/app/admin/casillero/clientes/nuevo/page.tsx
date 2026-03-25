"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient_action } from "@/lib/actions/admin";

export default function NuevoClientePage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const result = await createClient_action(formData);
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/admin/casillero/clientes");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="font-bold text-lg mb-6">CREAR CLIENTE</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo *</label>
              <input type="text" name="full_name" required className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" name="email" required className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña *</label>
              <input type="password" name="password" required minLength={6} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono</label>
              <input type="tel" name="phone" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cédula</label>
              <input type="text" name="cedula" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Cuenta</label>
              <select name="account_type" defaultValue="personal" className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                <option value="personal">Personal</option>
                <option value="business">Empresa</option>
              </select>
            </div>
          </div>
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm disabled:opacity-50">
              {loading ? "Creando..." : "Crear Cliente"}
            </button>
            <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg font-medium border border-border hover:bg-gray-50 transition-colors text-sm">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
