"use client";

import Link from "next/link";
import { useState } from "react";
import { Calculator, Check, Package, Scale } from "lucide-react";

import {
  TARIFAS,
  TARIFA_BASE_EXTRA,
  TARIFA_POR_100G,
  calcularTarifa,
} from "@/lib/tarifas";

const ejemplos = [
  { peso: "2,1 kg", detalle: "Base $35,00 + 1 × $1,85", total: "$36,85" },
  { peso: "2,5 kg", detalle: "Base $35,00 + 5 × $1,85", total: "$44,25" },
  { peso: "3 kg", detalle: "Base $35,00 + 10 × $1,85", total: "$53,50" },
];

export default function TarifasPage() {
  const [peso, setPeso] = useState("1");
  const gramos = Math.round(parseFloat(peso || "0") * 1000);
  const estimado = calcularTarifa(gramos).toFixed(2);

  return (
    <div className="bg-gray-50/50">
      {/* ═══ HERO ═══ */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-3">
            Precios de envío
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Tarifas de <span className="text-accent">envío</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Cobramos el peso real de tu paquete. Conocé exactamente cuánto vas a
            pagar antes de comprar.
          </p>
        </div>
      </section>

      {/* ═══ TABLA + CALCULADORA ═══ */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Tabla */}
          <div className="lg:col-span-3 bg-white border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Tabla de tarifas
              </h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground bg-muted/40">
                  <th className="px-6 py-3 font-semibold">Peso del paquete</th>
                  <th className="px-6 py-3 font-semibold text-right">Tarifa</th>
                </tr>
              </thead>
              <tbody>
                {TARIFAS.map((t) => (
                  <tr key={t.etiqueta} className="border-t border-border">
                    <td className="px-6 py-4 text-foreground">{t.etiqueta}</td>
                    <td className="px-6 py-4 text-right font-bold text-foreground">
                      USD {t.precio.toFixed(2).replace(".", ",")}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-border bg-accent-light/60">
                  <td className="px-6 py-4 text-foreground">Más de 2 kg</td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    USD {TARIFA_BASE_EXTRA.toFixed(2).replace(".", ",")} +{" "}
                    USD {TARIFA_POR_100G.toFixed(2).replace(".", ",")} c/100 g
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculadora */}
          <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent-hover flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Cotizá tu envío</h2>
            </div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase">
              Peso (KG)
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-gray-50 outline-none text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
            <div className="mt-4 bg-primary/5 rounded-xl border border-primary/20 p-4 text-center">
              <p className="text-xs text-muted-foreground mb-0.5">Costo estimado</p>
              <p className="text-3xl font-black text-primary">${estimado}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Estimado de referencia según el peso. El monto final depende del peso
              real del paquete.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CÓMO SE APLICA ═══ */}
      <section className="bg-white border-y border-border py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
            ¿Cómo se aplica?
          </h2>
          <div className="w-14 h-1 bg-accent mb-10 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hasta 2 kg */}
            <div className="bg-gray-50 border border-border rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Paquetes hasta 2 kg
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cada rango de peso tiene un precio fijo.
              </p>
              <ul className="space-y-2.5 text-sm">
                {[
                  "300 g → USD 12,50",
                  "800 g → USD 17,50",
                  "1,3 kg → USD 26,25",
                  "1,9 kg → USD 35,00",
                ].map((ej) => (
                  <li key={ej} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{ej}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Más de 2 kg */}
            <div className="bg-gray-50 border border-border rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-accent/20 text-accent-hover flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Paquetes de más de 2 kg
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Se toma una base de <strong>USD 35,00</strong> y se suma{" "}
                <strong>USD 1,85</strong> por cada 100 g adicionales.
              </p>
              <ul className="space-y-2.5 text-sm">
                {ejemplos.map((ej) => (
                  <li key={ej.peso} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent-hover shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      <strong>{ej.peso}</strong> — {ej.detalle} ={" "}
                      <strong>{ej.total}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-accent text-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Listo para comprar?</h2>
          <p className="text-primary/70 mb-8">
            Creá tu casillero gratis y empezá a recibir tus compras en Paraguay.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://ukuxbox.helgasys.com/clients"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors"
            >
              Crear mi Casillero
            </a>
            <Link
              href="/sitio/servicios"
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-white/80 transition-colors border-2 border-primary"
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
