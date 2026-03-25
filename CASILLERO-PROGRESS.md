# Módulo Casillero - Progreso de Implementación

## Estado: Phase 2 completada - Probando

---

## Phase 0 - Fundación ✅

- [x] Instalar `@supabase/supabase-js` + `@supabase/ssr`
- [x] `.env.local` con URL y Anon Key
- [x] `src/lib/supabase/client.ts` (browser client)
- [x] `src/lib/supabase/server.ts` (server client)
- [x] `src/lib/supabase/proxy.ts` (session refresh)
- [x] `proxy.ts` (Next.js 16 middleware)
- [x] Migración SQL: `offices`, `users`, `admin_users`, `us_addresses` + RLS
- [x] Seed oficinas (Miami, Asunción, CDE, Encarnación)
- [x] Auth context reescrito para Supabase
- [x] Login page actualizado (async)
- [x] Registro page creado (`/registro`)
- [x] `.gitignore` actualizado
- [x] Build sin errores

### Tablas creadas:
- `offices` - sucursales
- `users` - clientes (extiende auth.users)
- `admin_users` - operadores
- `us_addresses` - dirección Miami por cliente

---

## Phase 1 - Portal del Cliente ✅

- [x] Migración SQL: `stores`, `packages`, `pre_alerts`, `recipients`, `package_status_log`
- [x] Seed tiendas (Amazon, eBay, Walmart, etc.)
- [x] RLS policies para todas las tablas
- [x] Server queries: `packages.ts`, `pre-alerts.ts`, `stores.ts`, `recipients.ts`
- [x] Server actions: `pre-alerts.ts`, `recipients.ts`
- [x] `/dashboard/paquetes` - datos reales de Supabase
- [x] `/dashboard/historial` - paquetes entregados
- [x] `/dashboard/pre-alerta` - server action + tiendas reales
- [x] `/dashboard/destinatarios` - CRUD completo (nueva)
- [x] `/consultar` - tracking público sin login
- [x] Dashboard tabs actualizados con "Destinatarios"
- [x] Build sin errores

### Tablas creadas:
- `stores` - catálogo de tiendas
- `packages` - paquetes (entidad central)
- `pre_alerts` - pre-alertas
- `recipients` - destinatarios
- `package_status_log` - auditoría de estados

---

## Phase 2 - Admin Panel + Operaciones Core ✅

- [x] `SiteShell` - oculta Header/Footer en rutas admin
- [x] Admin layout con sidebar oscura estilo Helga
- [x] Admin sidebar con nav items agrupados
- [x] Admin header con breadcrumbs
- [x] Admin login (`/admin/login`) - verifica rol admin
- [x] Admin dashboard (`/admin`) - stats (clientes, paquetes, pendientes, pre-alertas)
- [x] Server queries admin: `searchPackages`, `searchClients`, `searchPreAlerts`, etc.
- [x] Server actions admin: `createPackage`, `digitizePackage`, `createClient_action`
- [x] **Consultar Guía** (`/admin/casillero/consultar-guia`) - búsqueda avanzada
- [x] **Recepción de paquetes** (`/admin/casillero/recepcion`) - CRUD + modal + indicadores
- [x] **Digitación de paquetes** (`/admin/casillero/digitacion`) - lista + modal digitación
- [x] **Pre Alertas** (`/admin/casillero/pre-alertas`) - búsqueda con filtros
- [x] **Clientes** (`/admin/casillero/clientes`) - buscar/listar
- [x] **Clientes** (`/admin/casillero/clientes/nuevo`) - crear nuevo
- [x] **Clientes NN** (`/admin/casillero/clientes-nn`) - paquetes sin cliente
- [x] Build sin errores

### Tablas de Phase 3 ya creadas (migración aplicada):
- `dispatches` - despachos
- `dispatch_packages` - paquetes por despacho
- `package_groups` - bolsas/consolidaciones
- `package_group_items` - paquetes por grupo
- `locations` - ubicaciones almacén (seeded para Miami)

---

## 👉 CONTINUAR AQUÍ: Phase 3 - Despachos y Agrupación

### Pendiente - Páginas admin:
- [ ] Solicitar Despachos (`/admin/casillero/solicitar-despachos`)
- [ ] Despachos General (`/admin/casillero/despachos-general`)
- [ ] Agrupar Paquetes (`/admin/casillero/agrupar-paquetes`)
- [ ] Ubicación (`/admin/casillero/ubicacion`)
- [ ] Actualizar sidebar con estos items

### Server actions pendientes:
- [ ] `createDispatch` - crear despacho individual
- [ ] `createBulkDispatch` - despacho masivo
- [ ] `createPackageGroup` - crear bolsa con precinto
- [ ] `assignLocation` - asignar ubicación a paquete

---

## Phase 4 - Pagos, Facturación e Historial (pendiente)

### Tablas por crear:
- `payments` - pagos
- `invoices` - facturas por oficina

### Páginas por crear:
- [ ] Conciliación de Pagos (`/admin/casillero/conciliacion-pagos`)
- [ ] Estado de Cuenta (`/admin/casillero/estado-cuenta`)
- [ ] Facturación Franquicia (`/admin/casillero/facturacion`)
- [ ] Historial (`/admin/casillero/historial`)
- [ ] Destinatarios Casillero (`/admin/casillero/destinatarios`)

---

## Phase 5 - Catálogo y Extras (pendiente)

- [ ] Tiendas (`/admin/casillero/tiendas`) - CRUD
- [ ] Códigos Promocionales (`/admin/casillero/codigos-promo`) - CRUD
- [ ] Ibox (`/admin/casillero/ibox`) - buzones virtuales
- [ ] Loading skeletons
- [ ] Responsive admin mobile

---

## Phase 6 - Hardening Producción (pendiente)

- [ ] Auditoría RLS
- [ ] Validación Zod en server actions
- [ ] Error boundaries
- [ ] Rate limiting
- [ ] Storage policies para fotos
- [ ] Tests E2E

---

## Para probar ahora

### 1. Crear un admin user
Ir a Supabase Dashboard > Authentication > crear usuario, luego insertar en `admin_users`:
```sql
INSERT INTO admin_users (id, full_name, role)
VALUES ('UUID-del-usuario', 'Admin Test', 'superadmin');
```

### 2. Probar registro de cliente
- Ir a `/registro` y crear una cuenta
- Debería crear user en auth + profile en `users` + dirección US

### 3. Probar dashboard cliente
- Login en `/login`
- Ver `/dashboard/paquetes`, `/dashboard/pre-alerta`, `/dashboard/destinatarios`

### 4. Probar admin
- Login en `/admin/login` con el admin user
- Ver dashboard, consultar guías, recepción, digitación, clientes

### 5. Tracking público
- Ir a `/consultar` y buscar por tracking
