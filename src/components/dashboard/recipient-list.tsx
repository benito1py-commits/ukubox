"use client";

import { useState } from "react";
import { createRecipient, deleteRecipient } from "@/lib/actions/recipients";
import { UserPlus, Trash2 } from "lucide-react";

interface Recipient {
  id: string;
  full_name: string;
  cedula: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string;
  is_default: boolean;
}

export function RecipientList({
  initialRecipients,
}: {
  initialRecipients: Recipient[];
}) {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createRecipient(formData);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Destinatario agregado");
      setShowForm(false);
      // Optimistic add
      const newRecipient: Recipient = {
        id: `temp-${Date.now()}`,
        full_name: formData.get("full_name") as string,
        cedula: formData.get("cedula") as string,
        phone: formData.get("phone") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        country: (formData.get("country") as string) || "Paraguay",
        is_default: false,
      };
      setRecipients([...recipients, newRecipient]);
      setTimeout(() => setMessage(""), 3000);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este destinatario?")) return;
    const result = await deleteRecipient(id);
    if (!result.error) {
      setRecipients(recipients.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors"
        >
          <UserPlus size={18} />
          Agregar Destinatario
        </button>
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.includes("error") ? "text-danger" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      {showForm && (
        <div className="border border-border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Nuevo Destinatario</h3>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm mb-1.5">Nombre Completo *</label>
              <input
                type="text"
                name="full_name"
                required
                className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Cédula</label>
              <input
                type="text"
                name="cedula"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="1.234.567"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Teléfono</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="+595 9XX XXX XXX"
              />
            </div>
            <div>
              <label className="block text-sm mb-1.5">Ciudad</label>
              <input
                type="text"
                name="city"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Asunción"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1.5">Dirección</label>
              <input
                type="text"
                name="address"
                className="w-full px-4 py-3 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Calle y número"
              />
            </div>
            <input type="hidden" name="country" value="Paraguay" />
            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-lg font-medium border border-border hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {recipients.length === 0 ? (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">
            No tenés destinatarios registrados.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Nombre
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Cédula
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Teléfono
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Ciudad
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Dirección
                </th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50"
                >
                  <td className="py-3 px-4 font-medium">{r.full_name}</td>
                  <td className="py-3 px-4">{r.cedula || "-"}</td>
                  <td className="py-3 px-4">{r.phone || "-"}</td>
                  <td className="py-3 px-4">{r.city || "-"}</td>
                  <td className="py-3 px-4">{r.address || "-"}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-danger hover:bg-danger/10 p-1.5 rounded transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
