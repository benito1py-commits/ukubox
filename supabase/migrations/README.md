# Migraciones de Supabase

Esquema del backend Supabase del módulo de **catálogo / pedidos** (paralelo a Helga).
Estas migraciones se aplicaron originalmente al proyecto remoto (`dvvomybmfaulqdxoymbz`)
y se volcaron acá para versionar el esquema. El orden lo da el prefijo timestamp.

| Migración | Qué hace |
|-----------|----------|
| `001_profiles` | Tabla `profiles` (1:1 con `auth.users`), `es_admin()`, trigger de alta de usuario, RLS y `proteger_role`. |
| `002_productos` | Tabla `productos`, `set_updated_at()`, RLS (lectura pública de activos, escritura admin). |
| `003_storage_productos` | Bucket público `productos` + policies. |
| `004_security_hardening` | `search_path` en funciones, revoca EXECUTE de triggers, ajusta SELECT del bucket. |
| `005_fix_proteger_role_service` | `proteger_role` permite cambios desde service role / `auth.uid()` null. |
| `006_pedidos_bajo_pedido` | Flag `productos.bajo_pedido` + tabla `pedidos` con RLS. |
| `007_pagos_configuracion_bancaria` | Estados de pago, `comprobante_path`, tabla `configuracion`, bucket privado `comprobantes`, trigger `proteger_pedido`. |
| `008_revoke_proteger_pedido_execute` | Revoca EXECUTE de `proteger_pedido` (es trigger, no RPC). |
| `009_categorias` | Tabla `categorias` + `productos.categoria_id` + migración de los textos libres. |
| `010_pedidos_precio_unitario` | `pedidos.precio_unitario` (snapshot del precio de lista) + fix de `proteger_pedido`. |
| `011_checkout_entrega_y_modo_construccion` | `pedidos.direccion_entrega`/`telefono`, `crear_pedido()`, flag `en_construccion` + `sitio_en_construccion()`. |
| `012_solicitudes_repuesto` | Tabla `solicitudes_repuesto` (orden de repuesto automotor), RLS admin-only y `crear_solicitud_repuesto()` pública. |

## Aplicar en un proyecto nuevo

Con la **Supabase CLI** (vinculado al proyecto):

```bash
supabase db push
```

O pegando cada archivo, **en orden**, en el SQL Editor del dashboard.

## Configuración manual (no va en SQL)

Estos ajustes se hacen en el dashboard de Supabase, no en las migraciones:

1. **Auth → Email**: dejar **"Confirm email" OFF** para que el registro cree la cuenta
   al instante (el SMTP integrado tiene rate limit bajo). Si se activa, configurar SMTP propio.
2. **Auth → SMTP**: configurar SMTP propio (Resend/SendGrid) para que funcione el correo
   de **recuperación de contraseña**.
3. **Auth → URL Configuration → Redirect URLs**: agregar la URL del sitio +
   `/sitio/restablecer` (y `http://localhost:3000/**` en dev).
4. **Bootstrap del primer admin** (tras registrarse):

   ```sql
   update public.profiles set role = 'admin' where email = '<correo>';
   ```

## Variables de entorno

`.env.local` con `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
