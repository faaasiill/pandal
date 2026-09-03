import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { RegisterForm } from '../../features/auth/components/RegisterForm'

export default function Register() {
  const navigate = useNavigate()
  const [confirmationSent, setConfirmationSent] = useState(false)

  function handleSuccess(needsEmailConfirmation: boolean): void {
    if (needsEmailConfirmation) {
      setConfirmationSent(true)
      return
    }
    navigate('/', { replace: true })
  }

  if (confirmationSent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We sent you a confirmation link"
        footer={
          <Link to="/login" className="font-medium text-[#0071e3] hover:underline">
            Back to sign in
          </Link>
        }
      >
        <p className="text-center text-[15px] tracking-tight text-[#6e6e73]">
          Click the link in the email to activate your account, then sign in.
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join to start managing your work"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#0071e3] hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm onSuccess={handleSuccess} />
    </AuthLayout>
  )
}