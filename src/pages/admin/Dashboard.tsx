import { useEffect, useState } from 'react'
import { Briefcase, CalendarClock, ClipboardList, MapPin, UserCheck, Users } from 'lucide-react'
import { PageContainer } from '../../components/common/PageContainer'
import { StatCard } from '../../features/admin/components/StatCard'
import { StatCardSkeleton, ListRowSkeleton, HeroSkeleton } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { useAuth } from '../../features/auth/store/AuthProvider'

// Placeholder data only — wire this up to real queries once the
// Work/Attendance features are built.
const MOCK_STATS = {
  totalWorks: 42,
  activeWorks: 5,
  employees: 118,
  pendingAttendance: 9,
}

interface UpcomingWork {
  id: string
  name: string
  date: string
  location: string
  seatsFilled: number
  seatsTotal: number
}

const MOCK_UPCOMING_WORKS: UpcomingWork[] = [
  { id: '1', name: 'Menon Wedding Reception', date: 'Sep 6, 6:00 PM', location: 'Kochi', seatsFilled: 18, seatsTotal: 20 },
  { id: '2', name: 'Infopark Annual Meet', date: 'Sep 9, 11:00 AM', location: 'Kakkanad', seatsFilled: 10, seatsTotal: 15 },
  { id: '3', name: 'Thrissur Pooram Catering', date: 'Sep 12, 7:00 AM', location: 'Thrissur', seatsFilled: 22, seatsTotal: 30 },
]

function greetingForNow(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  // Simulated fetch delay so the skeleton states below are easy to see
  // in review. Replace with a real loading flag once data is wired up.
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageContainer title="Dashboard" description="An overview of works, employees, and attendance.">
      {/* Greeting hero — continues the auth pages' rounded, brand-tinted language */}
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--brand-bg)] text-[15px] font-semibold text-white">
              {getInitials(user?.fullName || user?.email)}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="text-[13px] tracking-tight text-[var(--gray-500)]">
                {greetingForNow()}
              </p>
              <p className="truncate text-[17px] font-semibold tracking-tight text-[var(--gray-900)]">
                {user?.fullName || user?.email}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Total Works"
              value={String(MOCK_STATS.totalWorks)}
              hint="All-time events"
              icon={Briefcase}
              tone="brand"
            />
            <StatCard
              label="Active Works"
              value={String(MOCK_STATS.activeWorks)}
              hint="Currently running"
              icon={ClipboardList}
              tone="success"
            />
            <StatCard
              label="Employees"
              value={String(MOCK_STATS.employees)}
              hint="Registered on the platform"
              icon={Users}
              tone="accent"
            />
            <StatCard
              label="Pending Attendance"
              value={String(MOCK_STATS.pendingAttendance)}
              hint="Awaiting your approval"
              icon={UserCheck}
              tone="warning"
            />
          </>
        )}
      </div>

      <div className="rounded-[28px] border border-[var(--border)] bg-white">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-[var(--gray-400)]" />
            <h3 className="text-[15px] font-semibold tracking-tight text-[var(--gray-900)]">
              Upcoming Works
            </h3>
          </div>
        </div>

        <div className="divide-y divide-[var(--border)] px-3 sm:px-4">
          {isLoading ? (
            <>
              <ListRowSkeleton />
              <ListRowSkeleton />
              <ListRowSkeleton />
            </>
          ) : MOCK_UPCOMING_WORKS.length === 0 ? (
            <div className="py-2">
              <EmptyState
                title="No upcoming works"
                description="New events will show up here once they're created."
              />
            </div>
          ) : (
            MOCK_UPCOMING_WORKS.map((work) => (
              <div
                key={work.id}
                className="flex items-center gap-3 rounded-2xl px-1.5 py-3 transition-colors duration-150 hover:bg-[var(--gray-50)] sm:gap-4 sm:px-2"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-tint)] text-[var(--brand-text)]">
                  <CalendarClock className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-tight text-[var(--gray-900)]">
                    {work.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[12.5px] tracking-tight text-[var(--gray-500)]">
                    <span>{work.date}</span>
                    <span className="text-[var(--gray-200)]">&middot;</span>
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{work.location}</span>
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--gray-50)] px-2.5 py-1 text-[12.5px] font-medium tracking-tight text-[var(--gray-500)]">
                  {work.seatsFilled}/{work.seatsTotal}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="h-3 sm:h-4" />
      </div>
    </PageContainer>
  )
}

function getInitials(name?: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '')
  return initials.join('') || '?'
}