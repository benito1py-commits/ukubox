-- Permitir cambios de rol desde operaciones de servicio (sin sesión: service_role
-- o SQL directo donde auth.uid() es null). Un usuario autenticado normal sigue
-- sin poder auto-promoverse: solo un admin puede cambiar el rol.
create or replace function public.proteger_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.es_admin() then
    raise exception 'No autorizado para cambiar el rol';
  end if;
  return new;
end;
$$;
