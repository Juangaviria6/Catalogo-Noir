const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

type Crop = 'fill' | 'fit' | 'scale' | 'thumb' | 'crop'
type Gravity = 'auto' | 'center' | 'face' | 'north' | 'south'

interface Transforms {
  width?: number
  height?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'avif' | 'jpg'
  crop?: Crop
  gravity?: Gravity
  blur?: number
}

// Construye una URL de Cloudinary con transformaciones.
// Si la imagen ya es una URL completa (http/https), la devuelve tal cual.
// Usar esta función cuando tienes el public_id de Cloudinary.
export const buildCloudinaryUrl = (publicId: string, transforms: Transforms = {}): string => {
  // Si ya es una URL completa, no transformar
  if (publicId.startsWith('http')) return publicId

  if (!CLOUD_NAME) {
    console.warn('[Cloudinary] VITE_CLOUDINARY_CLOUD_NAME no configurado')
    return publicId
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    blur,
  } = transforms

  const parts: string[] = []
  if (width) parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)
  parts.push(`c_${crop}`)
  parts.push(`g_${gravity}`)
  parts.push(`q_${quality}`)
  parts.push(`f_${format}`)
  if (blur) parts.push(`e_blur:${blur}`)

  const t = parts.join(',')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t}/${publicId}`
}

// Presets listos para usar en componentes
export const cloudinary = {
  product: (src: string, width = 800) =>
    buildCloudinaryUrl(src, { width, quality: 'auto', format: 'auto' }),

  productThumb: (src: string) =>
    buildCloudinaryUrl(src, { width: 400, height: 500, crop: 'fill', quality: 'auto', format: 'auto' }),

  category: (src: string) =>
    buildCloudinaryUrl(src, { width: 600, height: 750, crop: 'fill', gravity: 'auto', quality: 'auto', format: 'auto' }),

  hero: (src: string) =>
    buildCloudinaryUrl(src, { width: 1920, quality: 85, format: 'auto' }),

  og: (src: string) =>
    buildCloudinaryUrl(src, { width: 1200, height: 630, crop: 'fill', quality: 80, format: 'jpg' }),
}
