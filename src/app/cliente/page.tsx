import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Package, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { getValidAccessToken, getPerfil, type Perfil } from "./_lib/helga";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Mi casillero",
};

// Siempre dinámico: depende de las cookies de sesión.
export const dynamic = "force-dynamic";

export default async function ClientePage() {
  let perfil: Perfil;

  try {
    const token = await getValidAccessToken();
    perfil = await getPerfil(token);
  } catch {
    // Sin sesión válida → al login.
    redirect("/cliente/login");
  }

  return (
    <main className="min-h-screen bg-muted">
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
          <div className="flex items-center gap-4">
            <Link
              href="/sitio"
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary sm:flex"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Sesión iniciada
          </span>
          <h1 className="mt-2 text-2xl font-bold text-foreground">
            Hola, {perfil.primer_nombre}
          </h1>
        </div>

        <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-white">
            <Package className="h-5 w-5" />
            <span className="text-sm text-white/80">Código de casillero</span>
            <span className="ml-auto font-mono text-lg font-semibold tracking-wide">
              {perfil.codigo_casillero}
            </span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <Dato icon={User} label="Nombre">
              {perfil.primer_nombre} {perfil.primer_apellido}
            </Dato>
            <Dato icon={Mail} label="Email">
              {perfil.email}
            </Dato>
            <Dato icon={Phone} label="Teléfono">
              {perfil.telefono_celular || "—"}
            </Dato>
            <Dato icon={MapPin} label="Ubicación">
              {[perfil.ciudad?.nombre, perfil.pais?.nombre]
                .filter(Boolean)
                .join(", ") || "—"}
            </Dato>
          </dl>
        </section>

      </div>
    </main>
  );
}

function Dato({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="text-sm font-medium text-foreground">{children}</dd>
      </div>
    </div>
  );
}
