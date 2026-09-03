import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/store/AuthProvider'

interface AdminRouteProps {
  children: ReactNode
}

/**
 * Gate for admin-only pages. Assumes the caller already sits inside
 * <ProtectedRoute>, so it only needs to check role, not auth status.
 * Reads from the existing AuthProvider — does not modify it.
 */
export function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth()

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}