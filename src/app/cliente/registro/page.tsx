import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getPaises,
  getTiposIdentificacion,
  type Pais,
  type TipoIdentificacion,
} from "../_lib/helga";
import RegistroForm from "./RegistroForm";

export const metadata = {
  title: "Crear casillero — UKUXBOX",
};

export const dynamic = "force-dynamic";

export default async function RegistroPage() {
  // Precargamos los catálogos que no dependen de otra selección.
  let paises: Pais[] = [];
  let tiposId: TipoIdentificacion[] = [];
  try {
    [paises, tiposId] = await Promise.all([
      getPaises(),
      getTiposIdentificacion(),
    ]);
  } catch {
    // Si fallan los catálogos, el form igual carga (los selects quedan vacíos).
  }

  return (
    <main className="flex min-h-screen flex-col bg-muted">
      {/* Barra superior con logo */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/sitio" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-primary">UKU</span>
              <span className="text-foreground">XBOX</span>
            </span>
            <span className="ml-1 flex gap-0.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
              <span className="h-2.5 w-2.5 rounded-sm bg-primary/60" />
            </span>
          </Link>
          <Link
            href="/cliente/login"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Ya tengo cuenta
          </Link>
        </div>
      </header>

      {/* Formulario */}
      <div className="flex flex-1 justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-foreground">
            Creá tu casillero gratis
          </h1>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">
            Completá tus datos para empezar a comprar en Estados Unidos.
          </p>
          <RegistroForm paises={paises} tiposId={tiposId} />
        </div>
      </div>
    </main>
  );
}
