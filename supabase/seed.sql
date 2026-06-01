-- Seed de datos de ejemplo: categorías y productos del catálogo.
-- Idempotente: se puede correr varias veces sin duplicar (usa NOT EXISTS por nombre).
-- Imágenes: placeholders de picsum.photos (ver next.config.ts). Reemplazá por
-- imágenes reales subiéndolas desde /admin/productos.

-- Categorías
insert into public.categorias (nombre, orden)
select v.nombre, v.orden
from (values
  ('Electrónica', 1),
  ('Hogar', 2),
  ('Moda', 3),
  ('Deportes', 4),
  ('Belleza', 5),
  ('Juguetes', 6)
) as v(nombre, orden)
where not exists (
  select 1 from public.categorias c where c.nombre = v.nombre
);

-- Productos (categoria_id resuelto por nombre; categoria = nombre denormalizado)
insert into public.productos
  (nombre, descripcion, precio, categoria, categoria_id, imagen_url, activo, bajo_pedido)
select
  v.nombre, v.descripcion, v.precio, v.cat, c.id, v.img, v.activo, v.bajo
from (values
  ('Auriculares Bluetooth XS',
   'Auriculares inalámbricos con cancelación de ruido y 24 h de batería.',
   45.00, 'Electrónica', 'https://picsum.photos/seed/auriculares-xs/600/600', true, true),
  ('Smartwatch Fit Pro',
   'Reloj inteligente con GPS, monitor cardíaco y resistencia al agua.',
   89.90, 'Electrónica', 'https://picsum.photos/seed/smartwatch-fitpro/600/600', true, false),
  ('Parlante portátil Wave',
   'Parlante Bluetooth resistente al agua con sonido envolvente 360°.',
   35.00, 'Electrónica', 'https://picsum.photos/seed/parlante-wave/600/600', true, true),
  ('Cargador inalámbrico 15W',
   'Base de carga rápida compatible con iPhone y Android.',
   22.50, 'Electrónica', 'https://picsum.photos/seed/cargador-15w/600/600', true, false),
  ('Cafetera espresso compacta',
   'Cafetera de 19 bares para espresso y capuchino en casa.',
   120.00, 'Hogar', 'https://picsum.photos/seed/cafetera-espresso/600/600', true, true),
  ('Set de sábanas de algodón',
   'Juego de sábanas 100% algodón para cama de 2 plazas.',
   48.00, 'Hogar', 'https://picsum.photos/seed/sabanas-algodon/600/600', true, false),
  ('Lámpara LED de escritorio',
   'Lámpara regulable con carga USB y 3 tonos de luz.',
   28.00, 'Hogar', 'https://picsum.photos/seed/lampara-led/600/600', true, false),
  ('Organizador de cocina (6 pzs)',
   'Set de 6 recipientes herméticos apilables.',
   32.00, 'Hogar', 'https://picsum.photos/seed/organizador-cocina/600/600', false, false),
  ('Mochila urbana antirrobo',
   'Mochila con puerto USB y compartimento para notebook de 15".',
   55.00, 'Moda', 'https://picsum.photos/seed/mochila-antirrobo/600/600', true, true),
  ('Zapatillas running Aero',
   'Zapatillas livianas con amortiguación para correr.',
   75.00, 'Moda', 'https://picsum.photos/seed/zapatillas-aero/600/600', true, false),
  ('Reloj minimalista de cuero',
   'Reloj analógico con malla de cuero genuino.',
   60.00, 'Moda', 'https://picsum.photos/seed/reloj-cuero/600/600', true, false),
  ('Mancuernas ajustables 20 kg',
   'Par de mancuernas con peso regulable de 2 a 20 kg.',
   130.00, 'Deportes', 'https://picsum.photos/seed/mancuernas-20kg/600/600', true, true),
  ('Botella térmica 1 L',
   'Botella de acero inoxidable, mantiene frío/calor hasta 12 h.',
   18.00, 'Deportes', 'https://picsum.photos/seed/botella-termica/600/600', true, false),
  ('Secador de pelo iónico',
   'Secador profesional de 2000 W con tecnología iónica.',
   65.00, 'Belleza', 'https://picsum.photos/seed/secador-ionico/600/600', true, true),
  ('Set de brochas de maquillaje',
   'Kit de 12 brochas profesionales con estuche.',
   25.00, 'Belleza', 'https://picsum.photos/seed/brochas-maquillaje/600/600', true, false),
  ('Dron mini con cámara HD',
   'Dron plegable con cámara HD y control desde el celular.',
   95.00, 'Juguetes', 'https://picsum.photos/seed/dron-mini/600/600', true, true)
) as v(nombre, descripcion, precio, cat, img, activo, bajo)
join public.categorias c on c.nombre = v.cat
where not exists (
  select 1 from public.productos p where p.nombre = v.nombre
);
