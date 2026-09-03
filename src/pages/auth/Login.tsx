import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { LoginForm } from '../../features/auth/components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-[#0071e3] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <LoginForm onSuccess={() => navigate('/', { replace: true })} />
    </AuthLayout>
  )
}