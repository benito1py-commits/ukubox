import { Metadata } from "next";
import { mockPackages } from "@/lib/mock-data";
import { PackageTable } from "@/components/dashboard/package-table";

export const metadata: Metadata = {
  title: "Mis Paquetes - UKUXBOX",
};

export default function PaquetesPage() {
  const totalPaquetes = mockPackages.length;
  const enMiami = mockPackages.filter((p) => p.estado === "En Miami").length;
  const enTransito = mockPackages.filter((p) => p.estado === "En Tránsito").length;
  const listos = mockPackages.filter((p) => p.estado === "Listo para Retiro").length;

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Mis Paquetes</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: totalPaquetes, color: "bg-foreground text-white" },
          { label: "En Miami", value: enMiami, color: "bg-blue-50 text-blue-800" },
          { label: "En Tránsito", value: enTransito, color: "bg-yellow-50 text-yellow-800" },
          { label: "Listo para Retiro", value: listos, color: "bg-green-50 text-green-800" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-lg p-4 ${stat.color}`}>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <PackageTable packages={mockPackages} />
      </div>
    </div>
  );
}
