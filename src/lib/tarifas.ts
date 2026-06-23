// Tarifas de envío por peso (USD). Única fuente de verdad: la usan tanto la
// página /sitio/tarifas como la calculadora del home.

/** Tramos de precio fijo hasta 2 kg. `hasta` es el límite superior en gramos. */
export const TARIFAS = [
  { hasta: 500, precio: 12.5, etiqueta: "0 a 500 g" },
  { hasta: 1000, precio: 17.5, etiqueta: "501 g a 1 kg" },
  { hasta: 1500, precio: 26.25, etiqueta: "1,1 kg a 1,5 kg" },
  { hasta: 2000, precio: 35.0, etiqueta: "1,6 kg a 2 kg" },
] as const;

/** Base para paquetes de más de 2 kg. */
export const TARIFA_BASE_EXTRA = 35.0;
/** Adicional por cada 100 g (o fracción) por encima de 2 kg. */
export const TARIFA_POR_100G = 1.85;

/**
 * Costo de envío en USD a partir del peso en gramos.
 * - Hasta 2 kg: precio fijo según el tramo.
 * - Más de 2 kg: USD 35,00 + USD 1,85 por cada 100 g adicionales.
 */
export function calcularTarifa(gramos: number): number {
  if (!Number.isFinite(gramos) || gramos <= 0) return 0;
  for (const t of TARIFAS) {
    if (gramos <= t.hasta) return t.precio;
  }
  const bloques = Math.ceil((gramos - 2000) / 100); // cada 100 g (o fracción) cuenta
  return TARIFA_BASE_EXTRA + bloques * TARIFA_POR_100G;
}
