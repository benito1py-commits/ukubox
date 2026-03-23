import { PackageStatus } from "@/lib/types";

const statusStyles: Record<PackageStatus, string> = {
  "En Miami": "bg-blue-100 text-blue-800",
  "En Tránsito": "bg-amber-100 text-amber-800",
  "En Aduana": "bg-orange-100 text-orange-800",
  "Listo para Retiro": "bg-emerald-100 text-emerald-800",
  "Entregado": "bg-gray-100 text-gray-600",
};

export function PackageStatusBadge({ status }: { status: PackageStatus }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
