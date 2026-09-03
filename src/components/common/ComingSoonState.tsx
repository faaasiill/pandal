import { Construction } from 'lucide-react'

interface ComingSoonStateProps {
  title?: string
  description?: string
}

/**
 * Placeholder shown for sidebar destinations that don't have a real
 * feature built yet. Swap this out for the real page as each area
 * of the spec gets implemented.
 */
export function ComingSoonState({
  title = 'Coming soon',
  description = "This section isn't built yet. Check back once it ships.",
}: ComingSoonStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-6 py-20 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-bg)]">
        <Construction className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.75} />
      </span>
      <h3 className="text-[16px] font-semibold tracking-tight text-[var(--gray-900)]">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[14px] tracking-tight text-[var(--gray-500)]">
        {description}
      </p>
    </div>
  )
}