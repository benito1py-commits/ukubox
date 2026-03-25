import { requireAdmin, getAdminStats } from "@/lib/queries/admin";
import { Package, Users, Bell, PackageOpen } from "lucide-react";

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await getAdminStats();

  const cards = [
    {
      label: "Clientes",
      value: stats.totalClients,
      icon: Users,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total Paquetes",
      value: stats.totalPackages,
      icon: Package,
      color: "bg-green-50 text-green-700",
    },
    {
      label: "Pendientes",
      value: stats.pendingPackages,
      icon: PackageOpen,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Pre-Alertas Activas",
      value: stats.activePreAlerts,
      icon: Bell,
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-lg border border-border p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`p-2.5 rounded-lg ${card.color}`}
                >
                  <Icon size={20} />
                </span>
              </div>
              <p className="text-3xl font-black">{card.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-border p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Bienvenido al Panel de Administración</h2>
        <p className="text-muted-foreground">
          Usá el menú lateral para navegar entre los módulos del casillero.
        </p>
      </div>
    </div>
  );
}
