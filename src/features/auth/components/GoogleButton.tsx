import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { FieldError } from '../../../components/common/FieldError'
import { signInWithGoogle } from '../api/auth.api'

export function GoogleButton() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick(): Promise<void> {
    setIsLoading(true)
    setError(null)
    const result = await signInWithGoogle()
    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button type="button" variant="ghost" isLoading={isLoading} onClick={handleClick}>
        <GoogleIcon />
        <span>Continue with Google</span>
      </Button>
      <FieldError message={error ?? undefined} />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v3h3.86c2.26-2.08 3.56-5.14 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.63H1.29A11.98 11.98 0 0 0 0 12c0 1.94.47 3.77 1.29 5.37z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.63l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  )
}