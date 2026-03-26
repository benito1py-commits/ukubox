"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

const moreLinks = [
  { href: "https://parcelsapp.com/", label: "Rastrear Paquete", external: true },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => { setMounted(true); }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin size={14} /> Teniente del Valle casi Itapúa, Asunción
            </span>
            <a href="tel:0986733000" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone size={14} /> 0986733000
            </a>
            <a href="mailto:sac@ukuxbox.com" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail size={14} /> sac@ukuxbox.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            {mounted && user ? (
              <>
                <Link href="/dashboard/paquetes" className="hover:text-accent transition-colors font-medium">
                  Mi Casillero
                </Link>
                <button onClick={logout} className="hover:text-accent transition-colors font-medium">
                  Salir
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-accent transition-colors font-medium">
                Iniciar Sesión / Registro
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-1 shrink-0">
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
            <a
              href="https://parcelsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
            >
              Rastrear Paquete
            </a>
            {mounted && user ? (
              <Link
                href="/dashboard/paquetes"
                className="ml-2 bg-accent text-foreground px-5 py-2 rounded-lg text-sm font-bold hover:bg-accent-hover transition-colors"
              >
                Mis Paquetes
              </Link>
            ) : (
              <Link
                href="/login"
                className="ml-2 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
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
              <a
                href="https://parcelsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors"
              >
                Rastrear Paquete
              </a>
              <div className="border-t border-border pt-3 mt-3 space-y-2">
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  <a href="tel:0986733000">0986733000</a>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <Mail size={14} />
                  <a href="mailto:sac@ukuxbox.com">sac@ukuxbox.com</a>
                </div>
              </div>
              {mounted && user ? (
                <>
                  <Link
                    href="/dashboard/paquetes"
                    onClick={() => setMobileOpen(false)}
                    className="block bg-accent text-foreground text-center px-4 py-3 rounded-lg font-bold mt-2"
                  >
                    Mis Paquetes
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="block w-full text-center px-4 py-3 rounded-lg font-medium text-danger hover:bg-danger/5 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-primary text-white text-center px-4 py-3 rounded-lg font-bold mt-2"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
