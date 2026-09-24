import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice, generateCartWhatsAppLink } from '@/utils'
import Button from '@/components/ui/Button'

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart()

  const handleCheckout = () => {
    window.open(generateCartWhatsAppLink(items, totalPrice), '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-noir-dark border-l border-white/10 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <h2 className="font-heading font-black text-white tracking-tight flex items-center gap-2">
                <ShoppingBag size={16} />
                Tu carrito
              </h2>
              <button onClick={closeCart} className="text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={32} className="text-white/10 mb-4" />
                <p className="font-heading text-white/30 tracking-widest uppercase text-sm">
                  Tu carrito está vacío
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {items.map(item => {
                  const colorData = item.product.colors?.find(c => c.name === item.color)
                  const thumb = colorData?.images[0] || item.product.images[0]
                  return (
                  <div key={`${item.product.id}-${item.size}-${item.color ?? ''}`} className="flex gap-4">
                    <div className="w-20 h-24 shrink-0 overflow-hidden bg-noir-mid">
                      {thumb && (
                        <img
                          src={thumb}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <p className="font-heading font-bold text-white text-sm leading-tight truncate">
                          {item.product.name}
                        </p>
                        <p className="font-heading text-[10px] tracking-wide text-white/30 uppercase mt-0.5 flex items-center gap-1.5">
                          Talla {item.size}
                          {item.color && (
                            <span className="flex items-center gap-1">
                              · {item.color}
                              {colorData && (
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                                  style={{ backgroundColor: colorData.hex }}
                                />
                              )}
                            </span>
                          )}
                        </p>
                        <p className="font-body font-semibold text-white text-sm mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1, item.color)}
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-7 text-center font-heading text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1, item.color)}
                            className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/10 shrink-0 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-xs tracking-widest text-white/40 uppercase">Total</span>
                  <span className="font-body font-semibold text-white text-lg">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-black font-heading font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#22c55e] active:scale-[0.98] transition-all duration-200"
                >
                  <MessageCircle size={18} />
                  Finalizar por WhatsApp
                </button>
                <Button variant="ghost" size="md" fullWidth onClick={closeCart}>
                  Seguir comprando
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
