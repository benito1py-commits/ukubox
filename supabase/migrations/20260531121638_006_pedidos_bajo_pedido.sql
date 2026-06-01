-- Flag "bajo pedido" en productos: el admin marca qué productos se solicitan a pedido
alter table public.productos
  add column if not exists bajo_pedido boolean not null default false;

-- Tabla de pedidos (solicitudes "bajo pedido" hechas por usuarios sobre un producto del catálogo)
create table public.pedidos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users(id) on delete cascade,
  producto_id uuid references public.productos(id) on delete set null,
  producto_nombre text not null,
  cantidad integer not null default 1 check (cantidad > 0),
  comentario text,
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'cotizado', 'aprobado', 'rechazado', 'completado')),
  precio_cotizado numeric,
  notas_admin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pedidos_usuario_id_idx on public.pedidos (usuario_id);
create index pedidos_estado_idx on public.pedidos (estado);

alter table public.pedidos enable row level security;

-- Usuario ve sus propios pedidos; el admin ve todos
create policy "pedidos_select_propios_o_admin"
  on public.pedidos for select
  to authenticated
  using (usuario_id = auth.uid() or public.es_admin());

-- Usuario crea pedidos a su nombre y siempre en estado 'pendiente'
create policy "pedidos_insert_propios"
  on public.pedidos for insert
  to authenticated
  with check (usuario_id = auth.uid() and estado = 'pendiente');

-- Solo el admin cotiza / cambia estado
create policy "pedidos_update_admin"
  on public.pedidos for update
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

-- Solo el admin borra
create policy "pedidos_delete_admin"
  on public.pedidos for delete
  to authenticated
  using (public.es_admin());

-- Mantener updated_at (reutiliza la función existente)
create trigger pedidos_set_updated_at
  before update on public.pedidos
  for each row execute function public.set_updated_at();
