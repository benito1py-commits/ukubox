"use client";

import { useState } from "react";
import { digitizePackage } from "@/lib/actions/admin";
import { FileText } from "lucide-react";

interface Props {
  result: {
    packages: Record<string, unknown>[];
    total: number;
    page: number;
    perPage: number;
  };
}

export function DigitizationClient({ result }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDigitize = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await digitizePackage(editingId, formData);
    if (res.error) {
      setMessage(res.error);
    } else {
      setMessage("Paquete digitado correctamente");
      setEditingId(null);
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {message && (
        <p
          className={`text-sm ${
            message.includes("error") ? "text-danger" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Digitization form */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h3 className="font-bold text-lg mb-4">Digitar Paquete</h3>
            <form onSubmit={handleDigitize} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Peso *</label>
                  <input
                    type="number"
                    name="weight"
                    step="0.01"
                    required
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Unidad</label>
                  <select
                    name="weight_unit"
                    defaultValue="lbs"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="lbs">Libras (lbs)</option>
                    <option value="kg">Kilos (kg)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Largo</label>
                  <input
                    type="number"
                    name="length"
                    step="0.1"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ancho</label>
                  <input
                    type="number"
                    name="width"
                    step="0.1"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alto</label>
                  <input
                    type="number"
                    name="height"
                    step="0.1"
                    className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="in"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Contenido del paquete"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Valor Declarado (USD)</label>
                <input
                  type="number"
                  name="declared_value"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm disabled:opacity-50"
                >
                  {loading ? "Guardando..." : "Digitar Paquete"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
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
            {result.total} paquete{result.total !== 1 ? "s" : ""} sin digitar
          </p>
        </div>
        {result.packages.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">
            Todos los paquetes están digitados.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">HAWB</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Acción</th>
                </tr>
              </thead>
              <tbody>
                {result.packages.map((pkg, i) => (
                  <tr
                    key={pkg.id as string}
                    className="border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-4 font-mono text-xs">{pkg.tracking as string}</td>
                    <td className="py-3 px-4 font-mono text-xs">{(pkg.hawb as string) || "-"}</td>
                    <td className="py-3 px-4">
                      {(pkg.users as Record<string, string>)?.full_name || (
                        <span className="text-muted-foreground">NN</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {new Date(pkg.created_at as string).toLocaleDateString("es-PY")}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingId(pkg.id as string)}
                        className="inline-flex items-center gap-1.5 text-primary hover:bg-primary/5 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                      >
                        <FileText size={14} />
                        Digitar
                      </button>
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
