import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  CalendarRange,
  Users,
  ClipboardCheck,
  FileClock,
  Settings,
} from 'lucide-react'

export interface AdminNavItem {
  label: string
  path: string
  icon: LucideIcon
  /** Exact-match routing (used for the dashboard index route). */
  end?: boolean
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Work / Events', path: '/admin/works', icon: CalendarRange },
  { label: 'Employees', path: '/admin/employees', icon: Users },
  { label: 'Attendance', path: '/admin/attendance', icon: ClipboardCheck },
  { label: 'Reports & History', path: '/admin/reports', icon: FileClock },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
]