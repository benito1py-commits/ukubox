-- Snapshot del precio de lista del producto al crear el pedido.
alter table public.pedidos add column if not exists precio_unitario numeric;

-- Fix del trigger: sin usuario autenticado (service role / migraciones) o admin,
-- no se restringe. Solo el usuario común queda limitado a cotizado -> pago_informado.
-- (También protege la columna nueva precio_unitario.)
create or replace function public.proteger_pedido()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.es_admin() then
    return new;
  end if;

  if old.estado <> 'cotizado' or new.estado <> 'pago_informado' then
    raise exception 'Transición de estado no permitida';
  end if;

  new.precio_cotizado := old.precio_cotizado;
  new.precio_unitario := old.precio_unitario;
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

revoke execute on function public.proteger_pedido() from anon, authenticated, public;

-- Backfill desde el producto (ahora el trigger lo permite).
update public.pedidos p
set precio_unitario = pr.precio
from public.productos pr
where p.producto_id = pr.id and p.precio_unitario is null;
