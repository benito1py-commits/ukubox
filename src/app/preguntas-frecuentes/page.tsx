"use client";

import { useState } from "react";
import { mockFAQs } from "@/lib/mock-data";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-black mb-4">Preguntas Frecuentes</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Encontrá respuestas a las preguntas más comunes sobre nuestro servicio.
      </p>

      <div className="space-y-3">
        {mockFAQs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between font-medium hover:bg-muted/50 transition-colors"
            >
              <span>{faq.pregunta}</span>
              <svg
                className={`w-5 h-5 shrink-0 ml-4 transition-transform ${
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
              <div className="px-6 pb-4 text-muted-foreground">
                {faq.respuesta}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
