# Plan de Integración: API Helga en Courier (Next.js 16)

## Estado actual
- Courier es un sitio Next.js 16 solo frontend (sin API routes, sin lib, sin backend)
- No hay integración con Helga
- No hay archivos .env

## Variables de entorno requeridas (.env.local)

```env
HELGA_BASE_URL=https://<ambiente>.helgasys.com
HELGA_CLIENT_ID=<proporcionado por Helga>
HELGA_CLIENT_SECRET=<proporcionado por Helga>
HELGA_APP_ID=<proporcionado por Helga>
```

---

## Arquitectura

```
Browser (cliente) → Next.js API Routes (proxy) → Helga API
```

- Los secrets (`client_id`, `client_secret`, `app_id`) viven solo en el servidor
- El `access_token` del usuario se almacena en cookie httpOnly
- Next.js API routes actúan como proxy seguro

---

## Estructura de archivos

```
src/
├── lib/
│   └── helga/
│       ├── client.ts          # Fetch wrapper con manejo de tokens y refresh automático
│       ├── types.ts           # Interfaces TypeScript para requests/responses
│       ├── auth.ts            # login(), refreshToken()
│       ├── ubicacion.ts       # getCountries(), getDepartments(), getCities(), getIdTypes()
│       ├── clientes.ts        # getCliente(), registerCliente(), updateCliente()
│       ├── prealertas.ts      # crear, consultar, listar, editar, eliminar
│       ├── destinatarios.ts   # crear, editar, consultar, listar, eliminar
│       └── despachos.ts       # paquetes disponibles, solicitudes, anular, pagar
├── app/
│   └── api/
│       └── helga/
│           ├── auth/
│           │   ├── login/route.ts        # POST - login usuario
│           │   ├── refresh/route.ts      # POST - refresh token
│           │   └── logout/route.ts       # POST - limpiar cookies
│           ├── ubicacion/
│           │   ├── paises/route.ts       # GET - países
│           │   ├── departamentos/route.ts # GET ?pais=CO - departamentos
│           │   ├── ciudades/route.ts     # GET ?departamento_id=54 - ciudades
│           │   └── tipos-id/route.ts     # GET - tipos de identificación
│           ├── clientes/
│           │   ├── route.ts              # GET (perfil) / POST (registrar)
│           │   └── actualizar/route.ts   # POST - actualizar perfil
│           ├── prealertas/
│           │   ├── route.ts              # GET (listar) / POST (crear)
│           │   └── [id]/route.ts         # GET / POST (editar) / DELETE
│           ├── destinatarios/
│           │   ├── route.ts              # GET (listar) / POST (crear)
│           │   └── [id]/route.ts         # GET / POST (editar) / DELETE
│           └── despachos/
│               ├── paquetes/route.ts     # POST - paquetes disponibles
│               ├── filtros/route.ts      # GET - info filtros
│               ├── solicitudes/route.ts  # GET (listar) / POST (crear)
│               ├── [id]/
│               │   ├── anular/route.ts   # DELETE
│               │   └── pagar/route.ts    # POST
│               └── ...
```

---

## Fases de implementación

### Fase 1: Base (lib + auth)
1. `src/lib/helga/types.ts` - Todas las interfaces
2. `src/lib/helga/client.ts` - Fetch wrapper con token management
3. `src/lib/helga/auth.ts` - Login y refresh
4. `src/app/api/helga/auth/login/route.ts` - Endpoint login
5. `src/app/api/helga/auth/refresh/route.ts` - Endpoint refresh
6. `src/app/api/helga/auth/logout/route.ts` - Endpoint logout

### Fase 2: Datos públicos (ubicación)
7. `src/lib/helga/ubicacion.ts` - Funciones de ubicación
8. `src/app/api/helga/ubicacion/*` - 4 endpoints

### Fase 3: Clientes
9. `src/lib/helga/clientes.ts` - Funciones de clientes
10. `src/app/api/helga/clientes/*` - 3 endpoints (consultar, registrar, actualizar)

### Fase 4: Prealertas
11. `src/lib/helga/prealertas.ts` - CRUD prealertas
12. `src/app/api/helga/prealertas/*` - 5 endpoints

### Fase 5: Destinatarios
13. `src/lib/helga/destinatarios.ts` - CRUD destinatarios
14. `src/app/api/helga/destinatarios/*` - 5 endpoints

### Fase 6: Despachos
15. `src/lib/helga/despachos.ts` - Funciones de despachos
16. `src/app/api/helga/despachos/*` - 6+ endpoints

---

## Referencia completa de endpoints Helga

### Autenticación
| Método | Path | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/oauth/token` | client_id/secret | Login (grant_type: "password") |
| POST | `/oauth/token` | client_id/secret | Refresh (grant_type: "refresh_token") |

### Ubicación (públicos, solo app_id)
| Método | Path | Descripción |
|--------|------|-------------|
| GET | `/api/casillero/clientes/getCountries/{app_id}` | Países |
| GET | `/api/casillero/clientes/getDepartaments/{codigo_pais}/{app_id}` | Departamentos |
| GET | `/api/casillero/clientes/getCities/{departamento_id}/{app_id}` | Ciudades |
| GET | `/api/tiposdeidentificacion/{app_id}` | Tipos de identificación |

### Clientes
| Método | Path | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/casillero/clientes` | Bearer | Perfil del cliente autenticado |
| POST | `/api/clientes` | app_id | Registrar nuevo cliente |
| POST | `/api/casillero/cliente` | Bearer | Actualizar datos del cliente |

### Prealertas
| Método | Path | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/v2/prealertas` | Bearer | Crear prealerta |
| GET | `/api/casillero/prealertas/{id}` | Bearer | Consultar prealerta |
| POST | `/api/casillero/clientes/prealertas/?page={n}` | Bearer | Listar prealertas (paginado) |
| POST | `/api/casillero/prealertas/{id}` | Bearer | Editar prealerta |
| DELETE | `/api/casillero/prealertas/{id}` | Bearer | Eliminar prealerta |

### Destinatarios Casillero
| Método | Path | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/casillero/destinatarios` | Bearer | Crear destinatario |
| POST | `/api/casillero/destinatarios/{id}` | Bearer | Editar destinatario |
| GET | `/api/casillero/destinatarios/{id}` | Bearer | Consultar destinatario |
| POST | `/api/casillero/clientes/destinatarios` | Bearer | Listar destinatarios (paginado) |
| DELETE | `/api/casillero/destinatarios/{id}` | Bearer | Eliminar destinatario |

### Despachos
| Método | Path | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/casillero/despachos/preliquidaciones/paqsdisponibles` | Bearer | Paquetes disponibles |
| GET | `/api/casillero/despachos/preliquidaciones/infoform` | Bearer | Info filtros |
| POST | `/api/casillero/despachos/preliquidaciones/solrealizadas` | Bearer | Solicitudes realizadas |
| POST | `/api/v2/solicitud-despachos` | Bearer | Crear solicitud de despacho |
| DELETE | `/api/casillero/despachos/preliquidaciones/{id}` | Bearer | Anular solicitud |
| POST | `/api/casillero/pagardespacho/{id}` | Bearer | Pagar solicitud |

---

## Notas importantes
- El `refresh_token` anterior queda invalidado tras usarse. Siempre guardar el nuevo.
- El token expira en 31536000 segundos (~1 año) según docs, pero conviene manejar expiración.
- Los endpoints de ubicación usan `app_id` en la URL (no Bearer token).
- El registro de cliente usa `app_id` en el body (no Bearer token).
- Header `Origin` es validado por Helga (whitelist). Configurar el dominio del sitio.
