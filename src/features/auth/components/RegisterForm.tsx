import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { FieldError } from '../../../components/common/FieldError'
import { registerSchema, type RegisterInput } from '../schemas/auth.schema'
import { signUpWithPassword } from '../api/auth.api'
import { GoogleButton } from './GoogleButton'

interface RegisterFormProps {
  onSuccess: (needsEmailConfirmation: boolean) => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(values: RegisterInput): Promise<void> {
    setFormError(null)
    const result = await signUpWithPassword(values)
    if (!result.success) {
      setFormError(result.error ?? 'Unable to create account.')
      return
    }
    onSuccess(Boolean(result.needsEmailConfirmation))
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
          <label className="sr-only" htmlFor="fullName">
            Full name
          </label>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            hasError={Boolean(errors.fullName)}
            {...register('fullName')}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

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
            autoComplete="new-password"
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

        <div>
          <label className="sr-only" htmlFor="confirmPassword">
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Confirm password"
            hasError={Boolean(errors.confirmPassword)}
            {...register('confirmPassword')}
          />
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        <FieldError message={formError ?? undefined} />

        <div className="pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            Create account
          </Button>
        </div>
      </form>
    </div>
  )
}