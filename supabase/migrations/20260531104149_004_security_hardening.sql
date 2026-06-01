-- 1) Fijar search_path en set_updated_at (advisor: function_search_path_mutable)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) Revocar EXECUTE de funciones trigger (no deben exponerse vía RPC).
--    Los triggers se ejecutan como dueño de la tabla, así que esto no los rompe.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.proteger_role() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Nota: public.es_admin() se mantiene ejecutable por anon/authenticated porque
-- las policies RLS de 'productos' y 'profiles' la invocan en el contexto del
-- usuario que consulta; revocar EXECUTE rompería esas policies.

-- 3) Endurecer Storage: el bucket 'productos' es público, por lo que las URLs
--    públicas (getPublicUrl) funcionan SIN policy de SELECT. Quitamos la policy
--    de SELECT amplia (permitía listar todos los archivos) y dejamos SELECT solo
--    para admin (advisor: public_bucket_allows_listing).
drop policy if exists "productos_storage_select_publico" on storage.objects;

create policy "productos_storage_select_admin"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'productos' and public.es_admin());
