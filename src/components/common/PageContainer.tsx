import type { ReactNode } from 'react'

interface PageContainerProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

/**
 * Consistent header + content wrapper for every admin page.
 * Keeps title/description/actions layout identical across the app.
 */
export function PageContainer({ title, description, actions, children }: PageContainerProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-[var(--gray-900)]">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-[14px] tracking-tight text-[var(--gray-500)]">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}