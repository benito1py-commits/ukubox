import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios - UKUXBOX",
  description: "Conocé todos los servicios que ofrece UKUXBOX.",
};

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Casillero en Miami",
    desc: "Obtené tu dirección personal en Miami, FL. Usala como dirección de envío en cualquier tienda online de Estados Unidos.",
    features: [
      "Dirección única con tu código de casillero",
      "Recepción ilimitada de paquetes",
      "Almacenamiento gratuito por 30 días",
      "Notificación por email cuando llega tu paquete",
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Envío de Paquetes",
    desc: "Enviamos tus compras desde Miami hasta tu oficina en Paraguay de forma rápida y segura.",
    features: [
      "Tránsito de 7-12 días hábiles",
      "Tarifas desde $8 por libra",
      "Seguimiento en tiempo real",
      "Seguro de envío incluido",
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Consolidación",
    desc: "Juntá varios paquetes en un solo envío y ahorrá en costos de transporte.",
    features: [
      "Acumulá paquetes en tu casillero",
      "Enviá todo junto cuando quieras",
      "Reducí costos de envío",
      "Re-empaque profesional",
    ],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    title: "Compras Asistidas",
    desc: "¿No podés comprar en alguna tienda? Nosotros compramos por vos.",
    features: [
      "Compramos en tiendas que no aceptan tarjetas internacionales",
      "Asesoramiento en tu compra",
      "Sin costos ocultos",
      "Pago en guaraníes o dólares",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Todo lo que necesitás para comprar en USA y recibir en Paraguay, en un solo lugar.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white border border-border rounded-lg p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary transition-colors">
                {service.icon}
              </div>
              <h2 className="text-xl font-bold mb-3">{service.title}</h2>
              <p className="text-muted-foreground mb-6">{service.desc}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-primary shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tarifas */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4"></div>
            <h2 className="text-3xl font-black">Tarifas</h2>
            <p className="text-muted-foreground mt-2">Planes adaptados a tu necesidad</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Estándar",
                price: "$8",
                unit: "por libra",
                features: ["7-12 días hábiles", "Seguro básico incluido", "Tracking en línea"],
                highlight: false,
              },
              {
                name: "Express",
                price: "$12",
                unit: "por libra",
                features: ["5-7 días hábiles", "Seguro completo", "Tracking prioritario", "Despacho preferente"],
                highlight: true,
              },
              {
                name: "Carga",
                price: "$5",
                unit: "por libra",
                features: ["15-20 días hábiles", "Para paquetes +20 lbs", "Ideal para compras grandes"],
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-8 text-center transition-transform hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-primary text-white shadow-xl ring-2 ring-accent"
                    : "bg-white border border-border shadow-sm"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Más Popular
                  </span>
                )}
                <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                <p className="text-4xl font-black mb-1">
                  <span className={plan.highlight ? "text-accent" : "text-primary"}>
                    {plan.price}
                  </span>
                </p>
                <p className={`text-sm mb-8 ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  {plan.unit}
                </p>
                <ul className="space-y-3 text-sm text-left">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 ${plan.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                      <svg className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-accent" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-8 py-3 rounded-lg font-bold transition-colors ${
                  plan.highlight
                    ? "bg-accent text-primary hover:bg-accent-hover"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}>
                  Elegir Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Tenés dudas sobre nuestros servicios?</h2>
          <p className="text-muted-foreground mb-8">
            Contactanos y con gusto te asesoramos para encontrar la mejor opción para vos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sitio/preguntas-frecuentes" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors">
              Ver Preguntas Frecuentes
            </Link>
            <a href="https://wa.me/595986733000" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors">
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
