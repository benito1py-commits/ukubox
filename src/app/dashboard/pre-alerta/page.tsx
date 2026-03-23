import { Metadata } from "next";
import { PreAlertForm } from "@/components/dashboard/pre-alert-form";

export const metadata: Metadata = {
  title: "Pre-Alerta - UKUXBOX",
};

export default function PreAlertaPage() {
  return (
    <div>
      <h1 className="text-2xl font-black mb-6">Pre-Alerta</h1>
      <p className="text-muted-foreground mb-6">
        Registrá tus compras para que podamos prepararnos para recibir tu paquete
        y agilizar el proceso.
      </p>
      <PreAlertForm />
    </div>
  );
}
