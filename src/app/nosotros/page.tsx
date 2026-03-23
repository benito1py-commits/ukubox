import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - UKUXBOX",
  description: "Conocé más sobre UKUXBOX, tu casillero en Miami.",
};

export default function NosotrosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-black mb-8">Nosotros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">UKUXBOX</strong> nació con la
            misión de conectar a Paraguay con Estados Unidos de la forma más
            simple y accesible. Desde nuestros inicios, hemos ayudado a miles
            de clientes a recibir sus compras online directamente en sus manos.
          </p>
          <p className="text-muted-foreground">
            Contamos con un almacén propio en Miami, Florida, donde recibimos,
            revisamos y despachamos cada paquete con el máximo cuidado. Nuestro
            equipo se dedica a que tu experiencia de compra sea sin
            complicaciones.
          </p>
          <p className="text-muted-foreground">
            Con oficinas en Asunción, Ciudad del Este y Encarnación, estamos
            cerca de vos para que puedas retirar tus paquetes de forma cómoda
            y rápida.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-muted rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-muted-foreground">
              Facilitar el acceso a productos de Estados Unidos para todos los
              paraguayos, ofreciendo un servicio de courier confiable,
              transparente y a precios justos.
            </p>
          </div>

          <div className="bg-muted rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Nuestra Visión</h2>
            <p className="text-muted-foreground">
              Ser el courier líder en Paraguay, reconocido por nuestra
              excelencia en servicio, innovación tecnológica y compromiso con
              cada cliente.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {[
          { number: "10,000+", label: "Clientes activos" },
          { number: "50,000+", label: "Paquetes entregados" },
          { number: "3", label: "Oficinas en Paraguay" },
          { number: "7-12", label: "Días de tránsito" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 border border-border rounded-xl"
          >
            <p className="text-3xl font-black text-accent">{stat.number}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
