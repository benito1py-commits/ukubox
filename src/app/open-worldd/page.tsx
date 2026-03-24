import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open Worldd - UKUXBOX",
  description: "Comprá en cualquier tienda del mundo y recibí en Paraguay con UKUXBOX.",
};

const regions = [
  {
    name: "Estados Unidos",
    flag: "🇺🇸",
    stores: ["Amazon", "eBay", "Walmart", "Best Buy", "Target"],
    deliveryDays: "7-12",
  },
  {
    name: "Europa",
    flag: "🇪🇺",
    stores: ["Zara", "ASOS", "H&M", "Zalando", "MediaMarkt"],
    deliveryDays: "12-18",
  },
  {
    name: "China",
    flag: "🇨🇳",
    stores: ["AliExpress", "Shein", "Temu", "DHgate", "Banggood"],
    deliveryDays: "15-25",
  },
  {
    name: "Japón & Corea",
    flag: "🇯🇵",
    stores: ["Rakuten", "Yahoo Japan", "Coupang", "YesStyle"],
    deliveryDays: "14-21",
  },
];

const steps = [
  {
    number: "01",
    title: "Elegí tu producto",
    desc: "Navegá en cualquier tienda online del mundo y encontrá lo que buscás.",
  },
  {
    number: "02",
    title: "Enviá a nuestro centro",
    desc: "Usá nuestra dirección en el país de origen como dirección de entrega.",
  },
  {
    number: "03",
    title: "Nosotros lo traemos",
    desc: "Nos encargamos del envío internacional, aduanas y logística.",
  },
  {
    number: "04",
    title: "Recibí en Paraguay",
    desc: "Retirá en sucursal o recibí en la puerta de tu casa.",
  },
];

export default function OpenWorlddPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #FFCC00 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFCC00 0%, transparent 50%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="inline-block bg-accent text-primary text-sm font-bold px-4 py-1 rounded-full mb-6">
            Open Worldd
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            El mundo entero,
            <br />
            en tus manos
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Comprá en cualquier tienda del planeta y recibí tus productos en Paraguay.
            Sin fronteras, sin complicaciones.
          </p>
          <Link
            href="/servicios"
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors"
          >
            Ver Tarifas
          </Link>
        </div>
      </section>

      {/* Regions */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4"></div>
          <h2 className="text-3xl font-black">Comprá desde cualquier región</h2>
          <p className="text-muted-foreground mt-2">
            Tenemos centros de recepción en los principales mercados del mundo
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => (
            <div
              key={region.name}
              className="bg-white border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="text-4xl mb-4">{region.flag}</div>
              <h3 className="text-lg font-bold mb-2">{region.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Entrega en {region.deliveryDays} días hábiles
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Tiendas populares
                </p>
                <div className="flex flex-wrap gap-1">
                  {region.stores.map((store) => (
                    <span
                      key={store}
                      className="text-xs bg-muted px-2 py-1 rounded-md"
                    >
                      {store}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4"></div>
            <h2 className="text-3xl font-black">¿Cómo funciona?</h2>
            <p className="text-muted-foreground mt-2">
              En 4 simples pasos tenés el mundo en tus manos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Listo para comprar sin límites?</h2>
          <p className="text-muted-foreground mb-8">
            Registrate hoy y empezá a recibir productos de todo el mundo en Paraguay.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
            >
              Crear Cuenta
            </Link>
            <a
              href="https://wa.me/595986733000"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
