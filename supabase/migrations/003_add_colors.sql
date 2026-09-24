-- ============================================================
-- NOIR STORE — Agrega la columna "colors" (variantes de color) a products
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Seguro de correr sobre una base de datos ya existente.
--
-- Cada color es un objeto libre { name, hex, images[] } definido por el
-- admin (no hay lista predeterminada). Se guarda como JSONB.
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS colors JSONB NOT NULL DEFAULT '[]'::jsonb;
