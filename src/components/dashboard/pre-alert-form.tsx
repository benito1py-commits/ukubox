"use client";

import { useState } from "react";
import { createPreAlert } from "@/lib/actions/pre-alerts";

interface PreAlertaDisplay {
  id: string;
  tracking: string;
  tienda: string;
  descripcion: string;
  valor: number;
  fecha: string;
  estado: string;
}

interface Store {
  id: string;
  name: string;
}

export function PreAlertForm({
  initialAlertas,
  stores,
}: {
  initialAlertas: PreAlertaDisplay[];
  stores: Store[];
}) {
  const [alertas, setAlertas] = useState(initialAlertas);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage("");

    const formData = new FormData(form);
    const storeId = formData.get("store_id") as string;
    const store = stores.find((s) => s.id === storeId);
    if (store) {
      formData.set("store_name", store.name);
    }

    const result = await createPreAlert(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Pre-Alerta registrada correctamente");
      form.reset();
      // Add to local state optimistically
      const newAlerta: PreAlertaDisplay = {
        id: `temp-${Date.now()}`,
        tracking: formData.get("tracking") as string,
        tienda: store?.name || "Desconocida",
        descripcion: formData.get("description") as string,
        valor: parseFloat(formData.get("declared_value") as string) || 0,
        fecha: new Date().toLocaleDateString("es-PY"),
        estado: "active",
      };
      setAlertas([newAlerta, ...alertas]);
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
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
              name="tracking"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="1Z999AA10123456784"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Tienda</label>
            <select
              name="store_id"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Seleccionar tienda...</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1.5">Descripción</label>
            <input
              type="text"
              name="description"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Descripción del producto"
            />
          </div>
          <div>
            <label className="block text-sm mb-1.5">Valor declarado (USD)</label>
            <input
              type="number"
              name="declared_value"
              step="0.01"
              className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="0.00"
            />
          </div>
          <div className="md:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrar Pre-Alerta"}
            </button>
            {message && (
              <p
                className={`text-sm ${
                  message.includes("correctamente")
                    ? "text-green-600"
                    : "text-danger"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="border border-border rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Mis Pre-Alertas</h3>
        {alertas.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No hay pre-alertas registradas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Tracking
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Tienda
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Descripción
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Valor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {alertas.map((alerta) => (
                  <tr
                    key={alerta.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 px-4 font-mono text-xs">
                      {alerta.tracking}
                    </td>
                    <td className="py-3 px-4">{alerta.tienda}</td>
                    <td className="py-3 px-4">{alerta.descripcion}</td>
                    <td className="py-3 px-4">${alerta.valor.toFixed(2)}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {alerta.fecha}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          alerta.estado === "active"
                            ? "bg-blue-50 text-blue-700"
                            : alerta.estado === "matched"
                            ? "bg-green-50 text-green-700"
                            : alerta.estado === "cancelled"
                            ? "bg-gray-100 text-gray-500"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {alerta.estado === "active"
                          ? "Activa"
                          : alerta.estado === "matched"
                          ? "Vinculada"
                          : alerta.estado === "cancelled"
                          ? "Cancelada"
                          : "Retenida"}
                      </span>
                    </td>
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
