"use client";

import { useState } from "react";

const faqs = [
  {
    pregunta: "¿Qué es UKUX BOX?",
    respuesta:
      "El servicio de Casilla internacional te permite obtener una dirección física en Miami para recibir tus compras realizadas en Estados Unidos, la Unión Europea, o el país que quieras, luego de que te registras gratis como cliente.\n\nTe permite comprar en tiendas de USA a precios locales, aprovechar promociones y ofertas que no están disponibles en Paraguay.\n\nUKUXBOX se encarga de la recepción, transporte internacional, despacho aduanero y entrega en nuestras oficinas en Asunción o envío a domicilio a todo el país.",
  },
  {
    pregunta: "¿Por qué necesito el servicio de Casilla UKUX BOX?",
    respuesta:
      "Muchas tiendas de Estados Unidos no realizan envíos internacionales. Las que sí lo hacen cobran costos de transporte elevados y no gestionan el despacho aduanero en Paraguay.\n\nCon UKUXBOX podés acceder a tiendas, productos, precios y promociones que no existen en Paraguay, mientras nosotros nos encargamos de todos los procesos y costos asociados.",
  },
  {
    pregunta: "¿Qué requisitos debo tener para utilizar el servicio de casilla internacional?",
    respuesta:
      "El único requisito es tener una tarjeta de crédito para poder hacer compras internacionales.\n\nSi no contás con una, podés utilizar nuestro servicio de \"Compramos por ti\" donde nosotros realizamos la compra por vos.",
  },
  {
    pregunta: "¿Cuál es mi dirección de envío o shipping address?",
    respuesta:
      "Tu dirección es: Tu Nombre + Número de casillero (UKU# 00001), 6758 N.W. 72 AV MIAMI – FLORIDA, 33166 – 3049.\n\nPara obtener tu número de casillero único, primero debés registrarte en nuestra plataforma.",
  },
  {
    pregunta: "¿Cómo compro con mi dirección UKUX Box en Miami?",
    respuesta:
      "Es muy simple, en 3 pasos:\n\n1) Ingresá a la tienda online de tu preferencia.\n2) Seleccioná los productos que deseas y agregalos al carrito.\n3) Al momento del checkout, ingresá tu dirección UKUXBOX de Miami con tu código de cliente como dirección de envío (shipping address).",
  },
  {
    pregunta: "Mi proveedor me solicita un número telefónico en los Estados Unidos, ¿qué coloco?",
    respuesta:
      "Tu número UKUX BOX en los Estados Unidos es: (786) 658-1314",
  },
  {
    pregunta: "¿Qué significa billing y shipping address?",
    respuesta:
      "Billing address (dirección de facturación) es la dirección asociada a tu tarjeta de crédito.\n\nShipping address (dirección de envío) es la dirección donde se envía tu compra: Nombre Completo + Número de Casillero, 6758 NW 72nd Av., Miami, FL 33166-3049.",
  },
  {
    pregunta: "¿Puedo autorizar a otras personas a utilizar mi casillero?",
    respuesta:
      "No. El uso de tu casillero está bajo tu responsabilidad y para su uso de forma individual.\n\nCada persona debe registrarse por separado por motivos de seguridad y responsabilidad en el sistema.",
  },
  {
    pregunta: "¿Existe alguna restricción sobre lo que puedo enviar?",
    respuesta:
      "Artículos que requieren manejo especial: perfumes, latas de aerosol, tinta, hielo seco, productos químicos y productos perecederos.\n\nArtículos prohibidos: dinero en efectivo, joyas, bebidas alcohólicas, armas de fuego y municiones, productos perecederos, animales, medicinas y tabaco.\n\nEn consolidados está estrictamente prohibido enviar materiales inflamables, corrosivos, explosivos, armas y municiones (incluyendo armas de caza, defensa personal, tasers, garrotes, pistolas de paintball) y material pornográfico.\n\nServicio especial de perfumes: ofrecemos un consolidado semanal solo de perfumes, permitiendo hasta 3 perfumes de no más de 100ml cada uno semanalmente, con un costo fijo por manejo de US$20.00. Para cantidades mayores, contactá a nuestro equipo de soporte.\n\nLos envíos de carga peligrosa se manejan de forma individual según los requisitos de la TSA, con la documentación correspondiente preparada por nuestra bodega en Miami.",
  },
  {
    pregunta: "¿En cuántos días debería recibir mi compra en Paraguay?",
    respuesta:
      "Los tiempos de tránsito varían entre 5 y 15 días, dependiendo de varios factores, tales como los tiempos de entrega de las tiendas en USA a nuestras bodegas en Miami, o los tiempos de procesamiento en la aduana de Paraguay.\n\nEn temporada alta (Noviembre-Diciembre), le recomendamos hacer sus compras con antelación producto de los retrasos por parte de las aerolíneas que despegan desde la ciudad de Miami a Paraguay por el alto volumen de carga que tiene y quedan con mucha carga Courier rezagada, demorando los procesos normales de entrega por parte de la industria en General.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Preguntas Frecuentes</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Encontrá respuestas a las preguntas más comunes sobre nuestro servicio.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-medium hover:bg-muted/30 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {index + 1}
                  </span>
                  {faq.pregunta}
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 ml-4 text-primary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-muted-foreground border-t border-border pt-4 ml-11 space-y-3">
                  {faq.respuesta.split("\n\n").map((parrafo, i) => (
                    <p key={i}>{parrafo}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-accent/10 border border-accent/30 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-2">¿No encontraste lo que buscabas?</h3>
          <p className="text-muted-foreground mb-6">
            Contactanos y con gusto te ayudamos con tu consulta.
          </p>
          <a
            href="https://wa.me/595991618033"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
