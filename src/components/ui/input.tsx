import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  trailing?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, trailing, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          aria-invalid={hasError}
          className={cn(
            'w-full rounded-2xl border bg-[var(--gray-50)] py-3.5 pl-4 text-[15px] tracking-tight text-[var(--gray-900)]',
            'placeholder:text-[var(--gray-400)] transition-colors duration-150',
            'focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]',
            trailing ? 'pr-11' : 'pr-4',
            hasError ? 'border-[var(--danger)]' : 'border-transparent',
            className
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">{trailing}</span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'