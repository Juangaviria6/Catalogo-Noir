-- ============================================================
-- NOIR STORE — Renombra la categoría "Camisetas" a "Jeans"
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Seguro de correr sobre una base de datos ya existente:
-- crea la categoría nueva, reasigna los productos y elimina la vieja.
-- ============================================================

-- 1) Crear la categoría "jeans" (usa la imagen de "camisetas" si existe, si no un placeholder)
INSERT INTO categories (id, name, description, image)
SELECT
  'jeans',
  'Jeans',
  'Denim premium y de colección',
  COALESCE((SELECT image FROM categories WHERE id = 'camisetas'), '')
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE id = 'jeans');

-- 2) Reasignar los productos que estaban en "camisetas"
UPDATE products SET category = 'jeans' WHERE category = 'camisetas';

-- 3) Eliminar la categoría vieja (ya no tiene productos apuntando a ella)
DELETE FROM categories WHERE id = 'camisetas';
