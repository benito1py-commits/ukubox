import { Metadata } from "next";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { AddressCard } from "@/components/dashboard/address-card";
import { ChangePassword } from "@/components/dashboard/change-password";
import { ChangeOffice } from "@/components/dashboard/change-office";

export const metadata: Metadata = {
  title: "Mi Perfil - UKUXBOX",
};

export default function PerfilPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Mi Perfil</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard />
        <AddressCard />
        <ChangePassword />
        <ChangeOffice />
      </div>
    </div>
  );
}
