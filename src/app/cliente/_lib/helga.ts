import "server-only";
import { cookies } from "next/headers";

/**
 * Mini-lib autocontenida para hablar con la API de Helga.
 * NO reutiliza src/lib/helga/* — este módulo es independiente y vive solo
 * bajo /cliente. Toda la lógica de "mantener la sesión" está acá.
 *
 * Cómo se mantiene la sesión (la parte importante):
 *  1. login → POST /oauth/token → devuelve access_token + refresh_token.
 *  2. Guardamos ambos en cookies httpOnly (el navegador nunca ve el token).
 *  3. Cada llamada autenticada manda Authorization: Bearer <access_token>.
 *  4. Si el access falta/expira, usamos el refresh_token para pedir uno nuevo.
 */

const BASE_URL = process.env.HELGA_BASE_URL!;
const CLIENT_ID = process.env.HELGA_CLIENT_ID!;
const CLIENT_SECRET = process.env.HELGA_CLIENT_SECRET!;

const ACCESS_COOKIE = "cliente_access_token";
const REFRESH_COOKIE = "cliente_refresh_token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/cliente",
};

// ===== Tipos mínimos =====

export interface TokenResponse {
  token_type: "Bearer";
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface Perfil {
  primer_nombre: string;
  primer_apellido: string;
  email: string;
  codigo_casillero: string;
  telefono_celular: string;
  pais: { nombre: string } | null;
  ciudad: { nombre: string } | null;
}

/** Envelope estándar de los endpoints /api/casillero/* */
interface HelgaEnvelope<T> {
  datos: T;
  msg: string;
  errores: unknown;
}

/** Error de la API de Helga con status + body original. */
export class HelgaError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, data: unknown) {
    super(`Helga API error (${status})`);
    this.name = "HelgaError";
    this.status = status;
    this.data = data;
  }
}

// ===== Llamadas a la API =====

/** Login: obtiene tokens con usuario/contraseña (password grant). */
export async function getToken(
  username: string,
  password: string
): Promise<TokenResponse> {
  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "password",
      client_id: Number(CLIENT_ID),
      client_secret: CLIENT_SECRET,
      username,
      password,
      scope: "",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new HelgaError(res.status, data);
  return data as TokenResponse;
}

/** Refresh: obtiene un nuevo access_token usando el refresh_token. */
export async function refreshToken(refresh: string): Promise<TokenResponse> {
  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh,
      client_id: Number(CLIENT_ID),
      client_secret: CLIENT_SECRET,
      scope: "",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new HelgaError(res.status, data);
  return data as TokenResponse;
}

/** Perfil del cliente autenticado. */
export async function getPerfil(accessToken: string): Promise<Perfil> {
  const res = await fetch(`${BASE_URL}/api/casillero/clientes`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new HelgaError(res.status, data);
  return (data as HelgaEnvelope<Perfil>).datos;
}

// ===== Manejo de sesión (cookies) =====

/** Guarda access + refresh en cookies httpOnly. */
export async function setSession(tokens: TokenResponse): Promise<void> {
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.access_token, {
    ...COOKIE_OPTIONS,
    maxAge: tokens.expires_in,
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...COOKIE_OPTIONS,
    maxAge: tokens.expires_in * 2, // el refresh vive más que el access
  });
}

/** Borra las cookies de sesión (logout). */
export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

/**
 * Devuelve un access_token válido. Si el access no está pero hay refresh,
 * refresca y re-setea las cookies. Lanza si no hay sesión.
 */
export async function getValidAccessToken(): Promise<string> {
  const store = await cookies();
  const access = store.get(ACCESS_COOKIE)?.value;
  if (access) return access;

  const refresh = store.get(REFRESH_COOKIE)?.value;
  if (!refresh) throw new Error("No autenticado");

  const tokens = await refreshToken(refresh);
  await setSession(tokens);
  return tokens.access_token;
}
