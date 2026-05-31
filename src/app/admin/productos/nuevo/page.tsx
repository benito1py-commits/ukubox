import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductoForm from "../ProductoForm";

export default function NuevoProductoPage() {
  return (
    <div>
      <Link
        href="/admin/productos"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a productos
      </Link>
      <h1 className="text-2xl font-black text-foreground mb-6">
        Nuevo producto
      </h1>
      <ProductoForm />
    </div>
  );
}
