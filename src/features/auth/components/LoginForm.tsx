import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { FieldError } from '../../../components/common/FieldError'
import { loginSchema, type LoginInput } from '../schemas/auth.schema'
import { signInWithPassword } from '../api/auth.api'
import { GoogleButton } from './GoogleButton'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values: LoginInput): Promise<void> {
    setFormError(null)
    const result = await signInWithPassword(values)
    if (!result.success) {
      setFormError(result.error ?? 'Unable to sign in.')
      return
    }
    onSuccess()
  }

  return (
    <div className="space-y-5">
      <GoogleButton />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-[13px] tracking-tight text-[var(--gray-400)]">or</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            hasError={Boolean(errors.email)}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Password"
            hasError={Boolean(errors.password)}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-[var(--gray-400)] hover:text-[var(--gray-900)]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            }
            {...register('password')}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <FieldError message={formError ?? undefined} />

        <div className="pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}