"use client";

import { useState } from "react";

const faqs = [
  { pregunta: "¿Cómo obtengo mi dirección en Miami?", respuesta: "Al registrarte en UKUXBOX, recibirás automáticamente una dirección en Miami con tu número de casillero único. Esta dirección la puedes usar en cualquier tienda online de Estados Unidos para recibir tus compras." },
  { pregunta: "¿Cuánto tiempo tarda en llegar mi paquete?", respuesta: "El tiempo de tránsito desde Miami hasta nuestras oficinas en Paraguay es de aproximadamente 7 a 12 días hábiles, dependiendo del tipo de envío y el despacho aduanero." },
  { pregunta: "¿Cómo se calcula el costo del envío?", respuesta: "El costo se calcula por peso en libras. Nuestras tarifas arrancan desde $8 por libra para envíos regulares. Paquetes más pesados pueden tener tarifas especiales. Contactanos para una cotización personalizada." },
  { pregunta: "¿Qué es una Pre-Alerta?", respuesta: "La Pre-Alerta es un aviso que vos enviás cuando comprás algo online. Nos decís el número de tracking, la tienda y el valor declarado, así podemos prepararnos para recibir tu paquete y agilizar el proceso." },
  { pregunta: "¿Puedo consolidar varios paquetes?", respuesta: "Sí, ofrecemos servicio de consolidación. Podés acumular varios paquetes en tu casillero de Miami y enviarlos todos juntos en un solo despacho, ahorrando en costos de envío." },
  { pregunta: "¿Qué productos no se pueden enviar?", respuesta: "No se pueden enviar materiales peligrosos, armas, drogas, alimentos perecederos, animales vivos, ni artículos prohibidos por la legislación paraguaya. Consultá nuestra lista completa de artículos restringidos." },
  { pregunta: "¿Cómo puedo pagar?", respuesta: "Aceptamos pagos en efectivo en nuestras oficinas, transferencias bancarias, y pagos con tarjeta de crédito/débito. También aceptamos pagos por Giros Tigo y Billetera Personal." },
  { pregunta: "¿Qué hago si mi paquete llega dañado?", respuesta: "Si tu paquete llega dañado, por favor reportalo inmediatamente en nuestras oficinas al momento del retiro. Tomaremos fotos y iniciaremos un reclamo. Recomendamos siempre contratar el seguro adicional para compras de alto valor." },
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
                <div className="px-6 pb-5 text-muted-foreground border-t border-border pt-4 ml-11">
                  {faq.respuesta}
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
            href="https://wa.me/595986733000"
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
