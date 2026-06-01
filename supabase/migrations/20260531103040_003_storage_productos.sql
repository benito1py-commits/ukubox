-- Bucket público de imágenes de productos
insert into storage.buckets (id, name, public)
values ('productos', 'productos', true)
on conflict (id) do nothing;

-- Lectura pública de los objetos del bucket productos
create policy "productos_storage_select_publico"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'productos');

-- Subida / actualización / borrado solo para admin
create policy "productos_storage_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos' and public.es_admin());

create policy "productos_storage_update_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'productos' and public.es_admin())
  with check (bucket_id = 'productos' and public.es_admin());

create policy "productos_storage_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos' and public.es_admin());
