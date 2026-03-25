import { Metadata } from "next";
import { getUserRecipients } from "@/lib/queries/recipients";
import { RecipientList } from "@/components/dashboard/recipient-list";

export const metadata: Metadata = {
  title: "Destinatarios - UKUXBOX",
};

export default async function DestinatariosPage() {
  const recipients = await getUserRecipients();

  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Mis Destinatarios</h1>
      <p className="text-muted-foreground mb-6">
        Gestioná las personas que pueden recibir tus paquetes.
      </p>
      <RecipientList initialRecipients={recipients} />
    </div>
  );
}
