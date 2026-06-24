"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Package2, Calculator, Plane, Ship, Ban, Truck, ShoppingCart, Globe, Box, Shield, Warehouse, MapPin, Phone, Clock, Mail, LogIn } from "lucide-react";

import { calcularTarifa } from "@/lib/tarifas";

const steps = [
  { num: "01", title: "Registrate", desc: "Creá tu casilla gratuitamente y ya estarás habilitado para realizar tus compras en el exterior.", href: "https://ukuxbox.helgasys.com/clients" },
  { num: "02", title: "Comprá Online", desc: "Comprá todo lo que deseas en cualquier tienda de USA y envialo a tu casilla en Miami.", href: "/servicios" },
  { num: "03", title: "Seguí tus Paquetes", desc: "Seguí los estados de tus paquetes 24/7 desde tu panel de cliente.", href: "https://parcelsapp.com/" },
  { num: "04", title: "Recibí tu Paquete", desc: "Retirá en nuestra oficina o solicitá delivery a tu domicilio.", href: "https://wa.me/595982278071" },
];

const services = [
  { icon: Plane, title: "Servicio Aéreo", desc: "Envíos rápidos y seguros desde Miami a Paraguay en 7-12 días hábiles." },
  { icon: Ship, title: "Servicio Marítimo", desc: "Transporte de carga internacional con la mejor logística para paquetes grandes." },
  { icon: Ban, title: "Cargas Prohibidas", desc: "Consultá los artículos que no están permitidos para el transporte internacional." },
  { icon: Truck, title: "Delivery de Paquetes", desc: "Entrega de paquetes puerta a puerta de forma segura y rápida." },
  { icon: ShoppingCart, title: "Servicio de Compras", desc: "Realizamos tus compras incluso si no tenés tarjeta de crédito internacional." },
  { icon: Globe, title: "Envíos Internacionales", desc: "Envíos aéreos y marítimos desde España y Argentina directo a Paraguay." },
];

const stores = ["Amazon", "eBay", "Walmart", "SHEIN", "AliExpress", "TEMU", "Forever 21", "Alibaba"];

const manejoItems = [
  { icon: Box, title: "Reempaque y Almacenaje", desc: "Podemos reempacar y almacenar tus paquetes de acuerdo a tus necesidades." },
  { icon: Shield, title: "Tu Carga Segura", desc: "Transportamos tus cargas con profesionalismo y total seguridad." },
  { icon: Globe, title: "Transporte Global", desc: "Podemos transportar tus paquetes desde y hacia cualquier parte del mundo." },
  { icon: Warehouse, title: "Warehousing", desc: "Tenemos seguridad de primer nivel y espacio para almacenar tus compras." },
];

const addresses = [
  { country: "EEUU (Miami)", flag: "🇺🇸", lines: ["6758 N.W. 72 AV", "Miami, FL 33166-3049", "Florida - USA"], tel: "+1 (305) 430-5100" },
  { country: "Paraguay", flag: "🇵🇾", lines: ["España 2220 casi América", "Asunción - Paraguay"], tel: "+595 982 278 071" },
];

const sucursales = [
  { nombre: "Asunción - Central", telefono: "0982 278 071", direccion: "España 2220 casi América", horario: "Lun-Vie: 08:00-18:00, Sáb: 08:00-12:00" },
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  const [weight, setWeight] = useState("1");
  const [contactSent, setContactSent] = useState(false);
  const contactFormRef = useRef<HTMLFormElement>(null);
  const gramos = Math.round(parseFloat(weight || "0") * 1000);
  const estimatedCost = calcularTarifa(gramos).toFixed(2);

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-blue-900 min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 py-16 lg:py-20 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="flex-1 text-white text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
              Tu Casillero en{" "}
              <span className="text-accent">Miami</span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Comprá en cualquier tienda de Estados Unidos y recibí tus paquetes en Paraguay. Rápido, seguro y al mejor precio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://ukuxbox.helgasys.com/clients" target="_blank" rel="noopener noreferrer" className="bg-accent text-foreground px-8 py-3.5 rounded-lg text-base font-bold hover:bg-accent-hover shadow-lg transition-all text-center">
                Crear Casillero Gratis
              </a>
              <Link href="/sitio/acceder" className="inline-flex items-center justify-center gap-2 bg-white/10 border-2 border-white/40 text-white px-8 py-3.5 rounded-lg text-base font-bold hover:bg-white/20 transition-all text-center">
                <LogIn size={18} />
                Login
              </Link>
              <Link href="/sitio/servicios" className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg text-base font-bold hover:bg-white/10 transition-all text-center">
                Ver Servicios
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/70 text-center lg:text-left">
              ¿Ya tenés casillero?{" "}
              <Link href="/sitio/acceder" className="font-semibold text-accent hover:underline">
                Iniciá sesión acá
              </Link>
            </p>
          </div>

          <div className="w-full max-w-md lg:w-[420px] lg:shrink-0 flex flex-col gap-5">
            {/* Tracking */}
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Package2 size={18} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Rastreá tu Envío</h3>
              </div>
              <a
                href="https://ukuxbox.helgasys.com/consulta-estado/consulta-estado"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-hover shadow transition-all text-center"
              >
                Rastrear Envío
              </a>
            </div>

            {/* Calculator */}
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center text-accent-hover">
                  <Calculator size={18} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Cotizá tu Envío</h3>
              </div>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase">Peso (KG)</label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 outline-none text-base"
                  />
                </div>
                <div className="flex-1 bg-primary/5 rounded-lg border border-primary/20 p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-0.5">Estimado</p>
                  <p className="text-2xl font-bold text-primary">${estimatedCost}</p>
                </div>
              </div>
              <Link
                href="/sitio/tarifas"
                className="block text-center text-sm font-semibold text-primary hover:underline mt-3"
              >
                Ver todas las tarifas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICIOS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Servicios</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Detallamos algunos de nuestros servicios. Para más detalles contactanos por WhatsApp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white border border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://wa.me/595982278071"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Más Información
            </a>
          </div>
        </div>
      </section>

      {/* ═══ NUESTRO MANEJO ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Nuestro Manejo</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Para que confíes en nuestra forma de trabajar, acá te enseñamos nuestro método.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {manejoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-xl p-8 text-center shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5 text-accent-hover">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ DIRECCIONES ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Direcciones</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Estas son las direcciones de nuestros almacenes para configurar tu casillero.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addresses.map((addr) => (
              <div key={addr.country} className="bg-white border-2 border-border rounded-xl p-8 hover:border-primary/30 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{addr.flag}</span>
                  <h3 className="font-bold text-xl">Dirección {addr.country}</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  {addr.lines.map((line) => (
                    <p key={line} className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary shrink-0" /> {line}
                    </p>
                  ))}
                  <p className="flex items-center gap-2 pt-2 font-semibold text-primary">
                    <Phone size={14} /> {addr.tel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PASOS PARA COMPRAR ═══ */}
      <section className="py-20 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Pasos para Realizar tu Compra</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-gray-400 max-w-xl mx-auto">
              Seguí estos simples pasos para recibir tus compras directo hasta tu hogar.
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-10">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`w-14 h-14 rounded-full font-bold text-lg transition-all ${
                  activeStep === i
                    ? "bg-accent text-foreground scale-110 shadow-lg"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-2xl p-10 border border-white/10 min-h-[240px] flex flex-col justify-center">
            <p className="text-accent font-bold mb-2 uppercase tracking-widest text-sm">Paso {steps[activeStep].num}</p>
            <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed">{steps[activeStep].desc}</p>
            <a
              href={steps[activeStep].href}
              target={steps[activeStep].href.startsWith("http") ? "_blank" : undefined}
              rel={steps[activeStep].href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex mx-auto bg-accent text-foreground px-8 py-3 rounded-lg font-bold hover:bg-accent-hover transition-colors"
            >
              {activeStep === 0 ? "Registrate Gratis" : "Continuar"}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ DÓNDE COMPRAR ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">¿Dónde Comprar?</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprá en las mayores tiendas online del mundo.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stores.map((store) => (
              <div
                key={store}
                className="bg-gray-50 border border-border rounded-xl p-6 text-center hover:border-primary/30 hover:shadow-md hover:bg-white transition-all cursor-pointer"
              >
                <p className="font-bold text-foreground">{store}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUCURSALES ═══ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Nuestras Sucursales</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Encontrá la sucursal más cercana a tu ubicación.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
            {sucursales.map((suc) => (
              <div key={suc.nombre} className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-4">{suc.nombre}</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone size={14} className="text-primary shrink-0" />
                    <a href={`https://wa.me/595${suc.telefono.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">
                      {suc.telefono}
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                    {suc.direccion}
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock size={14} className="text-primary shrink-0 mt-0.5" />
                    {suc.horario}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACTO ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Contacto</h2>
            <div className="w-14 h-1 bg-accent mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ponete en contacto con nosotros por alguno de estos medios.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
              <h3 className="font-bold text-xl mb-6">Envianos un mensaje</h3>
              <form ref={contactFormRef} className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                const asunto = (form.elements.namedItem("asunto") as HTMLInputElement).value;
                const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value;
                if (!nombre || !email || !mensaje) return;
                const text = `Hola, soy ${nombre} (${email}).%0A%0AAsunto: ${asunto}%0A%0A${mensaje}`;
                window.open(`https://wa.me/595982278071?text=${text}`, "_blank");
                setContactSent(true);
                form.reset();
                setTimeout(() => setContactSent(false), 3000);
              }}>
                <input type="text" name="nombre" placeholder="Nombre completo" required className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 focus:bg-white transition-colors" />
                <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 focus:bg-white transition-colors" />
                <input type="text" name="asunto" placeholder="Asunto" className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-gray-50 focus:bg-white transition-colors" />
                <textarea name="mensaje" placeholder="Mensaje" rows={4} required className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none resize-none bg-gray-50 focus:bg-white transition-colors" />
                <button type="submit" className="w-full bg-primary text-white px-8 py-3.5 rounded-lg font-bold hover:bg-primary-hover shadow transition-all">
                  Enviar
                </button>
                {contactSent && (
                  <p className="text-green-600 text-sm text-center">Se abrió WhatsApp con tu mensaje.</p>
                )}
              </form>
            </div>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Dirección", text: "España 2220 casi América\nAsunción, Paraguay" },
                { icon: Phone, title: "WhatsApp", text: "+595 982 278 071", href: "https://wa.me/595982278071" },
                { icon: Mail, title: "Email", text: "sac@ukuxbox.com", href: "mailto:sac@ukuxbox.com" },
                { icon: Clock, title: "Horario", text: "Lunes a Viernes: 8:00 - 18:00\nSábados: 8:00 - 12:00" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-line">{item.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-foreground mb-4">¿Listo para empezar?</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Registrate hoy y obtené tu dirección en Miami. Empezá a comprar en tus tiendas favoritas de USA.
          </p>
          <a
            href="https://ukuxbox.helgasys.com/clients"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-primary text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-hover shadow-lg transition-all"
          >
            Crear mi Casillero Gratis
          </a>
        </div>
      </section>
    </div>
  );
}
