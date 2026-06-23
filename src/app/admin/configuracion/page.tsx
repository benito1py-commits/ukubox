import { Landmark } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import ConfiguracionForm from "./ConfiguracionForm";
import ModoConstruccion from "./ModoConstruccion";

export const metadata = {
  title: "Configuración - UKUXBOX",
};

export const dynamic = "force-dynamic";

export default async function AdminConfiguracionPage() {
  const supabase = await createClient();

  const { data: configuracion } = await supabase
    .from("configuracion")
    .select("*")
    .eq("id", true)
    .single();

  return (
    <div>
      <ModoConstruccion enConstruccion={configuracion?.en_construccion ?? true} />

      <div className="flex items-center gap-3 mb-2">
        <Landmark className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-black text-foreground">
          Cuenta bancaria
        </h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 max-w-2xl">
        Estos datos se le muestran al cliente para que transfiera cuando un
        pedido está cotizado. Luego sube su comprobante y vos confirmás el pago.
      </p>

      <ConfiguracionForm configuracion={configuracion} />
    </div>
  );
}
