import * as React from 'react'
// Minimal shim for class-variance-authority
type VariantConfig = {
  variants?: Record<string, Record<string, string>>
  defaultVariants?: Record<string, string>
}

type VariantProps<T> = T extends { variants: infer V; defaultVariants: infer D }
  ? { [K in keyof V]?: keyof V[K] } & { [K in keyof D]?: D[K] }
  : never

function cva(base: string, config?: VariantConfig) {
  return (props?: Record<string, string | undefined>) => {
    const classes = [base]
    if (config?.variants && props) {
      for (const [key, value] of Object.entries(props)) {
        const variantClass = config.variants[key]?.[value || '']
        if (variantClass) classes.push(variantClass)
      }
    }
    return classes.join(' ')
  }
}
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-[hsl(142_71%_45%)] text-black shadow-glow hover:opacity-90',
        outline: 'border border-[hsl(142_71%_45%)] text-[hsl(142_71%_45%)] hover:bg-[hsl(142_71%_45%_/_0.1)]',
        hero: 'bg-[hsl(142_71%_45%)] text-black shadow-[0_0_40px_hsl(142_71%_45%_/0.35)] hover:opacity-95',
        'hero-outline':
          'border border-[hsl(142_71%_45%)] text-[hsl(142_71%_45%)] hover:bg-[hsl(142_71%_45%)] hover:text-black',
      },
      size: {
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6',
        sm: 'h-9 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
