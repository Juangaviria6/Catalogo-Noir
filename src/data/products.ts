import { Product } from '@/types'

// Using high-quality Unsplash images as mock product images
export const products: Product[] = [
  // ─── GORRAS ────────────────────────────────────────────────────────────────
  {
    id: 'gorra-001',
    name: 'Noir Classic Cap',
    price: 89000,
    category: 'gorras',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80',
    ],
    description: 'Gorra snapback premium en negro profundo. Bordado tonal del logo Noir en la parte frontal. Correa ajustable trasera en metal negro. Confeccionada en algodón 100% de alta calidad.',
    sizes: ['ÚNICA'],
    featured: true,
    badge: 'Bestseller',
    sku: 'NR-GOR-001',
  },
  {
    id: 'gorra-002',
    name: 'Shadow Dad Hat',
    price: 79000,
    category: 'gorras',
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80',
      'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=800&q=80',
    ],
    description: 'Dad hat estructurado en gris oscuro marengo. Silueta relajada de perfil bajo. Cierre en correa de cuero negro. Ideal para el look casual premium.',
    sizes: ['ÚNICA'],
    featured: true,
    badge: 'Nuevo',
    sku: 'NR-GOR-002',
  },
  {
    id: 'gorra-003',
    name: 'Noir Bucket Essential',
    price: 95000,
    category: 'gorras',
    images: [
      'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80',
    ],
    description: 'Bucket hat reversible en negro y gris neutro. Material ripstop resistente al agua. Diseño minimalista con logo bordado discreto en la parte lateral.',
    sizes: ['ÚNICA'],
    featured: false,
    sku: 'NR-GOR-003',
  },

  // ─── CONJUNTOS ─────────────────────────────────────────────────────────────
  {
    id: 'conjunto-001',
    name: 'Noir Core Set',
    price: 289000,
    category: 'conjuntos',
    images: [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    description: 'Conjunto de dos piezas en french terry premium. Sudadera de cuello redondo y pantalón jogger. Fit oversized en la parte superior y slim en la inferior. Logo Noir en pecho y cintura.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    badge: 'Más vendido',
    sku: 'NR-CON-001',
  },
  {
    id: 'conjunto-002',
    name: 'Shadow Track Set',
    price: 319000,
    category: 'conjuntos',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    ],
    description: 'Conjunto deportivo de alto rendimiento en tejido técnico 4-way stretch. Chaqueta bomber y pantalón jogger a juego. Diseño aerodinámico con líneas de contraste en gris.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    badge: 'Premium',
    sku: 'NR-CON-002',
  },
  {
    id: 'conjunto-003',
    name: 'Void Lounge Set',
    price: 259000,
    category: 'conjuntos',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    ],
    description: 'Conjunto de lounge wear en algodón modal ultra suave. Perfecto para el día a día con un toque de lujo discreto. Short y camiseta de manga corta en negro absoluto.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
    sku: 'NR-CON-003',
  },

  // ─── CAMISAS ───────────────────────────────────────────────────────────────
  {
    id: 'camisa-001',
    name: 'Noir Linen Shirt',
    price: 185000,
    category: 'camisas',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80',
    ],
    description: 'Camisa de lino premium en negro total. Corte regular con caída perfecta. Botones en tono negro mate. Cuello italiano y mangas largas con puño doble botón. Eleva cualquier outfit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    badge: 'Exclusivo',
    sku: 'NR-CAM-001',
  },
  {
    id: 'camisa-002',
    name: 'Overshirt Dark Matter',
    price: 215000,
    category: 'camisas',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4a1b?w=800&q=80',
      'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&q=80',
    ],
    description: 'Overshirt en twill de algodón pesado 280gsm. Fit relaxed inspirado en workwear contemporáneo. Bolsillos de parche frontales y logo Noir bordado en el pecho izquierdo.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    badge: 'Nuevo',
    sku: 'NR-CAM-002',
  },
  {
    id: 'camisa-003',
    name: 'Flannel Noir Edition',
    price: 175000,
    category: 'camisas',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80',
    ],
    description: 'Camisa de franela premium en cuadros tono sobre tono negro y charcoal. Material de doble capa ultra suave. Versatilidad total: úsala abierta como capa sobre tu outfit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: false,
    sku: 'NR-CAM-003',
  },

  // ─── CAMISETAS ─────────────────────────────────────────────────────────────
  {
    id: 'camiseta-001',
    name: 'Noir Essential Tee',
    price: 95000,
    category: 'jeans',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80',
    ],
    description: 'Camiseta deportiva técnica en tejido moisture-wicking. Diseño raglan con costuras planas para máximo confort. Logo reflectante Noir en el pecho. Ideal para entrenamiento o uso casual.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    badge: 'Más vendido',
    sku: 'NR-CTS-001',
  },
  {
    id: 'camiseta-002',
    name: 'Void Performance Shirt',
    price: 115000,
    category: 'jeans',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80',
    ],
    description: 'Camiseta de rendimiento en tejido 4D stretch ultraligero. Ventilación estratégica en las axilas y espalda. Corte atlético con caída premium. Resistente a la decoloración por sudor.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    badge: 'Pro',
    sku: 'NR-CTS-002',
  },
  {
    id: 'camiseta-003',
    name: 'Longline Noir Graphic',
    price: 129000,
    category: 'jeans',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    ],
    description: 'Camiseta longline oversized en algodón 220gsm. Corte extendido en la parte trasera. Print gráfico exclusivo Noir en la espalda. Una pieza de statement para tu guardarropa.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: true,
    badge: 'Colección',
    sku: 'NR-CTS-003',
  },
]

export const featuredProducts = products.filter(p => p.featured)

export const getProductById = (id: string): Product | undefined =>
  products.find(p => p.id === id)

export const getProductsByCategory = (category: string): Product[] =>
  category === 'all' ? products : products.filter(p => p.category === category)

export const PRICE_RANGE: [number, number] = [
  Math.min(...products.map(p => p.price)),
  Math.max(...products.map(p => p.price)),
]
