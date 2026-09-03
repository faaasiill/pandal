import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Home from '../pages/employee/Home'
import { useAuth } from '../features/auth/store/AuthProvider'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminRoute } from './AdminRoute'
import { PageSkeleton } from '../components/common/Skeleton'
import { AdminLayout } from '../components/layout/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminWorks from '../pages/admin/Works'
import AdminEmployees from '../pages/admin/Employees'
import AdminAttendance from '../pages/admin/Attendance'
import AdminReports from '../pages/admin/Reports'
import AdminSettings from '../pages/admin/Settings'

/** Employee root ("/") sends admins straight to their dashboard. */
function RoleHome() {
  const { user } = useAuth()
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }
  return <Home />
}

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
            <RoleHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="works" element={<AdminWorks />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}