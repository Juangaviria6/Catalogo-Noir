import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { productsService } from '@/services/products'

interface State {
  data: Product | null
  loading: boolean
  error: string | null
  notFound: boolean
}

export const useProduct = (id: string | undefined) => {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null, notFound: false })

  useEffect(() => {
    if (!id) {
      setState({ data: null, loading: false, error: null, notFound: true })
      return
    }

    let cancelled = false
    setState({ data: null, loading: true, error: null, notFound: false })

    productsService.getById(id)
      .then(data => {
        if (!cancelled) {
          setState({ data, loading: false, error: null, notFound: data === null })
        }
      })
      .catch(err => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: err.message, notFound: false })
        }
      })

    return () => { cancelled = true }
  }, [id])

  return state
}
