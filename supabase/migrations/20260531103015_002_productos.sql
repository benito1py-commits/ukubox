-- Tabla de productos del catálogo
create table public.productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  precio numeric(12,2),
  categoria text,
  imagen_url text,
  activo boolean not null default true,
  creado_por uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.productos enable row level security;

-- Mantener updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger productos_set_updated_at
  before update on public.productos
  for each row execute function public.set_updated_at();

-- Lectura pública SOLO de productos activos (incluye usuarios anónimos)
create policy "productos_select_activos_publico"
  on public.productos for select
  to anon, authenticated
  using (activo = true or public.es_admin());

-- Escritura solo para admin
create policy "productos_insert_admin"
  on public.productos for insert
  to authenticated
  with check (public.es_admin());

create policy "productos_update_admin"
  on public.productos for update
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

create policy "productos_delete_admin"
  on public.productos for delete
  to authenticated
  using (public.es_admin());

create index productos_activo_idx on public.productos (activo);
