// Tarifas de envío por peso (USD). Única fuente de verdad: la usan tanto la
// página /sitio/tarifas como la calculadora del home.
//
// IMPORTANTE: el tarifario trabaja por TRAMOS (rangos de peso), no de forma
// proporcional. Todo paquete cuyo peso caiga dentro de un rango paga la tarifa
// de ese rango:
//
//   0 a 500 g          → USD 12,50  (mínimo, no sigue el precio por kilo)
//   501 g a 1 kg       → USD 19,50
//   1,001 kg a 1,5 kg  → USD 29,25
//   1,501 kg a 2 kg    → USD 39,00
//   más de 2 kg        → USD 39,00 + USD 1,95 por cada 100 g adicionales
//                        (fracción de 100 g se cobra completa)
//
// Del kilo en adelante la tabla es exactamente USD 19,50 por kilo, incluido el
// adicional (1,95 × 10 = 19,50). El primer tramo es un mínimo comercial fijo.

/** Tramos de peso. `hasta` es el límite superior del tramo, en gramos. */
export const TARIFAS = [
  { hasta: 500, precio: 12.5, etiqueta: "De 0 a 500 g" },
  { hasta: 1000, precio: 19.5, etiqueta: "De 501 g a 1 kg" },
  { hasta: 1500, precio: 29.25, etiqueta: "De 1,001 kg a 1,5 kg" },
  { hasta: 2000, precio: 39.0, etiqueta: "De 1,501 kg a 2 kg" },
] as const;

/** Precio del último tramo (2 kg): base para los paquetes de más de 2 kg. */
export const TARIFA_BASE_EXTRA = 39.0;
/** Adicional por cada 100 g (o fracción) por encima de 2 kg. */
export const TARIFA_POR_100G = 1.95;

/** Redondeo a 2 decimales con medio hacia arriba, robusto ante el error de punto
 *  flotante (p. ej. 51,095 → 51,10). */
function redondear2(n: number): number {
  return Math.round((n + 1e-9) * 100) / 100;
}

/**
 * Costo de envío en USD a partir del peso en gramos, por tramos:
 * - Hasta 2 kg: la tarifa fija del tramo en el que cae el peso.
 * - Más de 2 kg: USD 39,00 + USD 1,95 por cada 100 g adicionales, cobrando
 *   completa la fracción de 100 g (p. ej. 2.150 g → 39,00 + 2 × 1,95 = 42,90).
 * El resultado se devuelve ya redondeado a 2 decimales.
 */
export function calcularTarifa(gramos: number): number {
  if (!Number.isFinite(gramos) || gramos <= 0) return 0;

  for (const tramo of TARIFAS) {
    if (gramos <= tramo.hasta) return redondear2(tramo.precio);
  }

  // Más de 2 kg: cada 100 g adicionales (o fracción) suman USD 1,95.
  const ultimo = TARIFAS[TARIFAS.length - 1];
  const cienGramosExtra = Math.ceil((gramos - ultimo.hasta) / 100);
  return redondear2(ultimo.precio + cienGramosExtra * TARIFA_POR_100G);
}
