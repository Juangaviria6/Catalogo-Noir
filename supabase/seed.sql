-- ============================================================
-- NOIR STORE — Seed inicial (12 productos mock)
-- Ejecutar DESPUÉS de schema.sql
-- Las imágenes usan Unsplash como placeholder.
-- En producción reemplazarlas con URLs de Cloudinary.
-- ============================================================

-- Categorías
INSERT INTO categories (id, name, description, image) VALUES
  ('gorras',    'Gorras',    'Accesorios de cabeza premium',         'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'),
  ('conjuntos', 'Conjuntos', 'Sets coordinados de alta calidad',     'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80'),
  ('camisas',   'Camisas',   'Camisas premium para toda ocasión',    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'),
  ('jeans',     'Jeans',     'Denim premium y de colección',         'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- Productos
INSERT INTO products (id, name, price, category, images, description, sizes, featured, badge, sku) VALUES

-- GORRAS
(
  'gorra-001', 'Noir Classic Cap', 89000, 'gorras',
  ARRAY['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80','https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80'],
  'Gorra snapback premium en negro profundo. Bordado tonal del logo Noir en la parte frontal. Correa ajustable trasera en metal negro. Confeccionada en algodón 100% de alta calidad.',
  ARRAY['ÚNICA'], true, 'Bestseller', 'NR-GOR-001'
),
(
  'gorra-002', 'Shadow Dad Hat', 79000, 'gorras',
  ARRAY['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80','https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=800&q=80'],
  'Dad hat estructurado en gris oscuro marengo. Silueta relajada de perfil bajo. Cierre en correa de cuero negro. Ideal para el look casual premium.',
  ARRAY['ÚNICA'], true, 'Nuevo', 'NR-GOR-002'
),
(
  'gorra-003', 'Noir Bucket Essential', 95000, 'gorras',
  ARRAY['https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80','https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'],
  'Bucket hat reversible en negro y gris neutro. Material ripstop resistente al agua. Diseño minimalista con logo bordado discreto en la parte lateral.',
  ARRAY['ÚNICA'], false, NULL, 'NR-GOR-003'
),

-- CONJUNTOS
(
  'conjunto-001', 'Noir Core Set', 289000, 'conjuntos',
  ARRAY['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'],
  'Conjunto de dos piezas en french terry premium. Sudadera de cuello redondo y pantalón jogger. Fit oversized en la parte superior y slim en la inferior. Logo Noir en pecho y cintura.',
  ARRAY['S','M','L','XL'], true, 'Más vendido', 'NR-CON-001'
),
(
  'conjunto-002', 'Shadow Track Set', 319000, 'conjuntos',
  ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80','https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80'],
  'Conjunto deportivo de alto rendimiento en tejido técnico 4-way stretch. Chaqueta bomber y pantalón jogger a juego. Diseño aerodinámico con líneas de contraste en gris.',
  ARRAY['S','M','L','XL','XXL'], true, 'Premium', 'NR-CON-002'
),
(
  'conjunto-003', 'Void Lounge Set', 259000, 'conjuntos',
  ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],
  'Conjunto de lounge wear en algodón modal ultra suave. Perfecto para el día a día con un toque de lujo discreto. Short y camiseta de manga corta en negro absoluto.',
  ARRAY['XS','S','M','L','XL'], false, NULL, 'NR-CON-003'
),

-- CAMISAS
(
  'camisa-001', 'Noir Linen Shirt', 185000, 'camisas',
  ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80','https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'],
  'Camisa de lino premium en negro total. Corte regular con caída perfecta. Botones en tono negro mate. Cuello italiano y mangas largas con puño doble botón. Eleva cualquier outfit.',
  ARRAY['S','M','L','XL','XXL'], true, 'Exclusivo', 'NR-CAM-001'
),
(
  'camisa-002', 'Overshirt Dark Matter', 215000, 'camisas',
  ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4b4a1b?w=800&q=80','https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80'],
  'Overshirt en twill de algodón pesado 280gsm. Fit relaxed inspirado en workwear contemporáneo. Bolsillos de parche frontales y logo Noir bordado en el pecho izquierdo.',
  ARRAY['S','M','L','XL'], false, 'Nuevo', 'NR-CAM-002'
),
(
  'camisa-003', 'Flannel Noir Edition', 175000, 'camisas',
  ARRAY['https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80','https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80'],
  'Camisa de franela premium en cuadros tono sobre tono negro y charcoal. Material de doble capa ultra suave. Versatilidad total: úsala abierta como capa sobre tu outfit.',
  ARRAY['S','M','L','XL','XXL'], false, NULL, 'NR-CAM-003'
),

-- CAMISETAS
(
  'camiseta-001', 'Noir Essential Tee', 95000, 'jeans',
  ARRAY['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80','https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80'],
  'Camiseta deportiva técnica en tejido moisture-wicking. Diseño raglan con costuras planas para máximo confort. Logo reflectante Noir en el pecho. Ideal para entrenamiento o uso casual.',
  ARRAY['XS','S','M','L','XL','XXL'], true, 'Más vendido', 'NR-CTS-001'
),
(
  'camiseta-002', 'Void Performance Shirt', 115000, 'jeans',
  ARRAY['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80','https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80'],
  'Camiseta de rendimiento en tejido 4D stretch ultraligero. Ventilación estratégica en las axilas y espalda. Corte atlético con caída premium. Resistente a la decoloración por sudor.',
  ARRAY['S','M','L','XL','XXL'], true, 'Pro', 'NR-CTS-002'
),
(
  'camiseta-003', 'Longline Noir Graphic', 129000, 'jeans',
  ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'],
  'Camiseta longline oversized en algodón 220gsm. Corte extendido en la parte trasera. Print gráfico exclusivo Noir en la espalda. Una pieza de statement para tu guardarropa.',
  ARRAY['S','M','L','XL'], true, 'Colección', 'NR-CTS-003'
)

ON CONFLICT (id) DO NOTHING;
