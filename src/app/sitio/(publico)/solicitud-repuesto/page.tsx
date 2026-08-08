import { Metadata } from "next";

import SolicitudRepuestoForm from "./SolicitudRepuestoForm";

export const metadata: Metadata = {
  title: "Solicitud de repuesto - UKUXBOX",
  description:
    "Pedí el repuesto de tu vehículo con los datos del VIN y de la pieza. Te contactamos con la disponibilidad y el precio.",
};

// El gate de "sitio en construcción" ya lo aplica el layout del grupo (publico).
export default function SolicitudRepuestoPage() {
  return (
    <div className="bg-gray-50/50">
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">
              Ficha técnica · Búsqueda de disponibilidad
            </p>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">
              Orden de
              <span className="text-accent"> repuesto</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              Completá los datos del vehículo y de la pieza para generar una
              orden clara que el proveedor pueda cotizar sin ida y vuelta.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <SolicitudRepuestoForm />
      </section>
    </div>
  );
}
