import { DashboardTabs } from "@/components/layout/dashboard-tabs";
import { UserInfo } from "@/components/layout/user-info";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <DashboardTabs />
        <UserInfo />
      </div>
      {children}
    </div>
  );
}
