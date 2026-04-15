import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios - UKUXBOX",
  description: "Conocé todos los servicios que ofrece UKUXBOX: Casilla en Miami, Carga General, Carga Marítima y Compramos por ti.",
};

export default function ServiciosPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Soluciones logísticas integrales para que comprar y transportar se haga simple.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Casilla en Miami */}
          <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-14 h-14 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Casilla en Miami</h2>
            <p className="text-muted-foreground mb-4">
              Tu propia bodega en Miami. Opción de varios vuelos semanales en diferentes aerolíneas que avalan nuestra seriedad y servicio.
            </p>
            <p className="text-muted-foreground mb-4 text-sm">
              Tarifa desde 100 gramos. Proceso automatizado, tarifas fijas. Mejora tus tiempos de transito en la entrega de tus compras y gana tiempo para ti con nuestro servicio todo incluido.
            </p>
            <p className="text-muted-foreground mb-6 text-sm">
              Cobramos el peso real de tu compra. Con excepciones de volumen demasiado desproporcionados.
            </p>
            <ul className="space-y-3">
              {[
                "Tarifa desde 100 gramos",
                "Cobramos el peso real de tu compra",
                "Varios vuelos semanales disponibles",
                "Servicio todo incluido",
                "Notificación cuando llega tu paquete",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carga General */}
          <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-14 h-14 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Carga General</h2>
            <p className="text-muted-foreground mb-6">
              Manejamos tu carga general de principio a fin, ya sea su origen desde Miami o desde cualquier parte del mundo hacia Paraguay, manteniendo el control sobre la misma y su trazabilidad en todo momento, entregándote la tranquilidad que necesitas para todas tus importaciones de mayor peso o envergadura.
            </p>
            <ul className="space-y-3">
              {[
                "Gestión completa de origen a destino",
                "Desde Miami o cualquier parte del mundo",
                "Control y trazabilidad total",
                "Ideal para envíos más pesados o complejos",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carga Marítima */}
          <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-14 h-14 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Carga Marítima</h2>
            <p className="text-muted-foreground mb-4">
              Podemos manejar tu carga marítima de principio a fin, desde cualquier lugar del mundo como origen y destino final Paraguay.
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">FCL (Full Container Load)</h3>
                <p className="text-muted-foreground text-sm">
                  Opción adecuada para tu empresa si esta tiene suficiente carga para llenar un contenedor completo ya sea de 20 pies o de 40 pies.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">LCL (Less than Container Load)</h3>
                <p className="text-muted-foreground text-sm">
                  Es la alternativa adecuada si tienes una menor cantidad de carga que no llena un contenedor completo.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Desde cualquier parte del mundo a Paraguay",
                "Opciones FCL y LCL disponibles",
                "Reducción de costos en envíos grandes",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Compramos por ti */}
          <div className="bg-white border border-border rounded-xl p-8 hover:shadow-lg transition-shadow group">
            <div className="w-14 h-14 bg-accent/20 text-accent rounded-lg flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-primary transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-3">Compramos por ti</h2>
            <p className="text-muted-foreground mb-4">
              En UKUX BOX podemos ayudarte a ahorrar tiempo y dinero. Contamos con ejecutivos asignados para brindar una experiencia de compra personalizada.
            </p>
            <p className="text-muted-foreground mb-6 text-sm">
              Contamos con nuestra bodega de consolidación y agentes logísticos en distintos continentes para atender tus requerimientos sin excepción.
            </p>
            <ul className="space-y-3">
              {[
                "Ejecutivos asignados para tu compra",
                "Cotización en moneda local",
                "Plazos de entrega definidos",
                "Bodegas de consolidación en varios continentes",
                "No necesitás tarjeta de crédito internacional",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Tenés dudas sobre nuestros servicios?</h2>
          <p className="text-primary/70 mb-8">
            Contactanos y con gusto te asesoramos para encontrar la mejor opción para vos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sitio/registro" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors">
              Crear mi cuenta
            </Link>
            <Link href="/sitio/preguntas-frecuentes" className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-white/80 transition-colors border-2 border-primary">
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
