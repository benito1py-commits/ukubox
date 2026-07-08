import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ExternalLink,
  UserPlus,
  MapPin,
  ShoppingCart,
  PackageCheck,
  Info,
  CircleUser,
} from "lucide-react";

type Paso = {
  icon: LucideIcon;
  titulo: string;
  cuerpo: React.ReactNode;
  imagen?: { src: string; alt: string; width: number; height: number };
};

export const metadata: Metadata = {
  title: "Cómo comprar en Amazon con tu casillero - UKUXBOX",
  description:
    "Guía paso a paso para configurar tu dirección UKUXBOX de Miami en Amazon y recibir tus compras en Paraguay.",
};

// Campos de la dirección tal cual se cargan en el formulario de Amazon (US).
const camposDireccion = [
  { label: "Country/Region", valor: "United States" },
  {
    label: "Full name (First and Last name)",
    valor: "Tu nombre y apellido  (UKU# 00001)",
  },
  { label: "Phone number", valor: "Tu número de teléfono" },
  { label: "Address", valor: "6758 NW 72nd Ave" },
  { label: "(SUITE)", valor: "UKU# 00001 (tu número de casillero)" },
  { label: "City", valor: "MIAMI" },
  { label: "State", valor: "Florida" },
  { label: "ZIP Code", valor: "33166" },
];

const pasos: Paso[] = [
  {
    icon: UserPlus,
    titulo: "Creá tu casillero y obtené tu número UKU#",
    cuerpo: (
      <>
        Antes de comprar necesitás tu número de casillero único (por ejemplo{" "}
        <span className="font-semibold text-foreground">UKU# 00001</span>). Si
        todavía no lo tenés,{" "}
        <Link
          href="/cliente/registro"
          className="text-primary font-semibold underline underline-offset-2"
        >
          registrate gratis acá
        </Link>
        . Vas a usar ese número en todas tus compras.
      </>
    ),
  },
  {
    icon: ExternalLink,
    titulo: "Ingresá a Amazon",
    cuerpo: (
      <>
        Abrí{" "}
        <a
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-semibold underline underline-offset-2 inline-flex items-center gap-1"
        >
          amazon.com <ExternalLink size={14} />
        </a>{" "}
        e iniciá sesión con tu cuenta. Si es tu primera vez, creá una cuenta con
        tu correo electrónico.
      </>
    ),
  },
  {
    icon: CircleUser,
    titulo: "Abrí el menú de tu cuenta",
    cuerpo: (
      <>
        En la esquina superior derecha, pasá el mouse por encima de tu nombre
        (al lado de <span className="font-semibold text-foreground">Returns &amp; Orders</span>).
        Se despliega un menú y, en la columna{" "}
        <span className="font-semibold text-foreground">Your Account</span>,
        hacé clic en{" "}
        <span className="font-semibold text-foreground">&ldquo;Account&rdquo;</span>.
      </>
    ),
    imagen: {
      src: "/guias/amazon/menu-cuenta.jpg",
      alt: "Menú desplegable de la cuenta de Amazon con la opción Account en la columna Your Account",
      width: 1523,
      height: 914,
    },
  },
  {
    icon: MapPin,
    titulo: "Agregá tu dirección de Miami",
    cuerpo: (
      <>
        En la página de tu cuenta entrá a{" "}
        <span className="font-semibold text-foreground">
          &ldquo;Your Addresses&rdquo;
        </span>{" "}
        (Tus direcciones) y tocá{" "}
        <span className="font-semibold text-foreground">
          &ldquo;Add a new address&rdquo;
        </span>
. Completá los campos con los datos de abajo, poniendo{" "}
        <span className="font-semibold text-foreground">tu número de casillero</span>{" "}
        al lado de tu nombre (en <em>Full name</em>) y también en el campo{" "}
        <em>(SUITE)</em>, y tocá{" "}
        <span className="font-semibold text-foreground">
          &ldquo;Add address&rdquo;
        </span>{" "}
        para guardarla.
        <span className="mt-3 block">
          <span className="font-semibold text-foreground">
            Marcarla como predeterminada (opcional):
          </span>{" "}
          en <em>Your Addresses</em> vas a ver tu dirección de Miami con la
          opción <em>&ldquo;Set as Default&rdquo;</em>. Si la activás, Amazon la
          usará automáticamente en cada compra y no vas a tener que elegirla
          cada vez. Dejala así solo si comprás siempre para tu casillero; si a
          veces enviás a otra dirección, no la marques como predeterminada y
          seleccionala manualmente en el checkout.
        </span>
      </>
    ),
    imagen: {
      src: "/guias/amazon/your-addresses.jpg",
      alt: "Página Your Account de Amazon con la opción Your Addresses resaltada",
      width: 1600,
      height: 875,
    },
  },
  {
    icon: ShoppingCart,
    titulo: "Comprá y elegí esa dirección en el checkout",
    cuerpo: (
      <>
        Agregá tus productos al carrito y, al momento de pagar, seleccioná tu
        dirección UKUXBOX de Miami como{" "}
        <span className="font-semibold text-foreground">Shipping address</span>{" "}
        (dirección de envío). La <em>Billing address</em> es la de tu tarjeta y
        puede ser distinta.
      </>
    ),
  },
  {
    icon: PackageCheck,
    titulo: "Recibí tu compra en Paraguay",
    cuerpo: (
      <>
        Cuando tu paquete llegue a nuestra bodega de Miami te avisamos, y lo
        enviamos a Paraguay. Podés seguir su estado desde{" "}
        <Link
          href="/cliente/login"
          className="text-primary font-semibold underline underline-offset-2"
        >
          tu casillero
        </Link>
        .
      </>
    ),
  },
];

export default function ComoComprarAmazonPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-accent font-semibold mb-3 uppercase tracking-wide text-sm">
            Guía paso a paso
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Cómo comprar en Amazon con tu casillero
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Configurá tu dirección UKUXBOX de Miami en Amazon una sola vez y
            recibí todas tus compras en Paraguay.
          </p>
        </div>
      </section>

      {/* Pasos */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <ol className="space-y-6">
          {pasos.map((paso, i) => {
            const Icon = paso.icon;
            return (
              <li
                key={paso.titulo}
                className="bg-white border border-border rounded-xl p-6 md:p-8 flex gap-5"
              >
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold mb-2">{paso.titulo}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {paso.cuerpo}
                  </p>
                  {paso.imagen && (
                    <Image
                      src={paso.imagen.src}
                      alt={paso.imagen.alt}
                      width={paso.imagen.width}
                      height={paso.imagen.height}
                      className="mt-4 w-full h-auto rounded-lg border border-border shadow-sm"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Tarjeta de dirección */}
        <div className="mt-10 bg-muted rounded-2xl p-6 md:p-8 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Tu dirección de envío en Miami</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Cargá estos datos exactamente así en Amazon, reemplazando{" "}
            <span className="font-semibold text-foreground">UKU# 00001</span> por
            tu número de casillero.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <dl className="grid grid-cols-1 gap-y-4">
              {camposDireccion.map((campo) => (
                <div key={campo.label} className="border-b border-border pb-3">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                    {campo.label}
                  </dt>
                  <dd className="font-semibold text-foreground">{campo.valor}</dd>
                </div>
              ))}
            </dl>

            <figure className="mx-auto">
              <Image
                src="/guias/amazon/form-direccion-v2.jpg"
                alt="Formulario Add a new address de Amazon completado con la dirección de Miami"
                width={852}
                height={1014}
                className="w-full max-w-sm h-auto rounded-lg border border-border shadow-sm bg-white"
              />
              <figcaption className="text-xs text-muted-foreground text-center mt-2">
                Así se ve el formulario completado en Amazon.
              </figcaption>
            </figure>
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground bg-accent/10 rounded-lg p-4">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p>
              Importante: si no ponés tu número de casillero (UKU#) en la
              dirección, no podemos identificar de quién es el paquete cuando
              llega a Miami. Revisalo siempre antes de confirmar tu compra.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-primary py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            ¿Todavía no tenés tu casillero?
          </h2>
          <p className="text-primary/70 mb-8">
            Registrate gratis, obtené tu dirección en Miami y empezá a comprar en
            tus tiendas favoritas de USA.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cliente/registro"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2"
            >
              <UserPlus size={18} />
              Crear mi Casillero Gratis
            </Link>
            <Link
              href="/sitio/preguntas-frecuentes"
              className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-white/80 transition-colors border-2 border-primary"
            >
              Ver Preguntas Frecuentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
