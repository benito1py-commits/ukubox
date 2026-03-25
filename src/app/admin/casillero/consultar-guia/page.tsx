import { requireAdmin, searchPackages } from "@/lib/queries/admin";

const statusLabels: Record<string, string> = {
  received: "Recibido",
  digitized: "Digitado",
  in_transit: "En Tránsito",
  customs: "En Aduana",
  ready: "Listo",
  delivered: "Entregado",
};

const statusColors: Record<string, string> = {
  received: "bg-blue-50 text-blue-700",
  digitized: "bg-indigo-50 text-indigo-700",
  in_transit: "bg-yellow-50 text-yellow-700",
  customs: "bg-orange-50 text-orange-700",
  ready: "bg-green-50 text-green-700",
  delivered: "bg-gray-100 text-gray-600",
};

export default async function ConsultarGuiaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;

  const hasSearch = Object.values(params).some((v) => v);
  const result = hasSearch
    ? await searchPackages({
        tracking: params.tracking,
        reference: params.reference,
        mawb: params.mawb,
        hawb: params.hawb,
        status: params.status,
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
        page: parseInt(params.page || "1"),
      })
    : null;

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h2 className="font-bold text-lg mb-4">CONSULTA DE GUÍA</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "tracking", label: "Guía / Tracking", placeholder: "Número de tracking" },
            { name: "reference", label: "Referencia", placeholder: "Referencia" },
            { name: "mawb", label: "MAWB", placeholder: "MAWB" },
            { name: "hawb", label: "HAWB", placeholder: "HAWB" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                defaultValue={params[field.name] || ""}
                className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Estado
            </label>
            <select
              name="status"
              defaultValue={params.status || ""}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Todos</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Fecha desde
            </label>
            <input
              type="date"
              name="dateFrom"
              defaultValue={params.dateFrom || ""}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">
              Fecha hasta
            </label>
            <input
              type="date"
              name="dateTo"
              defaultValue={params.dateTo || ""}
              className="w-full px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {result.total} resultado{result.total !== 1 ? "s" : ""}
            </p>
          </div>
          {result.packages.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground">
              No se encontraron resultados.
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
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Peso</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {result.packages.map((pkg: Record<string, unknown>, i: number) => (
                    <tr key={pkg.id as string} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                      <td className="py-3 px-4 font-mono text-xs">{pkg.tracking as string}</td>
                      <td className="py-3 px-4 font-mono text-xs">{(pkg.hawb as string) || "-"}</td>
                      <td className="py-3 px-4">
                        {(pkg.users as Record<string, string>)?.full_name || (
                          <span className="text-muted-foreground">Sin asignar</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {pkg.weight as number} {pkg.weight_unit as string}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                            statusColors[pkg.status as string] || "bg-gray-100"
                          }`}
                        >
                          {statusLabels[pkg.status as string] || (pkg.status as string)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(pkg.created_at as string).toLocaleDateString("es-PY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
