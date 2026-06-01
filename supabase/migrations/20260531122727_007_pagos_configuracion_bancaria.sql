-- Nuevos estados: incluyen el flujo de pago por transferencia
alter table public.pedidos drop constraint pedidos_estado_check;
alter table public.pedidos add constraint pedidos_estado_check
  check (estado in ('pendiente', 'cotizado', 'pago_informado', 'pagado', 'completado', 'rechazado'));

-- Comprobante de transferencia: ruta dentro del bucket privado 'comprobantes'
alter table public.pedidos add column if not exists comprobante_path text;

-- Configuración global del sitio: una sola cuenta bancaria (fila única)
create table public.configuracion (
  id boolean primary key default true,
  banco text,
  titular text,
  numero_cuenta text,
  documento text,
  alias text,
  instrucciones text,
  updated_at timestamptz not null default now(),
  constraint configuracion_fila_unica check (id)
);

insert into public.configuracion (id) values (true) on conflict (id) do nothing;

alter table public.configuracion enable row level security;

-- Cualquier usuario logueado lee la cuenta bancaria (para pagar); solo admin la edita
create policy "configuracion_select_autenticados"
  on public.configuracion for select to authenticated
  using (true);

create policy "configuracion_update_admin"
  on public.configuracion for update to authenticated
  using (public.es_admin()) with check (public.es_admin());

create trigger configuracion_set_updated_at
  before update on public.configuracion
  for each row execute function public.set_updated_at();

-- El usuario puede actualizar su propio pedido, pero el trigger lo limita a "informar pago"
create policy "pedidos_update_propio"
  on public.pedidos for update to authenticated
  using (usuario_id = auth.uid())
  with check (usuario_id = auth.uid());

create or replace function public.proteger_pedido()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- El admin puede modificar cualquier campo
  if public.es_admin() then
    return new;
  end if;

  -- El usuario común solo puede pasar su pedido de 'cotizado' a 'pago_informado'
  if old.estado <> 'cotizado' or new.estado <> 'pago_informado' then
    raise exception 'Transición de estado no permitida';
  end if;

  -- Y no puede tocar los campos gestionados por el admin
  new.precio_cotizado := old.precio_cotizado;
  new.notas_admin := old.notas_admin;
  new.producto_id := old.producto_id;
  new.producto_nombre := old.producto_nombre;
  new.cantidad := old.cantidad;
  new.comentario := old.comentario;
  new.usuario_id := old.usuario_id;
  new.created_at := old.created_at;

  return new;
end;
$$;

create trigger proteger_pedido_update
  before update on public.pedidos
  for each row execute function public.proteger_pedido();

-- Bucket privado para los comprobantes de transferencia
insert into storage.buckets (id, name, public)
values ('comprobantes', 'comprobantes', false)
on conflict (id) do nothing;

-- El usuario sube a una carpeta con su uid; lee su propia carpeta o el admin
create policy "comprobantes_insert_propio"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'comprobantes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "comprobantes_select_propio_o_admin"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'comprobantes'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.es_admin())
  );
