import { useEffect } from 'react'
import HeroSection from '@/components/sections/HeroSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import BrandBanner from '@/components/sections/BrandBanner'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Noir Store | Streetwear Premium en Medellín'
  }, [])

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BrandBanner />
    </>
  )
}

export default HomePage
