"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const statusMap: Record<string, string> = {
  received: "En Miami",
  digitized: "En Miami",
  in_transit: "En Tránsito",
  customs: "En Aduana",
  ready: "Listo para Retiro",
  delivered: "Entregado",
};

const statusColors: Record<string, string> = {
  received: "bg-blue-50 text-blue-800",
  digitized: "bg-blue-50 text-blue-800",
  in_transit: "bg-yellow-50 text-yellow-800",
  customs: "bg-orange-50 text-orange-800",
  ready: "bg-green-50 text-green-800",
  delivered: "bg-gray-100 text-gray-600",
};

export default function ConsultarPage() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<{
    tracking: string;
    status: string;
    received_at: string | null;
    delivered_at: string | null;
  } | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tracking.trim()) return;

    setLoading(true);
    setSearched(true);

    const supabase = createClient();
    const { data } = await supabase
      .from("packages")
      .select("tracking, status, received_at, delivered_at")
      .eq("tracking", tracking.trim())
      .limit(1)
      .single();

    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12 bg-muted">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-black text-center mb-2">
            Consultar Estado
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Ingresá tu número de tracking para ver el estado de tu paquete.
          </p>

          <form onSubmit={handleSearch} className="flex gap-3 mb-6">
            <input
              type="text"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Número de tracking"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              <Search size={20} />
            </button>
          </form>

          {loading && (
            <p className="text-center text-muted-foreground">Buscando...</p>
          )}

          {searched && !loading && !result && (
            <div className="text-center py-6 border border-border rounded-lg">
              <p className="text-muted-foreground">
                No se encontró ningún paquete con ese tracking.
              </p>
            </div>
          )}

          {result && (
            <div className="border border-border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tracking</span>
                <span className="font-mono text-sm font-medium">
                  {result.tracking}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[result.status] || "bg-gray-100"
                  }`}
                >
                  {statusMap[result.status] || result.status}
                </span>
              </div>
              {result.received_at && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Fecha de ingreso
                  </span>
                  <span className="text-sm">
                    {new Date(result.received_at).toLocaleDateString("es-PY")}
                  </span>
                </div>
              )}
              {result.delivered_at && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Fecha de entrega
                  </span>
                  <span className="text-sm">
                    {new Date(result.delivered_at).toLocaleDateString("es-PY")}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
