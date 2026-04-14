"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  FileText,
  ChevronDown,
} from "lucide-react";

interface Pais {
  codigo: string;
  nombre: string;
}

interface Departamento {
  id: number;
  nombre: string;
}

interface Ciudad {
  id: number;
  nombre: string;
}

interface TipoId {
  id: number;
  descripcion: string;
}

export default function RegistroPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Location data
  const [paises, setPaises] = useState<Pais[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [tiposId, setTiposId] = useState<TipoId[]>([]);

  const [form, setForm] = useState({
    tipo_de_cuenta_id: 1,
    tipo_de_identificacion_id: 0,
    numero_de_identificacion: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
    pais_codigo: "",
    departamento_id: 0,
    ciudad_id: 0,
    telefono_celular: "",
    direccion: "",
    telefono_fijo: "",
  });

  // Load countries and ID types on mount
  useEffect(() => {
    fetch("/api/helga/ubicacion/paises")
      .then((r) => r.json())
      .then((data) => setPaises(Array.isArray(data) ? data : []))
      .catch(() => {});

    fetch("/api/helga/ubicacion/tipos-id")
      .then((r) => r.json())
      .then((data) => {
        const tipos = data?.datos || data;
        setTiposId(Array.isArray(tipos) ? tipos : []);
      })
      .catch(() => {});
  }, []);

  // Load departments when country changes
  useEffect(() => {
    if (!form.pais_codigo) {
      setDepartamentos([]);
      setCiudades([]);
      return;
    }
    fetch(`/api/helga/ubicacion/departamentos?pais=${form.pais_codigo}`)
      .then((r) => r.json())
      .then((data) => setDepartamentos(Array.isArray(data) ? data : []))
      .catch(() => {});
    setForm((f) => ({ ...f, departamento_id: 0, ciudad_id: 0 }));
  }, [form.pais_codigo]);

  // Load cities when department changes
  useEffect(() => {
    if (!form.departamento_id) {
      setCiudades([]);
      return;
    }
    fetch(`/api/helga/ubicacion/ciudades?departamento_id=${form.departamento_id}`)
      .then((r) => r.json())
      .then((data) => setCiudades(Array.isArray(data) ? data : []))
      .catch(() => {});
    setForm((f) => ({ ...f, ciudad_id: 0 }));
  }, [form.departamento_id]);

  const updateForm = (field: string, value: string | number) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validateStep1 = () => {
    if (!form.primer_nombre || !form.primer_apellido || !form.numero_de_identificacion) {
      setError("Completa todos los campos obligatorios.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep2 = () => {
    if (!form.email || !form.email_confirmation || !form.password || !form.password_confirmation) {
      setError("Completa todos los campos obligatorios.");
      return false;
    }
    if (form.email !== form.email_confirmation) {
      setError("Los correos electrónicos no coinciden.");
      return false;
    }
    if (form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return false;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    setError("");
    return true;
  };

  const validateStep3 = () => {
    if (!form.pais_codigo || !form.telefono_celular || !form.direccion) {
      setError("Completa todos los campos obligatorios.");
      return false;
    }
    setError("");
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setError("");
    setLoading(true);

    try {
      const body: Record<string, unknown> = { ...form };
      // Remove empty optional fields
      if (!body.segundo_apellido) delete body.segundo_apellido;
      if (!body.telefono_fijo) delete body.telefono_fijo;
      if (!body.tipo_de_identificacion_id) delete body.tipo_de_identificacion_id;
      if (!body.departamento_id) delete body.departamento_id;
      if (!body.ciudad_id) delete body.ciudad_id;

      const res = await fetch("/api/helga/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        // Parse Helga error format
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
          setError(data.error || data.msg || "Error al registrar. Intenta de nuevo.");
        }
        return;
      }

      setSuccess(true);
    } catch {
      setError("Error de conexión. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-border p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">¡Registro exitoso!</h2>
          <p className="text-muted-foreground mb-6">
            Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión con tu correo y contraseña.
          </p>
          <Link
            href="/sitio/login"
            className="inline-block w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const stepLabels = ["Datos personales", "Cuenta", "Ubicación"];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-muted/30">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Crear Cuenta</h1>
            <p className="text-muted-foreground mt-1">
              Registra tu casillero UKUXBOX
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (i + 1 < step) setStep(i + 1);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    step === i + 1
                      ? "bg-primary text-white"
                      : step > i + 1
                        ? "bg-success/10 text-success cursor-pointer"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {step > i + 1 ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {i < 2 && <div className="w-6 h-px bg-border" />}
              </div>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 1: Personal Data */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Primer nombre *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={form.primer_nombre}
                        onChange={(e) => updateForm("primer_nombre", e.target.value)}
                        placeholder="Juan"
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Segundo nombre
                    </label>
                    <input
                      type="text"
                      value={form.segundo_nombre}
                      onChange={(e) => updateForm("segundo_nombre", e.target.value)}
                      placeholder="Carlos"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Primer apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.primer_apellido}
                      onChange={(e) => updateForm("primer_apellido", e.target.value)}
                      placeholder="Pérez"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Segundo apellido
                    </label>
                    <input
                      type="text"
                      value={form.segundo_apellido}
                      onChange={(e) => updateForm("segundo_apellido", e.target.value)}
                      placeholder="González"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Tipo de documento
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        value={form.tipo_de_identificacion_id}
                        onChange={(e) => updateForm("tipo_de_identificacion_id", Number(e.target.value))}
                        className="w-full pl-10 pr-10 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
                      >
                        <option value={0}>Seleccionar</option>
                        {tiposId.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.descripcion}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nro. documento *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.numero_de_identificacion}
                      onChange={(e) => updateForm("numero_de_identificacion", e.target.value)}
                      placeholder="1234567"
                      className="w-full px-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Siguiente
                </button>
              </>
            )}

            {/* Step 2: Account */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Correo electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Confirmar correo *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={form.email_confirmation}
                      onChange={(e) => updateForm("email_confirmation", e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => updateForm("password", e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Confirmar contraseña *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      required
                      value={form.password_confirmation}
                      onChange={(e) => updateForm("password_confirmation", e.target.value)}
                      placeholder="Repite tu contraseña"
                      className="w-full pl-10 pr-12 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setError(""); }}
                    className="flex-1 border border-border text-foreground font-semibold py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    País *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      required
                      value={form.pais_codigo}
                      onChange={(e) => updateForm("pais_codigo", e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
                    >
                      <option value="">Seleccionar país</option>
                      {paises.map((p) => (
                        <option key={p.codigo} value={p.codigo}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {departamentos.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Departamento
                    </label>
                    <div className="relative">
                      <select
                        value={form.departamento_id}
                        onChange={(e) => updateForm("departamento_id", Number(e.target.value))}
                        className="w-full px-4 pr-10 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
                      >
                        <option value={0}>Seleccionar departamento</option>
                        {departamentos.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.nombre}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                )}

                {ciudades.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Ciudad
                    </label>
                    <div className="relative">
                      <select
                        value={form.ciudad_id}
                        onChange={(e) => updateForm("ciudad_id", Number(e.target.value))}
                        className="w-full px-4 pr-10 py-3 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none bg-white"
                      >
                        <option value={0}>Seleccionar ciudad</option>
                        {ciudades.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nombre}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Teléfono celular *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={form.telefono_celular}
                      onChange={(e) => updateForm("telefono_celular", e.target.value)}
                      placeholder="0981 123 456"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Teléfono fijo
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={form.telefono_fijo}
                      onChange={(e) => updateForm("telefono_fijo", e.target.value)}
                      placeholder="021 123 456"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Dirección *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea
                      required
                      value={form.direccion}
                      onChange={(e) => updateForm("direccion", e.target.value)}
                      placeholder="Tu dirección completa"
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setStep(2); setError(""); }}
                    className="flex-1 border border-border text-foreground font-semibold py-3 px-4 rounded-xl hover:bg-muted transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Registrando..." : "Crear Cuenta"}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Login link */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/sitio/login"
              className="text-primary font-semibold hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
