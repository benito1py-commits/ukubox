import { requireAdmin, searchPreAlerts } from "@/lib/queries/admin";

const statusLabels: Record<string, string> = {
  active: "Activa",
  matched: "Vinculada",
  retained: "Retenida",
  cancelled: "Cancelada",
};

const statusColors: Record<string, string> = {
  active: "bg-blue-50 text-blue-700",
  matched: "bg-green-50 text-green-700",
  retained: "bg-red-50 text-red-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default async function PreAlertasAdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const result = await searchPreAlerts({
    tracking: params.tracking,
    status: params.status,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    page: parseInt(params.page || "1"),
  });

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="font-bold text-lg mb-4">BUSCAR PRE-ALERTAS</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Tracking</label>
            <input
              type="text"
              name="tracking"
              defaultValue={params.tracking || ""}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Número de tracking"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Estado</label>
            <select
              name="status"
              defaultValue={params.status || ""}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Todos</option>
              {Object.entries(statusLabels).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Fecha desde</label>
            <input type="date" name="dateFrom" defaultValue={params.dateFrom || ""} className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm">
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm text-muted-foreground">{result.total} pre-alerta{result.total !== 1 ? "s" : ""}</p>
        </div>
        {result.preAlerts.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">No hay pre-alertas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tienda</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descripción</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Valor</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {result.preAlerts.map((pa: Record<string, unknown>, i: number) => (
                  <tr key={pa.id as string} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-4 font-mono text-xs">{pa.tracking as string}</td>
                    <td className="py-3 px-4">{(pa.users as Record<string, string>)?.full_name || "-"}</td>
                    <td className="py-3 px-4">{(pa.stores as Record<string, string>)?.name || (pa.store_name as string) || "-"}</td>
                    <td className="py-3 px-4">{(pa.description as string) || "-"}</td>
                    <td className="py-3 px-4">${Number(pa.declared_value).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[pa.status as string] || "bg-gray-100"}`}>
                        {statusLabels[pa.status as string] || (pa.status as string)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {new Date(pa.created_at as string).toLocaleDateString("es-PY")}
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
