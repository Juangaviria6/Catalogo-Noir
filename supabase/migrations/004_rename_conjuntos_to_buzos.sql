-- ============================================================
-- NOIR STORE — Renombra la categoría "Conjuntos" a "Buzos"
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Seguro de correr sobre una base de datos ya existente:
-- crea la categoría nueva, reasigna los productos y elimina la vieja.
-- ============================================================

-- 1) Crear la categoría "buzos" (usa la imagen de "conjuntos" si existe, si no un placeholder)
INSERT INTO categories (id, name, description, image)
SELECT
  'buzos',
  'Buzos',
  'Buzos y hoodies streetwear de alto impacto',
  COALESCE((SELECT image FROM categories WHERE id = 'conjuntos'), '')
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE id = 'buzos');

-- 2) Reasignar los productos que estaban en "conjuntos"
UPDATE products SET category = 'buzos' WHERE category = 'conjuntos';

-- 3) Eliminar la categoría vieja (ya no tiene productos apuntando a ella)
DELETE FROM categories WHERE id = 'conjuntos';
