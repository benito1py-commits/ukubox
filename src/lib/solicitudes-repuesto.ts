import type {
  EstadoSolicitud,
  UrgenciaSolicitud,
} from "@/lib/supabase/types";

// Etiqueta y estilos (clases Tailwind) para cada estado de una solicitud de repuesto.
export const ESTADO_SOLICITUD_META: Record<
  EstadoSolicitud,
  { label: string; badge: string }
> = {
  pendiente: { label: "Pendiente", badge: "bg-warning/10 text-warning" },
  en_consulta: {
    label: "En consulta",
    badge: "bg-accent/20 text-accent-hover",
  },
  cotizado: { label: "Cotizado", badge: "bg-primary/10 text-primary" },
  cerrado: { label: "Cerrado", badge: "bg-success/10 text-success" },
  rechazado: { label: "Rechazado", badge: "bg-danger/10 text-danger" },
};

export function metaEstadoSolicitud(estado: string) {
  return (
    ESTADO_SOLICITUD_META[estado as EstadoSolicitud] ?? {
      label: estado,
      badge: "bg-muted text-muted-foreground",
    }
  );
}

export const URGENCIA_META: Record<
  UrgenciaSolicitud,
  { label: string; badge: string }
> = {
  normal: { label: "Normal", badge: "bg-muted text-muted-foreground" },
  urgente: {
    label: "Urgente — vehículo parado",
    badge: "bg-danger/10 text-danger",
  },
  sin_apuro: { label: "Sin apuro", badge: "bg-muted text-muted-foreground" },
};

export function metaUrgencia(urgencia: string) {
  return (
    URGENCIA_META[urgencia as UrgenciaSolicitud] ?? {
      label: urgencia,
      badge: "bg-muted text-muted-foreground",
    }
  );
}
