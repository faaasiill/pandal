import { NavLink } from 'react-router-dom'
import { ChefHat, LogOut, X } from 'lucide-react'
import { ADMIN_NAV_ITEMS } from '../../features/admin/config/navigation'
import { cn } from '../../lib/utils'
import { useAuth } from '../../features/auth/store/AuthProvider'
import { signOut } from '../../features/auth/api/auth.api'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { user } = useAuth()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col bg-white transition-transform duration-200 ease-out',
          'rounded-r-[28px] shadow-[var(--shadow-card-lg)] lg:rounded-none lg:shadow-none',
          'border-r border-[var(--border)]',
          'lg:static lg:z-0 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:h-[72px]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand-bg)]">
              <ChefHat className="h-[18px] w-[18px] text-white" strokeWidth={2.25} />
            </span>
            <div className="leading-tight">
              <p className="text-[15px] font-semibold tracking-tight text-[var(--gray-900)]">
                Pandal
              </p>
              <p className="text-[12px] tracking-tight text-[var(--gray-400)]">Admin panel</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--gray-400)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-900)] lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-medium tracking-tight transition-colors duration-150',
                      isActive
                        ? 'bg-[var(--brand-tint)] text-[var(--brand-text)]'
                        : 'text-[var(--gray-500)] hover:bg-[var(--gray-50)] hover:text-[var(--gray-900)]'
                    )
                  }
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer / account */}
        <div className="shrink-0 border-t border-[var(--border)] p-3">
          <div className="flex items-center gap-2.5 rounded-2xl px-2 py-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--gray-100)] text-[12px] font-semibold text-[var(--gray-900)]">
              {getInitials(user?.fullName || user?.email)}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[13px] font-medium tracking-tight text-[var(--gray-900)]">
                {user?.fullName || user?.email}
              </p>
              <p className="text-[12px] capitalize tracking-tight text-[var(--gray-400)]">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="mt-1 flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-medium tracking-tight text-[var(--gray-500)] transition-colors duration-150 hover:bg-[var(--danger-bg)] hover:text-[var(--danger)]"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

function getInitials(name?: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '')
  return initials.join('') || '?'
}