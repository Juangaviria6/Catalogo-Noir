import { CartItem } from '@/types'

export const WHATSAPP_PHONE = '573197872281'

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const generateWhatsAppLink = (
  productName: string,
  productPrice: number,
  selectedSize?: string
): string => {
  const sizeText = selectedSize ? ` - Talla: ${selectedSize}` : ''
  const message = encodeURIComponent(
    `Hola! Me interesa el producto: *${productName}*${sizeText}\nPrecio: ${formatPrice(productPrice)}\n\n¿Está disponible?`
  )
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`
}

export const generateCartWhatsAppLink = (items: CartItem[], total: number): string => {
  const lines = items.map(item =>
    `• *${item.product.name}* (Talla ${item.size}) x${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`
  )
  const message = encodeURIComponent(
    `Hola! Quiero hacer este pedido:\n\n${lines.join('\n')}\n\nTotal: ${formatPrice(total)}\n\n¿Está disponible?`
  )
  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`
}

export const generateContactWhatsAppLink = (
  name: string,
  email: string,
  message: string
): string => {
  const text = encodeURIComponent(
    `Hola! Mi nombre es *${name}* (${email}).\n\n${message}`
  )
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`
}

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const clsx = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ')

export const categoryLabels: Record<string, string> = {
  gorras: 'Gorras',
  conjuntos: 'Conjuntos',
  camisas: 'Camisas',
  jeans: 'Jeans',
  all: 'Todos',
}
