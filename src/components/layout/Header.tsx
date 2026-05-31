"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MapPin, Phone, Mail, Menu, X, LogIn, UserPlus, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/sitio", label: "Inicio" },
  { href: "/sitio/nosotros", label: "Nosotros" },
  { href: "/sitio/servicios", label: "Servicios" },
  { href: "/sitio/productos", label: "Productos" },
  { href: "/sitio/restricciones", label: "Restricciones" },
  { href: "/sitio/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin size={14} /> España 2220 casi América, Asunción
            </span>
            <a href="tel:0982278071" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone size={14} /> 0982 278 071
            </a>
            <a href="mailto:sac@ukuxbox.com" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail size={14} /> sac@ukuxbox.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/sitio" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-primary">UKU</span>
              <span className="text-foreground">XBOX</span>
            </span>
            <span className="flex gap-0.5 ml-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-accent"></span>
              <span className="w-2.5 h-2.5 rounded-sm bg-primary/60"></span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Auth Buttons */}
            <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-border">
              {/* Helga */}
              <a
                href="https://ukuxbox.helgasys.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <LogIn size={15} />
                Ingresar Helga
              </a>
              <a
                href="https://ukuxbox.helgasys.com/clients"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
              >
                <UserPlus size={15} />
                Registrar Helga
                <ExternalLink size={12} />
              </a>
              {/* UKUXBOX (Supabase) */}
              <Link
                href="/sitio/acceder"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive("/sitio/acceder")
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                <LogIn size={15} />
                Ingresar UKUXBOX
              </Link>
              <Link
                href="/sitio/registro-usuario"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive("/sitio/registro-usuario")
                    ? "bg-primary-hover text-white"
                    : "bg-primary hover:bg-primary-hover text-white"
                }`}
              >
                <UserPlus size={15} />
                Registrar UKUXBOX
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Auth Buttons */}
              <div className="border-t border-border pt-3 mt-3 space-y-2">
                <a
                  href="https://ukuxbox.helgasys.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50"
                >
                  <LogIn size={18} />
                  Ingresar Helga
                </a>
                <a
                  href="https://ukuxbox.helgasys.com/clients"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50"
                >
                  <UserPlus size={18} />
                  Registrar Helga
                  <ExternalLink size={14} />
                </a>
                <Link
                  href="/sitio/acceder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium bg-primary/10 text-primary"
                >
                  <LogIn size={18} />
                  Ingresar UKUXBOX
                </Link>
                <Link
                  href="/sitio/registro-usuario"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-center bg-primary text-white"
                >
                  <UserPlus size={18} />
                  Registrar UKUXBOX
                </Link>
              </div>

              <div className="border-t border-border pt-3 mt-3 space-y-2">
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  <a href="tel:0982278071">0982 278 071</a>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Mail size={14} />
                  <a href="mailto:sac@ukuxbox.com">sac@ukuxbox.com</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
