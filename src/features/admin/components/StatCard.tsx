import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  tone?: 'accent' | 'success' | 'warning' | 'brand'
}

const toneStyles: Record<NonNullable<StatCardProps['tone']>, string> = {
  accent: 'bg-[var(--accent-bg)] text-[var(--accent)]',
  success: 'bg-[var(--success-bg)] text-[var(--success)]',
  warning: 'bg-[var(--warning-bg)] text-[var(--warning)]',
  brand: 'bg-[var(--brand-tint)] text-[var(--brand-text)]',
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'accent' }: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 transition-shadow duration-150 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium tracking-tight text-[var(--gray-500)]">{label}</p>
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl',
            toneStyles[tone]
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
      <p className="mt-3.5 text-[26px] font-semibold leading-none tracking-tight text-[var(--gray-900)]">
        {value}
      </p>
      {hint && (
        <p className="mt-2.5 text-[12.5px] tracking-tight text-[var(--gray-400)]">{hint}</p>
      )}
    </div>
  )
}