import { requireAdmin, searchClients } from "@/lib/queries/admin";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const result = await searchClients(params.search, page);

  return (
    <div className="space-y-6">
      {/* Search + Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <form className="flex gap-3 flex-1 max-w-lg">
          <input
            type="text"
            name="search"
            defaultValue={params.search || ""}
            className="flex-1 px-3 py-2.5 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Buscar por nombre, cédula, código casillero..."
          />
          <button type="submit" className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm">
            Buscar
          </button>
        </form>
        <Link
          href="/admin/casillero/clientes/nuevo"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm shrink-0"
        >
          <Plus size={18} />
          Nuevo Cliente
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm text-muted-foreground">{result.total} cliente{result.total !== 1 ? "s" : ""}</p>
        </div>
        {result.clients.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">No hay clientes registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Código</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cédula</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Teléfono</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Oficina</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {result.clients.map((client: Record<string, unknown>) => (
                  <tr key={client.id as string} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 font-mono text-xs font-medium text-primary">
                      {client.casillero_code as string}
                    </td>
                    <td className="py-3 px-4 font-medium">{client.full_name as string}</td>
                    <td className="py-3 px-4">{(client.cedula as string) || "-"}</td>
                    <td className="py-3 px-4">{(client.phone as string) || "-"}</td>
                    <td className="py-3 px-4">
                      {(client.offices as Record<string, string>)?.name || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        client.account_type === "business" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                      }`}>
                        {client.account_type === "business" ? "Empresa" : "Personal"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      ${Number(client.balance).toFixed(2)}
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
