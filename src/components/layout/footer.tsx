import { companyInfo } from "@/lib/mock-data";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-accent">UKU</span>
                <span className="text-white">XBOX</span>
              </span>
            </div>
            <p className="text-white/60 text-sm">
              Tu casillero en Miami. Comprá en USA y recibí en Paraguay.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>{companyInfo.direccion}</p>
              <p>Tel: {companyInfo.telefono}</p>
              <p>Email: {companyInfo.email}</p>
              <p>{companyInfo.horario}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Enlaces</h3>
            <div className="space-y-2 text-sm">
              <a href="/nosotros" className="block text-white/60 hover:text-accent transition-colors">Nosotros</a>
              <a href="/servicios" className="block text-white/60 hover:text-accent transition-colors">Servicios</a>
              <a href="/preguntas-frecuentes" className="block text-white/60 hover:text-accent transition-colors">Preguntas Frecuentes</a>
              <a href="/login" className="block text-white/60 hover:text-accent transition-colors">Iniciar Sesión</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          © {new Date().getFullYear()} {companyInfo.nombre}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
