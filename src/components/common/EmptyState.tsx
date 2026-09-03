import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[28px] border border-dashed border-[var(--border)] bg-white px-6 py-14 text-center sm:py-16">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gray-50)]">
        <Icon className="h-5 w-5 text-[var(--gray-400)]" strokeWidth={1.75} />
      </span>
      <h3 className="text-[16px] font-semibold tracking-tight text-[var(--gray-900)]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[14px] tracking-tight text-[var(--gray-500)]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}