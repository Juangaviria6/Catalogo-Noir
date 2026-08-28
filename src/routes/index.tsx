import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

const HomePage = lazy(() => import('@/pages/Home'))
const CatalogPage = lazy(() => import('@/pages/Catalog'))
const ProductPage = lazy(() => import('@/pages/Product'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const NotFoundPage = lazy(() => import('@/pages/NotFound'))
const AdminPage = lazy(() => import('@/pages/Admin'))

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-6 h-6 border border-white/30 border-t-white rounded-full animate-spin" />
  </div>
)

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:id" element={<ProductPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* Admin — sin Navbar ni Footer */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
