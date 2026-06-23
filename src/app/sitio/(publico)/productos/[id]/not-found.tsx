import Link from "next/link";
import { PackageX } from "lucide-react";

export default function ProductoNoEncontrado() {
  return (
    <div className="bg-gray-50/50 min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-5">
          <PackageX className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-black text-foreground mb-2">
          Producto no encontrado
        </h1>
        <p className="text-muted-foreground mb-6">
          Este producto no existe o ya no está disponible en el catálogo.
        </p>
        <Link
          href="/sitio/productos"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
