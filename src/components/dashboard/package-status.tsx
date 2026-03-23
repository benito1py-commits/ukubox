import { PackageStatus } from "@/lib/types";

const statusStyles: Record<PackageStatus, string> = {
  "En Miami": "bg-blue-100 text-blue-800",
  "En Tránsito": "bg-yellow-100 text-yellow-800",
  "En Aduana": "bg-orange-100 text-orange-800",
  "Listo para Retiro": "bg-green-100 text-green-800",
  "Entregado": "bg-gray-100 text-gray-800",
};

export function PackageStatusBadge({ status }: { status: PackageStatus }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
