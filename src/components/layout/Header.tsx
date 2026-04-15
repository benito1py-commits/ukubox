"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Menu, X, User, LogIn } from "lucide-react";

const navLinks = [
  { href: "/sitio", label: "Inicio" },
  { href: "/sitio/nosotros", label: "Nosotros" },
  { href: "/sitio/servicios", label: "Servicios" },
  { href: "/sitio/restricciones", label: "Restricciones" },
  { href: "/sitio/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    fetch("/api/helga/auth/check")
      .then((r) => r.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch(() => {});
  }, [pathname]);

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
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-border">
              {authenticated ? (
                <Link
                  href="/sitio/mi-cuenta"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive("/sitio/mi-cuenta")
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <User size={16} />
                  Mi Cuenta
                </Link>
              ) : (
                <>
                  <Link
                    href="/sitio/login"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive("/sitio/login")
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <LogIn size={16} />
                    Ingresar
                  </Link>
                  <Link
                    href="/sitio/registro"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Regístrate
                  </Link>
                </>
              )}
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
                {authenticated ? (
                  <Link
                    href="/sitio/mi-cuenta"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium bg-primary/10 text-primary"
                  >
                    <User size={18} />
                    Mi Cuenta
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sitio/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50"
                    >
                      <LogIn size={18} />
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/sitio/registro"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg font-semibold text-center bg-primary text-white"
                    >
                      Regístrate
                    </Link>
                  </>
                )}
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
