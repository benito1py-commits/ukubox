import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Restricciones de Carga - UKUXBOX",
  description:
    "Información sobre carga HAZMAT, carga prohibida y políticas de almacenamiento de UKUXBOX.",
};

function HazmatIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <path d="M32 14l16 28H16L32 14z" fill="#dc2626" />
      <text x="32" y="38" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">!</text>
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <path
        d="M32 12c0 0-12 14-12 24a12 12 0 0024 0c0-10-12-24-12-24z"
        fill="#dc2626"
      />
      <path
        d="M32 28c0 0-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11z"
        fill="#fff"
      />
    </svg>
  );
}

function SkullIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <circle cx="32" cy="28" r="12" fill="#dc2626" />
      <circle cx="27" cy="26" r="3" fill="#fff" />
      <circle cx="37" cy="26" r="3" fill="#fff" />
      <rect x="30" y="34" width="4" height="6" rx="1" fill="#dc2626" />
      <rect x="26" y="40" width="12" height="3" rx="1" fill="#dc2626" />
      <line x1="29" y1="40" x2="29" y2="43" stroke="#fff" strokeWidth="1" />
      <line x1="32" y1="40" x2="32" y2="43" stroke="#fff" strokeWidth="1" />
      <line x1="35" y1="40" x2="35" y2="43" stroke="#fff" strokeWidth="1" />
    </svg>
  );
}

function ProhibitedWeaponIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <line x1="12" y1="12" x2="52" y2="52" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 30h20v4H22z" fill="#333" />
      <path d="M36 30h4v10h-4z" fill="#333" />
      <path d="M20 30l4-8h6l-4 8z" fill="#333" />
    </svg>
  );
}

function ProhibitedDrugsIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <line x1="12" y1="12" x2="52" y2="52" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 22c4-4 12-4 16 0l-8 8-8-8z" fill="#333" />
      <path d="M22 30c0 6 4 12 10 14 6-2 10-8 10-14H22z" fill="#333" />
      <line x1="32" y1="30" x2="32" y2="42" stroke="#fff" strokeWidth="1.5" />
      <line x1="26" y1="34" x2="38" y2="34" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function ProhibitedMoneyIcon() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" fill="#fff" stroke="#dc2626" strokeWidth="4" />
      <line x1="12" y1="12" x2="52" y2="52" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <rect x="18" y="22" width="28" height="20" rx="3" fill="#333" />
      <circle cx="32" cy="32" r="7" fill="none" stroke="#fff" strokeWidth="2" />
      <text x="32" y="36" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">$</text>
    </svg>
  );
}

export default function RestriccionesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Restricciones de Carga
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Información importante sobre artículos restringidos, carga prohibida
            y políticas de almacenamiento.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top row: HAZMAT + Prohibida */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Carga HAZMAT */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">
                Carga HAZMAT
              </h2>
              <div className="flex justify-center gap-4 mb-6">
                <HazmatIcon />
                <FlameIcon />
                <SkullIcon />
              </div>
              <p className="text-foreground mb-4">
                Productos inflamables, Combustible y Derivados, Químicos,
                Tintas, Aerosol, Veneno y Derivados.
              </p>
              <p className="text-foreground mb-6">
                Las cargas que pongan en peligro al vuelo son consideradas
                HAZMAT por la aerolínea. Serán mantenidas durante 7 días en
                nuestro depósito y el cliente tendrá la opción de retirarla por
                otra empresa o por tercero.
              </p>
              <p className="text-danger font-bold text-sm uppercase">
                (Tendrá un costo de 35$ (costo de recepción) para poder retirar
                la carga de nuestro depósito - IN/OUT FEE)
              </p>
            </div>

            {/* Carga Prohibida */}
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">
                Carga Prohibida
              </h2>
              <div className="flex justify-center gap-4 mb-6">
                <ProhibitedWeaponIcon />
                <ProhibitedDrugsIcon />
                <ProhibitedMoneyIcon />
              </div>
              <p className="text-foreground mb-4">
                Accesorios de armas y cualquier cosa relacionado al mundo de
                armamento, mundo de las drogas (cannabis u otros), Nicotina
                líquida, Dinero en efectivo, Oro y Plata.
              </p>
              <p className="text-danger font-bold text-sm italic">
                En caso de que llegue a nuestro depósito en Miami, será
                mantenido para retirada por 48 horas, caso contrario será
                desechado.
              </p>
            </div>
          </div>

          {/* Bottom row: Almacenamiento */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-primary mb-6">
              Almacenamiento
            </h2>
            <p className="text-foreground font-bold mb-4">
              Los paquetes de nuestros clientes pueden mantenerse 2 semanas para
              su retiro, pasado ese tiempo poseerá costos extras de
              almacenamiento.
            </p>
            <p className="text-danger font-bold text-sm italic">
              Caso el paquete no sea pago en 1 mes, el paquete pasa a propiedad
              de la empresa y será colocado a venta.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">¿Tenés alguna duda?</h2>
          <p className="text-muted-foreground mb-8">
            Contactanos y con gusto te ayudamos a resolver cualquier consulta
            sobre restricciones de carga.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/sitio/preguntas-frecuentes"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors"
            >
              Ver Preguntas Frecuentes
            </Link>
            <a
              href="https://wa.me/595991618033"
              className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
