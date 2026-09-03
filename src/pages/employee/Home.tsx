import { LogOut } from 'lucide-react'
import { useAuth } from '../../features/auth/store/AuthProvider'
import { signOut } from '../../features/auth/api/auth.api'
import { Button } from '../../components/ui/button'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-1.5 bg-[var(--gray-50)] px-4 text-center">
      <h1 className="text-[21px] font-semibold tracking-tight text-[var(--gray-900)]">
        Welcome, {user?.fullName || user?.email}
      </h1>
      <p className="mb-6 text-[14px] tracking-tight text-[var(--gray-500)]">
        Signed in as {user?.role}
      </p>
      <div className="w-full max-w-[200px]">
        <Button variant="ghost" onClick={() => void signOut()}>
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}