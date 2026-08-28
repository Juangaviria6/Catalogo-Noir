import { useState, useEffect, useCallback } from 'react'
import { Category } from '@/types'
import { categoriesService } from '@/services/categories'
import { fallbackCategories } from '@/data/categories'

interface State {
  data: Category[]
  loading: boolean
  error: string | null
}

const getLocalOverrides = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem('noir_category_images') || '{}')
  } catch {
    return {}
  }
}

const applyOverrides = (categories: Category[]): Category[] => {
  const overrides = getLocalOverrides()
  return categories.map(cat => ({
    ...cat,
    image: overrides[cat.id] || cat.image,
  }))
}

export const useCategories = () => {
  const [state, setState] = useState<State>({
    data: applyOverrides(fallbackCategories),
    loading: true,
    error: null,
  })

  const loadCategories = useCallback(async () => {
    try {
      const data = await categoriesService.getAll()
      if (!data || data.length === 0) {
        setState({ data: applyOverrides(fallbackCategories), loading: false, error: null })
      } else {
        const merged = data.map(item => {
          const fb = fallbackCategories.find(f => f.id === item.id)
          return {
            ...item,
            image: item.image || fb?.image || 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80',
          }
        })
        setState({ data: applyOverrides(merged), loading: false, error: null })
      }
    } catch {
      setState({ data: applyOverrides(fallbackCategories), loading: false, error: null })
    }
  }, [])

  useEffect(() => {
    loadCategories()

    const handleUpdate = () => {
      setState(prev => ({
        ...prev,
        data: applyOverrides(prev.data.length > 0 ? prev.data : fallbackCategories),
      }))
    }

    window.addEventListener('noir_categories_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('noir_categories_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [loadCategories])

  return state
}


