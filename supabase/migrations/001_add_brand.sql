-- ============================================================
-- NOIR STORE — Agrega la columna "brand" (marca) a products
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Seguro de correr sobre una base de datos ya existente.
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT;

CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
