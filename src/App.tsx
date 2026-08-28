import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import AppRoutes from '@/routes'

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
