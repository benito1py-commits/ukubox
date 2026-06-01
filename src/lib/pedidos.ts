import type { EstadoPedido } from "@/lib/supabase/types";

// Etiqueta y estilos (clases Tailwind) para cada estado de un pedido.
export const ESTADO_PEDIDO_META: Record<
  EstadoPedido,
  { label: string; badge: string }
> = {
  pendiente: { label: "Pendiente", badge: "bg-warning/10 text-warning" },
  cotizado: { label: "Cotizado", badge: "bg-primary/10 text-primary" },
  pago_informado: {
    label: "Pago informado",
    badge: "bg-accent/20 text-accent-hover",
  },
  pagado: { label: "Pagado", badge: "bg-success/10 text-success" },
  completado: { label: "Completado", badge: "bg-muted text-muted-foreground" },
  rechazado: { label: "Rechazado", badge: "bg-danger/10 text-danger" },
};

export function metaEstado(estado: string) {
  return (
    ESTADO_PEDIDO_META[estado as EstadoPedido] ?? {
      label: estado,
      badge: "bg-muted text-muted-foreground",
    }
  );
}
