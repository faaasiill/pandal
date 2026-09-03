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

/** Loading placeholder for a single dashboard stat card. */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="mt-4 h-7 w-16" />
      <Skeleton className="mt-3 h-3 w-20" />
    </div>
  )
}

/** Loading placeholder for a row in a list/table-style panel. */
export function ListRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-1 py-3">
      <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}