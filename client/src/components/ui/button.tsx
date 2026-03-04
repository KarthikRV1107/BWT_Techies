import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
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
