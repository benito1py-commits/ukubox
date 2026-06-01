-- Categorías estructuradas (antes 'categoria' era texto libre en productos)
create table public.categorias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now()
);

-- FK en productos (mantenemos también la columna de texto 'categoria' denormalizada
-- como nombre para que el display existente siga funcionando sin joins)
alter table public.productos
  add column if not exists categoria_id uuid references public.categorias(id) on delete set null;

-- Migrar los textos libres existentes a filas de categorias y enlazar
insert into public.categorias (nombre)
select distinct trim(categoria)
from public.productos
where categoria is not null and trim(categoria) <> '';

update public.productos p
set categoria_id = c.id
from public.categorias c
where p.categoria is not null and trim(p.categoria) = c.nombre;

alter table public.categorias enable row level security;

-- Lectura pública (para el filtro del catálogo); escritura solo admin
create policy "categorias_select_publico"
  on public.categorias for select
  using (true);

create policy "categorias_admin_all"
  on public.categorias for all
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

create index categorias_orden_idx on public.categorias (orden, nombre);
create index productos_categoria_id_idx on public.productos (categoria_id);
