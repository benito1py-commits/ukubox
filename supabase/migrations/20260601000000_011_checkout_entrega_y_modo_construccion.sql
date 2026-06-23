-- Datos de entrega capturados en el checkout (pago por transferencia).
alter table public.pedidos add column if not exists direccion_entrega text;
alter table public.pedidos add column if not exists telefono text;

-- Modo "en construcción": cuando es true, el sitio público queda oculto (solo
-- admins pueden previsualizar). Vive en la fila única de configuracion.
alter table public.configuracion
  add column if not exists en_construccion boolean not null default true;

-- Checkout self-service: el usuario crea su pedido con dirección + teléfono.
-- Si el producto tiene precio, el pedido queda pagable de inmediato
-- (estado 'cotizado', precio_cotizado = precio * cantidad). Si no tiene precio,
-- cae a 'pendiente' para que el admin lo cotice.
-- SECURITY DEFINER: el precio se deriva del producto en la DB (no se confía en
-- el cliente) y permite saltar la restricción de insert "solo pendiente".
create or replace function public.crear_pedido(
  p_producto_id uuid,
  p_cantidad integer,
  p_comentario text,
  p_direccion text,
  p_telefono text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_prod public.productos%rowtype;
  v_cant integer := greatest(coalesce(p_cantidad, 1), 1);
  v_estado text;
  v_total numeric;
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'No autenticado';
  end if;

  select * into v_prod from public.productos where id = p_producto_id;

  if not found or not v_prod.activo or not v_prod.bajo_pedido then
    raise exception 'Producto no disponible';
  end if;

  if v_prod.precio is not null then
    v_estado := 'cotizado';
    v_total := round(v_prod.precio * v_cant, 2);
  else
    v_estado := 'pendiente';
    v_total := null;
  end if;

  insert into public.pedidos (
    usuario_id, producto_id, producto_nombre, precio_unitario, precio_cotizado,
    cantidad, comentario, direccion_entrega, telefono, estado
  ) values (
    v_uid, v_prod.id, v_prod.nombre, v_prod.precio, v_total,
    v_cant, nullif(btrim(p_comentario), ''),
    nullif(btrim(p_direccion), ''), nullif(btrim(p_telefono), ''), v_estado
  ) returning id into v_id;

  return v_id;
end;
$$;

revoke execute on function public.crear_pedido(uuid, integer, text, text, text) from public, anon;
grant execute on function public.crear_pedido(uuid, integer, text, text, text) to authenticated;

-- Lee el flag de construcción sin exponer el resto de configuracion (cuyos
-- SELECT están restringidos a authenticated). Legible por anónimos para que la
-- landing pueda decidir qué mostrar.
create or replace function public.sitio_en_construccion()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select en_construccion from public.configuracion where id = true), true);
$$;

grant execute on function public.sitio_en_construccion() to anon, authenticated;
