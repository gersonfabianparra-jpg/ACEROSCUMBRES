-- Categorías de productos
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

-- Productos
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2),
  category text not null,
  subcategory text,
  sku text,
  stock integer default 0,
  unit text default 'unidad',
  image_url text,
  specs jsonb,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Cotizaciones
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  surname text not null,
  company text,
  company_rut text,
  phone text not null,
  email text not null,
  message text,
  items jsonb not null,
  status text default 'pendiente',
  created_at timestamptz default now()
);

-- Datos iniciales: categorías
insert into categories (name, slug, description) values
  ('Perfiles de Acero', 'perfiles-acero', 'Variedad de perfiles de acero y acero galvanizado'),
  ('Cubiertas y Revestimientos', 'cubiertas-revestimientos', 'Planchas industriales y paneles arquitectónicos con variados colores, largos y espesores'),
  ('Paneles Aislados', 'paneles-aislados', 'Paneles con núcleos de poliestireno, poliuretano, poliisocianurato y lana de roca'),
  ('Tejas', 'tejas', 'Tejas para techado'),
  ('Accesorios', 'accesorios', 'Accesorios complementarios')
on conflict (slug) do nothing;

-- Datos iniciales: productos (muestra representativa)
insert into products (name, slug, category, subcategory, unit, stock, sku, specs, is_featured) values
  ('Ángulo Doblado 20x20x2mm', 'angulo-doblado-20x20x2mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-20-20-2', '{"ancho": "20mm", "altura": "20mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Ángulo Doblado 25x25x2mm', 'angulo-doblado-25x25x2mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-25-25-2', '{"ancho": "25mm", "altura": "25mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Ángulo Doblado 30x30x2mm', 'angulo-doblado-30x30x2mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-30-30-2', '{"ancho": "30mm", "altura": "30mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Ángulo Doblado 30x30x3mm', 'angulo-doblado-30x30x3mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-30-30-3', '{"ancho": "30mm", "altura": "30mm", "espesor": "3mm", "largo": "6m"}', false),
  ('Ángulo Doblado 40x40x2mm', 'angulo-doblado-40x40x2mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-40-40-2', '{"ancho": "40mm", "altura": "40mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Ángulo Doblado 40x40x3mm', 'angulo-doblado-40x40x3mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-40-40-3', '{"ancho": "40mm", "altura": "40mm", "espesor": "3mm", "largo": "6m"}', false),
  ('Ángulo Doblado 50x50x3mm', 'angulo-doblado-50x50x3mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-50-50-3', '{"ancho": "50mm", "altura": "50mm", "espesor": "3mm", "largo": "6m"}', false),
  ('Ángulo Doblado 50x50x4mm', 'angulo-doblado-50x50x4mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-50-50-4', '{"ancho": "50mm", "altura": "50mm", "espesor": "4mm", "largo": "6m"}', false),
  ('Ángulo Doblado 60x60x4mm', 'angulo-doblado-60x60x4mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-60-60-4', '{"ancho": "60mm", "altura": "60mm", "espesor": "4mm", "largo": "6m"}', false),
  ('Ángulo Doblado 60x60x5mm', 'angulo-doblado-60x60x5mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-60-60-5', '{"ancho": "60mm", "altura": "60mm", "espesor": "5mm", "largo": "6m"}', false),
  ('Ángulo Doblado 70x70x5mm', 'angulo-doblado-70x70x5mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-70-70-5', '{"ancho": "70mm", "altura": "70mm", "espesor": "5mm", "largo": "6m"}', false),
  ('Ángulo Doblado 80x80x5mm', 'angulo-doblado-80x80x5mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-80-80-5', '{"ancho": "80mm", "altura": "80mm", "espesor": "5mm", "largo": "6m"}', false),
  ('Ángulo Doblado 100x100x6mm', 'angulo-doblado-100x100x6mm', 'Perfiles de Acero', 'Ángulos Doblados', 'barra 6m', 10, 'AD-100-100-6', '{"ancho": "100mm", "altura": "100mm", "espesor": "6mm", "largo": "6m"}', true),
  ('Canal C 60x30x2mm', 'canal-c-60x30x2mm', 'Perfiles de Acero', 'Canales', 'barra 6m', 10, 'CC-60-30-2', '{"ancho": "60mm", "altura": "30mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Canal C 80x40x2mm', 'canal-c-80x40x2mm', 'Perfiles de Acero', 'Canales', 'barra 6m', 10, 'CC-80-40-2', '{"ancho": "80mm", "altura": "40mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Canal C 100x50x2mm', 'canal-c-100x50x2mm', 'Perfiles de Acero', 'Canales', 'barra 6m', 10, 'CC-100-50-2', '{"ancho": "100mm", "altura": "50mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Canal U 40x20x2mm', 'canal-u-40x20x2mm', 'Perfiles de Acero', 'Canales', 'barra 6m', 10, 'CU-40-20-2', '{"ancho": "40mm", "altura": "20mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Canal U 60x30x2mm', 'canal-u-60x30x2mm', 'Perfiles de Acero', 'Canales', 'barra 6m', 10, 'CU-60-30-2', '{"ancho": "60mm", "altura": "30mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Tubo Cuadrado 20x20x1.5mm', 'tubo-cuadrado-20x20x1-5mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TC-20-20-15', '{"ancho": "20mm", "alto": "20mm", "espesor": "1.5mm", "largo": "6m"}', false),
  ('Tubo Cuadrado 25x25x1.5mm', 'tubo-cuadrado-25x25x1-5mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TC-25-25-15', '{"ancho": "25mm", "alto": "25mm", "espesor": "1.5mm", "largo": "6m"}', false),
  ('Tubo Cuadrado 30x30x1.5mm', 'tubo-cuadrado-30x30x1-5mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TC-30-30-15', '{"ancho": "30mm", "alto": "30mm", "espesor": "1.5mm", "largo": "6m"}', false),
  ('Tubo Cuadrado 40x40x2mm', 'tubo-cuadrado-40x40x2mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TC-40-40-2', '{"ancho": "40mm", "alto": "40mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Tubo Cuadrado 50x50x2mm', 'tubo-cuadrado-50x50x2mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TC-50-50-2', '{"ancho": "50mm", "alto": "50mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Tubo Rectangular 40x20x1.5mm', 'tubo-rectangular-40x20x1-5mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TR-40-20-15', '{"ancho": "40mm", "alto": "20mm", "espesor": "1.5mm", "largo": "6m"}', false),
  ('Tubo Rectangular 50x25x1.5mm', 'tubo-rectangular-50x25x1-5mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TR-50-25-15', '{"ancho": "50mm", "alto": "25mm", "espesor": "1.5mm", "largo": "6m"}', false),
  ('Tubo Rectangular 60x30x2mm', 'tubo-rectangular-60x30x2mm', 'Perfiles de Acero', 'Perfiles Cerrados', 'barra 6m', 10, 'TR-60-30-2', '{"ancho": "60mm", "alto": "30mm", "espesor": "2mm", "largo": "6m"}', false),
  ('Plancha Industrial AC-4', 'plancha-industrial-ac4', 'Cubiertas y Revestimientos', 'Industrial', 'm²', 50, 'PI-AC4', '{"tipo": "Zinc-Alum", "ondas": "4", "espesor_zinc": "0.4mm"}', true),
  ('Plancha Industrial AC-6', 'plancha-industrial-ac6', 'Cubiertas y Revestimientos', 'Industrial', 'm²', 50, 'PI-AC6', '{"tipo": "Zinc-Alum", "ondas": "6", "espesor_zinc": "0.4mm"}', true),
  ('Plancha Industrial AC-8', 'plancha-industrial-ac8', 'Cubiertas y Revestimientos', 'Industrial', 'm²', 50, 'PI-AC8', '{"tipo": "Zinc-Alum", "ondas": "8", "espesor_zinc": "0.4mm"}', false),
  ('Panel Arquitectónico Liso', 'panel-arquitectonico-liso', 'Cubiertas y Revestimientos', 'Arquitectónico', 'm²', 30, 'PA-LISO', '{"acabado": "Liso", "colores": "múltiples"}', false),
  ('Panel Arquitectónico Acanalado', 'panel-arquitectonico-acanalado', 'Cubiertas y Revestimientos', 'Arquitectónico', 'm²', 30, 'PA-ACANALADO', '{"acabado": "Acanalado", "colores": "múltiples"}', false),
  ('Panel Aislado Poliestireno 50mm', 'panel-aislado-poliestireno-50mm', 'Paneles Aislados', 'Poliestireno', 'm²', 20, 'PAI-PS-50', '{"nucleo": "Poliestireno EPS", "espesor": "50mm", "densidad": "10 kg/m³"}', false),
  ('Panel Aislado Poliestireno 80mm', 'panel-aislado-poliestireno-80mm', 'Paneles Aislados', 'Poliestireno', 'm²', 20, 'PAI-PS-80', '{"nucleo": "Poliestireno EPS", "espesor": "80mm", "densidad": "10 kg/m³"}', false),
  ('Panel Aislado Poliuretano 50mm', 'panel-aislado-poliuretano-50mm', 'Paneles Aislados', 'Poliuretano', 'm²', 20, 'PAI-PU-50', '{"nucleo": "Poliuretano PUR", "espesor": "50mm", "densidad": "40 kg/m³"}', true),
  ('Panel Aislado Poliuretano 80mm', 'panel-aislado-poliuretano-80mm', 'Paneles Aislados', 'Poliuretano', 'm²', 20, 'PAI-PU-80', '{"nucleo": "Poliuretano PUR", "espesor": "80mm", "densidad": "40 kg/m³"}', false),
  ('Panel Aislado Lana de Roca 50mm', 'panel-aislado-lana-roca-50mm', 'Paneles Aislados', 'Lana de Roca', 'm²', 15, 'PAI-LR-50', '{"nucleo": "Lana de Roca", "espesor": "50mm", "resistencia_fuego": "A1"}', false),
  ('Panel Aislado Lana de Roca 80mm', 'panel-aislado-lana-roca-80mm', 'Paneles Aislados', 'Lana de Roca', 'm²', 15, 'PAI-LR-80', '{"nucleo": "Lana de Roca", "espesor": "80mm", "resistencia_fuego": "A1"}', false),
  ('Teja Metálica Española', 'teja-metalica-espanola', 'Tejas', null, 'm²', 25, 'TM-ESP', '{"tipo": "Española", "material": "Acero prepintado"}', false),
  ('Teja Metálica Romana', 'teja-metalica-romana', 'Tejas', null, 'm²', 25, 'TM-ROM', '{"tipo": "Romana", "material": "Acero prepintado"}', false),
  ('Teja Metálica Colonial', 'teja-metalica-colonial', 'Tejas', null, 'm²', 20, 'TM-COL', '{"tipo": "Colonial", "material": "Acero prepintado"}', false),
  ('Tornillos Autoperforantes x100', 'tornillos-autoperforantes-x100', 'Accesorios', null, 'caja', 100, 'ACC-TORN-100', '{"cantidad": "100 unidades", "tipo": "Autoperforante"}', false),
  ('Sello Butilo', 'sello-butilo', 'Accesorios', null, 'rollo', 50, 'ACC-SB', '{"ancho": "50mm", "largo": "20m"}', false),
  ('Cumbrera Estándar', 'cumbrera-estandar', 'Accesorios', null, 'unidad', 40, 'ACC-CUM', '{"largo": "2m", "material": "Acero prepintado"}', false)
on conflict (slug) do nothing;
