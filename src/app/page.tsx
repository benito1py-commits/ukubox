"use client";

import Link from "next/link";
import { useState } from "react";
import { companyInfo, mockFAQs, mockOficinas } from "@/lib/mock-data";

const steps = [
  {
    num: "01",
    title: "Registrate",
    desc: "Crea tu casilla gratuitamente y ya estarás habilitado para realizar tus compras en el exterior.",
    href: "/login",
  },
  {
    num: "02",
    title: "Comprá Online",
    desc: "Comprá todo lo que deseas y envialo a tu casilla. Nosotros nos encargamos que recibas en Paraguay.",
    href: "/servicios",
  },
  {
    num: "03",
    title: "Seguí tus Paquetes",
    desc: "Podés ir siguiendo los estados de tus paquetes 24/7 para estimar el tiempo de llegada a Asunción.",
    href: "/dashboard/paquetes",
  },
  {
    num: "04",
    title: "Recibí tu Paquete",
    desc: "Podés retirar tus paquetes en nuestra oficina o bien solicitar el servicio de delivery.",
    href: "/dashboard/paquetes",
  },
];

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: "Servicio Aéreo",
    desc: "Envíos rápidos y seguros desde Miami a Paraguay en 7-12 días hábiles.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "Servicio Marítimo",
    desc: "Transporte de carga internacional con la mejor logística para paquetes grandes.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Cargas Prohibidas",
    desc: "Consultá los artículos que no están permitidos para el transporte internacional.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    title: "Delivery de Paquetes",
    desc: "Entrega de paquetes puerta a puerta de forma segura y rápida.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    title: "Servicio de Compras",
    desc: "Realizamos tus compras incluso si no tenés tarjeta de crédito internacional.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Envíos Internacionales",
    desc: "Envíos aéreos y marítimos desde España y Argentina directo a Paraguay.",
  },
];

const stores = [
  "Amazon", "eBay", "Walmart", "SHEIN", "AliExpress", "TEMU", "Forever 21", "Alibaba",
];

const addresses = [
  {
    country: "EEUU",
    flag: "🇺🇸",
    lines: ["6758 N.W. 72 AV", "Miami, FL 33166-3049", "Florida - USA"],
    tel: "+1 (305) 555-0123",
  },
  {
    country: "PARAGUAY",
    flag: "🇵🇾",
    lines: ["Teniente del Valle casi Itapúa", "Asunción - Paraguay"],
    tel: companyInfo.telefono,
  },
];

const sucursales = [
  { nombre: "Asunción - Central", telefono: "0986733000", direccion: "Teniente del Valle casi Itapúa", horario: "Lun-Vie: 08:00-18:00, Sáb: 08:00-12:00" },
  { nombre: "Ciudad del Este", telefono: "0971 111 855", direccion: "Av. San Blas esq. Curupayty", horario: "Lun-Vie: 08:00-16:00, Sáb: 08:00-13:00" },
  { nombre: "Encarnación", telefono: "0983 073 000", direccion: "Av. Irrazábal c/ Tomás R. Pereira", horario: "Lun-Vie: 08:00-17:00" },
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <div>
      {/* HERO - DHL-inspired with tracking */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Tu Casillero en <span className="text-accent">Miami</span>
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Comprá en cualquier tienda de Estados Unidos y recibí tus paquetes
                en Paraguay. Rápido, seguro y al mejor precio.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors"
                >
                  Crear mi Casillero
                </Link>
                <Link
                  href="/servicios"
                  className="bg-white/10 text-white px-8 py-3 rounded-lg font-bold border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>

            {/* Tracking box */}
            <div className="bg-white rounded-2xl p-8 text-foreground shadow-xl">
              <h2 className="text-xl font-bold mb-4">Rastrear tu Envío</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingresá tu número de tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                />
                <button className="bg-accent text-foreground px-6 py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors shrink-0">
                  Rastrear
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Link href="/dashboard/paquetes" className="text-center p-3 rounded-lg bg-primary-light hover:bg-primary/10 transition-colors">
                  <p className="text-sm font-bold text-primary">Mis Paquetes</p>
                  <p className="text-xs text-muted-foreground mt-1">Ver estado</p>
                </Link>
                <Link href="/servicios" className="text-center p-3 rounded-lg bg-accent-light hover:bg-accent/10 transition-colors">
                  <p className="text-sm font-bold text-primary">Cotizar</p>
                  <p className="text-xs text-muted-foreground mt-1">Ver tarifas</p>
                </Link>
                <Link href="/login" className="text-center p-3 rounded-lg bg-muted hover:bg-gray-200 transition-colors">
                  <p className="text-sm font-bold text-primary">Mi Casillero</p>
                  <p className="text-xs text-muted-foreground mt-1">Ingresar</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Servicios</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detallamos algunos de nuestros servicios. Para más detalles contactanos por WhatsApp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-border rounded-xl p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="text-primary mb-4 flex justify-center group-hover:text-accent transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUESTRO MANEJO */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Nuestro Manejo</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Para que confíes en nuestra forma de trabajar, acá te enseñamos nuestro método.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Reempaque y Almacenaje", desc: "Podemos reempacar y almacenar tus paquetes de acuerdo a tus necesidades.", icon: "📦" },
              { title: "Tu Carga Segura", desc: "Transportamos tus cargas con profesionalismo y total seguridad.", icon: "🛡️" },
              { title: "Transporte Global", desc: "Podemos transportar tus paquetes desde y hacia cualquier parte del mundo.", icon: "🌍" },
              { title: "Warehousing", desc: "Tenemos seguridad de primer nivel y espacio para almacenar tus compras.", icon: "🏭" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center border border-border">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECCIONES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Direcciones</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Estas son las direcciones de nuestros almacenes para configurar tu casillero.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addresses.map((addr) => (
              <div key={addr.country} className="bg-white border-2 border-primary/20 rounded-xl p-8 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{addr.flag}</span>
                  <h3 className="font-bold text-lg">Dirección {addr.country}</h3>
                </div>
                {addr.lines.map((line) => (
                  <p key={line} className="text-muted-foreground">{line}</p>
                ))}
                <p className="mt-3 font-medium text-primary">Tel: {addr.tel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASOS PARA COMPRAR */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Pasos para Realizar tu Compra</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-white/70">
              Seguí estos pasos para realizar tus compras y traerlo directo hasta tu hogar.
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                  activeStep === i
                    ? "bg-accent text-foreground scale-110"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <p className="text-accent text-sm font-bold mb-2">Paso {steps[activeStep].num}</p>
            <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
            <p className="text-white/80 mb-6">{steps[activeStep].desc}</p>
            <Link
              href={steps[activeStep].href}
              className="inline-block bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors"
            >
              {activeStep === 0 ? "Registrate Gratis" : "Ver Más"}
            </Link>
          </div>
        </div>
      </section>

      {/* DÓNDE COMPRAR */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">¿Dónde Comprar?</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Comprá en las mayores tiendas online del mundo
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stores.map((store) => (
              <div
                key={store}
                className="bg-white border border-border rounded-xl p-6 text-center hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <p className="font-bold text-foreground">{store}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Preguntas Frecuentes</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Encontrá respuestas a las preguntas más comunes sobre nuestro servicio.
            </p>
          </div>
          <div className="space-y-3">
            {mockFAQs.slice(0, 6).map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between font-medium hover:bg-muted/50 transition-colors"
                >
                  <span>{faq.pregunta}</span>
                  <svg
                    className={`w-5 h-5 shrink-0 ml-4 transition-transform text-primary ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/preguntas-frecuentes" className="text-primary font-medium hover:underline">
              Ver todas las preguntas →
            </Link>
          </div>
        </div>
      </section>

      {/* SUCURSALES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Nuestras Sucursales</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Encontrá la sucursal más cercana a tu ubicación.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sucursales.map((suc) => (
              <div key={suc.nombre} className="bg-white border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">{suc.nombre}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-muted-foreground">{suc.telefono}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-muted-foreground">{suc.direccion}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-muted-foreground">{suc.horario}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Contacto</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground">
              Ponete en contacto con nosotros por alguno de estos medios.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-border">
              <h3 className="font-bold text-lg mb-4">Envianos un mensaje</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Nombre completo" className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="text" placeholder="Asunto" className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30" />
                <textarea placeholder="Mensaje" rows={4} className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors w-full">
                  Enviar
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-border">
                <h4 className="font-bold mb-3">Dirección</h4>
                <p className="text-muted-foreground text-sm">{companyInfo.direccion}</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border">
                <h4 className="font-bold mb-3">WhatsApp</h4>
                <a href={`https://wa.me/595${companyInfo.telefono}`} className="text-primary font-medium hover:underline">
                  +595 {companyInfo.telefono}
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border">
                <h4 className="font-bold mb-3">Email</h4>
                <a href={`mailto:${companyInfo.email}`} className="text-primary font-medium hover:underline">
                  {companyInfo.email}
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 border border-border">
                <h4 className="font-bold mb-3">Horario</h4>
                <p className="text-muted-foreground text-sm">{companyInfo.horario}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-foreground mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-lg mx-auto">
            Registrate hoy y obtené tu dirección en Miami. Empezá a comprar en
            tus tiendas favoritas de USA.
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
          >
            Crear mi Casillero Gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
