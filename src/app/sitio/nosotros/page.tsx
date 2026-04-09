import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - UKUXBOX",
  description: "Conocé más sobre UKUXBOX, tu casillero en Miami.",
};

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Conectamos Paraguay con Estados Unidos de la forma más simple y accesible.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="w-16 h-1 bg-accent rounded-full"></div>
            <h2 className="text-3xl font-bold">¿Quiénes somos?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong className="text-foreground">UKUXBOX</strong> nació con la
              misión de conectar a Paraguay con Estados Unidos de la forma más
              simple y accesible. Desde nuestros inicios, hemos ayudado a miles
              de clientes a recibir sus compras online directamente en sus manos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Contamos con un almacén propio en Miami, Florida, donde recibimos,
              revisamos y despachamos cada paquete con el máximo cuidado. Nuestro
              equipo se dedica a que tu experiencia de compra sea sin
              complicaciones.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Con oficinas en Asunción, Ciudad del Este y Encarnación, estamos
              cerca de vos para que puedas retirar tus paquetes de forma cómoda
              y rápida.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-primary text-white rounded-lg p-8 shadow-lg">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-3">Nuestra Misión</h2>
              <p className="text-white/80">
                Facilitar el acceso a productos de Estados Unidos para todos los
                paraguayos, ofreciendo un servicio de courier confiable,
                transparente y a precios justos.
              </p>
            </div>

            <div className="bg-accent text-primary rounded-lg p-8 shadow-lg">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Nuestra Visión</h2>
              <p className="text-primary/80 mt-3">
                Ser el courier líder en Paraguay, reconocido por nuestra
                excelencia en servicio, innovación tecnológica y compromiso con
                cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4"></div>
            <h2 className="text-3xl font-bold">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Confianza",
                desc: "Tu paquete está seguro con nosotros. Garantizamos transparencia total en cada etapa del envío.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Rapidez",
                desc: "Entendemos la urgencia. Procesamos y despachamos tus paquetes con la mayor velocidad posible.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Compromiso",
                desc: "Cada cliente es importante. Nos esforzamos para que tu experiencia sea excepcional.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-lg p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10,000+", label: "Clientes activos" },
              { number: "50,000+", label: "Paquetes entregados" },
              { number: "3", label: "Oficinas en Paraguay" },
              { number: "7-12", label: "Días de tránsito" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 border-l-4 border-accent bg-white rounded-lg shadow-sm"
              >
                <p className="text-3xl font-black text-primary">{stat.number}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
