import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn('[Supabase] Variables de entorno no configuradas. Revisa tu archivo .env')
}

// Sin genérico de Database para evitar conflictos de inferencia con supabase-js v2.
// El tipado se maneja en cada servicio mediante los mappers (toProduct, etc.).
export const supabase = createClient(url ?? '', key ?? '')
