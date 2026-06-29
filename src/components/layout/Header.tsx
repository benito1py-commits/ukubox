"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  LogIn,
  LogOut,
  UserPlus,
  ExternalLink,
  ChevronDown,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";

import { cerrarSesion } from "@/app/sitio/cuenta/actions";

const navLinks = [
  { href: "/sitio", label: "Inicio" },
  { href: "/sitio/nosotros", label: "Nosotros" },
  { href: "/sitio/servicios", label: "Servicios" },
  { href: "/sitio/tarifas", label: "Tarifas" },
  { href: "/sitio/productos", label: "Productos" },
  { href: "/sitio/restricciones", label: "Restricciones" },
  { href: "/sitio/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

type Usuario = { nombre: string | null; esAdmin: boolean } | null;

const menuItem =
  "flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors text-left";

export function Header({ usuario }: { usuario?: Usuario }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accederOpen, setAccederOpen] = useState(false);
  const accederRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const logueado = Boolean(usuario);

  // Cerrar el dropdown al hacer click afuera o con Escape.
  useEffect(() => {
    if (!accederOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accederRef.current && !accederRef.current.contains(e.target as Node)) {
        setAccederOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccederOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [accederOpen]);

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
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown de acceso / cuenta */}
            <div className="relative ml-2 pl-2 border-l border-border" ref={accederRef}>
              <button
                type="button"
                onClick={() => setAccederOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={accederOpen}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors max-w-[14rem] ${
                  logueado
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                <UserIcon size={15} />
                <span className="truncate">
                  {logueado ? usuario?.nombre ?? "Mi cuenta" : "Acceder"}
                </span>
                <ChevronDown
                  size={15}
                  className={`transition-transform ${accederOpen ? "rotate-180" : ""}`}
                />
              </button>

              {accederOpen && (
                <div
                  role="menu"
                  onClick={() => setAccederOpen(false)}
                  className="absolute right-0 mt-2 w-60 bg-white border border-border rounded-xl shadow-lg py-2 z-50"
                >
                  {logueado ? (
                    <>
                      <Link href="/sitio/cuenta" role="menuitem" className={menuItem}>
                        <UserIcon size={16} />
                        Mi cuenta
                      </Link>
                      {usuario?.esAdmin && (
                        <Link href="/admin" role="menuitem" className={menuItem}>
                          <LayoutDashboard size={16} />
                          Panel de administración
                        </Link>
                      )}
                    </>
                  ) : (
                    <>
                      <Link href="/sitio/acceder" role="menuitem" className={menuItem}>
                        <LogIn size={16} />
                        Login UKUXBOX
                      </Link>
                      <Link
                        href="/sitio/registro-usuario"
                        role="menuitem"
                        className={menuItem}
                      >
                        <UserPlus size={16} />
                        Registrar UKUXBOX
                      </Link>
                    </>
                  )}

                  <div className="my-2 border-t border-border" />
                  <p className="px-4 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Sistema Helga
                  </p>
                  <a
                    href="https://ukuxbox.helgasys.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className={menuItem}
                  >
                    <LogIn size={16} />
                    Login Helga
                    <ExternalLink size={12} className="ml-auto text-muted-foreground" />
                  </a>
                  <a
                    href="https://ukuxbox.helgasys.com/clients"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className={menuItem}
                  >
                    <UserPlus size={16} />
                    Registrar Helga
                    <ExternalLink size={12} className="ml-auto text-muted-foreground" />
                  </a>

                  {logueado && (
                    <>
                      <div className="my-2 border-t border-border" />
                      {/* stopPropagation: sin esto el onClick del menú cierra el
                          dropdown y desmonta el form antes de despachar la action,
                          cancelando el cierre de sesión. */}
                      <form
                        action={cerrarSesion}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="submit"
                          role="menuitem"
                          className={`${menuItem} text-danger hover:bg-danger/5`}
                        >
                          <LogOut size={16} />
                          Cerrar sesión
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-border shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Auth */}
              <div className="border-t border-border pt-3 mt-3 space-y-2">
                {logueado ? (
                  <>
                    <Link
                      href="/sitio/cuenta"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium bg-primary/10 text-primary"
                    >
                      <UserIcon size={18} />
                      {usuario?.nombre ?? "Mi cuenta"}
                    </Link>
                    {usuario?.esAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50"
                      >
                        <LayoutDashboard size={18} />
                        Panel de administración
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="/sitio/acceder"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium bg-primary/10 text-primary"
                    >
                      <LogIn size={18} />
                      Login UKUXBOX
                    </Link>
                    <Link
                      href="/sitio/registro-usuario"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-center bg-primary text-white"
                    >
                      <UserPlus size={18} />
                      Registrar UKUXBOX
                    </Link>
                  </>
                )}

                <a
                  href="https://ukuxbox.helgasys.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-foreground hover:bg-gray-50"
                >
                  <LogIn size={18} />
                  Login Helga
                  <ExternalLink size={14} className="text-muted-foreground" />
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
                  <ExternalLink size={14} className="text-muted-foreground" />
                </a>

                {logueado && (
                  <form action={cerrarSesion}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-danger hover:bg-danger/5"
                    >
                      <LogOut size={18} />
                      Cerrar sesión
                    </button>
                  </form>
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
