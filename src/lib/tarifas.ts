// Tarifas de envío por peso (USD). Única fuente de verdad: la usan tanto la
// página /sitio/tarifas como la calculadora del home.
//
// IMPORTANTE: el tarifario NO trabaja por bloques ni quiebres fijos. Los quiebres
// son solo puntos de referencia. El precio se calcula de forma PROPORCIONAL con el
// peso exacto: entre un quiebre y el siguiente aumenta linealmente según los gramos
// adicionales, sin redondear al tramo superior.
//
// Ejemplo: entre 0,5 kg (USD 12,50) y 1 kg (USD 17,50) hay USD 5,00 en 500 g, o sea
// USD 0,01 por gramo. Entonces 0,65 kg = 12,50 + 150 g × 0,01 = USD 14,00.

/** Puntos de referencia (quiebres). `hasta` es el peso del punto en gramos. */
export const TARIFAS = [
  { hasta: 500, precio: 12.5, etiqueta: "Hasta 0,5 kg" },
  { hasta: 1000, precio: 17.5, etiqueta: "1 kg" },
  { hasta: 1500, precio: 26.25, etiqueta: "1,5 kg" },
  { hasta: 2000, precio: 35.0, etiqueta: "2 kg" },
] as const;

/** Precio de referencia en 2 kg (base para el tramo de más de 2 kg). */
export const TARIFA_BASE_EXTRA = 35.0;
/** Adicional lineal por cada 100 g por encima de 2 kg (USD 0,0185 por gramo). */
export const TARIFA_POR_100G = 1.85;

/** Redondeo a 2 decimales con medio hacia arriba, robusto ante el error de punto
 *  flotante (p. ej. 51,095 → 51,10). */
function redondear2(n: number): number {
  return Math.round((n + 1e-9) * 100) / 100;
}

/**
 * Costo de envío en USD a partir del peso EXACTO en gramos, calculado de forma
 * proporcional (lineal) entre los puntos de referencia.
 * - Hasta el primer quiebre (0,5 kg): tarifa mínima.
 * - Entre quiebres: interpolación lineal según los gramos adicionales.
 * - Más de 2 kg: USD 35,00 + USD 0,0185 por cada gramo adicional (USD 1,85 c/100 g).
 * El resultado se devuelve ya redondeado a 2 decimales.
 */
export function calcularTarifa(gramos: number): number {
  if (!Number.isFinite(gramos) || gramos <= 0) return 0;

  const primero = TARIFAS[0];
  // Hasta el primer punto de referencia se cobra la tarifa mínima.
  if (gramos <= primero.hasta) return redondear2(primero.precio);

  // Interpolación lineal entre dos quiebres consecutivos.
  for (let i = 1; i < TARIFAS.length; i++) {
    const ant = TARIFAS[i - 1];
    const act = TARIFAS[i];
    if (gramos <= act.hasta) {
      const pendiente = (act.precio - ant.precio) / (act.hasta - ant.hasta);
      return redondear2(ant.precio + (gramos - ant.hasta) * pendiente);
    }
  }

  // Más de 2 kg: lineal por gramo (USD 1,85 cada 100 g).
  const ultimo = TARIFAS[TARIFAS.length - 1];
  const porGramo = TARIFA_POR_100G / 100;
  return redondear2(ultimo.precio + (gramos - ultimo.hasta) * porGramo);
}
