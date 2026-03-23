import { Package } from "@/lib/types";
import { PackageStatusBadge } from "./package-status";

interface PackageTableProps {
  packages: Package[];
  showDeliveryDate?: boolean;
}

export function PackageTable({ packages, showDeliveryDate }: PackageTableProps) {
  if (packages.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No hay paquetes para mostrar.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tracking</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descripción</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tienda</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Peso</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Precio</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ingreso</th>
            {showDeliveryDate && (
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Entrega</th>
            )}
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4 font-mono text-xs">{pkg.tracking}</td>
              <td className="py-3 px-4">{pkg.descripcion}</td>
              <td className="py-3 px-4">{pkg.tienda}</td>
              <td className="py-3 px-4">{pkg.peso} {pkg.pesoUnit}</td>
              <td className="py-3 px-4">${pkg.precio.toFixed(2)}</td>
              <td className="py-3 px-4">
                <PackageStatusBadge status={pkg.estado} />
              </td>
              <td className="py-3 px-4 text-muted-foreground">{pkg.fechaIngreso}</td>
              {showDeliveryDate && (
                <td className="py-3 px-4 text-muted-foreground">{pkg.fechaEntrega || "-"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
