import { supabase } from '@/lib/supabase'
import { Product, ProductCategory } from '@/types'
import { slugify } from '@/utils'

type Row = {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  sizes: string[]
  featured: boolean
  badge: string | null
  sku: string | null
  brand: string | null
}

const toProduct = (row: Row): Product => ({
  id: row.id,
  name: row.name,
  price: row.price,
  category: row.category as ProductCategory,
  images: row.images,
  description: row.description,
  sizes: row.sizes as Product['sizes'],
  featured: row.featured,
  badge: row.badge ?? undefined,
  sku: row.sku ?? undefined,
  brand: row.brand ?? undefined,
})

export const productsService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data ?? []).map(toProduct)
  },

  async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8)

    if (error) throw error
    return (data ?? []).map(toProduct)
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // not found
      throw error
    }
    return data ? toProduct(data) : null
  },

  async getByCategory(category: ProductCategory): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data ?? []).map(toProduct)
  },

  async create(input: Omit<Product, 'id'>): Promise<Product> {
    const id = `${slugify(input.name)}-${Date.now().toString(36)}`
    const { data, error } = await supabase
      .from('products')
      .insert({
        id,
        name: input.name,
        price: input.price,
        category: input.category,
        images: input.images,
        description: input.description,
        sizes: input.sizes,
        featured: input.featured,
        badge: input.badge ?? null,
        sku: input.sku ?? null,
        brand: input.brand ?? null,
      })
      .select()
      .single()

    if (error) throw error
    return toProduct(data as Row)
  },

  async update(id: string, input: Partial<Omit<Product, 'id'>>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...(input.name !== undefined && { name: input.name }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.images !== undefined && { images: input.images }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.sizes !== undefined && { sizes: input.sizes }),
        ...(input.featured !== undefined && { featured: input.featured }),
        ...('badge' in input ? { badge: input.badge ?? null } : {}),
        ...('sku' in input ? { sku: input.sku ?? null } : {}),
        ...('brand' in input ? { brand: input.brand ?? null } : {}),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return toProduct(data as Row)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  },
}
