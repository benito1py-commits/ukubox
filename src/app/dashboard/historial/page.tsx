import { Metadata } from "next";
import { getUserPackages } from "@/lib/queries/packages";
import { PackageTable } from "@/components/dashboard/package-table";

export const metadata: Metadata = {
  title: "Historial - UKUXBOX",
};

export default async function HistorialPage() {
  const packages = await getUserPackages(false);

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Historial de Paquetes</h1>
      <p className="text-muted-foreground mb-6">
        Listado de todos tus paquetes entregados.
      </p>
      {packages.length === 0 ? (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground">
            Todavía no tenés paquetes entregados.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <PackageTable packages={packages} showDeliveryDate />
        </div>
      )}
    </div>
  );
}
