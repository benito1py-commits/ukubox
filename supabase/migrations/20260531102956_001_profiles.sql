-- Tabla de perfiles ligada a auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nombre text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Helper para evitar recursión de RLS al chequear admin desde otras tablas
create or replace function public.es_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Crear perfil automáticamente cuando se registra un usuario
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, nombre)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'full_name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Policies de profiles
-- El usuario ve su propia fila; el admin ve todas
create policy "perfil_select_propio_o_admin"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.es_admin());

-- El usuario puede actualizar su nombre, pero NO su rol (se valida el rol vía trigger)
create policy "perfil_update_propio"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Solo admin puede actualizar cualquier perfil (incluido cambiar role)
create policy "perfil_update_admin"
  on public.profiles for update
  to authenticated
  using (public.es_admin())
  with check (public.es_admin());

-- Evitar que un usuario no-admin se auto-promueva: bloquear cambio de role
create or replace function public.proteger_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.es_admin() then
    raise exception 'No autorizado para cambiar el rol';
  end if;
  return new;
end;
$$;

create trigger proteger_role_update
  before update on public.profiles
  for each row execute function public.proteger_role();
