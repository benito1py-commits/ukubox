-- Solicitudes de repuesto automotor ("orden de repuesto").
-- A diferencia de `pedidos`, acá el cliente NO elige un producto del catálogo:
-- describe el vehículo (VIN, marca, modelo, año) y la pieza que necesita, para que
-- el proveedor pueda cotizar sin ida y vuelta. El formulario es público: se puede
-- enviar sin cuenta.

create table public.solicitudes_repuesto (
  id uuid primary key default gen_random_uuid(),
  numero_orden text not null unique,
  -- Null cuando la envía un visitante anónimo.
  usuario_id uuid references auth.users(id) on delete set null,

  -- 01 · Datos del cliente
  cliente text not null,
  telefono text not null,

  -- 02 · Datos del vehículo
  vin text not null,
  marca text not null,
  modelo text not null,
  anio integer not null,
  transmision text,
  combustible text,
  cilindrada text,
  potencia text,

  -- 03 · Datos de la pieza
  descripcion text not null,
  oem text,
  cantidad integer not null default 1 check (cantidad > 0),
  posicion text,
  urgencia text not null default 'normal'
    check (urgencia in ('normal', 'urgente', 'sin_apuro')),
  muestra_fisica boolean not null default false,
  notas text,

  -- Gestión interna
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'en_consulta', 'cotizado', 'cerrado', 'rechazado')),
  notas_admin text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index solicitudes_repuesto_created_at_idx
  on public.solicitudes_repuesto (created_at desc);
create index solicitudes_repuesto_estado_idx
  on public.solicitudes_repuesto (estado);
-- Sostiene el chequeo anti-spam por teléfono en la última hora.
create index solicitudes_repuesto_telefono_created_at_idx
  on public.solicitudes_repuesto (telefono, created_at desc);

-- Mantener updated_at (reutiliza la función de la migración 002)
create trigger solicitudes_repuesto_set_updated_at
  before update on public.solicitudes_repuesto
  for each row execute function public.set_updated_at();

alter table public.solicitudes_repuesto enable row level security;

-- Solo el admin lee las solicitudes (incluyen datos de contacto).
create policy "solicitudes_repuesto_select_admin"
  on public.solicitudes_repuesto for select
  to authenticated
  using (public.es_admin());

create policy "solicitudes_repuesto_update_admin"
  on public.solicitudes_repuesto for update
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

create policy "solicitudes_repuesto_delete_admin"
  on public.solicitudes_repuesto for delete
  to authenticated
  using (public.es_admin());

-- OJO: no hay policy de INSERT a propósito. El alta entra exclusivamente por la
-- RPC de abajo (security definer). Una policy `insert to anon` dejaría que
-- cualquiera se fabrique el numero_orden, se ponga estado 'cerrado' o escriba
-- notas_admin.

-- Alta pública de una solicitud. Mismo molde que public.crear_pedido (011):
-- security definer para saltar RLS, con toda la validación del lado del servidor.
create or replace function public.crear_solicitud_repuesto(
  p_cliente text,
  p_telefono text,
  p_vin text,
  p_marca text,
  p_modelo text,
  p_anio integer,
  p_transmision text,
  p_combustible text,
  p_cilindrada text,
  p_potencia text,
  p_descripcion text,
  p_oem text,
  p_cantidad integer,
  p_posicion text,
  p_urgencia text,
  p_muestra_fisica boolean,
  p_notas text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cliente text := nullif(btrim(p_cliente), '');
  v_telefono text := nullif(btrim(p_telefono), '');
  v_vin text := nullif(upper(btrim(p_vin)), '');
  v_marca text := nullif(btrim(p_marca), '');
  v_modelo text := nullif(btrim(p_modelo), '');
  v_descripcion text := nullif(btrim(p_descripcion), '');
  v_oem text := nullif(upper(btrim(p_oem)), '');
  v_cantidad integer := greatest(coalesce(p_cantidad, 1), 1);
  v_urgencia text := coalesce(nullif(btrim(p_urgencia), ''), 'normal');
  v_anio_max integer := extract(year from now())::integer + 1;
  v_numero text;
  v_intentos integer := 0;
begin
  -- Requeridos
  if v_cliente is null then raise exception 'Ingresá tu nombre o el del taller.'; end if;
  if v_telefono is null then raise exception 'Ingresá un teléfono de contacto.'; end if;
  if v_vin is null then raise exception 'Ingresá el número de VIN (chasis).'; end if;
  if v_marca is null then raise exception 'Ingresá la marca del vehículo.'; end if;
  if v_modelo is null then raise exception 'Ingresá el modelo del vehículo.'; end if;
  if v_descripcion is null then raise exception 'Describí la pieza que necesitás.'; end if;

  -- Año de fabricación
  if p_anio is null or p_anio < 1960 or p_anio > v_anio_max then
    raise exception 'El año de fabricación debe estar entre 1960 y %.', v_anio_max;
  end if;

  -- VIN: el estándar no usa I, O ni Q (se confunden con 1 y 0).
  if v_vin !~ '^[A-HJ-NPR-Z0-9]+$' then
    raise exception 'El VIN sólo admite letras y números, sin las letras I, O ni Q.';
  end if;

  -- Desde 1981 el VIN es de 17 caracteres. Antes de esa fecha había formatos libres.
  if p_anio >= 1981 and length(v_vin) <> 17 then
    raise exception 'Para un vehículo de % el VIN debe tener 17 caracteres (ingresaste %).',
      p_anio, length(v_vin);
  end if;

  if v_urgencia not in ('normal', 'urgente', 'sin_apuro') then
    v_urgencia := 'normal';
  end if;

  -- Anti-spam: como el formulario es anónimo, limitamos por teléfono.
  if (
    select count(*) from public.solicitudes_repuesto
    where telefono = v_telefono and created_at > now() - interval '1 hour'
  ) >= 5 then
    raise exception 'Ya recibimos varias solicitudes con este teléfono. Probá de nuevo en un rato o escribinos por WhatsApp.';
  end if;

  -- numero_orden OR-AAAAMMDD-NNNN, reintentando ante colisión del índice único.
  loop
    v_intentos := v_intentos + 1;
    v_numero := 'OR-' || to_char(now(), 'YYYYMMDD') || '-' ||
                lpad((floor(random() * 9000) + 1000)::integer::text, 4, '0');

    begin
      insert into public.solicitudes_repuesto (
        numero_orden, usuario_id,
        cliente, telefono,
        vin, marca, modelo, anio, transmision, combustible, cilindrada, potencia,
        descripcion, oem, cantidad, posicion, urgencia, muestra_fisica, notas,
        estado
      ) values (
        v_numero, auth.uid(),
        v_cliente, v_telefono,
        v_vin, v_marca, v_modelo, p_anio,
        nullif(btrim(p_transmision), ''), nullif(btrim(p_combustible), ''),
        nullif(btrim(p_cilindrada), ''), nullif(btrim(p_potencia), ''),
        v_descripcion, v_oem, v_cantidad,
        nullif(btrim(p_posicion), ''), v_urgencia,
        coalesce(p_muestra_fisica, false), nullif(btrim(p_notas), ''),
        'pendiente'
      );
      return v_numero;
    exception when unique_violation then
      if v_intentos >= 10 then
        raise exception 'No pudimos generar el número de orden. Intentá de nuevo.';
      end if;
    end;
  end loop;
end;
$$;

grant execute on function public.crear_solicitud_repuesto(
  text, text, text, text, text, integer, text, text, text, text,
  text, text, integer, text, text, boolean, text
) to anon, authenticated;
