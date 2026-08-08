"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  LogOut,
  Pencil,
  Save,
  X,
  Loader2,
  FileText,
} from "lucide-react";

interface Cliente {
  id: number;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  email: string;
  telefono_celular: string;
  telefono_fijo: string | null;
  direccion: string;
  numero_de_identificacion: string;
  codigo_casillero: string;
  pais_codigo: string;
  departamento_id: number;
  ciudad_id: number;
  fecha_de_nacimiento: string;
  created_at: string;
  tipo_de_identificacion: { id: number; descripcion: string };
  tipo_de_cuenta: { id: number; descripcion: string };
  departamento: { id: number; nombre: string };
  ciudad: { id: number; nombre: string };
  oficina: { id: number; descripcion: string };
  pais: { codigo: string; nombre: string };
}

interface Departamento {
  id: number;
  nombre: string;
}

interface Ciudad {
  id: number;
  nombre: string;
}

export default function MiCuentaPage() {
  const router = useRouter();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    primer_nombre: "",
    primer_apellido: "",
    email: "",
    direccion: "",
    pais_codigo: "",
    departamento_id: 0,
    ciudad_id: 0,
    numero_de_identificacion: "",
    telefono_celular: "",
    fecha_de_nacimiento: "",
  });

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/helga/clientes");
      if (res.status === 401) {
        router.push("/sitio/login");
        return;
      }
      const data = await res.json();
      // Cualquier otro error (403, 500…) no debe renderizar un perfil vacío:
      // sin `datos` no hay cliente que mostrar.
      if (!res.ok || !data.datos) {
        setError(data.msg || data.error || "No se pudo cargar tu perfil.");
        return;
      }
      const c = data.datos;
      setCliente(c);
      setEditForm({
        primer_nombre: c.primer_nombre || "",
        primer_apellido: c.primer_apellido || "",
        email: c.email || "",
        direccion: c.direccion || "",
        pais_codigo: c.pais_codigo || "",
        departamento_id: c.departamento_id || 0,
        ciudad_id: c.ciudad_id || 0,
        numero_de_identificacion: c.numero_de_identificacion || "",
        telefono_celular: c.telefono_celular || "",
        fecha_de_nacimiento: c.fecha_de_nacimiento || "",
      });
    } catch {
      router.push("/sitio/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Load departments when editing and country is set
  useEffect(() => {
    if (!editing || !editForm.pais_codigo) return;
    fetch(`/api/helga/ubicacion/departamentos?pais=${editForm.pais_codigo}`)
      .then((r) => r.json())
      .then((data) => setDepartamentos(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [editing, editForm.pais_codigo]);

  // Load cities when editing and department is set
  useEffect(() => {
    if (!editing || !editForm.departamento_id) return;
    fetch(`/api/helga/ubicacion/ciudades?departamento_id=${editForm.departamento_id}`)
      .then((r) => r.json())
      .then((data) => setCiudades(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [editing, editForm.departamento_id]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/helga/auth/logout", { method: "POST" });
      router.push("/sitio/login");
    } catch {
      setLoggingOut(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/helga/clientes/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errores) {
          if (typeof data.errores === "string") {
            setError(data.errores);
          } else if (Array.isArray(data.errores)) {
            setError(data.errores.join(". "));
          } else {
            const msgs = Object.values(data.errores).flat();
            setError(msgs.join(". "));
          }
        } else {
          setError(data.error || data.msg || "Error al actualizar.");
        }
        return;
      }

      setSuccessMsg("Datos actualizados correctamente.");
      setEditing(false);
      await loadProfile();
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">
            No pudimos cargar tu cuenta
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            {error || "Intentá de nuevo en unos minutos."}
          </p>
          <button
            onClick={() => {
              setError("");
              setLoading(true);
              loadProfile();
            }}
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const fullName = [
    cliente.primer_nombre,
    cliente.segundo_nombre,
    cliente.primer_apellido,
    cliente.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-[80vh] bg-muted/30 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-border p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{fullName}</h1>
                <p className="text-muted-foreground text-sm">{cliente.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
              )}
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 text-danger rounded-xl text-sm font-medium hover:bg-danger/20 transition-colors disabled:opacity-60"
              >
                <LogOut className="w-4 h-4" />
                {loggingOut ? "Saliendo..." : "Cerrar Sesión"}
              </button>
            </div>
          </div>

          {/* Casillero badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 text-foreground px-4 py-2 rounded-xl mb-6">
            <Package className="w-5 h-5 text-accent-hover" />
            <span className="text-sm font-medium">Casillero:</span>
            <span className="font-bold text-lg">{cliente.codigo_casillero}</span>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-success/10 border border-success/20 text-success rounded-xl px-4 py-3 mb-6 text-sm">
              {successMsg}
            </div>
          )}

          {/* Profile Info / Edit Form */}
          {editing ? (
            <div className="space-y-4">
              <h2 className="font-semibold text-foreground mb-2">Editar datos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Primer nombre</label>
                  <input
                    type="text"
                    value={editForm.primer_nombre}
                    onChange={(e) => setEditForm({ ...editForm, primer_nombre: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Primer apellido</label>
                  <input
                    type="text"
                    value={editForm.primer_apellido}
                    onChange={(e) => setEditForm({ ...editForm, primer_apellido: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Teléfono celular</label>
                  <input
                    type="tel"
                    value={editForm.telefono_celular}
                    onChange={(e) => setEditForm({ ...editForm, telefono_celular: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nro. documento</label>
                  <input
                    type="text"
                    value={editForm.numero_de_identificacion}
                    onChange={(e) => setEditForm({ ...editForm, numero_de_identificacion: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Fecha de nacimiento</label>
                  <input
                    type="date"
                    value={editForm.fecha_de_nacimiento}
                    onChange={(e) => setEditForm({ ...editForm, fecha_de_nacimiento: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {departamentos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Departamento</label>
                    <select
                      value={editForm.departamento_id}
                      onChange={(e) => setEditForm({ ...editForm, departamento_id: Number(e.target.value), ciudad_id: 0 })}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
                    >
                      <option value={0}>Seleccionar</option>
                      {departamentos.map((d) => (
                        <option key={d.id} value={d.id}>{d.nombre}</option>
                      ))}
                    </select>
                  </div>
                  {ciudades.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Ciudad</label>
                      <select
                        value={editForm.ciudad_id}
                        onChange={(e) => setEditForm({ ...editForm, ciudad_id: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none bg-white"
                      >
                        <option value={0}>Seleccionar</option>
                        {ciudades.map((c) => (
                          <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Dirección</label>
                <textarea
                  value={editForm.direccion}
                  onChange={(e) => setEditForm({ ...editForm, direccion: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setEditing(false); setError(""); }}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium py-2.5 px-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-2.5 px-4 rounded-xl transition-colors disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={<User className="w-4 h-4" />} label="Nombre completo" value={fullName} />
              <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={cliente.email} />
              <InfoRow icon={<Phone className="w-4 h-4" />} label="Celular" value={cliente.telefono_celular} />
              {cliente.telefono_fijo && (
                <InfoRow icon={<Phone className="w-4 h-4" />} label="Teléfono fijo" value={cliente.telefono_fijo} />
              )}
              <InfoRow
                icon={<FileText className="w-4 h-4" />}
                label={cliente.tipo_de_identificacion?.descripcion || "Documento"}
                value={cliente.numero_de_identificacion}
              />
              <InfoRow
                icon={<MapPin className="w-4 h-4" />}
                label="Ubicación"
                value={[cliente.ciudad?.nombre, cliente.departamento?.nombre, cliente.pais?.nombre].filter(Boolean).join(", ")}
              />
              <InfoRow icon={<MapPin className="w-4 h-4" />} label="Dirección" value={cliente.direccion} />
              <InfoRow
                icon={<Package className="w-4 h-4" />}
                label="Tipo de cuenta"
                value={cliente.tipo_de_cuenta?.descripcion || "-"}
              />
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/sitio"
            className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Inicio</p>
              <p className="text-sm text-muted-foreground">Volver a la página principal</p>
            </div>
          </Link>
          <a
            href="https://parcelsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-accent-hover" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Rastrear Paquete</p>
              <p className="text-sm text-muted-foreground">Consulta el estado de tus envíos</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground break-words">{value || "-"}</p>
      </div>
    </div>
  );
}
