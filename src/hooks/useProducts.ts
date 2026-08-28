import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { productsService } from '@/services/products'

interface State {
  data: Product[]
  loading: boolean
  error: string | null
}

export const useProducts = () => {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    productsService.getAll()
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }) })
      .catch(err => { if (!cancelled) setState({ data: [], loading: false, error: err.message }) })

    return () => { cancelled = true }
  }, [])

  return state
}

export const useFeaturedProducts = () => {
  const [state, setState] = useState<State>({ data: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    productsService.getFeatured()
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }) })
      .catch(err => { if (!cancelled) setState({ data: [], loading: false, error: err.message }) })

    return () => { cancelled = true }
  }, [])

  return state
}
