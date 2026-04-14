import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - UKUXBOX",
  description: "Conocé más sobre UKUXBOX, tu casillero en Miami con más de 25 años de experiencia.",
};

export default function NosotrosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Más de 25 años de experiencia conectando Paraguay con el mundo.
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Si, estas en lo correcto…. Existen más de 40 empresas en Paraguay, ofreciendo el servicio de casillero en Miami.
            <br />
            <strong className="text-foreground">Esta es la razón del porque UKUX BOX fue creada.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Con más de <strong className="text-foreground">25 años de experiencia local en Paraguay y en los Estados Unidos</strong>, nace el nuevo concepto. Hemos brindado servicios de Courier expreso y agente de carga por medio de diferentes empresas hermanas e importantes alianzas estratégicas con <strong className="text-foreground">DHL Express en 17 países diferentes</strong> para clientes internacionales, manejando la logística sobre las compras de comercio electrónico y la necesidad de envíos desde nuestra dirección sin pago de impuestos (free tax) por sobre las compras que realizas en los Estados Unidos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nosotros reconocemos lo importante que es este servicio para ti., brindándote valores y consultas en negocios estratégicos, <strong className="text-foreground">no solo precios de servicios</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Escuchamos a nuestros clientes y sus experiencias en el pasado, como sus necesidades reales, resolviendo estos problemas y entregando real valor agregado, para que tu experiencia de comprar en línea desde los Estados Unidos sea única y brindar la mejor solución posible.
            </p>
          </div>

          <div className="bg-primary text-white rounded-xl p-8 shadow-xl">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Somos un grupo de profesionales en logística</h3>
            <p className="text-white/80 leading-relaxed">
              Contamos con el verdadero conocimiento en entender tus necesidades de principio a fin. Cada envío es tratado con la máxima dedicación porque sabemos lo que significa para vos recibir tus compras.
            </p>
          </div>
        </div>
      </section>

      {/* ¿Qué nos hace diferentes? */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-black">¿Qué nos hace diferentes?</h2>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed">
              La razón es simple, <strong className="text-foreground">UKUX BOX es la única empresa en Miami con un producto estrella real</strong>. No somos otro agente de carga más.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center border-t-4 border-accent">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Online Shopping</h3>
              <p className="text-muted-foreground text-sm">E-commerce * Casillero en Miami o como desees llamarlo, ES NUESTRA PRIORIDAD Y PRODUCTO 5 ESTRELLAS.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center border-t-4 border-primary">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Tecnología</h3>
              <p className="text-muted-foreground text-sm">Modernidad al alcance de tu mano y rastreabilidad en tiempo real de tu paquetería en nuestra bodega propia en Miami.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm text-center border-t-4 border-accent">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Puntos y Beneficios</h3>
              <p className="text-muted-foreground text-sm">¡Con nosotros siempre ganas! Por cada paquete transportado acumulas puntos que son canjeables por facturación final.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Los kilos que menos pesan */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-1 bg-accent rounded-full mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">Los kilos que menos pesan</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-white/90"><strong>Los únicos en el país</strong> incentivando las compras internacionales.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-white/90"><strong>No redondeamos tu peso, cobramos el peso exacto</strong> de tu paquete cada 100 gramos.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg text-white/90"><strong>Entregamos todas tus compras</strong> en cualquier ciudad de Paraguay.</span>
                </li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <p className="text-5xl font-black text-accent mb-4">¡Siempre ganas!</p>
              <p className="text-white/80 text-lg">
                Si estás pensando en buscar alternativas a tus actuales proveedores, solo danos una llamada, escríbenos un correo, ¡solo dinos <strong>HOLA!</strong> Y NOSOTROS NOS ENCARGAMOS DEL RESTO.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito, Misión, Visión */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-black">Nuestro Fundamento</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-muted rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Propósito</h3>
              <p className="text-muted-foreground leading-relaxed">
                Impactar positivamente en la vida de las personas, acercándoles lo que necesiten cuándo y donde lo necesiten. Nos enfocamos en crear momentos felices en las entregas.
              </p>
            </div>

            <div className="bg-primary text-white rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-accent">Misión</h3>
              <p className="text-white/80 leading-relaxed">
                Conectar y servir a nuestros clientes mediante soluciones logísticas.
              </p>
            </div>

            <div className="bg-muted rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">Visión</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser líderes globales en soluciones de logística integral basadas en la tecnología y la innovación, llegando a ser el mejor aliado del cliente que compra por internet en cualquier parte del mundo hacia Paraguay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-accent text-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-3xl font-black mb-4">"Donde comprar y transportar se hace simple"</p>
          <h2 className="text-2xl font-bold mb-6">¿Qué aun no tienes tu cuenta con Nosotros?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/registro" className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition">
              Crear mi cuenta
            </a>
            <a href="/servicios" className="inline-block bg-white text-primary font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition border-2 border-primary">
              Ver servicios
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}