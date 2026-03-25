import { requireAdmin } from "@/lib/queries/admin";
import { createClient } from "@/lib/supabase/server";

export default async function ClientesNNPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: packages, count } = await supabase
    .from("packages")
    .select("*", { count: "exact" })
    .is("user_id", null)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            {count || 0} paquete{(count || 0) !== 1 ? "s" : ""} sin cliente asignado
          </p>
        </div>
        {!packages || packages.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">
            No hay paquetes sin asignar.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">HAWB</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descripción</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Peso</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg, i) => (
                  <tr key={pkg.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 px-4 font-mono text-xs">{pkg.tracking}</td>
                    <td className="py-3 px-4 font-mono text-xs">{pkg.hawb || "-"}</td>
                    <td className="py-3 px-4">{pkg.description || "-"}</td>
                    <td className="py-3 px-4">{pkg.weight} {pkg.weight_unit}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {new Date(pkg.created_at).toLocaleDateString("es-PY")}
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
