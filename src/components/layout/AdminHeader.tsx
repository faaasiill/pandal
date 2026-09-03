import { Bell, Menu } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  onMenuClick: () => void
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-page)]/90 px-4 backdrop-blur-md sm:h-[72px] sm:px-6 lg:px-10">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--gray-500)] shadow-[var(--shadow-card)] transition-colors duration-150 hover:text-[var(--gray-900)] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-[17px] font-semibold tracking-tight text-[var(--gray-900)]">
        {title}
      </h1>

      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--gray-500)] shadow-[var(--shadow-card)] transition-colors duration-150 hover:text-[var(--gray-900)]"
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </header>
  )
}