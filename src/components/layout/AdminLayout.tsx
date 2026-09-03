import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { ADMIN_NAV_ITEMS } from '../../features/admin/config/navigation'

function usePageTitle(): string {
  const { pathname } = useLocation()
  const match = [...ADMIN_NAV_ITEMS]
    .sort((a, b) => b.path.length - a.path.length)
    .find((item) => (item.end ? pathname === item.path : pathname.startsWith(item.path)))
  return match?.label ?? 'Admin'
}

export function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const title = usePageTitle()

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-[var(--bg-page)]">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-7 lg:px-10 lg:py-9">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}