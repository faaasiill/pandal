interface FieldErrorProps {
  message?: string
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null
  return (
    <p role="alert" className="mt-1.5 text-[13px] tracking-tight text-[var(--danger)]">
      {message}
    </p>
  )
}