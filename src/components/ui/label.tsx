import { forwardRef, type LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'mb-1.5 block text-[13px] font-medium tracking-tight text-[var(--gray-900)]',
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = 'Label'