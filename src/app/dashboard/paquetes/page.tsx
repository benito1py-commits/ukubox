import { Metadata } from "next";
import { getUserPackages, getPackageStats } from "@/lib/queries/packages";
import { PackageTable } from "@/components/dashboard/package-table";

export const metadata: Metadata = {
  title: "Mis Paquetes - UKUXBOX",
};

export default async function PaquetesPage() {
  const [packages, stats] = await Promise.all([
    getUserPackages(true),
    getPackageStats(),
  ]);

  const totalPaquetes =
    stats.enMiami + stats.enTransito + stats.enAduana + stats.listos;

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Mis Paquetes</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total",
            value: totalPaquetes,
            color: "bg-foreground text-white",
          },
          {
            label: "En Miami",
            value: stats.enMiami,
            color: "bg-blue-50 text-blue-800",
          },
          {
            label: "En Tránsito",
            value: stats.enTransito,
            color: "bg-yellow-50 text-yellow-800",
          },
          {
            label: "Listo para Retiro",
            value: stats.listos,
            color: "bg-green-50 text-green-800",
          },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-lg p-4 ${stat.color}`}>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {packages.length === 0 ? (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-lg">
            No tenés paquetes activos por el momento.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cuando hagas una compra, registrá una pre-alerta para agilizar el
            proceso.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <PackageTable packages={packages} />
        </div>
      )}
    </div>
  );
}
