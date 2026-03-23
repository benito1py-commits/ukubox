import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios - UKUXBOX",
  description: "Conocé todos los servicios que ofrece UKUXBOX.",
};

const services = [
  {
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
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-black mb-4">Nuestros Servicios</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Todo lo que necesitás para comprar en USA y recibir en Paraguay, en un
        solo lugar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="border border-border rounded-xl p-8 hover:border-accent/50 transition-colors"
          >
            <h2 className="text-xl font-bold mb-3">{service.title}</h2>
            <p className="text-muted-foreground mb-6">{service.desc}</p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
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

      {/* Tarifas */}
      <div className="mt-16">
        <h2 className="text-3xl font-black mb-8 text-center">Tarifas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
              className={`rounded-xl p-8 text-center ${
                plan.highlight
                  ? "bg-foreground text-white border-2 border-accent"
                  : "border border-border"
              }`}
            >
              <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
              <p className="text-3xl font-black mb-1">
                <span className={plan.highlight ? "text-accent" : "text-primary"}>
                  {plan.price}
                </span>
              </p>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                {plan.unit}
              </p>
              <ul className="space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className={plan.highlight ? "text-white/80" : "text-muted-foreground"}>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
