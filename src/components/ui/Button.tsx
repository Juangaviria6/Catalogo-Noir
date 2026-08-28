import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from '@/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-white text-black hover:bg-noir-light active:scale-[0.98] border border-white',
  outline:
    'bg-transparent text-white border border-white hover:bg-white hover:text-black',
  ghost:
    'bg-transparent text-white border border-transparent hover:border-white/30 hover:bg-white/5',
  white:
    'bg-white text-black border border-white hover:bg-transparent hover:text-white',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs tracking-widest',
  md: 'px-8 py-3 text-xs tracking-widest',
  lg: 'px-10 py-4 text-sm tracking-widest',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-heading font-semibold uppercase',
          'transition-all duration-300 ease-premium',
          'focus:outline-none focus:ring-1 focus:ring-white/50 focus:ring-offset-1 focus:ring-offset-black',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
            <span>Cargando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
