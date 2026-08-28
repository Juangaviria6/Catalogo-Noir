-- ============================================================
-- NOIR STORE — Schema Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image       TEXT NOT NULL DEFAULT ''
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  price       INTEGER NOT NULL,
  category    TEXT NOT NULL REFERENCES categories(id),
  images      TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  sizes       TEXT[] NOT NULL DEFAULT '{}',
  featured    BOOLEAN NOT NULL DEFAULT false,
  badge       TEXT,
  sku         TEXT UNIQUE,
  brand       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured  ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_created   ON products(created_at DESC);

-- ── Row Level Security ────────────────────────────────────────────────────
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Lectura pública (sin autenticación)
CREATE POLICY "public_read_products"
  ON products FOR SELECT USING (true);

CREATE POLICY "public_read_categories"
  ON categories FOR SELECT USING (true);

-- Escritura solo para usuarios autenticados con rol admin
-- (Activa esto cuando agregues un panel de administración)
-- CREATE POLICY "admin_write_products"
--   ON products FOR ALL
--   USING (auth.jwt() ->> 'role' = 'admin')
--   WITH CHECK (auth.jwt() ->> 'role' = 'admin');
