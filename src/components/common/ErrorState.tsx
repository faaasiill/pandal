import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We had trouble loading this. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--danger-bg)]">
        <AlertTriangle className="h-5 w-5 text-[var(--danger)]" strokeWidth={1.75} />
      </span>
      <h3 className="text-[16px] font-semibold tracking-tight text-[var(--gray-900)]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[14px] tracking-tight text-[var(--gray-500)]">
        {description}
      </p>
      {onRetry && (
        <div className="mt-5 w-full max-w-[160px]">
          <Button type="button" variant="ghost" onClick={onRetry}>
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}