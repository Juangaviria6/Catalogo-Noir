import { supabase } from '@/lib/supabase'
import { Category, ProductCategory } from '@/types'

type CategoryRow = {
  id: string
  name: string
  description: string
  image: string
}

type ProductCategoryRow = {
  category: string
}

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const [catRes, countRes] = await Promise.all([
      supabase.from('categories').select('id, name, description, image').order('id'),
      supabase.from('products').select('category'),
    ])

    if (catRes.error) throw catRes.error

    const rows = (catRes.data ?? []) as CategoryRow[]
    const productRows = (countRes.data ?? []) as ProductCategoryRow[]

    const counts = productRows.reduce<Record<string, number>>((acc, row) => {
      acc[row.category] = (acc[row.category] ?? 0) + 1
      return acc
    }, {})

    return rows.map(row => ({
      id: row.id as ProductCategory,
      name: row.name,
      description: row.description,
      image: row.image,
      count: counts[row.id] ?? 0,
    }))
  },

  async updateImage(id: ProductCategory, image: string): Promise<void> {
    // 1. Guardar en localStorage para persistencia inmediata y fallback local
    try {
      const local = JSON.parse(localStorage.getItem('noir_category_images') || '{}')
      local[id] = image
      localStorage.setItem('noir_category_images', JSON.stringify(local))
      window.dispatchEvent(new Event('noir_categories_updated'))
    } catch (e) {
      console.warn('Error al guardar categoría en localStorage:', e)
    }

    // 2. Intentar sincronizar con Supabase si está disponible
    try {
      await supabase.from('categories').upsert({ id, image }, { onConflict: 'id' })
    } catch (e) {
      console.warn('No se pudo guardar en la tabla categories de Supabase (omitido):', e)
    }
  },
}

