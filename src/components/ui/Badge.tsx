import { HTMLAttributes } from 'react'
import { clsx } from '@/utils'

type BadgeVariant = 'default' | 'featured' | 'new' | 'sale'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  label: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white border border-white/20',
  featured: 'bg-white text-black',
  new: 'bg-white text-black',
  sale: 'bg-red-600 text-white',
}

const Badge = ({ variant = 'default', label, className, ...props }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5',
        'font-heading font-semibold text-[10px] tracking-widest uppercase',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {label}
    </span>
  )
}

export default Badge
