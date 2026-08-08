import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Paginación para listas renderizadas en el servidor. No tiene estado: navega
 * con <Link>, así que la página conserva cualquier otro filtro que `hrefPagina`
 * quiera arrastrar en la query string.
 */
export default function Paginacion({
  pagina,
  totalPaginas,
  total,
  hrefPagina,
}: {
  pagina: number;
  totalPaginas: number;
  /** Cantidad total de registros, para el texto de resumen. */
  total?: number;
  hrefPagina: (n: number) => string;
}) {
  if (totalPaginas <= 1) return null;

  const hayAnterior = pagina > 1;
  const haySiguiente = pagina < totalPaginas;

  const base =
    "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors";
  const activo = "bg-white border border-border text-foreground hover:border-primary";
  const inactivo = "text-muted-foreground cursor-not-allowed opacity-50";

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center justify-between gap-3 mt-6"
    >
      {hayAnterior ? (
        <Link href={hrefPagina(pagina - 1)} className={`${base} ${activo}`}>
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Link>
      ) : (
        <span className={`${base} ${inactivo}`}>
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </span>
      )}

      <span className="text-sm text-muted-foreground">
        Página {pagina} de {totalPaginas}
        {total != null && ` · ${total} en total`}
      </span>

      {haySiguiente ? (
        <Link href={hrefPagina(pagina + 1)} className={`${base} ${activo}`}>
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className={`${base} ${inactivo}`}>
          Siguiente
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
