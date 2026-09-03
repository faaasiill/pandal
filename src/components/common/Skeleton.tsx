import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-[var(--gray-100)]', className)}
      aria-hidden="true"
    />
  )
}

export function PageSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--gray-50)] px-4">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-3 w-28" />
    </div>
  )
}