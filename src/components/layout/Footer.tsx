import Link from "next/link";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white font-sans">
      <div className="h-1 bg-accent w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-black mb-4">
            <span className="text-accent">UKU</span>XBOX
          </h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Tu casillero en Miami. Comprá en USA y recibí en Paraguay de forma rápida, segura y al mejor precio.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://wa.me/595991618033"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/sitio/nosotros" className="hover:text-accent transition-colors">Nosotros</Link></li>
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Servicios</Link></li>
            <li><Link href="/sitio/productos" className="hover:text-accent transition-colors">Productos</Link></li>
            <li><Link href="/sitio/solicitud-repuesto" className="hover:text-accent transition-colors">Repuestos Automotores</Link></li>
            <li><Link href="/sitio/tarifas" className="hover:text-accent transition-colors">Tarifas</Link></li>
            <li><Link href="/sitio/preguntas-frecuentes" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
            <li><Link href="/sitio/acceder?next=/admin" className="hover:text-accent transition-colors">Acceso administración</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Servicios</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Casillero en Miami</Link></li>
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Transporte Aéreo</Link></li>
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Transporte Marítimo</Link></li>
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Servicio de Compras</Link></li>
            <li><Link href="/sitio/servicios" className="hover:text-accent transition-colors">Consolidación</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
              <span>España 2220 casi América<br />Asunción, Paraguay</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-accent shrink-0" />
              <a href="tel:0991618033" className="hover:text-accent transition-colors">0991 618033</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-accent shrink-0" />
              <a href="mailto:sac@ukuxbox.com" className="hover:text-accent transition-colors">sac@ukuxbox.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} className="text-accent mt-0.5 shrink-0" />
              <span>Lun-Vie: 8:00-18:00<br />Sáb: 8:00-12:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} UKUXBOX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
