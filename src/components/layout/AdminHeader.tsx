import { Menu } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  onMenuClick: () => void
}

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] shrink-0 items-center gap-3 border-b border-[var(--border)] bg-white/80 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-1.5 text-[var(--gray-500)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-900)] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="text-[17px] font-semibold tracking-tight text-[var(--gray-900)]">{title}</h1>
    </header>
  )
}