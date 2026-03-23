import { Metadata } from "next";
import { mockHistory } from "@/lib/mock-data";
import { PackageTable } from "@/components/dashboard/package-table";

export const metadata: Metadata = {
  title: "Historial - UKUXBOX",
};

export default function HistorialPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Historial de Paquetes</h1>
      <p className="text-muted-foreground mb-6">
        Listado de todos tus paquetes entregados.
      </p>
      <div className="border border-border rounded-lg overflow-hidden">
        <PackageTable packages={mockHistory} showDeliveryDate />
      </div>
    </div>
  );
}
