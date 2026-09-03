import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/employee/Home'
import { useAuth } from '../features/auth/store/AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { PageSkeleton } from '../components/common/Skeleton'

export function AppRoutes() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return <PageSkeleton />
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}