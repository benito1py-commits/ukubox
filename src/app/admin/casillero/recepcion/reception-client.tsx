"use client";

import { useState } from "react";
import { createPackage } from "@/lib/actions/admin";
import { Plus } from "lucide-react";

interface Props {
  result: {
    packages: Record<string, unknown>[];
    total: number;
    page: number;
    perPage: number;
  };
}

export function ReceptionClient({ result }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createPackage(formData);
    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Paquete creado correctamente");
      setShowModal(false);
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          {message && (
            <p
              className={`text-sm ${
                message.includes("error") ? "text-danger" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm"
        >
          <Plus size={18} />
          Crear
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="font-bold text-lg mb-4">Nuevo Paquete</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Tracking *</label>
                <input
                  type="text"
                  name="tracking"
                  required
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">HAWB</label>
                <input
                  type="text"
                  name="hawb"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">MAWB</label>
                <input
                  type="text"
                  name="mawb"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm disabled:opacity-50"
                >
                  {loading ? "Creando..." : "Crear Paquete"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-lg font-medium border border-border hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Mostrando {result.packages.length} de {result.total} registros
          </p>
        </div>
        {result.packages.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">
            No hay paquetes registrados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha y hora</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">HAWB</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Pre Alerta</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Digitada</th>
                </tr>
              </thead>
              <tbody>
                {result.packages.map((pkg, i) => (
                  <tr
                    key={pkg.id as string}
                    className="border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 text-muted-foreground">
                      {(result.page - 1) * result.perPage + i + 1}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{pkg.tracking as string}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {new Date(pkg.created_at as string).toLocaleString("es-PY")}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{(pkg.hawb as string) || "-"}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          pkg.has_pre_alert ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          pkg.is_digitized ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
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
