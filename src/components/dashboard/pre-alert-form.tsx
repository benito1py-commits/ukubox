"use client";

import { useState } from "react";
import { mockPreAlertas } from "@/lib/mock-data";
import { PreAlerta } from "@/lib/types";

export function PreAlertForm() {
  const [alertas, setAlertas] = useState<PreAlerta[]>(mockPreAlertas);
  const [tracking, setTracking] = useState("");
  const [tienda, setTienda] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [valor, setValor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tracking || !tienda || !descripcion || !valor) {
      setMessage("Complete todos los campos");
      return;
    }
    const newAlerta: PreAlerta = {
      id: `PA${Date.now()}`,
      tracking,
      tienda,
      descripcion,
      valor: parseFloat(valor),
      fecha: new Date().toISOString().split("T")[0],
    };
    setAlertas([newAlerta, ...alertas]);
    setTracking("");
    setTienda("");
    setDescripcion("");
    setValor("");
    setMessage("Pre-Alerta registrada correctamente");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Nueva Pre-Alerta</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1.5">Número de Tracking</label>
            <input
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="1Z999AA10123456784"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Tienda</label>
            <input
              type="text"
              value={tienda}
              onChange={(e) => setTienda(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Amazon, eBay, etc."
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Descripción del producto"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Valor declarado (USD)</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="0.00"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
            >
              Registrar Pre-Alerta
            </button>
            {message && (
              <p className={`text-sm ${message.includes("correctamente") ? "text-green-600" : "text-danger"}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Mis Pre-Alertas</h3>
        {alertas.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">No hay pre-alertas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tienda</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descripción</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {alertas.map((alerta) => (
                  <tr key={alerta.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-mono text-xs">{alerta.tracking}</td>
                    <td className="py-3 px-4">{alerta.tienda}</td>
                    <td className="py-3 px-4">{alerta.descripcion}</td>
                    <td className="py-3 px-4">${alerta.valor.toFixed(2)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{alerta.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
