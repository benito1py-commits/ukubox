"use client";

import { useState } from "react";
import { mockOficinas, mockUser } from "@/lib/mock-data";

export function ChangeOffice() {
  const [selectedOffice, setSelectedOffice] = useState(mockUser.oficina);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setMessage("Ingrese la razón del cambio");
      return;
    }
    setMessage("Solicitud enviada correctamente");
    setReason("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="border border-border rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Cambiar Oficina</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1.5">Seleccione Nueva Oficina</label>
          <select
            value={selectedOffice}
            onChange={(e) => setSelectedOffice(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
          >
            {mockOficinas.map((oficina) => (
              <option key={oficina.id} value={oficina.nombre}>
                {oficina.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1.5">Razón del cambio</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Razón del cambio"
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes("correctamente") ? "text-green-600" : "text-primary"}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          Solicitar Cambio
        </button>
      </form>
    </div>
  );
}
