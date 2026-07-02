"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, CheckCircle2, AlertCircle, X } from "lucide-react";
import type { Pais, TipoIdentificacion } from "../_lib/helga";

type Opcion = { id: number; nombre: string };

const inputCls =
  "w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labelCls = "mb-1 block text-sm font-medium text-foreground";

/**
 * Interpreta la respuesta de error de Helga.
 * - `msg` objeto  → errores por campo (van inline bajo cada input).
 * - `errores`/`msg` string → mensaje general (va al snackbar).
 */
function parseRespuestaError(data: unknown): {
  fields: Record<string, string[]>;
  general: string | null;
} {
  const d = (data ?? {}) as { msg?: unknown; errores?: unknown };
  const errores = typeof d.errores === "string" ? d.errores.trim() : "";

  if (d.msg && typeof d.msg === "object") {
    return {
      fields: d.msg as Record<string, string[]>,
      general: errores || null,
    };
  }

  const msg = typeof d.msg === "string" ? d.msg.trim() : "";
  return {
    fields: {},
    general: errores || msg || "No se pudo completar el registro.",
  };
}

export default function RegistroForm({
  paises,
  tiposId,
}: {
  paises: Pais[];
  tiposId: TipoIdentificacion[];
}) {
  const router = useRouter();
  const paisInicial = paises.some((p) => p.codigo === "PY")
    ? "PY"
    : paises[0]?.codigo ?? "";

  const [form, setForm] = useState({
    tipo_de_cuenta_id: "1",
    tipo_de_identificacion_id: "",
    numero_de_identificacion: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
    pais_codigo: paisInicial,
    departamento_id: "",
    ciudad_id: "",
    telefono_celular: "",
    telefono_fijo: "",
    direccion: "",
  });

  const [departamentos, setDepartamentos] = useState<Opcion[]>([]);
  const [ciudades, setCiudades] = useState<Opcion[]>([]);
  const [loadingDep, setLoadingDep] = useState(false);
  const [loadingCiu, setLoadingCiu] = useState(false);
  const [errores, setErrores] = useState<Record<string, string[]>>({});
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // El snackbar se oculta solo a los 6s.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const set = (campo: keyof typeof form, valor: string) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  // Cargar departamentos cuando cambia el país.
  useEffect(() => {
    if (!form.pais_codigo) return;
    let cancelado = false;
    setLoadingDep(true);
    setDepartamentos([]);
    setCiudades([]);
    setForm((f) => ({ ...f, departamento_id: "", ciudad_id: "" }));
    fetch(`/cliente/api/ubicacion/departamentos?pais=${form.pais_codigo}`)
      .then((r) => r.json())
      .then((d) => !cancelado && setDepartamentos(Array.isArray(d) ? d : []))
      .catch(() => !cancelado && setDepartamentos([]))
      .finally(() => !cancelado && setLoadingDep(false));
    return () => {
      cancelado = true;
    };
  }, [form.pais_codigo]);

  // Cargar ciudades cuando cambia el departamento.
  useEffect(() => {
    if (!form.departamento_id) return;
    let cancelado = false;
    setLoadingCiu(true);
    setCiudades([]);
    setForm((f) => ({ ...f, ciudad_id: "" }));
    fetch(`/cliente/api/ubicacion/ciudades?departamento=${form.departamento_id}`)
      .then((r) => r.json())
      .then((d) => !cancelado && setCiudades(Array.isArray(d) ? d : []))
      .catch(() => !cancelado && setCiudades([]))
      .finally(() => !cancelado && setLoadingCiu(false));
    return () => {
      cancelado = true;
    };
  }, [form.departamento_id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validaciones de cliente antes de mandar a Helga.
    const errs: Record<string, string[]> = {};
    if (form.email !== form.email_confirmation)
      errs.email_confirmation = ["Los emails no coinciden."];
    if (form.password !== form.password_confirmation)
      errs.password_confirmation = ["Las contraseñas no coinciden."];
    if (Object.keys(errs).length) {
      setErrores(errs);
      return;
    }

    setErrores({});
    setEnviando(true);
    try {
      const payload = {
        tipo_de_cuenta_id: Number(form.tipo_de_cuenta_id),
        tipo_de_identificacion_id: form.tipo_de_identificacion_id
          ? Number(form.tipo_de_identificacion_id)
          : undefined,
        numero_de_identificacion: form.numero_de_identificacion,
        primer_nombre: form.primer_nombre,
        segundo_nombre: form.segundo_nombre,
        primer_apellido: form.primer_apellido,
        segundo_apellido: form.segundo_apellido,
        email: form.email,
        email_confirmation: form.email_confirmation,
        password: form.password,
        password_confirmation: form.password_confirmation,
        pais_codigo: form.pais_codigo,
        departamento_id: form.departamento_id
          ? Number(form.departamento_id)
          : undefined,
        ciudad_id: form.ciudad_id ? Number(form.ciudad_id) : undefined,
        telefono_celular: form.telefono_celular,
        direccion: form.direccion,
        telefono_fijo: form.telefono_fijo || undefined,
      };

      const res = await fetch("/cliente/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOk(true);
        return;
      }
      const data = await res.json().catch(() => null);
      const { fields, general } = parseRespuestaError(data);
      setErrores(fields);
      if (general) setToast(general);
    } catch {
      setToast("No se pudo conectar. Intentá de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  if (ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <div>
          <h2 className="text-lg font-bold text-foreground">
            ¡Casillero creado!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ya podés iniciar sesión con tu email y contraseña.
          </p>
        </div>
        <button
          onClick={() => router.push("/cliente/login")}
          className="mt-2 rounded-lg bg-primary px-6 py-2.5 font-semibold text-white transition hover:bg-primary-hover"
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  const err = (campo: string) =>
    errores[campo]?.length ? (
      <p className="mt-1 text-xs text-danger">{errores[campo].join(" ")}</p>
    ) : null;

  return (
    <>
      {toast && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div
            role="alert"
            className="flex max-w-md items-start gap-3 rounded-xl bg-foreground px-4 py-3 text-sm text-white shadow-lg"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
            <span className="flex-1">{toast}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="shrink-0 text-white/50 transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {/* Tipo de cuenta */}
      <div>
        <label className={labelCls}>Tipo de cuenta</label>
        <select
          value={form.tipo_de_cuenta_id}
          onChange={(e) => set("tipo_de_cuenta_id", e.target.value)}
          className={inputCls}
        >
          <option value="1">Personal</option>
          <option value="2">Empresarial</option>
        </select>
      </div>

      {/* Identificación */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Tipo de documento</label>
          <select
            value={form.tipo_de_identificacion_id}
            onChange={(e) => set("tipo_de_identificacion_id", e.target.value)}
            className={inputCls}
          >
            <option value="">Seleccioná…</option>
            {tiposId.map((t) => (
              <option key={t.id} value={t.id}>
                {t.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Número de documento</label>
          <input
            value={form.numero_de_identificacion}
            onChange={(e) => set("numero_de_identificacion", e.target.value)}
            required
            className={inputCls}
          />
          {err("numero_de_identificacion")}
        </div>
      </div>

      {/* Nombres */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Primer nombre</label>
          <input
            value={form.primer_nombre}
            onChange={(e) => set("primer_nombre", e.target.value)}
            required
            className={inputCls}
          />
          {err("primer_nombre")}
        </div>
        <div>
          <label className={labelCls}>Segundo nombre</label>
          <input
            value={form.segundo_nombre}
            onChange={(e) => set("segundo_nombre", e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Primer apellido</label>
          <input
            value={form.primer_apellido}
            onChange={(e) => set("primer_apellido", e.target.value)}
            required
            className={inputCls}
          />
          {err("primer_apellido")}
        </div>
        <div>
          <label className={labelCls}>Segundo apellido</label>
          <input
            value={form.segundo_apellido}
            onChange={(e) => set("segundo_apellido", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
            autoComplete="email"
            className={inputCls}
          />
          {err("email")}
        </div>
        <div>
          <label className={labelCls}>Repetir email</label>
          <input
            type="email"
            value={form.email_confirmation}
            onChange={(e) => set("email_confirmation", e.target.value)}
            required
            className={inputCls}
          />
          {err("email_confirmation")}
        </div>
      </div>

      {/* Contraseña */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Contraseña</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => set("password", e.target.value)}
            required
            autoComplete="new-password"
            className={inputCls}
          />
          {err("password")}
        </div>
        <div>
          <label className={labelCls}>Repetir contraseña</label>
          <input
            type="password"
            value={form.password_confirmation}
            onChange={(e) => set("password_confirmation", e.target.value)}
            required
            autoComplete="new-password"
            className={inputCls}
          />
          {err("password_confirmation")}
        </div>
      </div>

      {/* Ubicación */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls}>País</label>
          <select
            value={form.pais_codigo}
            onChange={(e) => set("pais_codigo", e.target.value)}
            required
            className={inputCls}
          >
            {paises.map((p) => (
              <option key={p.codigo} value={p.codigo}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Departamento</label>
          <select
            value={form.departamento_id}
            onChange={(e) => set("departamento_id", e.target.value)}
            disabled={loadingDep || !departamentos.length}
            className={inputCls}
          >
            <option value="">
              {loadingDep ? "Cargando…" : "Seleccioná…"}
            </option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Ciudad</label>
          <select
            value={form.ciudad_id}
            onChange={(e) => set("ciudad_id", e.target.value)}
            disabled={loadingCiu || !ciudades.length}
            className={inputCls}
          >
            <option value="">
              {loadingCiu ? "Cargando…" : "Seleccioná…"}
            </option>
            {ciudades.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>Dirección</label>
        <input
          value={form.direccion}
          onChange={(e) => set("direccion", e.target.value)}
          required
          className={inputCls}
        />
        {err("direccion")}
      </div>

      {/* Teléfonos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Teléfono celular</label>
          <input
            value={form.telefono_celular}
            onChange={(e) => set("telefono_celular", e.target.value)}
            required
            className={inputCls}
          />
          {err("telefono_celular")}
        </div>
        <div>
          <label className={labelCls}>
            Teléfono fijo{" "}
            <span className="text-muted-foreground">(opcional)</span>
          </label>
          <input
            value={form.telefono_fijo}
            onChange={(e) => set("telefono_fijo", e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
      >
        {enviando && <LoaderCircle className="h-4 w-4 animate-spin" />}
        {enviando ? "Creando casillero…" : "Crear casillero"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link
          href="/cliente/login"
          className="font-semibold text-primary hover:underline"
        >
          Iniciá sesión
        </Link>
      </p>
      </form>
    </>
  );
}
