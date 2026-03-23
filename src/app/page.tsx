import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-foreground to-foreground/90 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Tu casillero en{" "}
              <span className="text-accent">Miami</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8">
              Comprá en cualquier tienda de Estados Unidos y recibí tus paquetes
              en Paraguay. Rápido, seguro y al mejor precio.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
              >
                Ingresar a mi Casillero
              </Link>
              <Link
                href="/servicios"
                className="bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
              >
                Ver Servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Registrate",
                desc: "Creá tu cuenta y recibí tu dirección personal en Miami con tu número de casillero único.",
              },
              {
                step: "02",
                title: "Comprá",
                desc: "Comprá en cualquier tienda online de USA y usá tu dirección de Miami como dirección de envío.",
              },
              {
                step: "03",
                title: "Recibí",
                desc: "Nosotros recibimos tu paquete en Miami y lo enviamos a Paraguay directo a tu oficina.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-accent">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Rápido",
                desc: "Envíos en 7-12 días hábiles desde Miami a Paraguay",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Seguro",
                desc: "Tu paquete está asegurado desde que llega a nuestro almacén",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Económico",
                desc: "Las mejores tarifas del mercado, desde $8 por libra",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: "Online",
                desc: "Seguí tus paquetes en tiempo real desde tu casillero virtual",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-border"
              >
                <div className="text-accent mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Registrate hoy y obtené tu dirección en Miami. Empezá a comprar en
            tus tiendas favoritas de USA.
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
          >
            Crear mi Casillero
          </Link>
        </div>
      </section>
    </div>
  );
}
