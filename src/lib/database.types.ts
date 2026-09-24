// Tipos generados de la estructura de Supabase.
// Para regenerarlos automáticamente: npx supabase gen types typescript --project-id <id>

export type ProductCategory = 'gorras' | 'buzos' | 'camisas' | 'jeans'
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ÚNICA' | '30' | '32' | '34' | '36'
export type ProductColorRow = { name: string; hex: string; images: string[] }

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          category: ProductCategory
          images: string[]
          description: string
          sizes: ProductSize[]
          featured: boolean
          badge: string | null
          sku: string | null
          brand: string | null
          colors: ProductColorRow[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      categories: {
        Row: {
          id: ProductCategory
          name: string
          description: string
          image: string
        }
        Insert: Database['public']['Tables']['categories']['Row']
        Update: Partial<Database['public']['Tables']['categories']['Row']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}
